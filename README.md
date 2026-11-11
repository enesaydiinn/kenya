# Kenya Danışmanlık

Türkiye & Kenya ticaret, yatırım ve yerel temsil platformu. Next.js App Router, TypeScript, Tailwind CSS, Lucide, Zod ve PostgreSQL / Prisma. Türkçe kök adresler ve `/en` İngilizce eşleri aynı içerik modeliyle çalışır.

## Hızlı başlangıç

Node.js 22 LTS veya 24 LTS ve npm kullanın.

```bash
npm ci
npm run setup:local
npm run db:generate
npm run admin:setup
npm run dev
```

Site: `http://127.0.0.1:3000`, yönetim: `http://127.0.0.1:3000/admin`.
`admin:setup` e-posta ve gizli parola girişini terminalde sorar. Varsayılan yönetici hesabı veya parola yoktur. Parola en az 14 karakter olmalıdır. Parola düz metin saklanmaz.

Yerel ortamda `.data/` altında gerçek, kalıcı form kayıtları ve yönetim verisi tutulur. Bu yalnız geliştirme içindir. `.data/`, `.env.local` ve oturum sırları Git'e ve dağıtım paketine dahil edilmez. Dosya deposu çok sunuculu üretim için uygun değildir.

## İçerik ve sayfalar

- 7 hizmet, 18 başlangıç rehberi, 10 sektörel araştırma kapsamı ve 3 yayımlanmış süreç yazısı; her biri Türkçe ve İngilizce.
- Talep edilen 15 blog başlığının tamamı yönetimde hazırdır. Araştırılmamış 12 başlık her dilde taslaktır; URL'leri 404 döner ve sitemap'e girmez.
- Sektörel sayfalar araştırma kapsamını anlatır; doğrulanmış alıcı, pazar büyüklüğü veya talep vaadi içermez.
- İçerik durumları: Taslak, İncelemede, Yayımlandı. Editör; metin, bölümler, listeler, kaynaklar, FAQ, SEO ve görseli yönetir.
- Ön görüşme formu, durum takibi, CSV dışa aktarma, kurucu/iletişim/hero ayarları, görsel yükleme, arama ve interaktif ihracata hazırlık aracı bulunur.
- Ana rotalar: `/hakkimizda`, `/hizmetler`, `/kenya-rehberi`, `/sektorler`, `/blog`, `/iletisim`, `/sikca-sorulan-sorular`, `/ihracata-hazirlik`, `/kenya-ticaret-rehberi`, `/kenyadan-turkiyeye-ticaret` ve 3 hukuki bilgilendirme sayfası.
- `/en` aynı sayfaların İngilizce karşılıklarını içerir. Dil değişimi mevcut içerik adresini korur.

## Yönetim

Girişten sonra müşteri taleplerini filtreleyin, ayrıntıları açın, durumu güncelleyin veya CSV indirin. İçerik merkezinden taslakları düzenleyin, incelemeye gönderin ve doğruladıktan sonra yayımlayın. Site ayarlarından kurucu bilgileri, iletişim, ana sayfa metinleri ve gizlilik metinlerini girin.

WhatsApp numarası yalnız ülke koduyla rakam olarak yazılır. Numara yoksa `wa.me` bağlantısı üretilmez. Takvim adresi yoksa randevu seçeneği sunulmaz; form gönderimi bir rezervasyon olarak gösterilmez. E-posta bildirimi yalnız sağlayıcı yapılandırılmışsa gönderilir; başarısız bildirim form kaydını kaybettirmez ve yönetimde durumu görünür.

## Üretime geçiş

[Dağıtım adımları](docs/DEPLOYMENT.md), [mimari](docs/ARCHITECTURE.md), [SEO ve içerik politikası](docs/CONTENT-SEO.md), [test raporu](docs/TEST-REPORT.md).

Üretimde `LOCAL_DATA_ENABLED=false`, kalıcı PostgreSQL bağlantısı, güçlü oturum sırrı, doğru `APP_ORIGIN` ve yönetici hesabı gerekir. İletişim bilgileri ve veri sorumlusu açıklamaları eksiktir. Her iki dilde uzman onaylı gizlilik metni yönetimde onaylanmadan üretim formu açılmaz. Kurucunun adı, fotoğrafı ve ayrıntılı biyografisi boş bırakılmıştır.

## Kontroller

```bash
npm run typecheck
npm test
npm run build
npm run start
```

`npm run test:api` yalnız yerel, test verili ortam içindir; geçici QA hesabı ve başvuru oluşturur. Canlı üretimde çalıştırmayın. `node --import tsx scripts/check-pages.ts` sayfa/metadata/link/taslak kontrollerini yapar. `QA_ORIGIN` ile hedef yerel adres seçilebilir.

## Görseller ve kaynaklar

Nairobi fotoğrafı: [imsogabriel stock / Unsplash](https://unsplash.com/photos/a-cityscape-of-nairobi-kenya-on-a-sunny-day-IaJm3mq0F5o), Unsplash lisansı. Lojistik görseli: [Unsplash](https://images.unsplash.com/photo-1494412519320-aa613dfb7738), görsel dosyası `photo-1494412519320-aa613dfb7738`; genel lojistik görselidir ve Mombasa fotoğrafı olarak sunulmaz. Orijinal JPEG'ler ve optimize WebP sürümleri projede yer alır. Ana sayfa ve Hakkımızda bölümündeki kişisel fotoğraf, kullanıcının site için paylaştığı `omer.jpeg` dosyasından WebP olarak hazırlanmıştır; kişiye veya fotoğrafın içeriğine müdahale edilmemiştir. Portre ve isim yönetim panelindeki kurucu ayarlarından güncellenebilir. Fontlar yerel paketlerden sunulur; haricî font isteği yoktur.

Resmî içerik kaynakları ilgili sayfalarda bağlantılıdır: KRA, KEBS, KenInvest, Kenya eTA ve Mombasa Investment Corporation. İstatistik, referans, müşteri sayısı veya başarı garantisi üretilmemiştir.
