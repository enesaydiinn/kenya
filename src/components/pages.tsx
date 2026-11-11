import { contentFAQ } from "@/lib/faq";
import { defaultSettings } from "@/lib/content";
import { whatsappHref } from "@/lib/contact";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Check,
  CheckCheck,
  Compass,
  Globe2,
  Handshake,
  Search,
  Building2,
  Truck,
  Ship,
  MessageSquare,
  Mail,
  Phone,
  FileText,
  MoveUpRight,
  ShieldCheck,
  Waypoints,
  Plane,
  ChartNoAxesCombined,
  BriefcaseBusiness,
} from "lucide-react";
import type { Content, Locale, Settings } from "@/lib/types";
import { href, local, typePath, dateLabel } from "@/lib/i18n";
import { ContactForm, ContentExplorer, Readiness } from "./interactive";
import { databaseConfigured, localEnabled } from "@/lib/store";
const icons = [
  Ship,
  Handshake,
  MapPin,
  ChartNoAxesCombined,
  Building2,
  BriefcaseBusiness,
  Plane,
];
const linkFor = (locale: Locale, c: Content) =>
  href(locale, `${typePath[c.type]}/${c.slug}`);
const defaultPortrait = defaultSettings.founderImage;
export function SectionTitle({
  eyebrow,
  title,
  text,
  locale,
  link,
  label,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  locale: Locale;
  link?: string;
  label?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">
          <span />
          {eyebrow}
        </span>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {link && (
        <Link className="text-link" href={href(locale, link)}>
          {label || local(locale, "Tümünü keşfedin", "Explore all")}
          <ArrowUpRight size={19} />
        </Link>
      )}
    </div>
  );
}
export function ServiceGrid({
  locale,
  services,
  all = false,
}: {
  locale: Locale;
  services: Content[];
  all?: boolean;
}) {
  return (
    <div className="service-grid">
      {services
        .filter((c) => all || c.slug !== "yatirim-danismanligi")
        .map((c) => {
          const idx = services.findIndex((s) => s.id === c.id);
          const Icon = icons[idx % icons.length];
          return (
            <Link
              key={c.id}
              href={linkFor(locale, c)}
              className={`service-card ${c.slug === "yerel-temsilcilik" ? "featured" : ""}`}
            >
              <div className="service-card-top">
                <span className="icon-tile">
                  <Icon size={25} strokeWidth={1.5} />
                </span>
                {c.slug === "yerel-temsilcilik" && (
                  <span className="service-tag">
                    {local(locale, "SAHADAKİ GÜCÜNÜZ", "YOUR LOCAL PRESENCE")}
                  </span>
                )}
                <ArrowUpRight className="service-arrow" size={22} />
              </div>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
              <span className="service-more">
                {local(locale, "Hizmeti incele", "Explore service")}
                <ArrowRight size={15} />
              </span>
            </Link>
          );
        })}
    </div>
  );
}
export function Process({ locale }: { locale: Locale }) {
  const steps =
    locale === "tr"
      ? [
          [
            "İhtiyacınızı anlıyoruz",
            "Hedefinizi, ürününüzü ve Kenya’dan beklentinizi birlikte netleştiriyoruz.",
          ],
          [
            "Kenya’da araştırıyoruz",
            "İhtiyacınıza uygun firmaları, yerel koşulları ve iletişim kanallarını inceliyoruz.",
          ],
          [
            "Doğru kişilerle görüşüyoruz",
            "İzinli temas kuruyor, randevuları ve yüz yüze görüşmeleri koordine ediyoruz.",
          ],
          [
            "Raporluyor ve takip ediyoruz",
            "Bulguları, görüşme notlarını ve sonraki adımları şeffafça paylaşıyoruz.",
          ],
        ]
      : [
          [
            "We understand your needs",
            "We clarify your objectives, product and expectations for Kenya together.",
          ],
          [
            "We research in Kenya",
            "We examine relevant companies, local conditions and communication channels.",
          ],
          [
            "We meet the right people",
            "We make permitted contact and coordinate appointments and in-person meetings.",
          ],
          [
            "We report and follow up",
            "We share findings, meeting notes and next steps transparently.",
          ],
        ];
  return (
    <div className="process-grid">
      {steps.map(([title, text], i) => (
        <div className="process-step" key={title}>
          <span className="process-number">
            0{i + 1}
            <ArrowRight size={19} />
          </span>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
}
export function CTA({ locale }: { locale: Locale }) {
  return (
    <section className="container cta-section">
      <div>
        <span className="eyebrow">
          {local(
            locale,
            "BİR MESAJLA BAŞLAYALIM",
            "LET’S START WITH A CONVERSATION",
          )}
        </span>
        <h2>
          {local(
            locale,
            "Kenya’daki ilk görüşmenizi\nbirlikte planlayalım.",
            "Let’s plan your first\nconversation in Kenya.",
          )}
        </h2>
        <p>
          {local(
            locale,
            "Hedefinizi anlatın. Size nasıl destek olabileceğimizi konuşalım.",
            "Tell us your goal. Let’s discuss how we can support you.",
          )}
        </p>
      </div>
      <Link href={whatsappHref(locale)} className="button button-cream">
        {local(
          locale,
          "Ücretsiz Ön Görüşme Talep Et",
          "Request a free conversation",
        )}
        <ArrowUpRight size={20} />
      </Link>
      <div className="cta-decoration" aria-hidden="true">
        ↗
      </div>
    </section>
  );
}
export function FAQ({
  locale,
  service = false,
  content,
}: {
  locale: Locale;
  service?: boolean;
  content?: Content;
}) {
  if (content) {
    const qa = contentFAQ(content, locale);
    return (
      <div className="faq-list">
        {qa.map(({ question, answer }) => (
          <details key={question}>
            <summary>
              {question}
              <span>+</span>
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    );
  }
  const qa =
    locale === "tr"
      ? [
          [
            service
              ? "Hizmetin kapsamı ve ücreti nasıl belirleniyor?"
              : "İlk görüşmede ne konuşacağız?",
            "Hedefinizi, ürününüzü veya ihtiyaç duyduğunuz yerel desteği konuşuruz. Araştırma kapsamı, teslim edilecek çıktılar, takvim ve ücret için ön görüşme sonrasında yazılı teklif hazırlanır.",
          ],
          [
            "Firma görüşmesi veya ticari sonuç garantisi veriyor musunuz?",
            "Hayır. İlgili tarafın onayıyla temas ve görüşme organize etmeye çalışırız. Erişim, toplantı, satış, tahsilat veya yatırım sonucu garantisi verilmez. Sonuç alınamayan adımlar da raporlanır.",
          ],
          [
            "Türkiye’den süreci takip edebilir miyim?",
            "İletişim ve raporlama sıklığını başlangıçta birlikte belirleriz. Mutabık kalınan kapsamda firma araştırması, görüşme notları ve sonraki adımlar Türkçe veya İngilizce paylaşılır.",
          ],
          [
            "Hukuk, vergi ve gümrük işlemlerini siz mi yapıyorsunuz?",
            "Lisans veya uzmanlık gerektiren hizmetler yetkili yerel uzmanlarca sağlanır. Kenya Danışmanlık ihtiyaçların belirlenmesine, uzmanlara yönlendirmeye ve sürecin koordinasyonuna destek olur.",
          ],
          [
            "Seyahat veya ikamet başvurum kesin onaylanır mı?",
            "Hayır. Giriş, eTA, vize, ikamet ve çalışma izinleri ilgili makamların kararına bağlıdır. Resmî kaynaklara yönlendirme ve hazırlık desteği sunulur.",
          ],
        ]
      : [
          [
            service
              ? "How are the scope and fee agreed?"
              : "What happens in the introductory conversation?",
            "We discuss your objective, product or need for local support. A written proposal sets out scope, deliverables, timeline and fees after the introductory conversation.",
          ],
          [
            "Do you guarantee meetings or commercial outcomes?",
            "No. We try to establish contact and arrange meetings with the other party’s consent. Access, meetings, sales, payment recovery and investment outcomes are not guaranteed. Unsuccessful steps are also reported.",
          ],
          [
            "Can I follow the process from Türkiye?",
            "We agree communication and reporting frequency at the start. Within the agreed scope, company research, meeting notes and next steps are shared in Turkish or English.",
          ],
          [
            "Do you provide legal, tax and customs services?",
            "Services requiring a licence or specialist qualification are provided by authorized local professionals. Kenya Danışmanlık helps identify needs, connect you with specialists and coordinate the process.",
          ],
          [
            "Are travel or residence approvals guaranteed?",
            "No. Entry, eTA, visas, residence and work permissions are subject to decisions by the relevant authorities. We provide official resource referrals and preparation support.",
          ],
        ];
  return (
    <div className="faq-list">
      {qa.map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <span>+</span>
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
function PersonalIntroduction({
  locale,
  settings,
}: {
  locale: Locale;
  settings: Settings;
}) {
  const name = settings.founderName || defaultSettings.founderName;
  return (
    <section
      className="container personal-section"
      aria-labelledby="personal-heading"
    >
      <figure className="personal-portrait">
        <div className="personal-photo">
          <Image
            src={settings.founderImage || defaultPortrait}
            alt={local(locale, `${name} — Danışman`, `${name} — Consultant`)}
            fill
            sizes="(max-width: 760px) 100vw, (max-width: 1100px) 42vw, 460px"
          />
        </div>
        <figcaption>
          <span className="status-dot" aria-hidden="true" />
          <div>
            <strong>{name}</strong>
            <span>
              {local(
                locale,
                "Danışman · Kenya genelinde",
                "Consultant · Across Kenya",
              )}
            </span>
          </div>
          <span className="personal-country" aria-hidden="true">TR ↔ KE</span>
        </figcaption>
      </figure>
      <div className="personal-copy">
        <span className="eyebrow">
          {local(
            locale,
            "BİRLİKTE ÇALIŞMADAN ÖNCE",
            "BEFORE WE WORK TOGETHER",
          )}
        </span>
        <h2 id="personal-heading">
          {local(
            locale,
            "Tanışalım.\nKenya’da yanınızdayız.",
            "Let’s meet.\nWe’re here in Kenya.",
          )}
        </h2>
        <p className="personal-lead">
          {local(
            locale,
            "Türkiye’den Kenya’ya uzanan sürecinizde, yerel bağlantınız olalım.",
            "Let us be your local connection as you take your business from Türkiye to Kenya.",
          )}
        </p>
        <p>
          {local(
            locale,
            "İlk adım, sizi ve işinizi tanımak. İhtiyacınızı dinliyor; araştırılacak konuları, sahadaki adımları ve çalışma takvimini birlikte netleştiriyoruz. Gelişmeleri doğrudan iletişim ve düzenli raporlarla sizinle paylaşıyoruz.",
            "The first step is getting to know you and your business. We listen, then agree what to research, the steps on the ground and a timeline. Direct communication and regular reports keep you informed along the way.",
          )}
        </p>
        <div className="personal-details">
          <span>
            <MapPin size={19} strokeWidth={1.6} />
            {local(locale, "Kenya genelinde saha desteği", "On-the-ground support across Kenya")}
          </span>
          <span>
            <MessageSquare size={19} strokeWidth={1.6} />
            {local(locale, "Türkçe ve İngilizce iletişim", "Turkish and English communication")}
          </span>
        </div>
        <div className="personal-actions">
          <Link className="button" href={whatsappHref(locale)}>
            {local(locale, "Tanışalım", "Let’s talk")}
            <ArrowUpRight size={18} />
          </Link>
          <Link className="text-link" href={href(locale, "hakkimizda")}>
            {local(locale, "Hikâyemizi okuyun", "Read our story")}
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}
export function Home({
  locale,
  content,
  settings,
}: {
  locale: Locale;
  content: Content[];
  settings: Settings;
}) {
  const services = content.filter((c) => c.type === "service");
  const blogs = content.filter((c) => c.type === "blog").slice(0, 3);
  const strengths =
    locale === "tr"
      ? [
          "Kenya’da fiziksel olarak bulunma",
          "Afrika ülkelerinde saha deneyimi",
          "Türkçe ve İngilizce iletişim",
          "İzinli, yüz yüze firma ziyaretleri",
          "İhtiyaca özel çalışma kapsamı",
          "Şeffaf süreç ve düzenli raporlama",
        ]
      : [
          "Physically present in Kenya",
          "Field experience across Africa",
          "Turkish and English communication",
          "In-person company visits with permission",
          "Scope tailored to your needs",
          "Clear processes and regular reporting",
        ];
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow">
            <span />
            {local(
              locale,
              "TÜRKİYE & KENYA ARASINDAKİ YEREL BAĞLANTINIZ",
              "YOUR LOCAL CONNECTION BETWEEN TÜRKİYE & KENYA",
            )}
          </span>
          <h1>
            {(locale === "tr" ? settings.heroTitle : settings.heroTitleEn) || (
              <>
                {local(
                  locale,
                  "Kenya’da iş yapmak,",
                  "Doing business in Kenya,",
                )}
                <br />
                <em>{local(locale, "artık daha kolay.", "made easier.")}</em>
              </>
            )}
          </h1>
          <p className="hero-description">
            {(locale === "tr"
              ? settings.heroDescription
              : settings.heroDescriptionEn) ||
              local(
                locale,
                "Kenya’ya ihracat yapmak, iş ortakları bulmak veya yatırım fırsatlarını değerlendirmek istiyorsunuz. Biz Kenya’dayız; sizin adınıza iletişim kuruyor, sahada araştırıyor ve süreçlerinizi yakından takip ediyoruz.",
                "Looking to export to Kenya, find business partners or explore an investment? We are here in Kenya, making contact on your behalf, researching on the ground and following your progress closely.",
              )}
          </p>
          <div className="hero-actions">
            <Link className="button" href={whatsappHref(locale)}>
              {local(
                locale,
                "Ücretsiz Ön Görüşme",
                "Free introductory conversation",
              )}
              <ArrowUpRight size={19} />
            </Link>
            <Link className="hero-secondary" href="#hizmetler">
              {local(locale, "Hizmetleri keşfedin", "Explore our services")}
              <ArrowRight size={17} />
            </Link>
          </div>
          <div className="hero-trust">
            <span>
              <MapPin size={16} />
              {local(
                locale,
                "Kenya’da yerel temsil",
                "Local presence in Kenya",
              )}
            </span>
            <span>
              <MessageSquare size={16} />
              {local(locale, "Türkçe & İngilizce", "Turkish & English")}
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image">
            <Image
              src="/images/nairobi.webp"
              alt={local(
                locale,
                "Nairobi’nin modern iş merkezleri ve şehir silüeti",
                "Nairobi’s modern business district and city skyline",
              )}
              fill
              priority
              sizes="(max-width: 760px) 100vw, 52vw"
            />
            <div className="image-shade" />
            <div className="image-location">
              <span className="status-dot" />
              NAIROBI, KENYA<span>1°17′S 36°49′E</span>
            </div>
            <div className="image-caption">
              <span>
                {local(locale, "İŞİNİZİN YENİ ADRESİNE,", "A NEW MARKET,")}
                <br />
                {local(locale, "YERİNDEN BİR BAKIŞ.", "A LOCAL PERSPECTIVE.")}
              </span>
            </div>
          </div>
          <span className="hero-sun" aria-hidden="true">
            ✳
          </span>
          <div className="hero-note">
            <span className="note-icon">
              <Waypoints size={25} />
            </span>
            <div>
              <strong>
                {local(
                  locale,
                  "Mesafeleri birlikte aşalım.",
                  "Let’s bridge the distance.",
                )}
              </strong>
              <span>
                {local(
                  locale,
                  "Siz planlayın. Biz sahada olalım.",
                  "You plan. We are on the ground.",
                )}
              </span>
            </div>
            <ArrowUpRight size={23} />
          </div>
        </div>
      </section>
      <div className="container bridge-strip">
        <span className="bridge-label">
          {local(
            locale,
            "BİR PAZARDAN FAZLASI.\nYEREL BİR BAĞLANTI.",
            "MORE THAN A MARKET.\nA LOCAL CONNECTION.",
          )}
        </span>
        <div>
          <Globe2 size={23} />
          <span>
            {local(locale, "Türkiye ↔ Kenya", "Türkiye ↔ Kenya")}
            <small>
              {local(
                locale,
                "Kültürler arasında iletişim",
                "Communication across cultures",
              )}
            </small>
          </span>
        </div>
        <div>
          <MapPin size={23} />
          <span>
            {local(locale, "Kenya genelinde", "Across Kenya")}
            <small>
              {local(
                locale,
                "Yerinde araştırma ve takip",
                "On-site research and follow-up",
              )}
            </small>
          </span>
        </div>
        <div>
          <FileText size={23} />
          <span>
            {local(
              locale,
              "Açık ve şeffaf süreç",
              "Clear and transparent process",
            )}
            <small>
              {local(
                locale,
                "Her adımda bilgi ve raporlama",
                "Updates and reporting at every step",
              )}
            </small>
          </span>
        </div>
      </div>
      <PersonalIntroduction locale={locale} settings={settings} />
      <section className="container journey-section">
        <div className="journey-intro">
          <span className="eyebrow">
            {local(
              locale,
              "NEREDEN BAŞLAMAK İSTERSİNİZ?",
              "WHERE WOULD YOU LIKE TO START?",
            )}
          </span>
          <h2>
            {local(
              locale,
              "Hedefiniz ne olursa olsun,\nilk adımı birlikte atalım.",
              "Whatever your goal,\nlet’s take the first step together.",
            )}
          </h2>
        </div>
        <div className="journey-options">
          {[
            [
              "hizmetler/kenya-ihracat-danismanligi",
              "Ticaret yapmak istiyorum",
              "I want to trade",
              "İhracat, distribütör ve yerel temsil",
              "Exports, distribution and local representation",
              Ship,
            ],
            [
              "hizmetler/yatirim-danismanligi",
              "Yatırım yapmak istiyorum",
              "I want to invest",
              "Şirket kuruluşu ve operasyon koordinasyonu",
              "Company formation and operations",
              Building2,
            ],
            [
              "hizmetler/yasam-ve-seyahat",
              "Kenya’ya gitmek istiyorum",
              "I want to visit Kenya",
              "İş seyahati, yaşam ve yerel rehberlik",
              "Business travel, living and local guidance",
              Compass,
            ],
          ].map(([p, tr, en, sub, subEn, Icon]) => {
            const I = Icon as typeof Ship;
            return (
              <Link key={p as string} href={href(locale, p as string)}>
                <I size={25} strokeWidth={1.5} />
                <div>
                  <strong>{local(locale, tr as string, en as string)}</strong>
                  <span>{local(locale, sub as string, subEn as string)}</span>
                </div>
                <ArrowUpRight size={20} />
              </Link>
            );
          })}
        </div>
      </section>
      <section id="hizmetler" className="services-section">
        <div className="container">
          <SectionTitle
            locale={locale}
            eyebrow={local(
              locale,
              "UZMANLIK ALANLARIMIZ",
              "HOW WE SUPPORT YOU",
            )}
            title={local(
              locale,
              "Kenya’da, işinizin her adımında.",
              "By your side, on the ground in Kenya.",
            )}
            text={local(
              locale,
              "İlk temasın kurulmasından yerel süreçlerin takibine, ihtiyacınıza göre şekillenen danışmanlık.",
              "From first contact to local follow-up, consulting shaped around what you need.",
            )}
            link="hizmetler"
            label={local(locale, "Tüm hizmetlerimiz", "All our services")}
          />
          <ServiceGrid locale={locale} services={services} />
        </div>
      </section>
      <section className="container local-section">
        <div className="local-picture">
          <Image
            src="/images/logistics.webp"
            alt={local(
              locale,
              "Ticari lojistik operasyonlarında konteyner taşımacılığı",
              "Container shipping in commercial logistics",
            )}
            fill
            sizes="(max-width: 760px) 100vw, 45vw"
          />
          <span className="photo-label">
            {local(
              locale,
              "YEREL TEMAS. SOMUT TAKİP.",
              "LOCAL CONTACT. CLEAR FOLLOW-UP.",
            )}
          </span>
          <div className="picture-inset">
            <MapPin size={22} />
            <span>
              {local(locale, "Biz Kenya’dayız.", "We are in Kenya.")}
              <small>
                {local(
                  locale,
                  "İşinizin olduğu yerde.",
                  "Where your business needs us.",
                )}
              </small>
            </span>
          </div>
        </div>
        <div className="local-copy">
          <span className="eyebrow">
            {local(locale, "MESAFENİN ÖTESİNDE", "BEYOND THE DISTANCE")}
          </span>
          <h2>
            {local(
              locale,
              "Bazen en zor adım,\ndoğru kişiye ulaşmaktır.",
              "Sometimes the hardest step\nis reaching the right person.",
            )}
          </h2>
          <p>
            {local(
              locale,
              "Yanıtsız kalan bir e-posta. Ulaşılamayan bir şirket. Uzaktan takip etmesi güç bir süreç. Kenya’da iş yapmanın bu tarafını da biliyoruz.",
              "An unanswered email. A company you cannot reach. A process that is difficult to follow remotely. We understand this side of doing business in Kenya.",
            )}
          </p>
          <div className="problem-tags">
            {(locale === "tr"
              ? [
                  "Yanıtsız e-postalar",
                  "Distribütör arayışı",
                  "Yerel iş kültürü",
                  "Uzaktan süreç takibi",
                  "Tedarikçi değerlendirmesi",
                  "Telefonla ulaşamama",
                ]
              : [
                  "Unanswered emails",
                  "Distributor search",
                  "Local business culture",
                  "Remote follow-up",
                  "Supplier assessment",
                  "Unanswered calls",
                ]
            ).map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <p className="local-answer">
            {local(
              locale,
              "Sizin adınıza iletişim kuruyor, şirket ziyaretlerini organize ediyor ve gelişmeleri sahadan raporluyoruz.",
              "We make contact on your behalf, organize company visits and report developments from the ground.",
            )}
          </p>
          <Link
            className="text-link"
            href={href(locale, "hizmetler/yerel-temsilcilik")}
          >
            {local(
              locale,
              "Yerel temsil hizmetimizi tanıyın",
              "Explore local representation",
            )}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="process-section">
        <div className="container">
          <SectionTitle
            locale={locale}
            eyebrow={local(locale, "NASIL ÇALIŞIYORUZ?", "HOW WE WORK")}
            title={local(
              locale,
              "Net bir plan. Birlikte atılan adımlar.",
              "A clear plan. Steps taken together.",
            )}
          />
          <Process locale={locale} />
        </div>
      </section>
      <section className="container why-section">
        <div>
          <span className="eyebrow">
            {local(
              locale,
              "NEDEN KENYA DANIŞMANLIK?",
              "WHY KENYA DANIŞMANLIK?",
            )}
          </span>
          <h2>
            {local(
              locale,
              "Yereli tanıyoruz.\nSizi anlıyoruz.",
              "We know the local context.\nWe understand you.",
            )}
          </h2>
          <p>
            {local(
              locale,
              "Afrika ülkelerinde insani yardım çalışmalarıyla edinilen saha deneyimi ve Kenya’da yaşamın içinden gelen bir bakış. Türk iş insanları ile yerel şirketler arasında anlaşılır, ulaşılabilir bir iletişim köprüsü.",
              "Field experience gained through humanitarian work across Africa, combined with a perspective shaped by living in Kenya. A clear, approachable communication bridge between Turkish businesses and local companies.",
            )}
          </p>
          <Link className="text-link" href={href(locale, "hakkimizda")}>
            {local(locale, "Hikâyemizi tanıyın", "Discover our story")}
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="strengths-list">
          {strengths.map((s, i) => (
            <div key={s}>
              <span>0{i + 1}</span>
              <strong>{s}</strong>
              <Check size={18} />
            </div>
          ))}
        </div>
      </section>
      <section className="opportunity-section">
        <div className="container opportunity-inner">
          <div>
            <span className="eyebrow">
              {local(locale, "BÖLGEYİ TANIYIN", "UNDERSTAND THE REGION")}
            </span>
            <h2>
              {local(
                locale,
                "Doğu Afrika’ya açılan\nbir ticaret bağlantısı.",
                "A trading connection\nto East Africa.",
              )}
            </h2>
            <p>
              {local(
                locale,
                "Nairobi’de iş bağlantıları, Mombasa’da liman ve lojistik altyapısı. Kenya pazarını ürününüz, sektörünüz ve yerel koşullar özelinde birlikte değerlendirelim.",
                "Business connections in Nairobi, port and logistics infrastructure in Mombasa. Let’s assess Kenya for your product, sector and local conditions.",
              )}
            </p>
            <Link href={href(locale, "kenya-rehberi")} className="text-link">
              {local(
                locale,
                "Kenya Rehberi’ni keşfedin",
                "Explore the Kenya Guide",
              )}
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="route-card">
            <span>TÜRKİYE</span>
            <div className="route-line">
              <span />
              <i />
              <Ship size={28} />
              <i />
              <span />
            </div>
            <span>KENYA</span>
            <div className="route-cities">
              <span>
                <MapPin size={14} />
                Nairobi
                <small>
                  {local(
                    locale,
                    "İş bağlantıları & yerel operasyon",
                    "Business connections & operations",
                  )}
                </small>
              </span>
              <span>
                <MapPin size={14} />
                Mombasa
                <small>
                  {local(
                    locale,
                    "Liman & lojistik bağlantıları",
                    "Port & logistics connections",
                  )}
                </small>
              </span>
            </div>
          </div>
        </div>
        <div className="container source-note">
          {local(
            locale,
            "Bölgesel lojistik için kaynak:",
            "Source for regional logistics:",
          )}{" "}
          <a
            href="https://investmombasa.go.ke/logistics-hub/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mombasa Investment Corporation ↗
          </a>
        </div>
      </section>
      <section className="container insights-section">
        <SectionTitle
          locale={locale}
          eyebrow={local(locale, "BİLGİYLE BAŞLAYIN", "START WITH KNOWLEDGE")}
          title={local(
            locale,
            "Kenya’yı daha yakından tanıyın.",
            "Get to know Kenya better.",
          )}
          link="blog"
          label={local(locale, "Tüm içgörüler", "All insights")}
        />
        <div className="insights-grid">
          {blogs.map((c, i) => (
            <Link href={linkFor(locale, c)} key={c.id} className="insight-card">
              <div className={`insight-art art-${i}`}>
                {i === 0 ? (
                  <Handshake size={64} strokeWidth={1} />
                ) : i === 1 ? (
                  <MessageSquare size={64} strokeWidth={1} />
                ) : (
                  <MapPin size={64} strokeWidth={1} />
                )}
                <span>
                  0{i + 1} / {local(locale, "SAHA NOTLARI", "FIELD NOTES")}
                </span>
                <ArrowUpRight size={26} />
              </div>
              <span className="card-category">
                {local(locale, "İŞ YAPMA REHBERİ", "BUSINESS GUIDE")} ·{" "}
                {local(
                  locale,
                  `${Math.max(
                    1,
                    Math.ceil(
                      c.body
                        .map((s) => s.text)
                        .join(" ")
                        .split(/\s+/).length / 180,
                    ),
                  )} dk okuma`,
                  `${Math.max(
                    1,
                    Math.ceil(
                      c.body
                        .map((s) => s.text)
                        .join(" ")
                        .split(/\s+/).length / 180,
                    ),
                  )} min read`,
                )}
              </span>
              <h3>{c.title}</h3>
              <span className="text-link">
                {local(locale, "Yazıyı okuyun", "Read article")}
                <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="container readiness-banner">
        <span className="icon-tile">
          <CheckCheck size={31} />
        </span>
        <div>
          <span className="eyebrow">
            {local(locale, "İHRACATA HAZIR MISINIZ?", "READY TO EXPORT?")}
          </span>
          <h2>
            {local(
              locale,
              "İlk adımınızı bir kontrol listesiyle netleştirin.",
              "Clarify your first step with a checklist.",
            )}
          </h2>
        </div>
        <Link href={href(locale, "ihracata-hazirlik")} className="text-link">
          {local(locale, "Hazırlığımı değerlendir", "Assess my preparation")}
          <ArrowRight size={19} />
        </Link>
      </section>
      <section className="container home-faq">
        <SectionTitle
          locale={locale}
          eyebrow={local(locale, "AKLINIZDAKİ SORULAR", "YOUR QUESTIONS")}
          title={local(locale, "Başlamadan önce.", "Before we begin.")}
          link="sikca-sorulan-sorular"
          label={local(locale, "Tüm sorular", "All questions")}
        />
        <FAQ locale={locale} />
      </section>
      <CTA locale={locale} />
    </>
  );
}
export function Breadcrumb({
  locale,
  title,
  parent,
}: {
  locale: Locale;
  title: string;
  parent?: { title: string; path: string };
}) {
  return (
    <nav
      className="breadcrumb"
      aria-label={local(locale, "Sayfa yolu", "Breadcrumb")}
    >
      <Link href={href(locale)}>{local(locale, "Ana Sayfa", "Home")}</Link>
      <span>/</span>
      {parent && (
        <>
          <Link href={href(locale, parent.path)}>{parent.title}</Link>
          <span>/</span>
        </>
      )}
      <span aria-current="page">{title}</span>
    </nav>
  );
}
export function PageIntro({
  locale,
  title,
  text,
  eyebrow,
}: {
  locale: Locale;
  title: string;
  text: string;
  eyebrow: string;
}) {
  return (
    <section className="page-intro container">
      <Breadcrumb locale={locale} title={title} />
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}
export function Listing({
  locale,
  type,
  content,
}: {
  locale: Locale;
  type: Content["type"];
  content: Content[];
}) {
  const names = {
    service: local(locale, "Hizmetlerimiz", "Our services"),
    guide: local(locale, "Kenya Rehberi", "Kenya Guide"),
    sector: local(locale, "Sektörler", "Sectors"),
    blog: local(locale, "İçgörüler & Saha Notları", "Insights & Field Notes"),
  };
  const desc = {
    service: local(
      locale,
      "Ticaretin ilk temasından yerel operasyonların takibine, Kenya’da ihtiyacınıza göre şekillenen destek.",
      "From first commercial contact to local operations, support shaped around your needs in Kenya.",
    ),
    guide: local(
      locale,
      "Ticaret, yatırım ve günlük yaşam için pratik başlangıç noktaları. Kontrol listeleri ve resmî kaynaklarla hazırlanın.",
      "Practical starting points for business, investment and daily life. Prepare with checklists and official resources.",
    ),
    sector: local(
      locale,
      "Ürününüz için doğru sorularla başlayın. Sektöre özel araştırma kapsamını, alıcı profillerini ve kontrol edilmesi gerekenleri inceleyin.",
      "Start with the right questions for your product. Explore sector-specific research scopes, buyer profiles and checks.",
    ),
    blog: local(
      locale,
      "Doğru soruları sormak, yereli anlamak ve daha hazırlıklı karar vermek için yazılar.",
      "Articles to help you ask better questions, understand the local context and make more informed decisions.",
    ),
  };
  return (
    <>
      <PageIntro
        locale={locale}
        title={names[type]}
        text={desc[type]}
        eyebrow={local(
          locale,
          "KENYA’YA YERİNDEN BAKIŞ",
          "KENYA, FROM THE GROUND",
        )}
      />
      <section className="container listing-section">
        {type === "service" ? (
          <ServiceGrid locale={locale} services={content} all />
        ) : (
          <ContentExplorer locale={locale} items={content} />
        )}
      </section>
      {type === "guide" && (
        <section className="container readiness-banner">
          <FileText size={35} />
          <div>
            <h2>
              {local(
                locale,
                "Kenya Ticaret Rehberi",
                "Kenya Trade Preparation Guide",
              )}
            </h2>
            <p>
              {local(
                locale,
                "İhracat öncesi belgeler, iletişim, distribütör seçimi ve risk kontrolü.",
                "Pre-export documents, communication, distributor selection and risk checks.",
              )}
            </p>
          </div>
          <Link
            className="text-link"
            href={href(locale, "kenya-ticaret-rehberi")}
          >
            {local(locale, "Rehberi aç", "Open guide")}
            <ArrowRight size={18} />
          </Link>
        </section>
      )}
      <CTA locale={locale} />
    </>
  );
}
export function Detail({
  locale,
  content: c,
}: {
  locale: Locale;
  content: Content;
}) {
  const tr = locale === "tr";
  const parent = {
    title:
      c.type === "service"
        ? local(locale, "Hizmetlerimiz", "Our services")
        : c.type === "sector"
          ? local(locale, "Sektörler", "Sectors")
          : c.type === "blog"
            ? local(locale, "İçgörüler", "Insights")
            : local(locale, "Kenya Rehberi", "Kenya Guide"),
    path: typePath[c.type],
  };
  return (
    <>
      <section className="detail-hero">
        <div className="container">
          <Breadcrumb locale={locale} title={c.title} parent={parent} />
          <span className="eyebrow">
            {c.type === "service"
              ? local(
                  locale,
                  "KENYA’DA YEREL DESTEĞİNİZ",
                  "YOUR LOCAL SUPPORT IN KENYA",
                )
              : parent.title.toLocaleUpperCase(locale)}
          </span>
          <h1>{c.title}</h1>
          <p>{c.description}</p>
          {c.type === "service" ? (
            <Link
              href={whatsappHref(locale, c.title)}
              className="button"
            >
              {local(
                locale,
                "Bu hizmeti konuşalım",
                "Let’s discuss this service",
              )}
              <ArrowUpRight size={19} />
            </Link>
          ) : (
            <div className="article-byline">
              <span>{c.author}</span>
              <span>{dateLabel(c.updatedAt, locale)}</span>
            </div>
          )}
        </div>
      </section>
      <div className="container article-layout">
        <article className="article-body">
          {c.image && (
            <div className="article-image">
              <Image src={c.image} width={1000} height={550} alt={c.title} />
            </div>
          )}
          {c.body.map((s, i) => (
            <section id={`bolum-${i}`} key={i}>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
              {s.items && (
                <ul className="check-list">
                  {s.items.map((x) => (
                    <li key={x}>
                      <Check size={17} />
                      {x}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          {c.sources.length > 0 && (
            <section className="sources-box">
              <h2>
                {local(
                  locale,
                  "Resmî kaynaklar & son kontrol",
                  "Official sources & last check",
                )}
              </h2>
              <p>
                {local(locale, "Son kaynak kontrolü:", "Sources last checked:")}{" "}
                {c.reviewedAt ? dateLabel(c.reviewedAt, locale) : "—"}.{" "}
                {local(
                  locale,
                  "İşlem tarihinde güncel koşulları ilgili kurumdan teyit edin.",
                  "Confirm current requirements with the authority at the time of action.",
                )}
              </p>
              <ul>
                {c.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer">
                      {s.title}
                      <ArrowUpRight size={14} />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <section>
            <h2>
              {local(
                locale,
                "Sıkça sorulan sorular",
                "Frequently asked questions",
              )}
            </h2>
            <FAQ locale={locale} service={c.type === "service"} content={c} />
          </section>
        </article>
        <aside className="article-sidebar">
          <div className="sidebar-sticky">
            <span className="eyebrow">
              {local(locale, "BU SAYFADA", "ON THIS PAGE")}
            </span>
            <nav>
              {c.body.map((s, i) => (
                <a key={i} href={`#bolum-${i}`}>
                  {s.title}
                  <ArrowRight size={14} />
                </a>
              ))}
            </nav>
            <div className="sidebar-cta">
              <MapPin size={28} />
              <h3>
                {local(
                  locale,
                  "Kenya’da bir yerel bağlantınız olsun.",
                  "Have a local connection in Kenya.",
                )}
              </h3>
              <p>
                {local(
                  locale,
                  "İhtiyacınızı birlikte değerlendirelim.",
                  "Let’s review your needs together.",
                )}
              </p>
              <Link href={whatsappHref(locale)} className="button">
                {local(locale, "Ön Görüşme Talep Et", "Request a conversation")}
                <ArrowUpRight size={17} />
              </Link>
            </div>
            <Link
              className="text-link"
              href={href(locale, "ihracata-hazirlik")}
            >
              {local(
                locale,
                "İhracata hazırlık kontrol listesi",
                "Export readiness checklist",
              )}
              <ArrowRight size={16} />
            </Link>
          </div>
        </aside>
      </div>
      <CTA locale={locale} />
    </>
  );
}
export function About({
  locale,
  settings,
}: {
  locale: Locale;
  settings: Settings;
}) {
  const name = settings.founderName || defaultSettings.founderName;
  const bio = locale === "tr" ? settings.founderBio : settings.founderBioEn;
  return (
    <>
      <PageIntro
        locale={locale}
        title={local(
          locale,
          "Yereli tanıyan bir bağlantı.",
          "A connection that knows the local context.",
        )}
        text={local(
          locale,
          "Türkiye’deki hedefiniz ile Kenya’daki gerçek hayat arasında bir iletişim köprüsü.",
          "A communication bridge between your objectives in Türkiye and everyday realities in Kenya.",
        )}
        eyebrow={local(
          locale,
          "KENYA DANIŞMANLIK HAKKINDA",
          "ABOUT KENYA DANIŞMANLIK",
        )}
      />
      <section className="container about-grid">
        <div className="about-image">
          <Image
            src={settings.founderImage || defaultPortrait}
            fill
            sizes="(max-width:760px) 100vw, 45vw"
            alt={local(locale, `${name} — Danışman`, `${name} — Consultant`)}
          />
          <span>
            {name} · {local(locale, "Danışman", "Consultant")}
          </span>
        </div>
        <div className="article-body">
          <span className="eyebrow">
            {local(locale, "KENYA’DAKİ DANIŞMANINIZ", "YOUR CONSULTANT IN KENYA")}
          </span>
          <h2>
            {name}
          </h2>
          <p>
            {bio ||
              local(
                locale,
                "Kenya Danışmanlık’ın arkasında, uzun yıllar Afrika ülkelerinde insani yardım kuruluşlarıyla çalışmış ve bugün Kenya’da yaşayan bir danışmanın saha deneyimi var. Farklı ülkelerde ve kültürlerde çalışmak, yerel iletişimin ve yüz yüze temasın değerini bu yaklaşımın merkezine yerleştirdi.",
                "Kenya Danışmanlık is built on the field experience of a consultant who has worked with humanitarian organizations across Africa for many years and now lives in Kenya. Working across countries and cultures placed local communication and in-person contact at the heart of this approach.",
              )}
          </p>
          <p>
            {local(
              locale,
              "Akıcı İngilizce ve Türkçe iletişimle, Türkiye’deki iş insanlarının Kenya’daki şirketlerle doğru soruları konuşmasına ve süreçlerini yerinde takip etmesine destek oluyoruz. İhtiyacı dinleyerek başlıyor; yapabileceklerimizi, kapsamın sınırlarını ve raporlama biçimini birlikte netleştiriyoruz.",
              "Through fluent English and Turkish communication, we help businesses in Türkiye ask the right questions of Kenyan companies and follow local processes. We start by listening and agree what we can do, the limits of the scope and how we will report.",
            )}
          </p>
          <h2>
            {local(
              locale,
              "Nasıl bir çalışma ilişkisi?",
              "What kind of working relationship?",
            )}
          </h2>
          <ul className="check-list">
            {(locale === "tr"
              ? [
                  "Açıkça tanımlanmış ihtiyaç ve kapsam",
                  "İzinli iletişim ve yetkilendirme",
                  "Bulgularla birlikte belirsizliklerin paylaşılması",
                  "Gerçekçi beklentiler ve yazılı takip",
                ]
              : [
                  "Clearly defined needs and scope",
                  "Permitted communication and authorization",
                  "Uncertainty reported alongside findings",
                  "Realistic expectations and written follow-up",
                ]
            ).map((x) => (
              <li key={x}>
                <Check size={17} />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="container story-notice">
        <ShieldCheck size={25} />
        <div>
          <h2>
            {local(
              locale,
              "Gerçek deneyimler, izinli paylaşımlar.",
              "Real experiences, shared with permission.",
            )}
          </h2>
          <p>
            {local(
              locale,
              "Saha hikâyeleri, ilgili tarafların izinleri ve doğrulanmış bilgilerle bu alanda paylaşılacak. Henüz yayımlanmış bir vaka çalışması bulunmuyor.",
              "Field stories will be shared here with the relevant permissions and verified information. No case studies have been published yet.",
            )}
          </p>
        </div>
      </section>
      <CTA locale={locale} />
    </>
  );
}
export function Contact({
  locale,
  settings,
  service,
}: {
  locale: Locale;
  settings: Settings;
  service: string;
}) {
  const enabled =
    databaseConfigured() && (settings.legalApproved || localEnabled());
  return (
    <>
      <PageIntro
        locale={locale}
        title={local(
          locale,
          "Kenya’daki ilk adımı\nbirlikte atalım.",
          "Let’s take your first step\nin Kenya together.",
        )}
        text={local(
          locale,
          "Bir ürün, bir yatırım fikri veya ulaşmak istediğiniz bir şirket. Nereden başlamak istediğinizi anlatın.",
          "A product, an investment idea or a company you want to reach. Tell us where you would like to start.",
        )}
        eyebrow={local(locale, "İLETİŞİM", "CONTACT")}
      />
      <section className="container contact-layout">
        <div className="contact-aside">
          <span className="eyebrow">
            {local(locale, "KENYA’DA, YANINIZDAYIZ", "BY YOUR SIDE IN KENYA")}
          </span>
          <h2>
            {local(
              locale,
              "Önce ihtiyacınızı\nanlayalım.",
              "Let’s understand\nwhat you need.",
            )}
          </h2>
          <p>
            {local(
              locale,
              "Formu doldurduktan sonra talebinizi inceleyecek, kapsamı ve ilk adımları değerlendirmek için sizinle iletişime geçeceğiz.",
              "After you submit the form, we will review your enquiry and contact you to discuss scope and first steps.",
            )}
          </p>
          <div className="contact-points">
            <div>
              <MapPin size={21} />
              <span>
                Kenya
                <small>
                  {settings.address ||
                    local(locale, "Kenya genelinde hizmet", "Serving all of Kenya")}
                </small>
              </span>
            </div>
            {settings.email && (
              <a href={`mailto:${settings.email}`}>
                <Mail size={21} />
                <span>{settings.email}</span>
              </a>
            )}
            {settings.phone && (
              <a href={`tel:${settings.phone}`}>
                <Phone size={21} />
                <span>{settings.phone}</span>
              </a>
            )}
            <div>
              <MessageSquare size={21} />
              <span>
                {local(locale, "Türkçe & İngilizce", "Turkish & English")}
                <small>
                  {local(
                    locale,
                    "Tercih ettiğiniz dilde iletişim",
                    "Communication in your preferred language",
                  )}
                </small>
              </span>
            </div>
          </div>
          {settings.calendarUrl && (
            <a
              className="text-link"
              href={settings.calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {local(
                locale,
                "Takvimde uygun saatleri görün",
                "View available times",
              )}
              <ArrowUpRight size={18} />
            </a>
          )}
          <div className="contact-note">
            <ShieldCheck size={22} />
            <p>
              {local(
                locale,
                "İlk görüşme talebi ücretsizdir. Çalışma kapsamı ve ücret, ihtiyaçlarınız netleştikten sonra ayrıca belirlenir.",
                "The introductory enquiry is free. Scope and fees are agreed separately after your needs are clarified.",
              )}
            </p>
          </div>
        </div>
        <ContactForm
          locale={locale}
          defaultService={service}
          enabled={enabled}
          localMode={localEnabled()}
        />
      </section>
    </>
  );
}
export function ChecklistPage({ locale }: { locale: Locale }) {
  return (
    <>
      <PageIntro
        locale={locale}
        title={local(
          locale,
          "Kenya’ya ihracata\nne kadar hazırsınız?",
          "How ready are you\nto export to Kenya?",
        )}
        text={local(
          locale,
          "Tamamladığınız hazırlık adımlarını işaretleyin. Bir sonraki görüşmede odaklanmanız gereken alanları görün.",
          "Check the preparation steps you have completed. See which areas to focus on in your next conversation.",
        )}
        eyebrow={local(
          locale,
          "İHRACATA HAZIRLIK KONTROL LİSTESİ",
          "EXPORT READINESS CHECKLIST",
        )}
      />
      <section className="container narrow-section">
        <Readiness locale={locale} />
      </section>
      <CTA locale={locale} />
    </>
  );
}
export function Legal({
  locale,
  kind,
  settings,
}: {
  locale: Locale;
  kind: string;
  settings: Settings;
}) {
  const isCookies = kind === "cerez-politikasi";
  const title = isCookies
    ? local(locale, "Çerez Politikası", "Cookie Policy")
    : kind === "gizlilik-politikasi"
      ? local(locale, "Gizlilik Politikası", "Privacy Policy")
      : local(
          locale,
          "Kişisel Verilerin Korunması",
          "Personal Data Protection",
        );
  return (
    <>
      <PageIntro
        locale={locale}
        title={title}
        text={local(
          locale,
          "Verileriniz ve bu sitedeki tercihleriniz hakkında bilgilendirme.",
          "Information about your data and preferences on this website.",
        )}
        eyebrow={local(locale, "BİLGİLENDİRME", "INFORMATION")}
      />
      <article className="container legal-content article-body">
        {!settings.legalApproved && (
          <p className="notice">
            {local(
              locale,
              "Taslak — uzman incelemesi ve veri sorumlusu bilgileri bekleniyor. Bu metin nihai hukuki bilgilendirme değildir.",
              "Draft — awaiting professional review and data controller details. This is not a final legal notice.",
            )}
          </p>
        )}
        {isCookies ? (
          <>
            <h2>{local(locale, "Kullanılan depolama", "Storage used")}</h2>
            <p>
              {local(
                locale,
                "Ziyaretçiler için analiz veya reklam çerezi kullanılmaz. Yönetici oturumu için HttpOnly ve SameSite özellikli, 8 saat süreli zorunlu bir oturum çerezi kullanılır. İhracata hazırlık aracı işaretlerinizi yalnızca tarayıcınızın localStorage alanında saklar; bunu araçtaki Sıfırla düğmesiyle temizleyebilirsiniz.",
                "No analytics or advertising cookies are used for visitors. Admin sign-in uses an essential HttpOnly, SameSite session cookie lasting eight hours. The readiness tool stores your selections only in browser localStorage; use its Reset button to clear them.",
              )}
            </p>
            <p>
              {local(
                locale,
                "Analiz araçları eklenirse gerekli bilgilendirme ve tercih mekanizmaları yayından önce ayrıca uygulanmalıdır.",
                "If analytics tools are added, appropriate notices and preference controls must be implemented before activation.",
              )}
            </p>
          </>
        ) : (
          <>
            {(
              locale === "tr" ? settings.privacyText : settings.privacyTextEn
            ) ? (
              <p className="preserve-lines">
                {locale === "tr"
                  ? settings.privacyText
                  : settings.privacyTextEn}
              </p>
            ) : (
              <>
                <h2>
                  {local(
                    locale,
                    "Başvuru sırasında paylaşılan bilgiler",
                    "Information shared in an enquiry",
                  )}
                </h2>
                <p>
                  {local(
                    locale,
                    "Form; ad, şirket, e-posta, telefon, ülke, hizmet, sektör, talep açıklaması ve iletişim tercihini içerir. Telefon, telefon veya WhatsApp ile yanıt istediğinizde gereklidir. Bu bilgiler talebin değerlendirilmesi ve sizinle iletişim kurulması amacıyla toplanır. Hassas kişisel veri paylaşmayın.",
                    "The form includes name, company, email, phone, country, service, sector, description and contact preference. Phone is required when you request a phone or WhatsApp response. These details are collected to assess your enquiry and contact you. Please do not share sensitive personal data.",
                  )}
                </p>
                <h2>
                  {local(
                    locale,
                    "Yayımdan önce tamamlanacak alanlar",
                    "Information required before public launch",
                  )}
                </h2>
                <ul>
                  <li>
                    {local(
                      locale,
                      "Veri sorumlusunun kimliği ve hak başvuru kanalı",
                      "Data controller identity and rights request contact",
                    )}
                  </li>
                  <li>
                    {local(
                      locale,
                      "İşleme hukuki sebepleri, saklama süresi ve imha politikası",
                      "Legal grounds, retention periods and deletion policy",
                    )}
                  </li>
                  <li>
                    {local(
                      locale,
                      "Alıcı grupları, barındırma ve sınır ötesi veri aktarımı koşulları",
                      "Recipients, hosting and cross-border transfer arrangements",
                    )}
                  </li>
                  <li>
                    {local(
                      locale,
                      "Türkiye KVKK ve Kenya veri koruma yükümlülükleri için uzman incelemesi",
                      "Professional review of Turkish and Kenyan data protection obligations",
                    )}
                  </li>
                </ul>
                <p>
                  {local(
                    locale,
                    "Bu bilgiler tamamlanıp yönetim panelinde onaylanana kadar halka açık üretim başvuruları kapalı tutulur. Yerel geliştirme kayıtları test amaçlıdır.",
                    "Public production enquiries remain closed until this information is completed and approved in the admin panel. Local development records are for testing.",
                  )}
                </p>
              </>
            )}
          </>
        )}
      </article>
    </>
  );
}
export function Sourcing({ locale }: { locale: Locale }) {
  return (
    <>
      <PageIntro
        locale={locale}
        title={local(
          locale,
          "Kenya’dan tedarik.\nYerinden araştırma.",
          "Sourcing from Kenya.\nResearch on the ground.",
        )}
        text={local(
          locale,
          "Kenya’da üretici veya tedarikçi arayan Türk şirketleri için yerel iletişim ve araştırma desteği.",
          "Local communication and research support for Turkish businesses seeking producers or suppliers in Kenya.",
        )}
        eyebrow={local(
          locale,
          "KENYA’DAN TÜRKİYE’YE TİCARET",
          "TRADE FROM KENYA TO TÜRKİYE",
        )}
      />
      <section className="container two-column-content">
        <article className="article-body">
          <h2>
            {local(
              locale,
              "Ürününüzden başlayalım.",
              "Let’s start with your product.",
            )}
          </h2>
          <p>
            {local(
              locale,
              "Kahve, çay, tarım ürünleri ve çiçekçilik gibi alanlar için üretici veya ihracatçı araştırması yapılabilir. Bunlar kesinleşmiş fırsat veya hazır tedarikçi taahhüdü değildir. Ürün uygunluğu, kalite, sertifikasyon, Türkiye ithalat koşulları ve ticari şartlar ayrıca doğrulanır.",
              "Producer or exporter research can be carried out in areas such as coffee, tea, agricultural products and floriculture. These are not confirmed opportunities or promises of ready suppliers. Product suitability, quality, certification, Turkish import requirements and commercial terms require separate verification.",
            )}
          </p>
          <h2>{local(locale, "Hizmet kapsamı", "Service scope")}</h2>
          <ul className="check-list">
            {(locale === "tr"
              ? [
                  "Ürün ve teknik şartnameye göre tedarikçi araştırması",
                  "Üretici ve ihracatçı firmalarla izinli iletişim",
                  "Tedarikçi ziyareti ve görüşme koordinasyonu",
                  "Ürün ve numune koordinasyonu",
                  "İhracat ve ithalat uzmanlarına yönlendirme",
                  "Bulgular, açık sorular ve takip raporu",
                ]
              : [
                  "Supplier research based on product specifications",
                  "Permitted contact with producers and exporters",
                  "Supplier visits and meeting coordination",
                  "Product and sample coordination",
                  "Referrals to export and import specialists",
                  "Findings, open questions and follow-up report",
                ]
            ).map((x) => (
              <li key={x}>
                <Check size={17} />
                {x}
              </li>
            ))}
          </ul>
          <h2>
            {local(
              locale,
              "Numune ile siparişi ayırın.",
              "Distinguish samples from orders.",
            )}
          </h2>
          <p>
            {local(
              locale,
              "Numune değerlendirmesi seri üretim kalitesi, kapasite veya teslim garantisi değildir. Denetim, laboratuvar testi, sözleşme ve ödeme güvenliği için bağımsız uzman desteği alın.",
              "Sample evaluation is not a guarantee of production quality, capacity or delivery. Use independent specialist support for inspections, laboratory tests, contracts and payment security.",
            )}
          </p>
        </article>
        <div className="sidebar-cta">
          <Ship size={37} />
          <h2>
            {local(
              locale,
              "Aradığınız ürünü anlatın.",
              "Tell us what you are looking for.",
            )}
          </h2>
          <p>
            {local(
              locale,
              "Teknik özellikler, miktar, kalite beklentisi ve araştırma hedefinizle başlayalım.",
              "Start with specifications, quantities, quality expectations and research objectives.",
            )}
          </p>
          <Link className="button" href={whatsappHref(locale)}>
            {local(
              locale,
              "Tedarik araştırması talep et",
              "Discuss supplier research",
            )}
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
      <CTA locale={locale} />
    </>
  );
}
