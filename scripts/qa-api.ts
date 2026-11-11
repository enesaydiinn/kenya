import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import { writeFile, mkdir } from "node:fs/promises";
import { hashPassword } from "../src/lib/auth";
import { createUser } from "../src/lib/store";
const base = process.env.QA_ORIGIN || "http://127.0.0.1:3000";
const email = "qa-only@example.com";
const password = randomBytes(24).toString("base64url");
await createUser(email, hashPassword(password));
await mkdir(".data", { recursive: true });
await writeFile(
  ".data/qa-credentials.json",
  JSON.stringify({ email, password }),
  { mode: 0o600 },
);
const logs: string[] = [];
async function run(name: string, fn: () => Promise<void>) {
  await fn();
  logs.push("PASS " + name);
  console.log("PASS " + name);
}
const post = (url: string, body: unknown, cookie?: string) =>
  fetch(base + url, {
    method: "POST",
    headers: {
      Origin: base,
      "Content-Type": "application/json",
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body: JSON.stringify(body),
  });
for (const path of [
  "/api/admin/leads",
  "/api/admin/content",
  "/api/admin/settings",
  "/api/admin/export",
])
  await run("Unauthorized " + path, async () => {
    assert.equal((await fetch(base + path)).status, 401);
  });
const body = {
  name: "API QA",
  company: "Disposable QA",
  email: "qa@example.com",
  phone: "",
  country: "Türkiye",
  service: "Pazar Araştırması",
  sector: "Makine",
  message: "Bu kayıt uçtan uca API testi için oluşturulmuştur.",
  preference: "email",
  locale: "tr",
  consent: true,
  website: "",
  startedAt: Date.now() - 6000,
};
await run("Reject cross-origin lead submission", async () => {
  assert.equal(
    (
      await fetch(base + "/api/leads", {
        method: "POST",
        headers: {
          Origin: "https://invalid.example",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
    ).status,
    403,
  );
});
await run("Reject missing consent", async () => {
  assert.equal(
    (await post("/api/leads", { ...body, consent: false })).status,
    400,
  );
});
await run("Reject honeypot", async () => {
  assert.equal(
    (await post("/api/leads", { ...body, website: "bot" })).status,
    400,
  );
});
let leadId = "";
await run("Save actual enquiry", async () => {
  const r = await post("/api/leads", body);
  assert.equal(r.status, 201);
  leadId = (await r.json()).id;
  assert.ok(leadId);
});
let cookie = "";
await run("Authenticate admin", async () => {
  const r = await post("/api/auth/login", { email, password });
  assert.equal(r.status, 200);
  cookie = r.headers.get("set-cookie")!.split(";")[0];
  assert.ok(r.headers.get("set-cookie")!.includes("HttpOnly"));
  assert.ok(r.headers.get("set-cookie")!.includes("SameSite=Strict"));
});
const headers = {
  Cookie: cookie,
  Origin: base,
  "Content-Type": "application/json",
};
await run("Find persisted enquiry in authenticated admin API", async () => {
  const l = await (await fetch(base + "/api/admin/leads", { headers })).json();
  assert.ok(l.find((v: any) => v.id === leadId));
});
await run("Update and persist lead status", async () => {
  assert.equal(
    (
      await fetch(base + "/api/admin/leads", {
        method: "PATCH",
        headers,
        body: JSON.stringify({ id: leadId, status: "Ön Görüşme" }),
      })
    ).status,
    200,
  );
  const l = await (await fetch(base + "/api/admin/leads", { headers })).json();
  assert.equal(l.find((v: any) => v.id === leadId).status, "Ön Görüşme");
});
await run("Reject cross-origin admin mutation", async () => {
  assert.equal(
    (
      await fetch(base + "/api/admin/leads", {
        method: "PATCH",
        headers: { ...headers, Origin: "https://invalid.example" },
        body: JSON.stringify({ id: leadId, status: "Müşteri" }),
      })
    ).status,
    403,
  );
});
await run("Export authenticated CSV", async () => {
  const r = await fetch(base + "/api/admin/export", { headers });
  assert.ok((await r.text()).includes("API QA"));
  assert.equal(r.headers.get("content-type"), "text/csv; charset=utf-8");
});
await run("Reject executable image upload", async () => {
  assert.equal(
    (
      await fetch(base + "/api/admin/media", {
        method: "POST",
        headers: { Cookie: cookie, Origin: base },
        body: '<svg onload="alert(1)"></svg>',
      })
    ).status,
    400,
  );
});
await run("Logout revokes persisted session", async () => {
  assert.equal((await post("/api/auth/logout", {}, cookie)).status, 200);
  assert.equal(
    (await fetch(base + "/api/admin/leads", { headers })).status,
    401,
  );
});
await mkdir("docs", { recursive: true });
await writeFile(
  "docs/api-test-results.json",
  JSON.stringify({ date: new Date().toISOString(), checks: logs }, null, 2),
);
