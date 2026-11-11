import { sameOrigin, revokeSession, COOKIE } from "@/lib/auth";
import { json } from "@/lib/http";
export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: "Forbidden" }, 403);
  await revokeSession();
  const r = json({ ok: true });
  r.headers.set(
    "Set-Cookie",
    `${COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`,
  );
  return r;
}
