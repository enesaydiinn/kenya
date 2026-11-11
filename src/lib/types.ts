export type Locale = "tr" | "en";
export type Section = { title: string; text: string; items?: string[] };
export type Content = {
  id: string;
  slug: string;
  locale: Locale;
  type: "service" | "guide" | "blog" | "sector";
  title: string;
  description: string;
  body: Section[];
  status: "draft" | "review" | "published";
  seoTitle?: string;
  seoDescription?: string;
  image?: string;
  faqs?: { question: string; answer: string }[];
  sources: { title: string; url: string }[];
  author: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
};
export const leadStatuses = [
  "Yeni Talep",
  "İletişime Geçildi",
  "Ön Görüşme",
  "Teklif Hazırlanıyor",
  "Teklif Gönderildi",
  "Müşteri",
  "Tamamlandı",
  "Uygun Değil",
] as const;
export type Lead = {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  service: string;
  sector: string;
  message: string;
  preference: string;
  locale: string;
  consentVersion: string;
  status: string;
  notificationStatus: string;
  createdAt: string;
  updatedAt: string;
};
export type Settings = {
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  founderName: string;
  founderBio: string;
  founderBioEn: string;
  founderImage: string;
  heroTitle: string;
  heroTitleEn: string;
  heroDescription: string;
  heroDescriptionEn: string;
  privacyText: string;
  privacyTextEn: string;
  legalApproved: boolean;
  calendarUrl: string;
};
export type User = {
  id: string;
  email: string;
  passwordHash: string;
  role: string;
};
export type Session = { id: string; userId: string; expiresAt: string };
