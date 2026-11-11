import type { Content, Locale, Settings, Section } from "./types";
export const sources = {
  kra: {
    title: "Kenya Revenue Authority — How to import",
    url: "https://www.kra.go.ke/individual/importing/learn-about-importation/how-to-import",
  },
  kebs: {
    title: "Kenya Bureau of Standards — PVoC",
    url: "https://inspection.kebs.go.ke/pvoc-services/",
  },
  invest: {
    title: "KenInvest — Investment Facilitation Portal",
    url: "https://eprocedures.investkenya.go.ke/",
  },
  eta: {
    title: "Kenya Immigration — eTA",
    url: "https://etakenya.go.ke/apply/exempt/help",
  },
  port: {
    title: "Mombasa Investment Corporation — Logistics hub",
    url: "https://investmombasa.go.ke/logistics-hub/",
  },
};
const date = "2026-11-11T09:00:00.000Z";
export const defaultSettings: Settings = {
  email: "",
  phone: "",
  whatsapp: "",
  address: "",
  founderName: "Ömer Faruk Arslan",
  founderBio: "",
  founderBioEn: "",
  founderImage: "/images/kenya-danismanlik-saha.webp",
  heroTitle: "",
  heroTitleEn: "",
  heroDescription: "",
  heroDescriptionEn: "",
  privacyText: "",
  privacyTextEn: "",
  legalApproved: false,
  calendarUrl: "",
};
const serviceData = [
  [
    "kenya-ihracat-danismanligi",
    "Kenya İhracat Danışmanlığı",
    "Export Consulting for Kenya",
    "Ürününüz için doğru pazar girişini birlikte planlayalım.",
    "Plan the right market entry for your product.",
    "Ürün ve sektör bazlı araştırma|Potansiyel ithalatçı ve distribütör belirleme|İlk ticari temas ve görüşme organizasyonu|Yerel firma ziyaretleri|Teklif iletişimi ve satış sonrası yerel destek|Lojistik ve gümrük uzmanlarıyla koordinasyon",
    "Product and sector research|Importer and distributor identification|Initial outreach and meeting coordination|Local company visits|Quotation follow-up and local communication|Coordination with logistics and customs specialists",
    "Ürün kataloğunuzu, HS kodunuzu, kapasitenizi ve hedef alıcı profilinizi değerlendiririz. Araştırma kapsamını birlikte belirler; aday şirketlerle izinli temas kurar, görüşme sonuçlarını ve bir sonraki adımları raporlarız.",
    "We review your catalogue, HS code, capacity and target buyer profile. We agree the research scope, approach candidate companies with permission, and report meeting outcomes and next steps.",
    "Ürün, fiyat, ödeme, teslim şekli ve uygunluk belgeleri birlikte değerlendirilmelidir. İhracat veya satış sonucu garanti edilmez. Gümrük işlemleri yetkili uzmanlarca yürütülür.",
    "Product, pricing, payment, delivery terms and conformity documentation must be assessed together. Sales or export outcomes are not guaranteed. Licensed specialists handle customs procedures.",
  ],
  [
    "distributor-bulma",
    "Kenya’da Distribütör ve İş Ortağı Bulma",
    "Distributor & Business Partner Search",
    "Bir firma listesiyle yetinmeyin. Doğru sorularla başlayın.",
    "Go beyond a list of names. Start with the right questions.",
    "Sektörel firma araştırması|Distribütör aday listesi|Firma ön değerlendirmesi|Randevu organizasyonu|Yüz yüze toplantılar|Görüşme raporları ve ticari eşleştirme|İletişim ve süreç takibi",
    "Sector-specific company research|Distributor shortlist|Initial company assessment|Appointment coordination|In-person meetings|Meeting reports and business matching|Communication follow-up",
    "İdeal distribütör profilini ürününüz, bölgeniz, kanalınız ve satış sonrası ihtiyacınıza göre oluştururuz. Adayların faaliyet alanı, ürün portföyü ve iş birliğine ilgisini görüşmelerle değerlendiririz.",
    "We define the distributor profile around your product, territory, channels and after-sales needs. We assess candidates through discussions about their operations, portfolio and interest in collaboration.",
    "Ön değerlendirme bir güvenilirlik garantisi veya hukuki inceleme değildir. Mali ve hukuki inceleme için bağımsız uzman desteği, ödeme ve sözleşme için ayrıca kontrol önerilir.",
    "An initial assessment is not a reliability guarantee or legal due diligence. Independent financial and legal review, payment checks and contract review should follow.",
  ],
  [
    "yerel-temsilcilik",
    "Yerel Temsil ve Saha Ziyaretleri",
    "Local Representation & Field Visits",
    "Siz Türkiye’de işinize odaklanın. Biz Kenya’da sahada olalım.",
    "Focus on your business in Türkiye. We will be on the ground in Kenya.",
    "Firma ve tedarikçi ziyaretleri|Saha görüşmeleri ve toplantı koordinasyonu|Yerel operasyon takibi|Numune teslimi koordinasyonu|İzinli fotoğraflı saha raporları|Fuar ve etkinlik temsili|Müşteri ilişkileri takibi",
    "Company and supplier visits|Field meetings and coordination|Local operations follow-up|Sample delivery coordination|Photo reports with permission|Trade fair representation|Customer relationship follow-up",
    "Örnek senaryo: Bir Türk üretici, potansiyel müşterisinden e-postasına yanıt alamıyor. Açık yetkilendirmesiyle şirketin iletişim kanallarını araştırır, ilgili tarafın onayıyla ziyaret veya görüşme organize etmeye çalışırız. Sonucu, yanıt alınamadığında da açıkça raporlarız.",
    "Illustrative scenario: a Turkish manufacturer receives no reply from a prospective customer. With explicit authorization, we research contact channels and try to arrange a visit or meeting with the other party’s consent. We report the outcome clearly, including when no response is received.",
    "Şirketlere erişim, toplantı, tahsilat veya ticari sonuç garanti edilmez. İzinsiz giriş, kişisel veri toplama veya yetki dışı temsil yapılmaz. Kapsam ve temsil sınırları yazılı olarak belirlenir.",
    "Company access, meetings, debt recovery and business outcomes are not guaranteed. We do not enter premises without permission, collect unauthorized personal data or act beyond the agreed mandate. Scope and representation limits are agreed in writing.",
  ],
  [
    "pazar-arastirmasi",
    "Kenya Pazar Araştırması",
    "Kenya Market Research",
    "Kararlarınızı varsayımlarla değil, açık sorular ve bulgularla şekillendirin.",
    "Build decisions around clear questions and findings.",
    "Sektör ve rekabet analizi|Fiyat ve dağıtım kanalı araştırması|Potansiyel müşteri segmentleri|Yerel satın alma alışkanlıkları|İthalat gerekliliklerine ön bakış|Fırsat ve risk değerlendirmesi|Yönetici özeti ve araştırma raporu",
    "Sector and competitor analysis|Price and distribution channel research|Potential customer segments|Local buying practices|Initial import requirements review|Opportunity and risk assessment|Executive summary and research report",
    "Araştırma sorusunu, coğrafyayı, örneklem sınırlarını ve teslim edilecek raporu başlangıçta netleştiririz. Açık kaynak taramasını izinli saha gözlemleri ve görüşmelerle destekler; kaynağı, tarihi ve belirsizliği bulgularla birlikte paylaşırız.",
    "We define the research question, geography, sample limitations and deliverables first. Desk research is supported by permitted field observations and interviews, with sources, dates and uncertainty included in the findings.",
    "Araştırma, belirli bir tarihte erişilebilen bilgiye dayanır. Görüşülen firmaların beyanları bağımsız doğrulama gerektirebilir; rapor gelecekteki talep veya kârlılık garantisi değildir.",
    "Research reflects information available at a particular date. Company statements may require independent verification; the report does not guarantee future demand or profitability.",
  ],
  [
    "sirket-kurulusu",
    "Şirket Kuruluşu Koordinasyonu",
    "Company Formation Coordination",
    "Yerel uzmanlarla doğru sırada ilerleyin.",
    "Move forward in the right order with local specialists.",
    "Şirket türleri hakkında genel bilgilendirme|Kuruluş sürecinin koordinasyonu|Yerel hukuk ve muhasebe uzmanlarına yönlendirme|Vergi ve kayıt adımlarının takibi|Ofis ve operasyon araştırması|Yerel iş ortaklarıyla görüşmeler",
    "General information about business structures|Formation process coordination|Referrals to legal and accounting specialists|Tax and registration coordination|Office and operations research|Meetings with local partners",
    "İş modelinizi, ortaklık yapınızı ve operasyon ihtiyacınızı görüşürüz. Yetkili hukuk ve muhasebe uzmanlarıyla değerlendirme yapmanız için süreci koordine eder; belge ve randevu takibini mutabık kalınan kapsamda destekleriz.",
    "We discuss your business model, ownership structure and operational needs. We coordinate assessment with qualified legal and accounting professionals and support document and appointment follow-up within the agreed scope.",
    "Hukuki, mali, vergi veya lisansa tabi hizmetler yalnız yetkili uzmanlarca sağlanır. Şirket kaydı ikamet veya çalışma hakkı anlamına gelmez. Güncel şartlar resmî kaynaklardan ayrıca doğrulanmalıdır.",
    "Legal, accounting, tax and other regulated services are provided only by qualified professionals. Company registration does not confer residence or work authorization. Current requirements must be checked with official sources.",
  ],
  [
    "yatirim-danismanligi",
    "Yatırım ve Operasyon Koordinasyonu",
    "Investment & Operations Coordination",
    "Yatırım fikrinizi yerel koşullarla birlikte değerlendirin.",
    "Evaluate your investment idea against local conditions.",
    "Ön ihtiyaç ve iş modeli değerlendirmesi|Yatırım fizibilite koordinasyonu|Yerel paydaşlarla görüşmeler|Konum ve ofis araştırması|Uzmanlara yönlendirme|Operasyon başlangıcı için takip planı",
    "Initial needs and business model assessment|Feasibility study coordination|Local stakeholder meetings|Location and office research|Specialist referrals|Operational launch follow-up plan",
    "Yatırım hedefinizi araştırılabilir sorulara dönüştürür; operasyon, tedarik, dağıtım ve uzman görüşmesi ihtiyaçlarını planlarız. Bulguları, bilinmeyenleri ve sonraki inceleme adımlarını ayrı ayrı raporlarız.",
    "We translate your investment objectives into research questions and plan operations, supply, distribution and specialist discussions. Findings, unknowns and further review steps are reported separately.",
    "Bu hizmet yatırım tavsiyesi, menkul kıymet aracılığı veya getiri taahhüdü içermez. Yatırım kararları bağımsız hukuki, mali ve teknik inceleme gerektirir.",
    "This service does not provide investment advice, securities intermediation or return commitments. Investment decisions require independent legal, financial and technical review.",
  ],
  [
    "yasam-ve-seyahat",
    "Kenya’da Yaşam ve Seyahat Danışmanlığı",
    "Living & Business Travel in Kenya",
    "İlk ziyaretinizden günlük yaşama, daha hazırlıklı bir başlangıç.",
    "A more informed start, from your first visit to daily life.",
    "İş seyahati planlama|Nairobi’de günlük yaşam|Konaklama ve ulaşım araştırması|Kültürel farklılıklar ve iletişim|Eğitim ve sağlık için genel kaynaklar|Vize ve ikamet için resmî yönlendirme",
    "Business travel planning|Everyday life in Nairobi|Accommodation and transport research|Cultural differences and communication|General education and healthcare resources|Official visa and residence resources",
    "Seyahat amacınızı, görüşme konumlarınızı ve günlük ihtiyaçlarınızı birlikte değerlendiririz. Ulaşım ve konaklama alternatiflerini araştırır; randevular, iletişim ve yerel yaşam için kişiye özel bir hazırlık planı oluştururuz.",
    "We consider your travel purpose, meeting locations and daily needs. We research transport and accommodation options and prepare a tailored plan for appointments, communication and local life.",
    "Rezervasyon, vize, eTA, ikamet veya çalışma izni sonucu garanti edilmez. Giriş ve izin koşulları kişisel duruma göre değişir. Sağlık ve güvenlik için yetkili kaynaklara başvurulmalıdır.",
    "Bookings, visas, eTA, residence and work permits are not guaranteed. Entry and permit requirements depend on individual circumstances. Consult qualified sources for health and safety decisions.",
  ],
];
const make = (
  locale: Locale,
  type: Content["type"],
  slug: string,
  title: string,
  description: string,
  body: Section[],
  status: Content["status"] = "published",
  refs: Content["sources"] = [],
): Content => ({
  id: `${locale}:${type}:${slug}`,
  locale,
  type,
  slug,
  title,
  description,
  body,
  status,
  sources: refs,
  author:
    locale === "tr"
      ? "Kenya Danışmanlık Editör Ekibi"
      : "Kenya Danışmanlık Editorial Team",
  reviewedAt: "2026-11-11",
  createdAt: date,
  updatedAt: date,
});
export const serviceSeeds = serviceData.flatMap((d) =>
  (["tr", "en"] as Locale[]).map((locale) => {
    const tr = locale === "tr";
    return make(
      locale,
      "service",
      d[0],
      d[tr ? 1 : 2],
      d[tr ? 3 : 4],
      [
        {
          title: tr ? "Size nasıl destek oluyoruz?" : "How we support you",
          text: d[tr ? 7 : 8],
        },
        {
          title: tr ? "Hizmet kapsamı" : "Service scope",
          text: tr
            ? "Kapsam, takvim ve teslim edilecek çıktılar ön görüşme sonrasında yazılı olarak belirlenir."
            : "Scope, timeline and deliverables are agreed in writing after an introductory discussion.",
          items: d[tr ? 5 : 6].split("|"),
        },
        {
          title: tr ? "Elinizde ne olacak?" : "What you receive",
          text: tr
            ? "Mutabık kalınan kapsamda araştırma bulguları, iletişim ve görüşme notları, açık kalan sorular ve önerilen takip adımlarını içeren bir rapor."
            : "A report within the agreed scope, including research findings, contact and meeting notes, open questions and suggested follow-up actions.",
        },
        {
          title: tr ? "Çalışmaya başlamadan önce" : "Before we start",
          text: d[tr ? 9 : 10],
        },
      ],
      "published",
      d[0] === "yasam-ve-seyahat"
        ? [sources.eta]
        : d[0] === "kenya-ihracat-danismanligi"
          ? [sources.kra, sources.kebs]
          : d[0].includes("kurulus") || d[0].includes("yatirim")
            ? [sources.invest]
            : [],
    );
  }),
);
const guideData = [
  [
    "kenya-hakkinda",
    "Kenya Hakkında",
    "About Kenya",
    "Şehir, iş hedefi ve yerel ihtiyaçlarınızı aynı plan içinde ele alın.",
    "Consider cities, business objectives and local needs together.",
    "Ziyaret amacınızı tanımlayın|Nairobi ve Mombasa’daki görüşmelerinizi ayrı planlayın|Yerel uzman ihtiyacınızı listeleyin",
    "Define the purpose of your visit|Plan Nairobi and Mombasa meetings separately|List the local specialists you need",
  ],
  [
    "kenya-ekonomisi",
    "Kenya Ekonomisi",
    "Kenya’s Economy",
    "Makro veriyi ürününüze ait gerçek alıcı araştırmasıyla birlikte değerlendirin.",
    "Combine macroeconomic context with research into actual buyers for your product.",
    "Verinin yılını ve kaynağını kontrol edin|Sektör ve ürün verisini ayırın|Kur ve ödeme riskini uzmanla görüşün",
    "Check the date and source of data|Separate sector and product data|Discuss exchange and payment risks with specialists",
  ],
  [
    "kenyada-ticaret",
    "Kenya’da Ticaret",
    "Trading in Kenya",
    "İlk temastan sözleşmeye kadar belgeli bir süreç kurun.",
    "Create a documented process from first contact to contract.",
    "Şirketin tüzel kişiliğini doğrulatın|Yetkili kişiyi ve karar sürecini sorun|Ödeme ve teslim şartlarını yazılı netleştirin",
    "Verify the legal entity independently|Ask about authority and decision-making|Clarify payment and delivery terms in writing",
  ],
  [
    "kenyaya-ihracat",
    "Kenya’ya İhracat",
    "Exporting to Kenya",
    "Ürün, alıcı, uygunluk ve teslim planını birlikte hazırlayın.",
    "Prepare your product, buyer, conformity and delivery plans together.",
    "HS kodunu uzmanla teyit edin|KRA ithalat akışını inceleyin|Ürün için KEBS kapsamını doğrulatın",
    "Confirm the HS code with a specialist|Review KRA import guidance|Check product-specific KEBS requirements",
  ],
  [
    "kenyada-sirket-kurmak",
    "Kenya’da Şirket Kurmak",
    "Starting a Company in Kenya",
    "Faaliyet modelinizi belirleyin; kayıt ve lisansları yetkili uzmanlarla değerlendirin.",
    "Define your operating model and review registrations and licences with qualified professionals.",
    "Ortaklık ve faaliyet yapısını hazırlayın|KenInvest prosedürlerini inceleyin|Hukuk ve muhasebe uzmanıyla belge listesi oluşturun",
    "Prepare ownership and activity details|Review KenInvest procedures|Build a document list with legal and accounting specialists",
  ],
  [
    "vergi-sistemi",
    "Kenya Vergi Sistemi",
    "Kenya Tax System",
    "Vergi yükümlülükleri faaliyet ve statüye göre değişir; oranlar için güncel uzman incelemesi gerekir.",
    "Tax obligations vary by activity and status; rates require current professional review.",
    "Faaliyet ve gelir türünü belirleyin|KRA kaynaklarını kontrol edin|Beyan takvimini yetkili danışmanla hazırlayın",
    "Identify activities and income types|Check KRA resources|Prepare a filing calendar with a qualified adviser",
  ],
  [
    "gumruk-islemleri",
    "Kenya Gümrük İşlemleri",
    "Kenya Customs Procedures",
    "Sevkiyattan önce ürün sınıflandırması ve belge kapsamını doğrulayın.",
    "Confirm classification and documentation before shipment.",
    "Ticari fatura ve ürün tanımını eşleştirin|Uygunluk kontrolünü sevkiyat öncesi yapın|Yetkili gümrük uzmanından yazılı teyit alın",
    "Match invoices with product descriptions|Check conformity before shipment|Obtain written confirmation from a customs specialist",
  ],
  [
    "kenyada-yatirim",
    "Kenya’da Yatırım",
    "Investing in Kenya",
    "Bir fırsat iddiasını doğrulanabilir bir inceleme planına dönüştürün.",
    "Turn an opportunity claim into a verifiable review plan.",
    "Sermaye ve işletme ihtiyaçlarını ayırın|Yerel maliyet teklifleri toplayın|Bağımsız fizibilite ve hukuki inceleme planlayın",
    "Separate capital and operating needs|Collect local quotations|Plan independent feasibility and legal review",
  ],
  [
    "nairobi-sehir-rehberi",
    "Nairobi Şehir Rehberi",
    "Nairobi City Guide",
    "İş ziyaretinizi toplantı konumları etrafında planlayın.",
    "Plan your business visit around meeting locations.",
    "Görüşme adreslerini önceden doğrulayın|Ulaşım için zaman payı bırakın|Konaklamayı günlük rotaya göre karşılaştırın",
    "Confirm meeting addresses beforehand|Allow extra time for transport|Compare accommodation against daily routes",
  ],
  [
    "mombasa-sehir-rehberi",
    "Mombasa Şehir Rehberi",
    "Mombasa City Guide",
    "Liman ve tedarikçi ziyaretlerini randevu ve erişim koşullarıyla birlikte planlayın.",
    "Plan port and supplier visits around appointments and access conditions.",
    "Liman ziyareti izinlerini sorun|Tedarikçi konumlarını doğrulayın|Nairobi bağlantısını lojistik uzmanıyla planlayın",
    "Check port visit permissions|Confirm supplier locations|Plan Nairobi connections with a logistics specialist",
  ],
  [
    "kenyada-yasam",
    "Kenya’da Yaşam",
    "Living in Kenya",
    "Günlük yaşam planınız çalışma, ulaşım ve konaklama ihtiyaçlarınızla başlamalı.",
    "Start your daily-life plan with work, transport and housing needs.",
    "Konaklama koşullarını yerinde inceleyin|Günlük ulaşım rotalarını deneyin|Resmî ikamet ve çalışma koşullarını teyit edin",
    "Inspect housing conditions in person|Test daily travel routes|Confirm official residence and work requirements",
  ],
  [
    "yasam-maliyetleri",
    "Kenya’da Yaşam Maliyetleri",
    "Cost of Living in Kenya",
    "Tek bir ortalama yerine kendi ihtiyaçlarınıza göre bütçe oluşturun.",
    "Build a needs-based budget rather than relying on one average.",
    "Kira ve depozitoyu ayrı yazın|Ulaşım ve hizmet ücretleri için tarihli teklif alın|Kur değişimi için bütçe payı ayırın",
    "Separate rent and deposit|Obtain dated transport and utility quotes|Allow for exchange rate changes",
  ],
  [
    "konaklama",
    "Kenya’da Konaklama",
    "Accommodation in Kenya",
    "Sözleşme, konum ve toplam maliyeti birlikte karşılaştırın.",
    "Compare contracts, location and total costs together.",
    "Mülkü ve yetkili kişiyi doğrulayın|Dahil olan hizmetleri yazılı isteyin|İptal ve depozito koşullarını inceleyin",
    "Verify the property and authorized contact|Request included services in writing|Review cancellation and deposit terms",
  ],
  [
    "ulasim",
    "Kenya’da Ulaşım",
    "Getting Around Kenya",
    "Mesafe kadar randevu saati ve güzergâh da önemlidir.",
    "Meeting times and routes matter as much as distance.",
    "Günlük güzergâhınızı haritalayın|Sağlayıcı ve araç bilgilerini doğrulayın|Alternatif ulaşım planı hazırlayın",
    "Map your daily routes|Verify provider and vehicle details|Prepare alternative transport arrangements",
  ],
  [
    "is-kulturu",
    "Kenya Kültürü ve İş Etiği",
    "Business Culture & Communication",
    "Açık gündem, doğru muhatap ve yazılı takip, iletişimi güçlendirir.",
    "Clear agendas, the right contact and written follow-up strengthen communication.",
    "Toplantı amacını kısa bir mesajla paylaşın|Karar verecek kişileri öğrenin|Görüşme sonrası aksiyonları teyit edin",
    "Share a concise meeting agenda|Identify decision-makers|Confirm action points after the meeting",
  ],
  [
    "seyahat",
    "Kenya’ya Seyahat",
    "Travelling to Kenya",
    "Seyahat kurallarını bilet almadan ve hareketten önce resmî kaynaklardan kontrol edin.",
    "Check official travel requirements before booking and before departure.",
    "eTA uygunluk ve istisnalarını kontrol edin|Pasaport ve izin durumunu teyit edin|Konaklama ve randevu bilgilerini hazırlayın",
    "Check eTA eligibility and exemptions|Confirm passport and permit requirements|Prepare accommodation and meeting details",
  ],
  [
    "guvenlik",
    "Kenya’da Güvenlik",
    "Safety Planning in Kenya",
    "Konuma ve tarihe uygun resmî seyahat duyurularını izleyin.",
    "Follow official travel advice relevant to your location and travel dates.",
    "Resmî seyahat duyurularını inceleyin|Yerel acil durum planınızı hazırlayın|Güzergâh ve toplantı adreslerini doğrulayın",
    "Review official travel advisories|Prepare a local emergency plan|Verify routes and meeting addresses",
  ],
  [
    "fuarlar",
    "Kenya’da Fuarlar ve Ticari Etkinlikler",
    "Trade Fairs & Business Events",
    "Etkinlik tarihi, organizatör ve katılımcı profilini doğrudan teyit edin.",
    "Confirm event dates, organizers and attendee profiles directly.",
    "Organizatörün resmî sitesini kontrol edin|Katılımcı ve alıcı profilini sorun|Toplantı ve temsil planını önceden oluşturun",
    "Check the organizer’s official website|Ask about exhibitors and buyer profiles|Plan meetings and representation in advance",
  ],
];
const guideSeeds = guideData.flatMap((d) =>
  (["tr", "en"] as Locale[]).map((locale) => {
    const tr = locale === "tr";
    const refs =
      d[0].includes("gumruk") || d[0].includes("ihracat")
        ? [sources.kra, sources.kebs]
        : d[0] === "mombasa-sehir-rehberi"
          ? [sources.port]
          : d[0] === "vergi-sistemi"
            ? [sources.kra]
            : ["seyahat", "kenyada-yasam", "guvenlik"].includes(d[0])
              ? [sources.eta]
              : [sources.invest];
    return make(
      locale,
      "guide",
      d[0],
      d[tr ? 1 : 2],
      d[tr ? 3 : 4],
      [
        {
          title: tr ? "Nereden başlamalı?" : "Where to start",
          text:
            d[tr ? 3 : 4] +
            " " +
            (tr
              ? "Bu rehber bir hazırlık çerçevesidir. Kişisel durumunuzu ve iş modelinizi ilgili uzmanlarla ayrıca değerlendirin."
              : "This guide is a preparation framework. Review your individual circumstances and business model with the relevant specialists."),
        },
        {
          title: tr
            ? "Hazırlık kontrol listeniz"
            : "Your preparation checklist",
          text: tr
            ? "Görüşmeden önce aşağıdaki başlıkları dosyanıza ekleyin."
            : "Add the following points to your file before your discussion.",
          items: d[tr ? 5 : 6].split("|"),
        },
        {
          title: tr ? "Örnek uygulama" : "An illustrative approach",
          text: tr
            ? "Bir iş ziyareti planlarken her başlık için sorumlu kişi, belge ve son kontrol tarihi belirleyin. Yanıtı henüz bilinmeyen soruları ayrı tutun; teyit edilmemiş bilgiyi kesin kabul ederek ödeme veya sevkiyat planlamayın."
            : "When planning a business visit, assign an owner, document and last-check date to each item. Keep unanswered questions separate; avoid planning payments or shipments based on unconfirmed information.",
        },
        {
          title: tr ? "Kaynakları nasıl kullanmalı?" : "How to use the sources",
          text: tr
            ? "Aşağıdaki resmî kaynaklar başlangıç noktasıdır. Ücret, süre, vergi, izin veya ürün bazlı yükümlülükler burada kesinleştirilmez. İşlem tarihinde ilgili kurumdan ve yetkili uzmandan güncel teyit alın."
            : "The official sources below are starting points. Fees, timelines, taxes, permissions and product-specific obligations are not finalized here. Obtain current confirmation from the authority and a qualified specialist at the time of action.",
        },
      ],
      "published",
      refs,
    );
  }),
);
const sectorData = [
  [
    "insaat-malzemeleri",
    "İnşaat Malzemeleri",
    "Construction Materials",
    "müteahhitler, yapı malzemesi toptancıları ve proje tedarikçileri",
    "contractors, building-material wholesalers and project suppliers",
    "teknik şartname, dayanım, ölçü ve proje teslim takvimi",
    "technical specifications, durability, dimensions and project schedules",
  ],
  [
    "mobilya-ve-ev-tekstili",
    "Mobilya ve Ev Tekstili",
    "Furniture & Home Textiles",
    "mobilya mağazaları, otel tedarikçileri ve iç mimarlık firmaları",
    "furniture retailers, hospitality suppliers and interior design firms",
    "ölçü, malzeme, kumaş, paketleme ve montaj desteği",
    "dimensions, materials, fabrics, packaging and assembly support",
  ],
  [
    "gida-ve-gida-isleme",
    "Gıda ve Gıda İşleme",
    "Food & Food Processing",
    "gıda ithalatçıları, perakende alıcıları ve işleme tesisleri",
    "food importers, retail buyers and processing facilities",
    "raf ömrü, etiket, saklama koşulları ve ürün izinleri",
    "shelf life, labels, storage conditions and product permits",
  ],
  [
    "tarim-makineleri",
    "Tarım Makineleri",
    "Agricultural Machinery",
    "makine distribütörleri, tarımsal işletmeler ve servis ağları",
    "machinery distributors, agricultural businesses and service networks",
    "arazi koşulları, operatör eğitimi, bakım ve yedek parça",
    "field conditions, operator training, maintenance and spare parts",
  ],
  [
    "endustriyel-makine",
    "Endüstriyel Makine ve Ekipmanlar",
    "Industrial Machinery & Equipment",
    "üretim tesisleri, teknik distribütörler ve sistem entegratörleri",
    "production plants, technical distributors and system integrators",
    "enerji ihtiyacı, kapasite, kurulum ve servis sürekliliği",
    "power requirements, capacity, installation and service continuity",
  ],
  [
    "elektrik-ve-elektronik",
    "Elektrik ve Elektronik",
    "Electrical & Electronics",
    "elektrik toptancıları, proje firmaları ve teknik bayiler",
    "electrical wholesalers, project firms and technical dealers",
    "ürün standardı, teknik uyumluluk, garanti ve servis",
    "product standards, technical compatibility, warranty and service",
  ],
  [
    "otomotiv-yedek-parca",
    "Otomotiv Yedek Parça",
    "Automotive Spare Parts",
    "parça ithalatçıları, toptancılar ve servis işletmeleri",
    "parts importers, wholesalers and workshops",
    "araç uyumu, ürün kodu, izlenebilirlik ve garanti",
    "vehicle compatibility, part numbers, traceability and warranty",
  ],
  [
    "saglik-ekipmanlari",
    "Sağlık Ekipmanları",
    "Healthcare Equipment",
    "yetkili sağlık ekipmanı distribütörleri ve kurumsal alıcılar",
    "authorized medical equipment distributors and institutional buyers",
    "ürün kaydı, yetkili ithalatçı, kalibrasyon ve teknik servis",
    "product registration, authorized importers, calibration and technical service",
  ],
  [
    "ambalaj-ve-plastik",
    "Ambalaj ve Plastik",
    "Packaging & Plastics",
    "ambalaj distribütörleri, üreticiler ve gıda işletmeleri",
    "packaging distributors, manufacturers and food businesses",
    "malzeme türü, kullanım amacı, geri dönüşüm ve ürün kısıtları",
    "material type, intended use, recyclability and product restrictions",
  ],
  [
    "tekstil-ve-hazir-giyim",
    "Tekstil ve Hazır Giyim",
    "Textiles & Apparel",
    "tekstil toptancıları, perakende zincirleri ve kurumsal alıcılar",
    "textile wholesalers, retail chains and institutional buyers",
    "beden, kumaş, sezon, etiketleme ve minimum sipariş",
    "sizing, fabrics, seasonality, labelling and minimum orders",
  ],
];
const sectorSeeds = sectorData.flatMap((d) =>
  (["tr", "en"] as Locale[]).map((locale) => {
    const tr = locale === "tr";
    return make(
      locale,
      "sector",
      d[0],
      d[tr ? 1 : 2],
      tr
        ? `${d[1]} için Kenya pazarını araştırmaya nereden başlamalı?`
        : `Where should Kenya market research for ${d[2].toLowerCase()} begin?`,
      [
        {
          title: tr ? "Sektöre genel bakış" : "Sector overview",
          text: tr
            ? `Bu sayfa ${d[1].toLocaleLowerCase("tr")} için araştırma kapsamını tanımlar. Ölçülmüş pazar büyüklüğü veya doğrulanmış ticari talep iddiası içermez.`
            : `This page defines a research scope for ${d[2].toLowerCase()}. It does not assert measured market size or verified commercial demand.`,
        },
        {
          title: tr
            ? "Araştırılabilecek talep alanları"
            : "Demand areas to investigate",
          text: tr
            ? `${d[3]} ile ürün uyumu araştırılabilir. Satın alma niyeti, bütçe ve zamanlama doğrudan görüşmeyle doğrulanmalıdır.`
            : `Product fit can be investigated with ${d[4]}. Purchasing intent, budgets and timing must be verified through direct discussions.`,
        },
        {
          title: tr ? "Rekabet ve dağıtım" : "Competition and distribution",
          text: tr
            ? "Yerel ürün alternatifleri, ithal markalar, satış noktaları ve kanal marjları tarihli bir saha çalışmasıyla karşılaştırılmalıdır. Mevcut bir distribütör listesi veya marka ortaklığı taahhüt edilmez."
            : "Local alternatives, imported brands, outlets and channel margins should be compared in dated field research. No existing distributor list or brand partnership is promised.",
        },
        {
          title: tr ? "İhracattan önce" : "Before exporting",
          text: tr
            ? `Ürün dosyanızda ${d[5]} başlıklarını netleştirin. Teknik katalog ve numune değerlendirme planını hazırlayın.`
            : `Clarify ${d[6]} in your product file. Prepare technical catalogues and a sample evaluation plan.`,
        },
        {
          title: tr
            ? "İthalat ve uygunluk incelemesi"
            : "Import and conformity review",
          text: tr
            ? "HS kodu, kullanım amacı ve ürün niteliğine göre KRA ve KEBS yükümlülükleri yetkili uzmanlarla incelenmelidir. Sektöre özel ek izin veya kısıt olup olmadığı sevkiyattan önce doğrulanmalıdır."
            : "Qualified specialists should review KRA and KEBS obligations according to HS code, intended use and product characteristics. Verify sector-specific permits or restrictions before shipment.",
        },
        {
          title: tr ? "Potansiyel alıcı profili" : "Potential buyer profiles",
          text: tr
            ? `Araştırma başlangıç profili: ${d[3]}. Bu bir teyit edilmiş müşteri listesi değildir. Bölge, kanal, ölçek ve teknik ihtiyaç filtreleri birlikte belirlenir.`
            : `Initial research profiles: ${d[4]}. These are not a confirmed customer list. Geography, channel, scale and technical requirements are defined together.`,
        },
        {
          title: tr ? "Nasıl destek olabiliriz?" : "How we can help",
          text: tr
            ? "Ürüne özel firma araştırması, izinli ilk temas, randevu koordinasyonu, saha ziyareti ve bulgu raporu. Önce ürün dosyanızı ve araştırma hedefinizi birlikte inceleriz."
            : "Product-specific company research, permitted initial outreach, appointment coordination, field visits and findings reports. We start by reviewing your product file and research objectives.",
        },
        {
          title: tr ? "Risk kontrolü" : "Risk checks",
          text: tr
            ? "Yalnız fiyat üzerinden karar vermeyin. Ödeme güvenliği, satış sonrası hizmet, numune kabul koşulları ve sözleşmedeki sorumlulukları bağımsız uzmanlarla değerlendirin."
            : "Do not decide on price alone. Review payment security, after-sales service, sample acceptance and contractual responsibilities with independent specialists.",
        },
      ],
      "published",
      [sources.kra, sources.kebs],
    );
  }),
);
const blogTitles = [
  [
    "kenyaya-ihracat-nasil-yapilir",
    "Kenya’ya İhracat Nasıl Yapılır?",
    "How to Prepare for Exporting to Kenya",
  ],
  [
    "kenyada-sirket-nasil-kurulur",
    "Kenya’da Şirket Nasıl Kurulur?",
    "How to Set Up a Company in Kenya",
  ],
  [
    "kenyada-is-yapmak-isteyen-turkler",
    "Kenya’da İş Yapmak İsteyen Türkler İçin Rehber",
    "A Guide for Turkish Businesses Entering Kenya",
  ],
  [
    "kenyada-distributor-nasil-bulunur",
    "Kenya’da Distribütör Nasıl Bulunur?",
    "How to Find a Distributor in Kenya",
  ],
  [
    "kenyaya-hangi-urunler-ihrac-edilebilir",
    "Türkiye’den Kenya’ya Hangi Ürünler İhraç Edilebilir?",
    "Which Products Could Be Exported from Türkiye to Kenya?",
  ],
  ["kenyada-yatirim-yapmak", "Kenya’da Yatırım Yapmak", "Investing in Kenya"],
  [
    "nairobide-is-kurmak",
    "Nairobi’de İş Kurmak",
    "Starting a Business in Nairobi",
  ],
  [
    "kenyada-ticarette-dikkat-edilecekler",
    "Kenya’da Ticaret Yaparken Dikkat Edilmesi Gerekenler",
    "Things to Check When Trading in Kenya",
  ],
  [
    "kenyada-guvenilir-tedarikci",
    "Kenya’da Güvenilir Tedarikçi Nasıl Bulunur?",
    "How to Assess a Supplier in Kenya",
  ],
  [
    "kenyaya-urun-gondermek",
    "Kenya’ya Ürün Göndermek: Lojistik ve Gümrük",
    "Shipping to Kenya: Logistics & Customs",
  ],
  [
    "kenyada-yasam-maliyetleri",
    "Kenya’da Yaşam Maliyetleri",
    "Living Costs in Kenya",
  ],
  [
    "kenyada-is-kulturu",
    "Kenya’da İş Kültürü ve Ticari İletişim",
    "Business Culture & Communication in Kenya",
  ],
  [
    "kenyada-firma-ziyaretleri",
    "Kenya’da Firma Ziyaretleri Neden Önemlidir?",
    "Why Company Visits Matter in Kenya",
  ],
  [
    "turk-sirketleri-icin-firsatlar",
    "Kenya’da Türk Şirketleri İçin Fırsatlar",
    "Researching Opportunities for Turkish Companies in Kenya",
  ],
  [
    "kenyaya-is-seyahati",
    "Kenya’ya İş Seyahati Planlama Rehberi",
    "Planning a Business Trip to Kenya",
  ],
];
const publishedBlogs = [3, 11, 12];
const blogSeeds = blogTitles.flatMap((d, i) =>
  (["tr", "en"] as Locale[]).map((locale) => {
    const tr = locale === "tr";
    const body: Section[] =
      i === 3
        ? [
            {
              title: tr
                ? "Önce iş ortağı profilini yazın"
                : "Start with a partner profile",
              text: tr
                ? "Distribütör araması bir şirket listesiyle değil, ürününüzün nasıl satılacağı sorusuyla başlar. Hedef bölgeyi, satış kanalını, gerekli teknik yetkinliği ve satış sonrası beklentinizi bir sayfalık brife dönüştürün."
                : "A distributor search starts with how your product will be sold. Turn the target territory, sales channel, technical capabilities and after-sales expectations into a one-page brief.",
            },
            {
              title: tr
                ? "Aday görüşmesinde sorulacak sorular"
                : "Questions for candidate meetings",
              text: tr
                ? "Soruları bütün adaylara aynı çerçevede sorun; beyan ile doğrulanmış bilgiyi raporda ayrı tutun."
                : "Use a consistent framework for all candidates; separate statements from independently verified information.",
              items: tr
                ? [
                    "Hangi ürün ve müşteri gruplarıyla çalışıyorsunuz?",
                    "Karar veren ve teknik konuları değerlendiren kişiler kimler?",
                    "Stok, servis ve bölgesel erişim kapasiteniz nedir?",
                    "Numune veya pilot siparişi hangi koşullarla değerlendirebilirsiniz?",
                  ]
                : [
                    "Which products and customer segments do you serve?",
                    "Who makes commercial and technical decisions?",
                    "What stock, service and geographic capabilities do you have?",
                    "Under what terms would you assess samples or a pilot order?",
                  ],
            },
            {
              title: tr
                ? "Örnek senaryo: ilgi ile taahhüdü ayırın"
                : "Illustrative scenario: interest and commitment",
              text: tr
                ? "Bir aday katalog istiyor ancak miktar veya takvim paylaşmıyorsa bunu sipariş beklentisi olarak değerlendirmeyin. Katalog sonrası görüşme tarihi, teknik sorular ve değerlendirme sorumlusu isteyin. Bu senaryo gerçek bir müşteri vakası değildir."
                : "If a candidate requests a catalogue without quantities or a timeline, do not treat this as an expected order. Ask for a follow-up date, technical questions and an evaluation contact. This is an illustrative scenario, not a customer case.",
            },
            {
              title: tr
                ? "Anlaşma öncesi bağımsız inceleme"
                : "Independent review before agreement",
              text: tr
                ? "Tüzel kişilik, imza yetkisi, finansal durum ve sözleşme koşullarını yetkili uzmanlarla doğrulatın. İlk görüşme veya saha ziyareti güvenilirlik garantisi değildir. Münhasırlık kararı vermeden bölge, hedef, fesih ve servis şartlarını açıkça yazın."
                : "Have qualified professionals verify the legal entity, signing authority, financial position and contract terms. A first meeting or field visit is not a reliability guarantee. Clarify territory, targets, termination and service terms before exclusivity.",
            },
          ]
        : i === 11
          ? [
              {
                title: tr
                  ? "İlk mesajı anlaşılır tutun"
                  : "Make the first message clear",
                text: tr
                  ? "Kimsiniz, hangi ürünü sunuyorsunuz ve görüşmeden ne bekliyorsunuz? Bu üç soruyu kısa bir mesajla yanıtlayın. Teknik katalog eklemek yararlı olabilir; fakat ilk mesajı uzun bir ürün listesine dönüştürmeyin."
                  : "Who are you, what do you offer, and what do you want from the meeting? Answer these in a concise message. A technical catalogue can help, but avoid turning the first message into a long product list.",
              },
              {
                title: tr
                  ? "Toplantının gündemini birlikte belirleyin"
                  : "Agree on the agenda",
                text: tr
                  ? "Kültür hakkında genellemeler yapmak yerine karşı tarafın çalışma biçimini sorun. Katılımcıları, toplantı dilini, yerini ve karar sürecini önceden teyit edin. İhtiyaçları dinlemek için görüşmede yeterli zaman bırakın."
                  : "Instead of cultural generalizations, ask how the other party works. Confirm participants, language, location and the decision process. Leave enough time to listen to their needs.",
              },
              {
                title: tr
                  ? "Görüşme sonrası takip"
                  : "Follow up after the meeting",
                text: tr
                  ? "Mutabık kalınan konuları, açık soruları, sorumlu kişileri ve takip tarihini yazılı paylaşın. Yanıt gelmezse farklı kanallardan tekrar iletişim için izin ve uygunluğu gözetin. Yanıtsızlığı olumlu veya olumsuz karar olarak yorumlamayın."
                  : "Share agreed points, open questions, responsible people and a follow-up date in writing. Respect permission and suitability when following up through other channels. Do not interpret silence as acceptance or rejection.",
              },
            ]
          : [
              {
                title: tr
                  ? "Ziyaret hangi soruyu yanıtlayacak?"
                  : "What question should the visit answer?",
                text: tr
                  ? "Adrese gitmek tek başına bir değerlendirme değildir. Ziyaretten önce görmek istediğiniz faaliyetleri, görüşülecek kişileri ve raporun kapsamını yazın. Karşı tarafın randevu ve erişim koşullarını teyit edin."
                  : "Arriving at an address is not an assessment by itself. Define activities to observe, people to meet and report scope in advance. Confirm appointment and access conditions with the other party.",
              },
              {
                title: tr
                  ? "Gözlem, beyan ve belgeyi ayırın"
                  : "Separate observations, statements and documents",
                text: tr
                  ? "Bir görüşmede anlatılan bilgi ile görülen faaliyet farklı kanıtlardır. Rapor, hangisinin gözlem, hangisinin şirket beyanı olduğunu belirtmelidir. Fotoğraf ve belge paylaşımı için izin alınmalıdır."
                  : "Information shared in a meeting and observed activity are different forms of evidence. Reports should identify observations and company statements separately. Obtain permission before sharing photos and documents.",
              },
              {
                title: tr ? "Ziyaretin sınırları" : "Limits of a visit",
                text: tr
                  ? "Bir saha ziyareti mali denetim veya hukuki inceleme yerine geçmez. Üretim kapasitesi, mülkiyet veya ödeme gücü gibi iddialar için bağımsız uzman incelemesi gerekebilir. Ziyaret raporu kararın girdisidir; ticari sonuç garantisi değildir."
                  : "A field visit does not replace a financial audit or legal review. Claims about capacity, ownership or payment capability may require independent specialist review. The visit report informs a decision; it does not guarantee an outcome.",
              },
            ];
    return make(
      locale,
      "blog",
      d[0],
      d[tr ? 1 : 2],
      tr
        ? "Sahada doğru soruları sormak ve kararlarınızı belgeli bir süreçle desteklemek için pratik bir başlangıç."
        : "A practical starting point for asking better questions and supporting decisions with a documented process.",
      publishedBlogs.includes(i)
        ? body
        : [
            {
              title: tr
                ? "Editoryal araştırma planı"
                : "Editorial research plan",
              text: tr
                ? "Bu yazı doğrulama bekleyen taslaktır. Konuya özgü resmî kaynaklar, güncel prosedürler, kontrol listesi, örnek senaryo ve risk değerlendirmesi uzman incelemesinden sonra eklenecektir."
                : "This article is a draft awaiting verification. Topic-specific official sources, current procedures, a checklist, illustrative scenario and risk assessment will be added following expert review.",
            },
          ],
      publishedBlogs.includes(i) ? "published" : "draft",
    );
  }),
);
export const seedContent: Content[] = [
  ...serviceSeeds,
  ...guideSeeds,
  ...sectorSeeds,
  ...blogSeeds,
];
export const guideCategories = guideData.map((d) => ({
  slug: d[0],
  tr: d[1],
  en: d[2],
}));
