import { revalidatePath } from "next/cache";
import { currentSession, sameOrigin } from "@/lib/auth";
import { getSettings, saveSettings } from "@/lib/store";
import { settingsSchema } from "@/lib/validation";
import { json, safeBody } from "@/lib/http";
export async function GET() {
  if (!(await currentSession())) return json({ error: "Unauthorized" }, 401);
  return json(await getSettings());
}
export async function PUT(req: Request) {
  if (!sameOrigin(req)) return json({ error: "Forbidden" }, 403);
  if (!(await currentSession())) return json({ error: "Unauthorized" }, 401);
  try {
    const v = settingsSchema.safeParse(await safeBody(req, 100000));
    if (!v.success)
      return json(
        { error: "Ayarları kontrol edin.", fields: v.error.flatten() },
        400,
      );
    if (
      v.data.legalApproved &&
      (!v.data.privacyText.trim() || !v.data.privacyTextEn.trim())
    )
      return json(
        { error: "Onay için her iki dilde gizlilik metni gereklidir." },
        400,
      );
    await saveSettings(v.data);
    revalidatePath("/[[...path]]", "page");
    revalidatePath("/sitemap.xml");
    return json({ ok: true });
  } catch {
    return json({ error: "Ayarlar kaydedilemedi." }, 400);
  }
}
