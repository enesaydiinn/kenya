import type { Content, Locale } from "./types";
export type FAQItem = { question: string; answer: string };
export function contentFAQ(content: Content, locale: Locale): FAQItem[] {
  if (content.faqs?.length) return content.faqs;
  const tr = locale === "tr";
  if (content.type === "service")
    return [
      {
        question: tr
          ? `${content.title} için hangi bilgilerle başlamalıyım?`
          : `What should I prepare for ${content.title.toLowerCase()}?`,
        answer: tr
          ? "Hedefinizi, ürün veya iş modelinizi, görüşmek istediğiniz tarafları ve beklediğiniz çıktıyı özetleyin. Mevcut katalog, yazışma ve teknik belgeler ihtiyaç değerlendirmesini kolaylaştırır. Hassas belgeleri ilk iletişim formuna eklemeyin."
          : "Summarize your objectives, product or business model, intended contacts and expected deliverables. Existing catalogues, correspondence and technical documents help assess your needs. Do not include sensitive documents in the first enquiry form.",
      },
      {
        question: tr
          ? "Bu hizmette hangi çıktıları alırım?"
          : "What deliverables does this service provide?",
        answer:
          content.body.find(
            (s) =>
              s.title === "Elinizde ne olacak?" ||
              s.title === "What you receive",
          )?.text || content.description,
      },
      {
        question: tr
          ? "Hangi sınırları dikkate almalıyım?"
          : "What limitations should I consider?",
        answer: content.body.at(-1)?.text || content.description,
      },
    ];
  if (content.type === "sector")
    return [
      {
        question: tr
          ? `${content.title} için hazır müşteri listeniz var mı?`
          : `Do you have a ready buyer list for ${content.title.toLowerCase()}?`,
        answer: tr
          ? "Hazır veya doğrulanmış müşteri listesi taahhüt etmiyoruz. Ürün özellikleri, hedef kanal ve bölgeye göre araştırma kapsamı hazırlanır; adayların ilgisi doğrudan teyit edilmeye çalışılır."
          : "We do not promise a ready or verified buyer list. Research scope is based on product specifications, target channel and territory, and candidate interest is assessed directly.",
      },
      {
        question: tr
          ? "Bu sektör için hangi belgeler gerekir?"
          : "Which documents does this sector require?",
        answer:
          content.body.find(
            (s) =>
              s.title === "İthalat ve uygunluk incelemesi" ||
              s.title === "Import and conformity review",
          )?.text || content.description,
      },
      {
        question: tr
          ? "Sektör araştırmasından önce ne hazırlamalıyım?"
          : "What should I prepare before sector research?",
        answer:
          content.body.find(
            (s) =>
              s.title === "İhracattan önce" || s.title === "Before exporting",
          )?.text || content.description,
      },
    ];
  return [
    {
      question: tr
        ? `${content.title} rehberini nasıl kullanmalıyım?`
        : `How should I use this ${content.title.toLowerCase()} guide?`,
      answer: content.body[0].text,
    },
    {
      question: tr
        ? "Bilgileri ne zaman yeniden kontrol etmeliyim?"
        : "When should I check the information again?",
      answer: tr
        ? "Bu sayfa genel hazırlık desteği sağlar. Ödeme, seyahat, sözleşme veya sevkiyattan önce işlem tarihindeki koşulları ilgili resmî kurum ve yetkili uzmanla yeniden teyit edin."
        : "This page supports general preparation. Before payment, travel, contracting or shipping, reconfirm current requirements with the relevant official authority and qualified professionals.",
    },
  ];
}
