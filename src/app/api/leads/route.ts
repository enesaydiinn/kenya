import { leadSchema } from "@/lib/validation";
import {
  databaseConfigured,
  getSettings,
  createLead,
  updateLead,
  allowRequest,
  localEnabled,
} from "@/lib/store";
import { sameOrigin, fingerprint } from "@/lib/auth";
import { json, safeBody } from "@/lib/http";
export const runtime = "nodejs";
export async function POST(req: Request) {
  if (!sameOrigin(req))
    return json({ error: "Geçersiz kaynak / Invalid origin" }, 403);
  if (!databaseConfigured())
    return json(
      {
        error:
          "Başvuru sistemi henüz yapılandırılmadı. / Enquiries are not configured yet.",
      },
      503,
    );
  try {
    if (!(await allowRequest("lead:" + fingerprint(req), 5, 3600000)))
      return json(
        {
          error:
            "Çok fazla talep. Daha sonra tekrar deneyin. / Too many requests. Try later.",
        },
        429,
      );
    const parsed = leadSchema.safeParse(await safeBody(req));
    if (!parsed.success)
      return json(
        {
          error: "Lütfen alanları kontrol edin. / Check the fields.",
          fields: parsed.error.flatten().fieldErrors,
        },
        400,
      );
    const v = parsed.data;
    const age = Date.now() - v.startedAt;
    if (age < 2500 || age > 86400000)
      return json(
        {
          error:
            "Formu yenileyerek tekrar deneyin. / Refresh the form and try again.",
        },
        400,
      );
    const settings = await getSettings();
    if (!settings.legalApproved && !localEnabled())
      return json(
        {
          error:
            "Gizlilik bilgilendirmesi incelemede. / Privacy notice is under review.",
        },
        503,
      );
    const { consent, website, startedAt, ...data } = v;
    const lead = await createLead({
      ...data,
      consentVersion: "privacy-2026-11-v1",
      status: "Yeni Talep",
      notificationStatus: "unconfigured",
    });
    if (
      process.env.RESEND_API_KEY &&
      process.env.LEAD_NOTIFICATION_EMAIL &&
      process.env.EMAIL_FROM
    ) {
      try {
        const sent = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          signal: AbortSignal.timeout(8000),
          body: JSON.stringify({
            from: process.env.EMAIL_FROM,
            to: [process.env.LEAD_NOTIFICATION_EMAIL],
            subject: "Kenya Danışmanlık — Yeni talep",
            text: `Yeni başvuru kaydedildi. Talep numarası: ${lead.id}. Ayrıntıları güvenli yönetim panelinde inceleyin.`,
          }),
        });
        await updateLead(lead.id, {
          notificationStatus: sent.ok ? "sent" : "failed",
        });
      } catch {
        await updateLead(lead.id, { notificationStatus: "failed" });
      }
    }
    return json({ ok: true, id: lead.id }, 201);
  } catch {
    return json(
      {
        error:
          "Talep kaydedilemedi. Lütfen tekrar deneyin. / Enquiry could not be saved. Please try again.",
      },
      500,
    );
  }
}
