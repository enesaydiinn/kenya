import { z } from "zod";
import {
  issueSession,
  verifyPassword,
  sameOrigin,
  fingerprint,
  COOKIE,
  hashPassword,
} from "@/lib/auth";
import {
  getUser,
  allowRequest,
  databaseConfigured,
  localEnabled,
} from "@/lib/store";
import { json, safeBody } from "@/lib/http";
export async function POST(req: Request) {
  if (!sameOrigin(req)) return json({ error: "Geçersiz kaynak." }, 403);
  if (!databaseConfigured())
    return json({ error: "Yönetim erişimi henüz yapılandırılmadı." }, 503);
  try {
    if (!(await allowRequest("login:" + fingerprint(req), 8, 900000)))
      return json(
        { error: "Çok fazla deneme. 15 dakika sonra tekrar deneyin." },
        429,
      );
    const v = z
      .object({
        email: z.email().max(180),
        password: z.string().min(1).max(200),
      })
      .safeParse(await safeBody(req, 2000));
    if (!v.success)
      return json({ error: "Giriş bilgilerini kontrol edin." }, 400);
    const user = await getUser(v.data.email.toLowerCase());
    const valid = verifyPassword(
      v.data.password,
      user?.passwordHash || hashPassword("invalid-dummy-value"),
    );
    if (!user || !valid || user.role !== "admin")
      return json({ error: "E-posta veya parola hatalı." }, 401);
    const { token, expires } = await issueSession(user.id);
    const response = json({ ok: true });
    const secure = !localEnabled() || new URL(req.url).protocol === "https:";
    response.headers.set(
      "Set-Cookie",
      `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; ${secure ? "Secure; " : ""}Expires=${expires.toUTCString()}`,
    );
    return response;
  } catch {
    return json(
      { error: "Oturum açılamadı. Yapılandırmayı kontrol edin." },
      500,
    );
  }
}
