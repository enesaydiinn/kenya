"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronDown,
  Menu,
  X,
  MapPin,
  Globe2,
  MessageCircle,
} from "lucide-react";
import { href, local } from "@/lib/i18n";
import { whatsappHref, WHATSAPP_DISPLAY_NUMBER } from "@/lib/contact";
import type { Locale, Settings } from "@/lib/types";
export function Logo({
  locale = "tr",
  light = false,
}: {
  locale?: Locale;
  light?: boolean;
}) {
  return (
    <Link
      href={href(locale)}
      className={`logo ${light ? "light" : ""}`}
      aria-label={local(
        locale,
        "Kenya Danışmanlık ana sayfa",
        "Kenya Danışmanlık home",
      )}
    >
      <span className="logo-symbol" aria-hidden="true">
        <svg viewBox="0 0 40 44" fill="none">
          <path
            d="M8 33V11l12-6 12 6v22l-12 6-12-6Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M14 29V15m0 8 11-8m-11 8 11 8"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path d="M30 4v7m-3-3h7" stroke="#C69A52" strokeWidth="1.5" />
        </svg>
      </span>
      <span>
        kenya<span className="logo-sub">DANIŞMANLIK</span>
      </span>
    </Link>
  );
}
export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [services, setServices] = useState(false);
  useEffect(() => {
    setMenu(false);
    setServices(false);
  }, [pathname]);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        setServices(false);
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);
  const switchPath =
    locale === "tr"
      ? pathname === "/"
        ? "/en"
        : "/en" + pathname
      : pathname.replace(/^\/en/, "") || "/";
  const links = [
    ["hakkimizda", "Hakkımızda", "About us"],
    ["kenya-rehberi", "Kenya Rehberi", "Kenya Guide"],
    ["sektorler", "Sektörler", "Sectors"],
    ["blog", "İçgörüler", "Insights"],
  ];
  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <span>
            <span className="status-dot" />
            {local(
              locale,
              "Türkiye’den Kenya’ya, yerel bir bakış.",
              "A local perspective, from Türkiye to Kenya.",
            )}
          </span>
          <span>
            <MapPin size={12} />
            {local(
              locale,
              "Kenya genelinde sahadayız",
              "On the ground across Kenya",
            )}
            <span className="top-separator" />
            TR ↔ KE
          </span>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Logo locale={locale} />
          <nav
            className={`main-nav ${menu ? "is-open" : ""}`}
            aria-label={local(locale, "Ana menü", "Main navigation")}
          >
            <div
              className="nav-dropdown"
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget))
                  setServices(false);
              }}
            >
              <button
                className="nav-link"
                onClick={() => setServices(!services)}
                aria-expanded={services}
                aria-controls="services-menu"
              >
                {local(locale, "Hizmetlerimiz", "Our services")}
                <ChevronDown size={13} />
              </button>
              {services && (
                <div id="services-menu" className="dropdown-panel">
                  <Link href={href(locale, "hizmetler")}>
                    {local(locale, "Tüm hizmetler", "All services")}
                    <ArrowRight size={15} />
                  </Link>
                  {[
                    [
                      "kenya-ihracat-danismanligi",
                      "İhracat danışmanlığı",
                      "Export consulting",
                    ],
                    [
                      "distributor-bulma",
                      "Distribütör bulma",
                      "Distributor search",
                    ],
                    [
                      "yerel-temsilcilik",
                      "Yerel temsil ve saha ziyaretleri",
                      "Local representation & field visits",
                    ],
                    [
                      "pazar-arastirmasi",
                      "Pazar araştırması",
                      "Market research",
                    ],
                    ["sirket-kurulusu", "Şirket kuruluşu", "Company formation"],
                    ["yasam-ve-seyahat", "Yaşam ve seyahat", "Living & travel"],
                  ].map(([slug, tr, en]) => (
                    <Link key={slug} href={href(locale, "hizmetler/" + slug)}>
                      {local(locale, tr, en)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {links.map(([path, tr, en]) => (
              <Link
                key={path}
                href={href(locale, path)}
                className={pathname.endsWith("/" + path) ? "active" : ""}
              >
                {local(locale, tr, en)}
              </Link>
            ))}
            <Link href={whatsappHref(locale)} className="mobile-contact">
              {local(locale, "İletişim", "Contact")}
            </Link>
          </nav>
          <div className="header-actions">
            <Link
              className="language-switch"
              href={switchPath}
              hrefLang={locale === "tr" ? "en" : "tr"}
              aria-label={
                locale === "tr" ? "Switch to English" : "Türkçeye geç"
              }
            >
              <Globe2 size={15} />
              {locale === "tr" ? "EN" : "TR"}
            </Link>
            <Link
              className="button button-small header-cta"
              href={whatsappHref(locale)}
            >
              {local(locale, "Birlikte Başlayalım", "Let’s get started")}
              <ArrowUpRight size={17} />
            </Link>
            <button
              className="menu-toggle"
              onClick={() => setMenu(!menu)}
              aria-label={local(
                locale,
                menu ? "Menüyü kapat" : "Menüyü aç",
                menu ? "Close menu" : "Open menu",
              )}
              aria-expanded={menu}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
export function WhatsApp({
  locale,
  number,
  service,
}: {
  locale: Locale;
  number: string;
  service?: string;
}) {
  return (
    <div className="whatsapp-wrap">
      <a
        className="whatsapp-button"
        aria-label={local(locale, "WhatsApp üzerinden bize ulaşın", "Contact us on WhatsApp")}
        href={whatsappHref(locale, service, number)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle size={23} />
        <span>{local(locale, "Bize ulaşın", "Get in touch")}</span>
      </a>
    </div>
  );
}
export function Footer({
  locale,
  settings,
}: {
  locale: Locale;
  settings: Settings;
}) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo locale={locale} light />
            <p>
              {local(
                locale,
                "Türkiye ile Kenya arasında, işinizin yerel bağlantısı.",
                "Your local business connection between Türkiye and Kenya.",
              )}
            </p>
            <span className="footer-location">
              <MapPin size={15} />
              {local(locale, "Kenya genelinde", "Across Kenya")}
            </span>
          </div>
          <div>
            <h3>{local(locale, "Keşfedin", "Explore")}</h3>
            {[
              ["hizmetler", "Hizmetlerimiz", "Our services"],
              ["sektorler", "Sektörler", "Sectors"],
              ["kenya-rehberi", "Kenya Rehberi", "Kenya Guide"],
              [
                "kenyadan-turkiyeye-ticaret",
                "Kenya’dan Türkiye’ye",
                "Sourcing from Kenya",
              ],
            ].map(([p, tr, en]) => (
              <Link key={p} href={p === "iletisim" ? whatsappHref(locale) : href(locale, p)}>
                {local(locale, tr, en)}
              </Link>
            ))}
          </div>
          <div>
            <h3>
              {local(locale, "Birlikte ilerleyelim", "Let’s move forward")}
            </h3>
            {[
              ["hakkimizda", "Hakkımızda", "About us"],
              [
                "ihracata-hazirlik",
                "İhracata hazırlık testi",
                "Export readiness checklist",
              ],
              [
                "sikca-sorulan-sorular",
                "Sıkça sorulan sorular",
                "Frequently asked questions",
              ],
              ["iletisim", "İletişim", "Contact"],
            ].map(([p, tr, en]) => (
              <Link key={p} href={p === "iletisim" ? whatsappHref(locale) : href(locale, p)}>
                {local(locale, tr, en)}
              </Link>
            ))}
          </div>
          <div>
            <h3>{local(locale, "İlk adımı atalım", "Take the first step")}</h3>
            <p>
              {local(
                locale,
                "Hedefinizi anlatın. Kenya’da nasıl destek olabileceğimizi birlikte değerlendirelim.",
                "Tell us your goal. Let’s discuss how we can support you in Kenya.",
              )}
            </p>
            <Link className="footer-cta" href={whatsappHref(locale)}>
              {local(locale, "Ön görüşme talep et", "Request a conversation")}
              <ArrowUpRight size={18} />
            </Link>
            <a href={whatsappHref(locale)}>{WHATSAPP_DISPLAY_NUMBER}</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Kenya Danışmanlık</span>
          <div>
            {[
              ["gizlilik-politikasi", "Gizlilik", "Privacy"],
              ["cerez-politikasi", "Çerezler", "Cookies"],
              [
                "kisisel-verilerin-korunmasi",
                "Kişisel verilerin korunması",
                "Personal data protection",
              ],
            ].map(([p, tr, en]) => (
              <Link key={p} href={href(locale, p)}>
                {local(locale, tr, en)}
              </Link>
            ))}
          </div>
          <span>Türkiye ↔ Kenya</span>
        </div>
      </div>
    </footer>
  );
}
