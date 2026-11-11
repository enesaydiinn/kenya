# Kenya Danışmanlık — uygulama planı

1. App Router: Türkçe kök sayfalar, İngilizce /en eşleri; ortak dil duyarlı bileşenler, SSR içerik ve metadata.
2. Tasarım: sıcak beyaz, lacivert, zümrüt, kum ve altın. Manrope başlıklar, DM Sans metin. Nairobi iş hayatına odaklanan fotoğraflar, geniş tipografi ve kontrollü hareket.
3. Akış: ticaret / yatırım / yaşam → ilgili hizmet → kapsam ve süreç → ön görüşme talebi. Rehber → kontrol listesi → hizmet.
4. İçerik: dil, tür, slug, başlık, açıklama, bölümler, kaynaklar, yayın/inceleme/güncelleme tarihi ve durum. Yalnız yayımlanmış içerik halka açık ve sitemap içinde.
5. Veri: Lead, Content, Setting, AdminUser, Session, RateLimit. PostgreSQL + Prisma üretim; açıkça etkinleştirilen dosya deposu yerel geliştirme. Üretimde kalıcı DB olmadan veri kabul edilmez.
6. Yönetim: parola scrypt özeti, imzalı kısa ömürlü HttpOnly oturum, sunucuda rol/oturum denetimi, aynı kaynak kontrolü, hız sınırı. Başvurular, içerik, site metinleri, kurucu ve iletişim ayarları.
7. SEO: canonical/hreflang, OG/Twitter, breadcrumbs ve doğrulanmış Organization/WebSite/Service/Article şemaları. Taslak ve admin noindex. Gerçek kişi/işletme verisi olmadan Person/LocalBusiness üretilmez.
8. Kalite: derleme, TypeScript, auth/validasyon/hız sınırı/CSV testleri, API ve tarayıcı uçtan uca, link/metadata kontrolü, mobil görünüm ve erişilebilirlik. Sonuçlar TEST-REPORT.md içinde.

## Yayın politikası

Hizmet tanımları, genel süreç rehberleri yayımlanabilir. Değişken mevzuat, ücret, şirket listeleri, pazar büyüklüğü ve araştırılmamış blog/sektör yorumları incelemeye tabi taslaktır. Otomatik ticari talep, sonuç veya izin garantisi verilmez. Hukuki sayfalar uzman onayı gelene kadar taslaktır ve formun halka açık üretim kullanımı yapılandırma onayına bağlıdır.
