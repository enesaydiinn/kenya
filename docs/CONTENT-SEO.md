# İçerik ve SEO

## Yayın modeli

İçerik dil, tür, adres, başlık, açıklama, bölümler/listeler, kaynakça, FAQ, yazar, görsel, SEO alanları, kaynak kontrol tarihi, yayın ve güncelleme tarihleriyle saklanır. Her değişiklikte güncelleme tarihi sunucuda yenilenir. Önceden yayımlanan adresler editörde sabittir; yeni slug için ayrı içerik açılır. Eski URL taşınacaksa kalıcı yönlendirme eklenmelidir.

Yalnız `published` durumundaki içerik ziyaretçiye açılır. `draft` ve `review` içerik URL'leri 404 verir, iç listelerden ve XML sitemap'ten çıkarılır. Yönetim kaydı ilgili sayfa ve sitemap önbelleğini geçersiz kılar.

Genel süreç yazıları ve kaynaklara yönlendiren hazırlık rehberleri yayımlanmıştır. Araştırılmamış makro istatistikler, ücretler, mevzuat yorumları ve sektör talep iddiaları eklenmemiştir. 15 blog başlığından 12'si her dilde doğrulama bekleyen taslaktır. Yayımlanmış 3 yazı: distribütör araştırması, ticari iletişim ve firma ziyaretlerinin sınırları. Örnekler açıkça senaryo olarak etiketlidir.

## Teknik

- App Router; Node/Vercel'de statik ön üretim + bir dakikalık ISR, iletişim ve yönetim için SSR.
- Her sayfada özgün title/description, canonical, TR/EN/x-default hreflang, OG ve Twitter kartı.
- Semantik H1, breadcrumb ve doğrulanmış alanlarla Organization, WebSite, BreadcrumbList, Service, Article JSON-LD.
- Gerçek kişi/işletme verileri tamamlanmadan Person veya LocalBusiness şeması üretilmez.
- Görseller Next Image ve WebP ile sunulur, hero öncelikli, diğer görseller lazy loading. Görsel alanları boyutlandırılmıştır.
- Özel önizleme varsayılan `noindex`; robots tüm taramayı kapatır. Üretim onayı sonrası `INDEXING_ENABLED=true` ile açılır.
- Search Console meta doğrulaması `GSC_VERIFICATION` ile etkinleşir. Analytics/reklam araçları bağlı değildir.
- FAQ içerikleri yönetilebilir; FAQ zengin sonuç veya Google sıralama garantisi sunulmaz.

## Editoryal doğrulama

Yeni rehber için gerçek kullanıcı sorusunu, kontrol listesini, örnek senaryoyu, riskleri ve kaynakları hazırlayın. Kaynağın yayın tarihini ve ilgili işlem tarihini ayırın. Ürün veya kişisel duruma bağlı şartları genelleştirmeyin. Son kaynak kontrolünü yalnız gerçek inceleme yapıldığında güncelleyin. Firma adı, fotoğraf, kişisel bilgi ve vaka paylaşımı için gerekli izinleri kaydedin.

Sektörel sayfalar hizmet → araştırma soruları → risk kontrolü → ön görüşme akışını izler. Hizmetler, rehber, blog ve hazırlık aracı arasında ilgili iç bağlantılar bulunur. Sahte yorum, referans, backlink veya sonuç istatistiği bulunmaz.
