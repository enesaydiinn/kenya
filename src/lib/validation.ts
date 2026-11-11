import { z } from "zod";
export const leadSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    company: z.string().trim().max(180).default(""),
    email: z.email().max(180),
    phone: z
      .string()
      .trim()
      .max(30)
      .regex(/^[+\d\s().-]*$/),
    country: z.string().trim().min(2).max(80),
    service: z.string().trim().min(2).max(150),
    sector: z.string().trim().max(100).default(""),
    message: z.string().trim().min(20).max(5000),
    preference: z.enum(["email", "phone", "whatsapp"]),
    locale: z.enum(["tr", "en"]).default("tr"),
    consent: z.literal(true),
    website: z.string().max(0).default(""),
    startedAt: z.number().positive(),
  })
  .superRefine((v, ctx) => {
    if (v.preference !== "email" && v.phone.length < 7)
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Telefon gerekli / Phone required",
      });
  });
export const settingsSchema = z.object({
  email: z.union([z.email(), z.literal("")]),
  phone: z.string().max(40),
  whatsapp: z.string().regex(/^\d{8,15}$|^$/),
  address: z.string().max(300),
  founderName: z.string().max(100),
  founderBio: z.string().max(5000),
  founderBioEn: z.string().max(5000),
  founderImage: z
    .string()
    .regex(
      /^(?:\/images\/[\w./-]+\.(?:webp|png|jpg|jpeg)|\/api\/media\/[a-f0-9-]{36})?$/,
    ),
  heroTitle: z.string().max(180),
  heroTitleEn: z.string().max(180),
  heroDescription: z.string().max(1000),
  heroDescriptionEn: z.string().max(1000),
  privacyText: z.string().max(30000),
  privacyTextEn: z.string().max(30000),
  legalApproved: z.boolean(),
  calendarUrl: z.union([
    z.url().refine((s) => s.startsWith("https://")),
    z.literal(""),
  ]),
});
export const contentSchema = z.object({
  id: z.string().min(1).max(200),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .max(150),
  locale: z.enum(["tr", "en"]),
  type: z.enum(["service", "guide", "blog", "sector"]),
  title: z.string().min(3).max(180),
  description: z.string().min(10).max(600),
  body: z
    .array(
      z.object({
        title: z.string().min(1).max(180),
        text: z.string().max(12000),
        items: z.array(z.string().max(1000)).max(30).optional(),
      }),
    )
    .max(30),
  status: z.enum(["draft", "review", "published"]),
  seoTitle: z.string().max(180).optional(),
  seoDescription: z.string().max(400).optional(),
  image: z
    .string()
    .regex(
      /^(?:\/images\/[\w./-]+\.(?:webp|png|jpg|jpeg)|\/api\/media\/[a-f0-9-]{36})?$/,
    )
    .optional(),
  faqs: z
    .array(
      z.object({
        question: z.string().min(3).max(300),
        answer: z.string().min(3).max(3000),
      }),
    )
    .max(20)
    .optional(),
  sources: z
    .array(
      z.object({
        title: z.string().max(200),
        url: z.url().refine((s) => s.startsWith("https://")),
      }),
    )
    .max(20),
  author: z.string().min(2).max(150),
  reviewedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$|^$/)
    .optional(),
});
export function csvCell(value: unknown) {
  const s = String(value ?? "");
  return (
    '"' + (/^[\s]*[=+\-@]/.test(s) ? "'" + s : s).replaceAll('"', '""') + '"'
  );
}
