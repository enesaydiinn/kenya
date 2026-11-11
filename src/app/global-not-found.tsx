import "./globals.css";
export default function GlobalNotFound() {
  return (
    <html lang="tr" data-scroll-behavior="smooth">
      <head>
        <title>404 — Kenya Danışmanlık</title>
        <meta name="robots" content="noindex" />
      </head>
      <body>
        <main className="not-found">
          <span className="eyebrow">KENYA DANIŞMANLIK · 404</span>
          <h1>Bu sayfaya ulaşamadık.</h1>
          <p>Adres değişmiş veya içerik henüz yayımlanmamış olabilir.</p>
          <a href="/" className="button">
            Ana sayfaya dön ↗
          </a>
        </main>
      </body>
    </html>
  );
}
