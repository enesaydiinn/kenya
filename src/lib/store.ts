import { randomUUID } from "node:crypto";
import { seedContent, defaultSettings } from "./content";
import type { Content, Lead, Settings, User, Session } from "./types";
import type { PrismaClient } from "@prisma/client";
type LocalDB = {
  leads: Lead[];
  content: Content[];
  settings: Settings;
  users: User[];
  sessions: Session[];
  limits: Record<string, { count: number; expiresAt: number }>;
};
const empty = (): LocalDB => ({
  leads: [],
  content: [],
  settings: defaultSettings,
  users: [],
  sessions: [],
  limits: {},
});
let db: PrismaClient | undefined;
export const localEnabled = () => process.env.LOCAL_DATA_ENABLED === "true";
export const databaseConfigured = () =>
  !!process.env.DATABASE_URL || localEnabled();
async function prisma() {
  if (!db) {
    const [{ PrismaClient }, { PrismaPg }] = await Promise.all([
      import("@prisma/client"),
      import("@prisma/adapter-pg"),
    ]);
    db = new PrismaClient({
      adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
    });
  }
  return db;
}
async function file<T>(
  fn: (data: LocalDB) => T | Promise<T>,
  write = false,
): Promise<T> {
  if (!localEnabled()) throw new Error("DATABASE_NOT_CONFIGURED");
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  const dir = path.resolve(process.env.LOCAL_DATA_DIR || ".data");
  await fs.mkdir(dir, { recursive: true, mode: 0o700 });
  const lock = path.join(dir, ".lock");
  let locked = false;
  if (write) {
    for (let i = 0; i < 100; i++) {
      try {
        await fs.mkdir(lock);
        locked = true;
        break;
      } catch (e) {
        if ((e as NodeJS.ErrnoException).code !== "EEXIST") throw e;
        await new Promise((r) => setTimeout(r, 30));
      }
    }
    if (!locked) throw new Error("STORE_BUSY");
  }
  try {
    let data = empty();
    try {
      data = JSON.parse(
        await fs.readFile(path.join(dir, "store.json"), "utf8"),
      );
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code !== "ENOENT") throw e;
    }
    const result = await fn(data);
    if (write) {
      const tmp = path.join(dir, `${randomUUID()}.tmp`);
      await fs.writeFile(tmp, JSON.stringify(data), { mode: 0o600 });
      await fs.rename(tmp, path.join(dir, "store.json"));
    }
    return result;
  } finally {
    if (locked) await fs.rmdir(lock);
  }
}
function serialize<T>(v: unknown): T {
  return JSON.parse(JSON.stringify(v));
}
export async function getSettings(): Promise<Settings> {
  if (!databaseConfigured()) return defaultSettings;
  if (process.env.DATABASE_URL) {
    const v = await (
      await prisma()
    ).setting.findUnique({ where: { key: "site" } });
    return { ...defaultSettings, ...((v?.value as object) || {}) };
  }
  return file((d) => ({ ...defaultSettings, ...d.settings }));
}
export async function saveSettings(value: Settings) {
  if (process.env.DATABASE_URL) {
    await (
      await prisma()
    ).setting.upsert({
      where: { key: "site" },
      create: { key: "site", value },
      update: { value },
    });
  } else
    await file((d) => {
      d.settings = value;
    }, true);
}
export async function allContent(): Promise<Content[]> {
  let overrides: Content[] = [];
  if (process.env.DATABASE_URL)
    overrides = serialize(await (await prisma()).content.findMany());
  else if (localEnabled()) overrides = await file((d) => d.content);
  const map = new Map(seedContent.map((c) => [c.id, c]));
  overrides.forEach((c) => map.set(c.id, c));
  return Array.from(map.values());
}
export async function saveContent(content: Content) {
  if (process.env.DATABASE_URL) {
    const data = serialize<any>(content);
    delete data.createdAt;
    delete data.updatedAt;
    await (
      await prisma()
    ).content.upsert({ where: { id: content.id }, create: data, update: data });
  } else
    await file((d) => {
      const i = d.content.findIndex((c) => c.id === content.id);
      if (i >= 0) d.content[i] = content;
      else d.content.push(content);
    }, true);
}
export async function createLead(
  values: Omit<Lead, "id" | "createdAt" | "updatedAt">,
) {
  if (process.env.DATABASE_URL)
    return serialize<Lead>(
      await (await prisma()).lead.create({ data: values }),
    );
  return file((d) => {
    const lead = {
      ...values,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    d.leads.unshift(lead);
    return lead;
  }, true);
}
export async function getLeads(): Promise<Lead[]> {
  if (process.env.DATABASE_URL)
    return serialize(
      await (await prisma()).lead.findMany({ orderBy: { createdAt: "desc" } }),
    );
  return file((d) => d.leads);
}
export async function updateLead(
  id: string,
  values: { status?: string; notificationStatus?: string },
) {
  if (process.env.DATABASE_URL) {
    await (await prisma()).lead.update({ where: { id }, data: values });
  } else
    await file((d) => {
      const lead = d.leads.find((x) => x.id === id);
      if (!lead) throw new Error("NOT_FOUND");
      Object.assign(lead, values, { updatedAt: new Date().toISOString() });
    }, true);
}
export async function getUser(email: string): Promise<User | null> {
  if (process.env.DATABASE_URL)
    return (await prisma()).adminUser.findUnique({ where: { email } });
  return file((d) => d.users.find((x) => x.email === email) || null);
}
export async function createUser(email: string, passwordHash: string) {
  if (process.env.DATABASE_URL) {
    const p = await prisma();
    const user = await p.adminUser.upsert({
      where: { email },
      create: { email, passwordHash },
      update: { passwordHash },
    });
    await p.session.deleteMany({ where: { userId: user.id } });
    return user;
  }
  return file((d) => {
    let user = d.users.find((x) => x.email === email);
    if (user) user.passwordHash = passwordHash;
    else {
      user = { id: randomUUID(), email, passwordHash, role: "admin" };
      d.users.push(user);
    }
    d.sessions = [];
    return user;
  }, true);
}
export async function createSession(session: Session) {
  if (process.env.DATABASE_URL) {
    await (
      await prisma()
    ).session.create({
      data: { ...session, expiresAt: new Date(session.expiresAt) },
    });
  } else
    await file((d) => {
      d.sessions = d.sessions.filter(
        (s) => Date.parse(s.expiresAt) > Date.now(),
      );
      d.sessions.push(session);
    }, true);
}
export async function getSession(id: string): Promise<Session | null> {
  if (process.env.DATABASE_URL)
    return serialize(
      await (await prisma()).session.findUnique({ where: { id } }),
    );
  return file((d) => d.sessions.find((s) => s.id === id) || null);
}
export async function deleteSession(id: string) {
  if (process.env.DATABASE_URL)
    await (await prisma()).session.deleteMany({ where: { id } });
  else
    await file((d) => {
      d.sessions = d.sessions.filter((s) => s.id !== id);
    }, true);
}
export async function allowRequest(key: string, max: number, windowMs: number) {
  const now = Date.now();
  if (process.env.DATABASE_URL) {
    const end = new Date(now + windowMs);
    const result = await (
      await prisma()
    ).$queryRaw<
      { count: number }[]
    >`INSERT INTO "RateLimit" ("key","count","expiresAt") VALUES (${key},1,${end}) ON CONFLICT ("key") DO UPDATE SET "count" = CASE WHEN "RateLimit"."expiresAt" < NOW() THEN 1 ELSE "RateLimit"."count"+1 END, "expiresAt" = CASE WHEN "RateLimit"."expiresAt" < NOW() THEN ${end} ELSE "RateLimit"."expiresAt" END RETURNING "count"`;
    return result[0].count <= max;
  }
  return file((d) => {
    for (const k in d.limits)
      if (d.limits[k].expiresAt < now) delete d.limits[k];
    const v = d.limits[key] || { count: 0, expiresAt: now + windowMs };
    v.count++;
    d.limits[key] = v;
    return v.count <= max;
  }, true);
}
export async function saveMedia(
  id: string,
  value: { type: string; data: string },
) {
  if (process.env.DATABASE_URL) {
    await (
      await prisma()
    ).setting.create({ data: { key: "media:" + id, value } });
  } else {
    if (!localEnabled()) throw new Error("DATABASE_NOT_CONFIGURED");
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const dir = path.resolve(process.env.LOCAL_DATA_DIR || ".data", "media");
    await fs.mkdir(dir, { recursive: true, mode: 0o700 });
    await fs.writeFile(path.join(dir, id + ".json"), JSON.stringify(value), {
      mode: 0o600,
    });
  }
}
export async function getMedia(
  id: string,
): Promise<{ type: string; data: string } | null> {
  if (process.env.DATABASE_URL) {
    const item = await (
      await prisma()
    ).setting.findUnique({ where: { key: "media:" + id } });
    return item?.value as { type: string; data: string } | null;
  }
  if (!localEnabled()) return null;
  try {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    return JSON.parse(
      await fs.readFile(
        path.resolve(
          process.env.LOCAL_DATA_DIR || ".data",
          "media",
          id + ".json",
        ),
        "utf8",
      ),
    );
  } catch {
    return null;
  }
}
