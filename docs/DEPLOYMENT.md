# Dağıtım

## Vercel + PostgreSQL (önerilen üretim)

1. Node.js 22 veya 24 LTS, PostgreSQL 14+ ve SSL bağlantısı hazırlayın. Uygulamaya ayrılmış en az yetkili kullanıcı kullanın.
2. Proje kökünü Vercel'e Next.js uygulaması olarak ekleyin. Kurulum `npm ci`, derleme `npm run build`.
3. Vercel ortam değişkenlerinde `DATABASE_URL`, rastgele en az 32 karakterli `SESSION_SECRET` ve `RATE_LIMIT_SECRET` tanımlayın. `LOCAL_DATA_ENABLED=false`, `NEXT_PUBLIC_SITE_URL=https://kenyadanismanlik.com`, `APP_ORIGIN=https://kenyadanismanlik.com`, `TRUST_PROXY=true` ayarlayın. Önizleme dağıtımının origin ve canonical değerlerini ayrıca kendi adresine ayarlayın.
4. Güvenilir terminalden aynı PostgreSQL bağlantısıyla `npm run db:migrate` çalıştırın. Şema migration dosyası sürümlenmiştir. Üretim veritabanına `db push` kullanmayın.
5. Aynı ortam değişkenleriyle `npm run admin:setup` çalıştırın. Kurulum komutu yönetici e-postasını ve gizli parolayı ister. Parola güncelleme mevcut oturumları iptal eder.
6. Yönetimde gerçek iletişim bilgilerini, kurucu profilini, kaynak kontrol tarihlerini ve iki dilde uzman onaylı kişisel veri metinlerini tamamlayın. Türkiye ve Kenya veri sorumluluğu/aktarımı/saklama koşullarını uzmanla netleştirin. Gizlilik onayını ancak bu incelemeden sonra açın.
7. İsteğe bağlı `RESEND_API_KEY`, `EMAIL_FROM` ve `LEAD_NOTIFICATION_EMAIL` ayarlayın; e-posta gönderen alanını sağlayıcıda doğrulayın. Bildirim yalnız talep numarasını içerir; başvuru ayrıntıları yönetimde kalır. Gerçek sağlayıcıyla teslim testi ayrıca yapılmalıdır.
8. Alan adını bağlayın. Çıplak alan adı/www politikasını hosting tarafında tek canonical origin'e 301 ile birleştirin. `/anasayfa → /`, `/home → /en` yönlendirmeleri uygulamada mevcuttur (kalıcı HTTP 301).
9. İçerik ve işletme bilgileri incelendikten sonra `INDEXING_ENABLED=true` ve isteğe bağlı `GSC_VERIFICATION` tanımlayıp yeniden dağıtın. Sitemap'i Search Console'a gönderin.
10. Gerçek üretim formu, admin girişi, CSV, e-posta teslimi, yedekleme/geri yükleme ve hedef bölgede Lighthouse ölçümlerini doğrulayın. Bu ortamda haricî PostgreSQL ve e-posta sağlayıcısı sağlanmadığı için bunların canlı bağlantı testi yapılmamıştır.

## Özel Sites önizlemesi

Sites, Cloudflare Worker çıktısını kullanır. Vercel kaynak yapısı korunur; `npm run build:sites`, OpenNext ve Wrangler ile `dist/server/index.js` oluşturur. Statik varlıklar Worker içine gömülür. Bu önizleme SSR kullanır; Vercel/Node derlemesi SSG ve bir dakikalık yeniden üretim kullanır. Önizlemede varsayılan olarak indeksleme kapalıdır, veri sağlayıcısı yapılandırılmadan başvuru kabul edilmez ve yönetim içerikleri açılmaz. Yerel dosya deposu Worker'da kullanılamaz.

Özel önizleme alan adı, istenen `kenyadanismanlik.com` alan adıyla eş anlamlı değildir. Alan adı için DNS erişimi gereklidir; bu çalışmada DNS değiştirilmemiştir. Gerçek kayıt toplamak için Vercel + PostgreSQL dağıtımını kullanın. Sites Worker ortamında standart PostgreSQL TCP adaptörü yerine HTTP uyumlu bir sağlayıcı/adaptör ayrıca gerekir; mevcut yapı bu bağlantıyı sağladığını iddia etmez.

Kaynak ve paketleme Sites becerisinin kaynak yardımcısıyla yapılır; tokenlar dosyada veya komut argümanında tutulmaz. `.env.local` ve `.data` paketlenmez.

## Güvenlik ve bakım

- Scrypt parola özeti; imzalı HS256 token ve sunucuda kayıtlı 8 saatlik oturum. HttpOnly, SameSite=Strict ve üretimde Secure cookie.
- Zod validasyonu, gövde boyutu sınırı, aynı origin kontrolü, giriş/form hız sınırı, honeypot ve minimum doldurma süresi.
- PostgreSQL atomik hız sayacı; güvenilir proxy olmadan adres başlığına güvenilmez. Proxy topolojisini doğrulayın.
- Görsel yüklemeleri oturum gerektirir; 3 MB, dosya imzası ile JPEG/PNG/WebP kontrolü; SVG kabul edilmez. Veritabanında veya yalnız yerel geliştirme deposunda saklanır.
- HTML içerik alanlarına ham HTML basılmaz; React metni kaçırır, JSON-LD `<` karakterini güvenle kodlar. CSV formül önekleri etkisizleştirilir.
- CSP, nosniff, frame engelleme ve referrer politikası bulunur. HTTPS ve HSTS hosting katmanında sağlanmalıdır.
- Loglarda kişisel veri ve sır yayımlanmaz. Sağlayıcı düzeyinde hata izleme/uyarı ve veri minimizasyonuyla uyumlu saklama politikası kurum tarafından yapılandırılmalıdır.
- Oturum/hız sınırı tablolarındaki süresi dolmuş kayıtları düzenli temizleyin; veritabanı yedekleme ve saklama politikası uygulayın.
- GA4/GTM etkin değildir. Eklenmeden önce hukuki temeli ve ziyaretçi tercihi mekanizmasını uygulayın. Search Console doğrulaması meta üzerinden yapılandırılabilir.
