import { test, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { leadSchema, csvCell, settingsSchema } from "../src/lib/validation";
import {
  hashPassword,
  verifyPassword,
  issueSession,
  verifySessionToken,
} from "../src/lib/auth";
import {
  createLead,
  getLeads,
  allowRequest,
  deleteSession,
  saveContent,
  allContent,
} from "../src/lib/store";
import { seedContent } from "../src/lib/content";
const directory = await mkdtemp(path.join(tmpdir(), "kenya-test-"));
process.env.LOCAL_DATA_ENABLED = "true";
process.env.LOCAL_DATA_DIR = directory;
process.env.SESSION_SECRET = "test-only-secret-32-characters-or-longer";
after(async () => {
  await rm(directory, { recursive: true, force: true });
});
const valid = {
  name: "Test User",
  company: "Test Company",
  email: "test@example.com",
  phone: "",
  country: "Türkiye",
  service: "Pazar araştırması",
  sector: "Makine",
  message: "Bu mesaj yalnızca test için hazırlanmıştır.",
  preference: "email",
  locale: "tr",
  consent: true,
  website: "",
  startedAt: Date.now() - 5000,
};
test("lead validation requires informed request and rejects spam fields", () => {
  assert.equal(leadSchema.safeParse(valid).success, true);
  assert.equal(
    leadSchema.safeParse({ ...valid, consent: false }).success,
    false,
  );
  assert.equal(
    leadSchema.safeParse({ ...valid, website: "spam" }).success,
    false,
  );
  assert.equal(
    leadSchema.safeParse({ ...valid, message: "short" }).success,
    false,
  );
});
test("phone is required for phone or WhatsApp preference, but optional for email", () => {
  assert.equal(
    leadSchema.safeParse({ ...valid, preference: "whatsapp" }).success,
    false,
  );
  assert.equal(
    leadSchema.safeParse({
      ...valid,
      preference: "phone",
      phone: "+90 555 000 00 00",
    }).success,
    true,
  );
  assert.equal(
    leadSchema.safeParse({ ...valid, phone: "<script>" }).success,
    false,
  );
});
test("password hashes use random salts and reject wrong passwords", () => {
  const a = hashPassword("a-long-test-password"),
    b = hashPassword("a-long-test-password");
  assert.notEqual(a, b);
  assert.equal(verifyPassword("a-long-test-password", a), true);
  assert.equal(verifyPassword("wrong", a), false);
  assert.equal(verifyPassword("anything", "invalid"), false);
});
test("sessions reject tampered tokens and revoked session records", async () => {
  const { token } = await issueSession("test-user");
  const session = await verifySessionToken(token);
  assert.ok(session);
  assert.equal(await verifySessionToken(token.slice(0, -5) + "wrong"), null);
  await deleteSession(session.id);
  assert.equal(await verifySessionToken(token), null);
});
test("concurrent writes do not lose local enquiries", async () => {
  const { consent, website, startedAt, ...data } = leadSchema.parse(valid);
  await Promise.all(
    Array.from({ length: 12 }, (_, i) =>
      createLead({
        ...data,
        name: "Concurrent " + i,
        status: "Yeni Talep",
        notificationStatus: "unconfigured",
        consentVersion: "test",
      }),
    ),
  );
  const leads = await getLeads();
  assert.equal(leads.length, 12);
  assert.equal(new Set(leads.map((l) => l.id)).size, 12);
});
test("rate limit is atomic across concurrent requests", async () => {
  const allowed = await Promise.all(
    Array.from({ length: 10 }, () => allowRequest("quota", 3, 60000)),
  );
  assert.equal(allowed.filter(Boolean).length, 3);
});
test("content edits persist and draft status is preserved", async () => {
  const original = seedContent[0];
  await saveContent({ ...original, status: "draft", title: "Edited for test" });
  const saved = (await allContent()).find((c) => c.id === original.id);
  assert.equal(saved?.title, "Edited for test");
  assert.equal(saved?.status, "draft");
});
test("CSV cells neutralize spreadsheet formula prefixes and escape quotes", () => {
  for (const value of ["=1+1", "+cmd", "-1+2", "@SUM(A1)", '  =HYPERLINK("x")'])
    assert.ok(csvCell(value).startsWith("\"'"));
  assert.equal(csvCell('A "quoted" value'), '"A ""quoted"" value"');
});
