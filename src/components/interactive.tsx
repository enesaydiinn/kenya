"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Search,
  Check,
  RotateCcw,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { href, local, typePath, dateLabel } from "@/lib/i18n";
import type { Content, Locale } from "@/lib/types";
import { Button } from "./ui/button";
export function ContentExplorer({
  locale,
  items,
}: {
  locale: Locale;
  items: Content[];
}) {
  const [query, setQuery] = useState("");
  const filtered = items.filter((c) =>
    (c.title + " " + c.description)
      .toLocaleLowerCase(locale)
      .includes(query.toLocaleLowerCase(locale)),
  );
  return (
    <>
      <div className="explorer-tools">
        <label className="search-field">
          <Search size={19} />
          <span className="sr-only">
            {local(locale, "İçerik ara", "Search content")}
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={local(
              locale,
              "Bir konu veya anahtar kelime arayın…",
              "Search for a topic or keyword…",
            )}
          />
        </label>
        <span aria-live="polite">
          {filtered.length} {local(locale, "içerik", "results")}
        </span>
      </div>
      <div className="content-grid">
        {filtered.map((c, i) => (
          <Link
            className="editorial-card"
            key={c.id}
            href={href(locale, `${typePath[c.type]}/${c.slug}`)}
          >
            <span className="card-category">
              {c.type === "blog"
                ? local(locale, "İÇGÖRÜ", "INSIGHT")
                : c.type === "sector"
                  ? local(locale, "SEKTÖR ODAĞI", "SECTOR FOCUS")
                  : local(locale, "KENYA REHBERİ", "KENYA GUIDE")}
              <span>{String(i + 1).padStart(2, "0")}</span>
            </span>
            <h2>{c.title}</h2>
            <p>{c.description}</p>
            <span className="card-bottom">
              {local(locale, "İnceleyin", "Explore")}
              <ArrowRight size={19} />
            </span>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="empty-state">
          <Search size={30} />
          <h2>
            {local(
              locale,
              "Aradığınız konuda içerik bulunamadı.",
              "No content found for your search.",
            )}
          </h2>
          <button className="text-link" onClick={() => setQuery("")}>
            {local(locale, "Aramayı temizle", "Clear search")}
          </button>
        </div>
      )}
    </>
  );
}
const checklistTr = [
  "Hedef ürünüm ve teknik özellikleri belli.",
  "GTİP / HS kodunu uzmanla doğruladım.",
  "Hedef müşteri profilimi belirledim.",
  "Kenya’daki ithalat ve uygunluk koşullarını araştırdım.",
  "Distribütör ihtiyacımı değerlendirdim.",
  "Lojistik ve teslim planımı hazırladım.",
  "Fiyatlandırma ve ödeme koşullarımı çalıştım.",
];
const checklistEn = [
  "My target product and technical specifications are defined.",
  "I have confirmed the HS code with a specialist.",
  "I have defined my target customer profile.",
  "I have researched Kenya’s import and conformity requirements.",
  "I have assessed whether I need a distributor.",
  "I have prepared logistics and delivery plans.",
  "I have worked through pricing and payment terms.",
];
export function Readiness({ locale }: { locale: Locale }) {
  const [checked, setChecked] = useState<number[]>([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      setChecked(
        JSON.parse(localStorage.getItem("kenya-readiness") || "[]").filter(
          (n: unknown) => typeof n === "number" && n >= 0 && n < 7,
        ),
      );
    } catch {}
  }, []);
  const toggle = (i: number) => {
    const next = checked.includes(i)
      ? checked.filter((n) => n !== i)
      : [...checked, i];
    setChecked(next);
    localStorage.setItem("kenya-readiness", JSON.stringify(next));
    setShow(false);
  };
  const list = locale === "tr" ? checklistTr : checklistEn;
  return (
    <div className="readiness">
      <div className="readiness-heading">
        <div>
          <span className="eyebrow">
            {local(
              locale,
              "7 ADIMDA ÖN DEĞERLENDİRME",
              "A 7-STEP SELF-ASSESSMENT",
            )}
          </span>
          <h2>
            {local(locale, "Hazırlığınız nerede?", "How prepared are you?")}
          </h2>
        </div>
        <span className="progress-label">{checked.length} / 7</span>
      </div>
      <div className="progress-track">
        <span style={{ width: `${(checked.length / 7) * 100}%` }} />
      </div>
      <div className="checklist">
        {list.map((label, i) => (
          <label key={i}>
            <input
              type="checkbox"
              checked={checked.includes(i)}
              onChange={() => toggle(i)}
            />
            <span className="check-box">
              {checked.includes(i) && <Check size={16} />}
            </span>
            <span>{label}</span>
          </label>
        ))}
      </div>
      <div className="readiness-actions">
        <Button onClick={() => setShow(true)}>
          {local(
            locale,
            "Hazırlık durumumu göster",
            "Show my preparation status",
          )}
          <ArrowRight size={17} />
        </Button>
        <button
          className="text-link"
          onClick={() => {
            setChecked([]);
            setShow(false);
            localStorage.removeItem("kenya-readiness");
          }}
        >
          <RotateCcw size={15} />
          {local(locale, "Sıfırla", "Reset")}
        </button>
      </div>
      {show && (
        <div className="readiness-result" role="status">
          <h3>
            {checked.length === 7
              ? local(
                  locale,
                  "İlk hazırlık başlıklarını tamamladınız.",
                  "You have covered the initial preparation topics.",
                )
              : local(
                  locale,
                  "Görüşmemiz için bir başlangıç noktamız var.",
                  "We have a starting point for a conversation.",
                )}
          </h3>
          <p>
            {local(
              locale,
              "Henüz tamamlamadığınız alanlar:",
              "Areas still to work through:",
            )}
          </p>
          {checked.length < 7 ? (
            <ul>
              {list
                .filter((_, i) => !checked.includes(i))
                .map((x) => (
                  <li key={x}>{x}</li>
                ))}
            </ul>
          ) : (
            <p>
              {local(
                locale,
                "Bir sonraki adım, bilgilerinizi yetkili uzmanlarla doğrulamak ve ürüne özel bir araştırma planı oluşturmak.",
                "Next, verify your information with qualified specialists and create a product-specific research plan.",
              )}
            </p>
          )}
          <Link className="text-link" href={href(locale, "iletisim")}>
            {local(
              locale,
              "Birlikte değerlendirelim",
              "Let’s review it together",
            )}
            <ArrowRight size={16} />
          </Link>
        </div>
      )}
      <p className="fine-print">
        {local(
          locale,
          "Bu araç resmî uygunluk değerlendirmesi, sertifika veya ticari başarı garantisi değildir. İşaretleriniz yalnızca bu tarayıcıda saklanır.",
          "This tool is not an official compliance assessment, certificate or guarantee of commercial success. Selections are stored only in this browser.",
        )}
      </p>
    </div>
  );
}
export function ContactForm({
  locale,
  defaultService = "",
  enabled,
  localMode,
}: {
  locale: Locale;
  defaultService?: string;
  enabled: boolean;
  localMode: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [startedAt, setStartedAt] = useState(0);
  const [preference, setPreference] = useState("email");
  useEffect(() => setStartedAt(Date.now()), []);
  const services =
    locale === "tr"
      ? [
          "Kenya İhracat Danışmanlığı",
          "Distribütör ve İş Ortağı Bulma",
          "Yerel Temsil ve Saha Ziyaretleri",
          "Pazar Araştırması",
          "Şirket Kuruluşu",
          "Yatırım Koordinasyonu",
          "Yaşam ve Seyahat",
          "Kenya’dan Tedarik",
          "Diğer",
        ]
      : [
          "Export Consulting",
          "Distributor & Partner Search",
          "Local Representation & Field Visits",
          "Market Research",
          "Company Formation",
          "Investment Coordination",
          "Living & Travel",
          "Sourcing from Kenya",
          "Other",
        ];
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setBusy(true);
    const f = new FormData(e.currentTarget);
    const body = {
      ...Object.fromEntries(f),
      consent: f.get("consent") === "on",
      locale,
      startedAt,
    };
    try {
      const r = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error);
      setSuccess(data.id);
    } catch (e) {
      setError(
        (e as Error).message ||
          local(
            locale,
            "Bağlantı kurulamadı. Tekrar deneyin.",
            "Connection failed. Please try again.",
          ),
      );
    } finally {
      setBusy(false);
    }
  }
  if (success)
    return (
      <div className="form-success" role="status">
        <CheckCircle2 size={45} />
        <h2>
          {local(
            locale,
            "Talebiniz kaydedildi.",
            "Your enquiry has been saved.",
          )}
        </h2>
        <p>
          {local(
            locale,
            "Paylaştığınız bilgileri inceleyerek iletişim tercihinize göre size ulaşacağız. Bu, kesinleşmiş bir toplantı rezervasyonu değildir.",
            "We will review your information and respond using your preferred contact method. This is not a confirmed meeting booking.",
          )}
        </p>
        <span>
          {local(locale, "Talep numarası", "Reference")}: {success.slice(0, 12)}
        </span>
        <Link className="text-link" href={href(locale)}>
          {local(locale, "Ana sayfaya dön", "Back to home")}
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-heading">
        <span className="eyebrow">
          {local(locale, "ÖN GÖRÜŞME TALEBİ", "INTRODUCTORY ENQUIRY")}
        </span>
        <h2>{local(locale, "Hedefinizi dinleyelim.", "Tell us your goal.")}</h2>
        <p>
          {local(
            locale,
            "İhtiyacınızı kısaca anlatın. Birlikte ilk adımı belirleyelim.",
            "Briefly describe what you need. Let’s identify the first step together.",
          )}
        </p>
      </div>
      {localMode && (
        <p className="notice">
          {local(
            locale,
            "Yerel geliştirme ortamı: başvurular bu bilgisayarda kaydedilir.",
            "Local development: enquiries are saved on this computer.",
          )}
        </p>
      )}
      {!enabled && (
        <p className="notice">
          {local(
            locale,
            "Başvuru alımı, iletişim ve gizlilik yapılandırması tamamlandığında açılacak.",
            "Enquiries will open once contact and privacy configuration is complete.",
          )}
        </p>
      )}
      <fieldset disabled={!enabled || busy}>
        <div className="form-grid">
          <label>
            {local(locale, "Ad Soyad", "Full name")} *
            <input
              name="name"
              required
              minLength={2}
              maxLength={100}
              autoComplete="name"
              placeholder={local(
                locale,
                "Adınız ve soyadınız",
                "Your full name",
              )}
            />
          </label>
          <label>
            {local(locale, "Şirket Adı", "Company")}
            <input
              name="company"
              maxLength={180}
              autoComplete="organization"
              placeholder={local(locale, "Şirketiniz", "Your company")}
            />
          </label>
          <label>
            {local(locale, "E-posta", "Email")} *
            <input
              name="email"
              type="email"
              required
              maxLength={180}
              autoComplete="email"
              placeholder="siz@sirketiniz.com"
            />
          </label>
          <label>
            {local(locale, "Telefon", "Phone")}
            <input
              name="phone"
              type="tel"
              required={preference !== "email"}
              minLength={preference !== "email" ? 7 : undefined}
              maxLength={30}
              autoComplete="tel"
              placeholder="+90 …"
            />
          </label>
          <label>
            {local(locale, "Ülke", "Country")} *
            <input
              name="country"
              required
              defaultValue={locale === "tr" ? "Türkiye" : ""}
              autoComplete="country-name"
              maxLength={80}
            />
          </label>
          <label>
            {local(locale, "İlgilendiğiniz Hizmet", "Service of interest")} *
            <select name="service" required defaultValue={defaultService}>
              <option value="" disabled>
                {local(locale, "Bir hizmet seçin", "Select a service")}
              </option>
              {defaultService && !services.includes(defaultService) && (
                <option>{defaultService}</option>
              )}
              {services.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label>
            {local(locale, "Sektör", "Sector")}
            <input
              name="sector"
              maxLength={100}
              placeholder={local(
                locale,
                "Örn. inşaat malzemeleri",
                "e.g. construction materials",
              )}
            />
          </label>
          <label>
            {local(locale, "İletişim Tercihi", "Contact preference")} *
            <select
              name="preference"
              value={preference}
              onChange={(e) => setPreference(e.target.value)}
            >
              <option value="email">{local(locale, "E-posta", "Email")}</option>
              <option value="phone">{local(locale, "Telefon", "Phone")}</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </label>
          <label className="full-width">
            {local(locale, "Nasıl destek olabiliriz?", "How can we help?")} *
            <textarea
              name="message"
              rows={5}
              required
              minLength={20}
              maxLength={5000}
              placeholder={local(
                locale,
                "Ürününüz, hedefiniz ve ihtiyaç duyduğunuz destek hakkında birkaç cümle…",
                "A few words about your product, goal and the support you need…",
              )}
            />
            <small>
              {local(
                locale,
                "En az 20 karakter. Lütfen hassas kişisel bilgi paylaşmayın.",
                "At least 20 characters. Please avoid sensitive personal information.",
              )}
            </small>
          </label>
        </div>
        <div className="honeypot" aria-hidden="true">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <label className="consent">
          <input name="consent" type="checkbox" required />
          <span>
            <Link
              href={href(locale, "kisisel-verilerin-korunmasi")}
              target="_blank"
            >
              {local(
                locale,
                "Kişisel verilerin korunması bilgilendirmesini",
                "Personal data protection notice",
              )}
            </Link>{" "}
            {local(
              locale,
              "okudum. Talebimin değerlendirilmesi için bu bilgilerle benimle iletişime geçilmesini istiyorum.",
              "has been read. I request contact using these details to assess my enquiry.",
            )}{" "}
            *
          </span>
        </label>
        <Button className="form-submit" type="submit" disabled={busy}>
          {busy ? (
            <Loader2 className="spinner" size={18} />
          ) : (
            <Send size={17} />
          )}{" "}
          {local(
            locale,
            busy ? "Gönderiliyor…" : "Ön Görüşme Talebini Gönder",
            busy ? "Sending…" : "Send introductory enquiry",
          )}
          <ArrowRight size={18} />
        </Button>
      </fieldset>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <p className="fine-print">
        {local(
          locale,
          "Ücretsiz ön görüşme talebidir. Gönderim bir hizmet sözleşmesi veya takvim rezervasyonu oluşturmaz.",
          "This is a request for a free introductory conversation. Submission does not create a service contract or calendar booking.",
        )}
      </p>
    </form>
  );
}
