import { notFound } from "next/navigation";
import { connection } from "next/server";
import type { Metadata } from "next";
import type { Locale, Content } from "@/lib/types";
import { allContent, getSettings } from "@/lib/store";
import { seedContent } from "@/lib/content";
import { typePath, local } from "@/lib/i18n";
import { metadata, StructuredData } from "@/lib/seo";
import { Header, Footer, WhatsApp } from "@/components/shell";
import {
  Home,
  Listing,
  Detail,
  About,
  Contact,
  ChecklistPage,
  Legal,
  FAQ,
  PageIntro,
  CTA,
  Sourcing,
} from "@/components/pages";
import { TradeGuide } from "@/components/trade-guide";
export const revalidate = 60;
const mainRoutes = [
  "",
  "hakkimizda",
  "hizmetler",
  "kenya-rehberi",
  "sektorler",
  "blog",
  "sikca-sorulan-sorular",
  "iletisim",
  "gizlilik-politikasi",
  "cerez-politikasi",
  "kisisel-verilerin-korunmasi",
  "ihracata-hazirlik",
  "kenya-ticaret-rehberi",
  "kenyadan-turkiyeye-ticaret",
];
function parse(path: string[] = []) {
  const locale: Locale = path[0] === "en" ? "en" : "tr";
  return { locale, path: (locale === "en" ? path.slice(1) : path).join("/") };
}
export function generateStaticParams() {
  if (process.env.SITES_BUILD === "true") return [];
  return (["tr", "en"] as Locale[]).flatMap((locale) =>
    [
      ...mainRoutes.filter((x) => x !== "iletisim"),
      ...seedContent
        .filter((c) => c.locale === locale && c.status === "published")
        .map((c) => `${typePath[c.type]}/${c.slug}`),
    ].map((p) => ({
      path: [
        ...(locale === "en" ? ["en"] : []),
        ...p.split("/").filter(Boolean),
      ],
    })),
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ path?: string[] }>;
}): Promise<Metadata> {
  const { locale, path } = parse((await params).path);
  const all = await allContent();
  const content = all.find(
    (c) =>
      c.locale === locale &&
      c.status === "published" &&
      `${typePath[c.type]}/${c.slug}` === path,
  );
  const titles: Record<string, [string, string]> = {
    "": [
      "Kenya Danışmanlık | Türkiye & Kenya Ticaret ve Yerel Temsil",
      "Kenya Consulting | Türkiye & Kenya Trade and Local Representation",
    ],
    hakkimizda: ["Hakkımızda", "About us"],
    hizmetler: ["Kenya Danışmanlık Hizmetleri", "Consulting services in Kenya"],
    "kenya-rehberi": [
      "Kenya Rehberi — Ticaret, Yatırım ve Yaşam",
      "Kenya Guide — Trade, Investment and Living",
    ],
    sektorler: ["Kenya’ya Sektörel İhracat", "Export Sectors for Kenya"],
    blog: ["İçgörüler ve Saha Notları", "Insights and Field Notes"],
    iletisim: [
      "Ücretsiz Ön Görüşme ve İletişim",
      "Free Introductory Conversation and Contact",
    ],
    "sikca-sorulan-sorular": [
      "Sıkça Sorulan Sorular",
      "Frequently Asked Questions",
    ],
    "ihracata-hazirlik": [
      "İhracata Hazırlık Kontrol Listesi",
      "Export Readiness Checklist",
    ],
    "kenya-ticaret-rehberi": [
      "Kenya Ticaret Rehberi",
      "Kenya Trade Preparation Guide",
    ],
    "kenyadan-turkiyeye-ticaret": [
      "Kenya’dan Türkiye’ye Tedarik",
      "Sourcing from Kenya",
    ],
    "gizlilik-politikasi": ["Gizlilik Politikası", "Privacy Policy"],
    "cerez-politikasi": ["Çerez Politikası", "Cookie Policy"],
    "kisisel-verilerin-korunmasi": [
      "Kişisel Verilerin Korunması",
      "Personal Data Protection",
    ],
  };
  if (!content && !titles[path])
    return {
      title: "404 — Kenya Danışmanlık",
      robots: { index: false, follow: false },
    };
  return metadata(
    locale,
    path,
    content?.seoTitle ||
      content?.title ||
      titles[path]?.[locale === "tr" ? 0 : 1] ||
      "Kenya Danışmanlık",
    content?.seoDescription ||
      content?.description ||
      local(
        locale,
        "Kenya’da ihracat, distribütör araştırması, yerel temsil ve yatırım koordinasyonu. Türkiye ve Kenya arasında yerel iletişim ve saha desteği.",
        "Export support, distributor research, local representation and investment coordination in Kenya. Local communication between Türkiye and Kenya.",
      ),
    ["gizlilik-politikasi", "kisisel-verilerin-korunmasi"].includes(path),
  );
}
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ path?: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale, path } = parse((await params).path);
  if (path === "iletisim" || process.env.SITES_BUILD === "true")
    await connection();
  const [all, settings] = await Promise.all([allContent(), getSettings()]);
  const content = all.filter(
    (c) => c.locale === locale && c.status === "published",
  );
  const current = content.find((c) => `${typePath[c.type]}/${c.slug}` === path);
  let page: React.ReactNode;
  if (!path)
    page = <Home locale={locale} content={content} settings={settings} />;
  else if (current) page = <Detail locale={locale} content={current} />;
  else if (path === "hakkimizda")
    page = <About locale={locale} settings={settings} />;
  else if (path === "iletisim") {
    const q = await searchParams;
    page = (
      <Contact
        locale={locale}
        settings={settings}
        service={typeof q.service === "string" ? q.service : ""}
      />
    );
  } else if (path === "ihracata-hazirlik")
    page = <ChecklistPage locale={locale} />;
  else if (path === "kenyadan-turkiyeye-ticaret")
    page = <Sourcing locale={locale} />;
  else if (path === "kenya-ticaret-rehberi")
    page = <TradeGuide locale={locale} />;
  else if (
    [
      "gizlilik-politikasi",
      "cerez-politikasi",
      "kisisel-verilerin-korunmasi",
    ].includes(path)
  )
    page = <Legal locale={locale} kind={path} settings={settings} />;
  else if (path === "sikca-sorulan-sorular")
    page = (
      <>
        <PageIntro
          locale={locale}
          title={local(
            locale,
            "Sorularınızın yanıtları.",
            "Answers to your questions.",
          )}
          text={local(
            locale,
            "Hizmet kapsamı, çalışma biçimi ve ilk adımlar hakkında.",
            "About our scope, ways of working and first steps.",
          )}
          eyebrow={local(
            locale,
            "SIKÇA SORULAN SORULAR",
            "FREQUENTLY ASKED QUESTIONS",
          )}
        />
        <section className="container narrow-section">
          <FAQ locale={locale} />
        </section>
        <CTA locale={locale} />
      </>
    );
  else {
    const type = Object.entries(typePath).find(([, p]) => p === path)?.[0] as
      Content["type"] | undefined;
    if (type)
      page = (
        <Listing
          locale={locale}
          type={type}
          content={content.filter((c) => c.type === type)}
        />
      );
    else notFound();
  }
  return (
    <>
      <Header locale={locale} />
      <main id="main">{page}</main>
      <Footer locale={locale} settings={settings} />
      <WhatsApp
        locale={locale}
        number={settings.whatsapp}
        service={current?.title}
      />
      <StructuredData locale={locale} path={path} content={current} />
    </>
  );
}
