import { revalidatePath } from "next/cache";
import { currentSession, sameOrigin } from "@/lib/auth";
import { allContent, saveContent } from "@/lib/store";
import { contentSchema } from "@/lib/validation";
import { json, safeBody } from "@/lib/http";
export async function GET() {
  if (!(await currentSession())) return json({ error: "Unauthorized" }, 401);
  return json(await allContent());
}
export async function PUT(req: Request) {
  if (!sameOrigin(req)) return json({ error: "Forbidden" }, 403);
  if (!(await currentSession())) return json({ error: "Unauthorized" }, 401);
  try {
    const parsed = contentSchema.safeParse(await safeBody(req, 200000));
    if (!parsed.success)
      return json(
        {
          error: "İçerik alanlarını kontrol edin.",
          fields: parsed.error.flatten(),
        },
        400,
      );
    const v = parsed.data;
    const old = (await allContent()).find((c) => c.id === v.id);
    if (
      old &&
      (old.slug !== v.slug || old.type !== v.type || old.locale !== v.locale)
    )
      return json(
        {
          error:
            "Mevcut içeriğin adresi ve dili değiştirilemez. Yeni içerik oluşturun.",
        },
        400,
      );
    if (!old && v.id !== `${v.locale}:${v.type}:${v.slug}`)
      return json({ error: "Geçersiz içerik kimliği." }, 400);
    const now = new Date().toISOString();
    await saveContent({
      ...v,
      createdAt: old?.createdAt || now,
      updatedAt: now,
    });
    revalidatePath("/[[...path]]", "page");
    revalidatePath("/sitemap.xml");
    return json({ ok: true });
  } catch {
    return json({ error: "İçerik kaydedilemedi." }, 400);
  }
}
