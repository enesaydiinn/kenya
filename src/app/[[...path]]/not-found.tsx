import Link from "next/link";
export default function NotFound() {
  return (
    <main className="not-found">
      <span className="eyebrow">KENYA DANIŞMANLIK · 404</span>
      <h1>Bu sayfaya ulaşamadık.</h1>
      <p>Adres değişmiş olabilir veya içerik henüz yayımlanmamış olabilir.</p>
      <Link href="/" className="button">
        Ana sayfaya dön ↗
      </Link>
      <Link href="/en" className="text-link">
        Back to English home
      </Link>
    </main>
  );
}
