# Test ve teslim raporu

Tarih: 11 Kasım 2026. Test hedefi: yerel Next.js uygulaması. Sonuçlar üretim sağlayıcılarında tekrar ölçümün yerine geçmez.

| Kontrol | Sonuç |
| --- | --- |
| TypeScript (`tsc --noEmit`) | Başarılı |
| Next.js üretim derlemesi | Başarılı; App Router, SSG, ISR ve dinamik API/yönetim rotaları üretildi |
| Çekirdek otomatik testler | 8/8 başarılı |
| API entegrasyon kontrolleri | 15/15 başarılı |
| Sayfa ve metadata kontrolü | 104 sayfa başarılı |
| İç bağlantı kontrolü | 104 adres; kırık bağlantı yok |
| Taslak erişim kontrolü | 24 dil bazlı taslak URL'si 404; sitemap'te bulunmuyor |
| Üretim bağımlılığı denetimi | `npm audit --omit=dev`: 0 açık (ölçüm anında) |
| Masaüstü ve dar ekran | 1440, 390 ve 320 istek boyutlarında kontrol; yatay taşma bulunmadı |
| Ana sayfa düz renk metin kontrastı | Okunan DOM stillerinde AA eşik altı metin kalmadı; fotoğraf üstü metinler görsel olarak incelendi |
| Lighthouse | Tamamlanamadı; Chrome süreç başlatımı bu ortamda başarısız oldu. Skor üretilmedi. |
| Canlı PostgreSQL / e-posta teslimi | Sağlayıcı bağlantıları verilmediği için doğrulanmadı |

## Otomatik test kapsamı

Form onayı, honeypot, açıklama uzunluğu, iletişim tercihine göre telefon gerekliliği, parola özeti ve yanlış parola reddi, token kurcalama ve oturum iptali, eşzamanlı kayıtlarda veri kaybı kontrolü, atomik hız sınırı, taslak kaydı ve CSV formül kaçışları.

API kontrolleri: dört yönetim uç noktasına yetkisiz erişim reddi; farklı origin isteğinin reddi; onaysız ve honeypot dolu formların reddi; gerçek talep kaydı; yönetici girişi ve cookie nitelikleri; kaydı listede bulma; durum güncellemesi; yönetimde farklı origin engeli; CSV indirme; çalıştırılabilir görsel reddi; çıkışta oturumun geçersizleşmesi.

104 sayfada HTTP durumu, tek H1, benzersiz title, canonical, hreflang, HTML dil etiketi ve ayrıştırılabilir JSON-LD kontrol edildi. Site içi bağlantılar, iki dildeki taslaklar, sitemap ve 404 davranışı denetlendi.

## Tarayıcıda doğrulanan akışlar

- Formu doldurup gönderme → gerçek talep numaralı başarı ekranı → kaydın yönetimde görünmesi.
- Yönetici girişi → başvuru ayrıntısını açma → durumu değiştirme → kaydın güncellenmesi → çıkış.
- İçerik arama → taslak editörü → İncelemede olarak kaydetme → Taslak durumuna geri alma.
- İhracata hazırlık aracında iki alanı seçme → kalan beş alanın doğru listelenmesi → İngilizceye geçişte seçimlerin korunması → sıfırlama.
- Mobil menü → hizmet alt menüsü → yerel temsil detayına geçiş.
- 320 ve 390 mobil görünümde ve masaüstünde yerleşim; başlıklar, CTA, resimler ve yatay taşma kontrolü.

Ekran görüntüleri teslim klasöründe: `ana-sayfa.png`, `ana-sayfa-mobil.png`, `form-basari.png`, `yonetim-paneli.png`. Başvuru ve yönetim ekranlarındaki QA kayıtları test içindir; son yerel veri deposundan temizlenir.

## Ölçüm sınırları

Lighthouse için kurulu Google Chrome ile iki başlatma denendi; süreç ilkinde hata, ikincisinde abort ile durdu. Bu yüzden 90+/95+ performans, erişilebilirlik, SEO veya best-practices skoru iddia edilmez. Yerleşim ve kontrast kontrolleri tam bir WCAG 2.2 uygunluk denetimi değildir. Yayınlanan gerçek alan adında Lighthouse, ekran okuyucu/klavye kontrolü, haricî PostgreSQL transaction testi ve gerçek e-posta teslim testi yeniden yapılmalıdır.

Özel önizlemede `noindex` bilinçli olarak etkindir. Genel internet görünürlüğü ve üretim başvuru toplama, gerçek alan adı, veri sağlayıcısı ve onaylı işletme/gizlilik bilgilerinin tamamlanmasını bekler.

## Ayrıntılı çıktılar

- `api-test-results.json`
- `page-check-results.json`
- `contrast-check.json`

## Özel yayın sonucu

Sites için OpenNext/Cloudflare Worker paketi derlendi ve Wrangler dry-run tamamlandı (yaklaşık 9.4 MiB, gzip 4.2 MiB). Kaynak aktarımı tamamlanamadı: etkileşimli standart giriş otomatik sandbox onay denetimi tarafından reddedildi; doğrudan standart giriş kullanan ayrı denemede kaynak sunucusunun DNS adresi çözülemedi. Canlı URL doğrulanmadı ve yayına alındığı iddia edilmez. Proje kimliği `.openai/hosting.json` içinde korunur; yeniden oluşturma yapılmamalıdır. Çalışan yerel uygulama ve üretim kaynak paketi teslim edilir.
