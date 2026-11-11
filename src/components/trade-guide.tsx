import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/types";
import { href, local } from "@/lib/i18n";
import { sources } from "@/lib/content";
import { PageIntro, CTA } from "./pages";
export function TradeGuide({ locale }: { locale: Locale }) {
  const sections =
    locale === "tr"
      ? [
          [
            "İhracat öncesi kontrol listesi",
            "Ürünün teknik tanımı, HS kodu, hedef alıcı, fiyatlandırma, ödeme ve teslim planınızı aynı dosyada toplayın. İthalat uygunluğunu yetkili uzmanlarla sevkiyat öncesinde doğrulayın.",
          ],
          [
            "Gerekli olabilecek belgeler",
            "Ticari fatura, çeki listesi, taşıma belgesi, menşe ve uygunluk belgeleri ürün ve işlem türüne göre gündeme gelebilir. Bu genel başlıklar kesin veya tam belge listesi değildir. KRA ve KEBS kaynakları ile yetkili gümrük uzmanından ürün bazlı teyit alın.",
          ],
          [
            "Ticari iletişim",
            "İlk mesajda şirketinizi, ürününüzü ve görüşme amacınızı kısa anlatın. Karar vericiyi sorun. Teklifte para birimi, teslim şekli, geçerlilik, ödeme ve satış sonrası koşullarını yazın. Görüşme sonrası açık soruları ve takip tarihini paylaşın.",
          ],
          [
            "Pazar araştırması adımları",
            "Araştırma sorusunu belirleyin; sektörü, bölgeyi ve kanal yapısını daraltın. Açık kaynak taraması ve izinli görüşmelerden gelen bilgileri tarih ve kaynakla kaydedin. Beyan, gözlem ve bağımsız doğrulama arasındaki farkı raporda belirtin.",
          ],
          [
            "Distribütör seçme kriterleri",
            "Ürün portföyü, bölgesel erişim, müşteri segmenti, teknik servis, stok ve iletişim kapasitesini inceleyin. Tüzel kişilik ve mali durum için bağımsız inceleme yaptırın. İlk görüşme güvenilirlik garantisi değildir.",
          ],
          [
            "Riskler ve dikkat edilmesi gerekenler",
            "Tek bir kaynağa dayanmayın. Kimlik ve imza yetkisini teyit edin. Numune kabul kriterleri, ödeme güvenliği, gümrük uygunluğu ve anlaşmazlık çözümünü sözleşme öncesi değerlendirin. Satış veya kârlılık varsayımını doğrulanmış talep olarak kullanmayın.",
          ],
        ]
      : [
          [
            "Pre-export checklist",
            "Collect your technical product description, HS code, buyer profile, pricing, payment and delivery plans in one file. Have qualified specialists verify import suitability before shipping.",
          ],
          [
            "Documents that may be required",
            "Commercial invoices, packing lists, transport documents, origin and conformity documents may be relevant depending on the product and transaction. These are general headings, not a definitive document list. Obtain product-specific confirmation from KRA, KEBS and a qualified customs specialist.",
          ],
          [
            "Commercial communication",
            "Introduce your company, product and meeting objective briefly. Ask who makes decisions. Quotes should state currency, delivery terms, validity, payment and after-sales conditions. Share open questions and follow-up dates after meetings.",
          ],
          [
            "Market research steps",
            "Define a research question and narrow the sector, territory and channel. Record dates and sources for desk research and permitted interviews. Distinguish statements, observations and independent verification in the report.",
          ],
          [
            "Distributor selection criteria",
            "Review product portfolio, geographic coverage, customer segments, technical service, stock and communication capacity. Arrange independent legal and financial checks. An initial meeting is not a reliability guarantee.",
          ],
          [
            "Risks and checks",
            "Avoid relying on a single source. Verify identity and signing authority. Review sample acceptance, payment security, customs suitability and dispute resolution before contracting. Do not treat assumed sales or profitability as confirmed demand.",
          ],
        ];
  return (
    <>
      <PageIntro
        locale={locale}
        title={local(
          locale,
          "Kenya Ticaret Rehberi",
          "Kenya Trade Preparation Guide",
        )}
        text={local(
          locale,
          "Ürün dosyanızdan ilk firma görüşmesine, hazırlığınızı düzenlemek için bir yol haritası.",
          "A roadmap for organizing your preparation, from product files to first company meetings.",
        )}
        eyebrow={local(locale, "HAZIRLIK & KONTROL", "PREPARATION & CHECKS")}
      />
      <article className="container legal-content article-body">
        {sections.map(([title, text], i) => (
          <section key={title}>
            <span className="eyebrow">0{i + 1}</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </section>
        ))}
        <div className="sources-box">
          <h2>
            {local(
              locale,
              "Resmî başlangıç kaynakları",
              "Official starting resources",
            )}
          </h2>
          <p>
            {local(
              locale,
              "Son kaynak kontrolü: 11 Kasım 2026. Güncel ürün şartlarını işlem tarihinde yeniden teyit edin.",
              "Sources last checked: 11 November 2026. Reconfirm product-specific requirements at the time of action.",
            )}
          </p>
          {[sources.kra, sources.kebs, sources.invest].map((s) => (
            <p key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.title} ↗
              </a>
            </p>
          ))}
        </div>
        <Link className="button" href={href(locale, "ihracata-hazirlik")}>
          {local(
            locale,
            "İnteraktif kontrol listesini aç",
            "Open interactive checklist",
          )}
          <ArrowRight size={18} />
        </Link>
      </article>
      <CTA locale={locale} />
    </>
  );
}
