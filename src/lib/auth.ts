import {
  randomBytes,
  scryptSync,
  timingSafeEqual,
  createHash,
} from "node:crypto";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { getSession, createSession, deleteSession } from "./store";
export const COOKIE = "kenya_session";
export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}
export function verifyPassword(password: string, hash: string) {
  try {
    const [salt, hex] = hash.split(":");
    const actual = scryptSync(password, salt, 64);
    const expected = Buffer.from(hex, "hex");
    return (
      actual.length === expected.length && timingSafeEqual(actual, expected)
    );
  } catch {
    return false;
  }
}
function secret() {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 32) throw new Error("SESSION_SECRET_REQUIRED");
  return new TextEncoder().encode(s);
}
export async function issueSession(userId: string) {
  const id = randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 8 * 60 * 60 * 1000);
  const token = await new SignJWT({ sid: id })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret());
  await createSession({ id, userId, expiresAt: expires.toISOString() });
  return { token, expires };
}
export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret(), {
      algorithms: ["HS256"],
    });
    if (typeof payload.sid !== "string" || !payload.sub) return null;
    const session = await getSession(payload.sid);
    return session &&
      session.userId === payload.sub &&
      Date.parse(session.expiresAt) > Date.now()
      ? session
      : null;
  } catch {
    return null;
  }
}
export async function currentSession() {
  const c = (await cookies()).get(COOKIE)?.value;
  return c ? verifySessionToken(c) : null;
}
export async function revokeSession() {
  const session = await currentSession();
  if (session) await deleteSession(session.id);
}
export function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  const expected = process.env.APP_ORIGIN || new URL(req.url).origin;
  return !!origin && origin === expected;
}
export function fingerprint(req: Request) {
  const ip =
    process.env.TRUST_PROXY === "true"
      ? req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown"
      : "local";
  return createHash("sha256")
    .update(
      `${process.env.RATE_LIMIT_SECRET || process.env.SESSION_SECRET || "local"}:${ip}`,
    )
    .digest("hex");
}
