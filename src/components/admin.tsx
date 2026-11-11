"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Inbox,
  FileText,
  Settings2,
  LogOut,
  ArrowUpRight,
  Search,
  Download,
  Plus,
  Save,
  ArrowLeft,
  ImagePlus,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import type { Content, Lead, Settings } from "@/lib/types";
import { leadStatuses } from "@/lib/types";
import { Logo } from "./shell";
import { Button } from "./ui/button";
import { typePath } from "@/lib/i18n";
async function api(url: string, method = "GET", body?: unknown) {
  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "İşlem tamamlanamadı.");
  return data;
}
export function AdminLogin({ configured }: { configured: boolean }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const d = Object.fromEntries(new FormData(e.currentTarget));
      await api("/api/auth/login", "POST", d);
      location.reload();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="admin-login">
      <Logo />
      <div className="admin-login-card">
        <span className="eyebrow">GÜVENLİ YÖNETİM ALANI</span>
        <h1>Tekrar hoş geldiniz.</h1>
        <p>İçeriklerinizi ve müşteri taleplerinizi yönetin.</p>
        {!configured && (
          <p className="notice">
            Veritabanı ve yönetici hesabı henüz yapılandırılmadı. Kurulum
            adımları README dosyasındadır.
          </p>
        )}
        <form onSubmit={submit} className="admin-form">
          <label>
            E-posta
            <input name="email" type="email" required autoComplete="username" />
          </label>
          <label>
            Parola
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              maxLength={200}
            />
          </label>
          <Button type="submit" disabled={busy || !configured}>
            {busy ? <Loader2 size={17} className="spinner" /> : null}Güvenli
            giriş
            <ArrowUpRight size={18} />
          </Button>
        </form>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <Link href="/" className="text-link">
          <ArrowLeft size={15} />
          Siteye dön
        </Link>
      </div>
      <p>Kenya Danışmanlık · Yetkili yönetici erişimi</p>
    </main>
  );
}
const settingLabels: Record<keyof Settings, string> = {
  email: "İletişim e-postası",
  phone: "Telefon (+ülke kodu)",
  whatsapp: "WhatsApp (yalnız rakamlar, ülke koduyla)",
  address: "Adres",
  founderName: "Kurucunun adı",
  founderBio: "Kurucu biyografisi — Türkçe",
  founderBioEn: "Kurucu biyografisi — İngilizce",
  founderImage: "Kurucu fotoğrafı",
  heroTitle: "Ana sayfa başlığı — Türkçe",
  heroTitleEn: "Ana sayfa başlığı — İngilizce",
  heroDescription: "Ana sayfa açıklaması — Türkçe",
  heroDescriptionEn: "Ana sayfa açıklaması — İngilizce",
  privacyText: "Onaylı gizlilik / kişisel veri metni — Türkçe",
  privacyTextEn: "Onaylı gizlilik / kişisel veri metni — İngilizce",
  legalApproved: "Gizlilik metinleri uzman tarafından incelendi ve onaylandı",
  calendarUrl: "Haricî rezervasyon takvimi (HTTPS)",
};
export function AdminApp() {
  const [tab, setTab] = useState("overview");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [contents, setContents] = useState<Content[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [editing, setEditing] = useState<Content | null>(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  async function load() {
    try {
      const [l, c, s] = await Promise.all([
        api("/api/admin/leads"),
        api("/api/admin/content"),
        api("/api/admin/settings"),
      ]);
      setLeads(l);
      setContents(c);
      setSettings(s);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    load();
  }, []);
  useEffect(() => {
    setQuery("");
    setStatus("all");
    setEditing(null);
    setError("");
    setToast("");
  }, [tab]);
  function notify(s: string) {
    setToast(s);
    setTimeout(() => setToast(""), 5000);
  }
  async function updateStatus(id: string, status: string) {
    try {
      await api("/api/admin/leads", "PATCH", { id, status });
      setLeads(leads.map((l) => (l.id === id ? { ...l, status } : l)));
      notify("Talep durumu güncellendi.");
    } catch (e) {
      setError((e as Error).message);
    }
  }
  async function saveContent(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setBusy(true);
    setError("");
    try {
      await api("/api/admin/content", "PUT", editing);
      notify("İçerik kaydedildi.");
      await load();
      setEditing(null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function saveSettings(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api("/api/admin/settings", "PUT", settings);
      notify("Site ayarları kaydedildi.");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  async function upload(file: File, assign: (url: string) => void) {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: file,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      assign(data.url);
      notify("Görsel yüklendi. Değişiklikleri kaydetmeyi unutmayın.");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  const filteredLeads = leads.filter(
    (l) =>
      (status === "all" || l.status === status) &&
      `${l.name} ${l.company} ${l.email} ${l.service}`
        .toLocaleLowerCase("tr")
        .includes(query.toLocaleLowerCase("tr")),
  );
  const filteredContent = contents.filter(
    (c) =>
      (status === "all" || c.status === status) &&
      `${c.title} ${c.slug} ${c.locale}`
        .toLocaleLowerCase("tr")
        .includes(query.toLocaleLowerCase("tr")),
  );
  const newLeadCount = leads.filter((l) => l.status === "Yeni Talep").length;
  const tabNames: Record<string, string> = {
    overview: "Genel Bakış",
    leads: "Müşteri Talepleri",
    content: "İçerik Merkezi",
    settings: "Site Ayarları",
  };
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Logo />
        <span className="admin-label">YÖNETİM PANELİ</span>
        <nav>
          {[
            ["overview", "Genel Bakış", LayoutDashboard],
            ["leads", "Müşteri Talepleri", Inbox],
            ["content", "İçerik Merkezi", FileText],
            ["settings", "Site Ayarları", Settings2],
          ].map(([id, label, Icon]) => {
            const I = Icon as typeof Inbox;
            return (
              <button
                className={tab === id ? "active" : ""}
                key={id as string}
                onClick={() => setTab(id as string)}
              >
                <I size={18} />
                {label as string}
                {id === "leads" && newLeadCount > 0 && (
                  <span>{newLeadCount}</span>
                )}
              </button>
            );
          })}
        </nav>
        <div className="admin-sidebar-bottom">
          <Link href="/" target="_blank">
            Siteyi görüntüle
            <ArrowUpRight size={16} />
          </Link>
          <button
            onClick={async () => {
              await api("/api/auth/logout", "POST");
              location.reload();
            }}
          >
            <LogOut size={16} />
            Oturumu kapat
          </button>
        </div>
      </aside>
      <main className="admin-main">
        <header className="admin-top">
          <div>
            <span className="eyebrow">KENYA DANIŞMANLIK</span>
            <h1>{tabNames[tab]}</h1>
          </div>
          <span className="admin-avatar">KD</span>
        </header>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        {toast && (
          <div className="admin-toast" role="status">
            <CheckCircle2 size={17} />
            {toast}
          </div>
        )}
        {loading ? (
          <div className="admin-loading">
            <Loader2 className="spinner" />
            Veriler yükleniyor…
          </div>
        ) : (
          <>
            {tab === "overview" && (
              <>
                <p className="admin-welcome">
                  Taleplerinize ve içeriklerinizin yayın durumuna bir bakış.
                </p>
                <div className="admin-stats">
                  <div>
                    <span>TOPLAM TALEP</span>
                    <strong>{leads.length}</strong>
                    <small>Güvenli şekilde kaydedilen başvurular</small>
                  </div>
                  <div>
                    <span>YENİ TALEP</span>
                    <strong>{newLeadCount}</strong>
                    <small>İlk iletişim bekleyen başvurular</small>
                  </div>
                  <div>
                    <span>YAYIMLANAN İÇERİK</span>
                    <strong>
                      {contents.filter((c) => c.status === "published").length}
                    </strong>
                    <small>Türkçe ve İngilizce içerikler</small>
                  </div>
                  <div>
                    <span>TASLAK & İNCELEME</span>
                    <strong>
                      {contents.filter((c) => c.status !== "published").length}
                    </strong>
                    <small>Doğrulama ve editoryal inceleme bekliyor</small>
                  </div>
                </div>
                <div className="admin-panel">
                  <div className="admin-panel-heading">
                    <h2>Son talepler</h2>
                    <button
                      className="text-link"
                      onClick={() => setTab("leads")}
                    >
                      Tüm talepler
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                  {leads.length ? (
                    <div className="admin-recent">
                      {leads.slice(0, 5).map((l) => (
                        <button
                          key={l.id}
                          onClick={() => {
                            setTab("leads");
                          }}
                        >
                          <span>
                            <strong>{l.name}</strong>
                            <small>{l.company || l.email}</small>
                          </span>
                          <span>{l.service}</span>
                          <span className="badge">{l.status}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="admin-empty">
                      <Inbox size={30} />
                      <h3>Henüz başvuru yok.</h3>
                      <p>Formdan gelen talepler burada görünecek.</p>
                    </div>
                  )}
                </div>
                <div className="admin-panel">
                  <h2>Yayın öncesi yapılandırma</h2>
                  <p>
                    İletişim, kurucu bilgileri ve her iki dilde uzman onaylı
                    gizlilik metinleri site ayarlarından yönetilir.
                    Doğrulanmamış bloglar taslak olarak saklanır.
                  </p>
                  <button
                    className="text-link"
                    onClick={() => setTab("settings")}
                  >
                    Site ayarlarını aç
                    <ArrowUpRight size={17} />
                  </button>
                </div>
              </>
            )}
            {tab === "leads" && (
              <>
                <div className="admin-toolbar">
                  <label className="admin-search">
                    <Search size={17} />
                    <span className="sr-only">Taleplerde ara</span>
                    <input
                      placeholder="Ad, şirket, e-posta veya hizmet ara…"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    aria-label="Talep durumuna göre filtrele"
                  >
                    <option value="all">Tüm durumlar</option>
                    {leadStatuses.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                  <a href="/api/admin/export" className="button button-small">
                    <Download size={16} />
                    CSV İndir
                  </a>
                </div>
                <div className="admin-leads">
                  {filteredLeads.map((l) => (
                    <details key={l.id} className="lead-card">
                      <summary>
                        <span className="lead-initial">{l.name[0]}</span>
                        <span>
                          <strong>{l.name}</strong>
                          <small>{l.company || l.email}</small>
                        </span>
                        <span className="lead-service">{l.service}</span>
                        <span className="badge">{l.status}</span>
                        <span className="lead-date">
                          {new Date(l.createdAt).toLocaleDateString("tr-TR")}
                        </span>
                      </summary>
                      <div className="lead-detail">
                        <div className="lead-meta">
                          <span>
                            <small>E-POSTA</small>
                            <a href={`mailto:${l.email}`}>{l.email}</a>
                          </span>
                          <span>
                            <small>TELEFON</small>
                            {l.phone || "Belirtilmedi"}
                          </span>
                          <span>
                            <small>ÜLKE / SEKTÖR</small>
                            {l.country} / {l.sector || "—"}
                          </span>
                          <span>
                            <small>İLETİŞİM TERCİHİ</small>
                            {l.preference}
                          </span>
                        </div>
                        <p className="preserve-lines">{l.message}</p>
                        <div className="lead-detail-bottom">
                          <label>
                            Talep durumu
                            <select
                              value={l.status}
                              onChange={(e) =>
                                updateStatus(l.id, e.target.value)
                              }
                            >
                              {leadStatuses.map((s) => (
                                <option key={s}>{s}</option>
                              ))}
                            </select>
                          </label>
                          <span>
                            E-posta bildirimi:{" "}
                            {l.notificationStatus === "unconfigured"
                              ? "Sağlayıcı yapılandırılmadı"
                              : l.notificationStatus === "sent"
                                ? "Gönderildi"
                                : l.notificationStatus === "failed"
                                  ? "Gönderilemedi"
                                  : "Bekliyor"}
                          </span>
                        </div>
                      </div>
                    </details>
                  ))}
                  {!filteredLeads.length && (
                    <div className="admin-panel admin-empty">
                      <Inbox size={30} />
                      <h3>Görüntülenecek talep bulunamadı.</h3>
                    </div>
                  )}
                </div>
              </>
            )}
            {tab === "content" &&
              (editing ? (
                <form
                  className="admin-form admin-panel content-editor"
                  onSubmit={saveContent}
                >
                  <button
                    type="button"
                    className="text-link"
                    onClick={() => setEditing(null)}
                  >
                    <ArrowLeft size={15} />
                    İçerik listesine dön
                  </button>
                  <h2>{editing.title || "Yeni içerik"}</h2>
                  <div className="admin-form-grid">
                    <label>
                      Başlık
                      <input
                        value={editing.title}
                        required
                        onChange={(e) =>
                          setEditing({ ...editing, title: e.target.value })
                        }
                      />
                    </label>
                    <label>
                      Yayın durumu
                      <select
                        value={editing.status}
                        onChange={(e) =>
                          setEditing({
                            ...editing,
                            status: e.target.value as Content["status"],
                          })
                        }
                      >
                        <option value="draft">Taslak</option>
                        <option value="review">İncelemede</option>
                        <option value="published">Yayımlandı</option>
                      </select>
                    </label>
                    <label>
                      Dil
                      <select
                        value={editing.locale}
                        disabled={contents.some((c) => c.id === editing.id)}
                        onChange={(e) =>
                          setEditing({
                            ...editing,
                            locale: e.target.value as "tr" | "en",
                            id: `${e.target.value}:${editing.type}:${editing.slug}`,
                          })
                        }
                      >
                        <option value="tr">Türkçe</option>
                        <option value="en">English</option>
                      </select>
                    </label>
                    <label>
                      İçerik türü
                      <select
                        value={editing.type}
                        disabled={contents.some((c) => c.id === editing.id)}
                        onChange={(e) =>
                          setEditing({
                            ...editing,
                            type: e.target.value as Content["type"],
                            id: `${editing.locale}:${e.target.value}:${editing.slug}`,
                          })
                        }
                      >
                        <option value="blog">Blog</option>
                        <option value="guide">Rehber</option>
                        <option value="service">Hizmet</option>
                        <option value="sector">Sektör</option>
                      </select>
                    </label>
                    <label>
                      URL slug
                      <input
                        value={editing.slug}
                        required
                        pattern="[a-z0-9-]+"
                        disabled={contents.some((c) => c.id === editing.id)}
                        onChange={(e) =>
                          setEditing({
                            ...editing,
                            slug: e.target.value,
                            id: `${editing.locale}:${editing.type}:${e.target.value}`,
                          })
                        }
                      />
                    </label>
                    <label>
                      Son kaynak kontrol tarihi
                      <input
                        type="date"
                        value={editing.reviewedAt || ""}
                        onChange={(e) =>
                          setEditing({ ...editing, reviewedAt: e.target.value })
                        }
                      />
                    </label>
                    <label className="full-width">
                      Açıklama
                      <textarea
                        value={editing.description}
                        rows={3}
                        required
                        onChange={(e) =>
                          setEditing({
                            ...editing,
                            description: e.target.value,
                          })
                        }
                      />
                    </label>
                    <label>
                      SEO başlığı
                      <input
                        value={editing.seoTitle || ""}
                        onChange={(e) =>
                          setEditing({ ...editing, seoTitle: e.target.value })
                        }
                        placeholder="Boşsa içerik başlığı kullanılır"
                      />
                    </label>
                    <label>
                      SEO açıklaması
                      <input
                        value={editing.seoDescription || ""}
                        onChange={(e) =>
                          setEditing({
                            ...editing,
                            seoDescription: e.target.value,
                          })
                        }
                      />
                    </label>
                    <label>
                      Yazar
                      <input
                        value={editing.author}
                        required
                        onChange={(e) =>
                          setEditing({ ...editing, author: e.target.value })
                        }
                      />
                    </label>
                    <label>
                      Görsel adresi
                      <input
                        value={editing.image || ""}
                        placeholder="/images/... veya yüklenen görsel"
                        onChange={(e) =>
                          setEditing({ ...editing, image: e.target.value })
                        }
                      />
                    </label>
                    <label className="upload-label">
                      <ImagePlus size={17} />
                      Görsel yükle (JPEG / PNG / WebP, en çok 3 MB)
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f)
                            upload(f, (url) =>
                              setEditing({ ...editing, image: url }),
                            );
                        }}
                      />
                    </label>
                  </div>
                  <h3>İçerik bölümleri</h3>
                  {editing.body.map((s, i) => (
                    <div className="editor-section" key={i}>
                      <div className="editor-section-title">
                        <strong>Bölüm {i + 1}</strong>
                        <button
                          type="button"
                          className="text-link danger"
                          onClick={() =>
                            setEditing({
                              ...editing,
                              body: editing.body.filter((_, n) => n !== i),
                            })
                          }
                        >
                          Bölümü kaldır
                        </button>
                      </div>
                      <label>
                        Bölüm başlığı
                        <input
                          value={s.title}
                          required
                          onChange={(e) =>
                            setEditing({
                              ...editing,
                              body: editing.body.map((v, n) =>
                                n === i ? { ...v, title: e.target.value } : v,
                              ),
                            })
                          }
                        />
                      </label>
                      <label>
                        Metin
                        <textarea
                          rows={5}
                          value={s.text}
                          onChange={(e) =>
                            setEditing({
                              ...editing,
                              body: editing.body.map((v, n) =>
                                n === i ? { ...v, text: e.target.value } : v,
                              ),
                            })
                          }
                        />
                      </label>
                      <label>
                        Liste maddeleri (her satır bir madde)
                        <textarea
                          rows={3}
                          value={(s.items || []).join("\n")}
                          onChange={(e) =>
                            setEditing({
                              ...editing,
                              body: editing.body.map((v, n) =>
                                n === i
                                  ? { ...v, items: e.target.value.split("\n") }
                                  : v,
                              ),
                            })
                          }
                        />
                      </label>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="text-link"
                    onClick={() =>
                      setEditing({
                        ...editing,
                        body: [
                          ...editing.body,
                          { title: "Yeni bölüm", text: "" },
                        ],
                      })
                    }
                  >
                    <Plus size={15} />
                    Bölüm ekle
                  </button>
                  <h3>Sıkça sorulan sorular</h3>
                  <p>
                    Boş bırakılırsa içeriğe özel varsayılan sorular kullanılır.
                  </p>
                  {(editing.faqs || []).map((faq, i) => (
                    <div className="editor-section" key={i}>
                      <label>
                        Soru
                        <input
                          value={faq.question}
                          onChange={(e) =>
                            setEditing({
                              ...editing,
                              faqs: (editing.faqs || []).map((v, n) =>
                                n === i
                                  ? { ...v, question: e.target.value }
                                  : v,
                              ),
                            })
                          }
                        />
                      </label>
                      <label>
                        Yanıt
                        <textarea
                          rows={3}
                          value={faq.answer}
                          onChange={(e) =>
                            setEditing({
                              ...editing,
                              faqs: (editing.faqs || []).map((v, n) =>
                                n === i ? { ...v, answer: e.target.value } : v,
                              ),
                            })
                          }
                        />
                      </label>
                      <button
                        className="text-link danger"
                        type="button"
                        onClick={() =>
                          setEditing({
                            ...editing,
                            faqs: (editing.faqs || []).filter(
                              (_, n) => n !== i,
                            ),
                          })
                        }
                      >
                        Soruyu kaldır
                      </button>
                    </div>
                  ))}
                  <button
                    className="text-link"
                    type="button"
                    onClick={() =>
                      setEditing({
                        ...editing,
                        faqs: [
                          ...(editing.faqs || []),
                          { question: "", answer: "" },
                        ],
                      })
                    }
                  >
                    <Plus size={15} />
                    Soru ekle
                  </button>
                  <h3>Kaynakça</h3>
                  {editing.sources.map((s, i) => (
                    <div key={i} className="source-editor">
                      <label>
                        Kaynak adı
                        <input
                          value={s.title}
                          onChange={(e) =>
                            setEditing({
                              ...editing,
                              sources: editing.sources.map((v, n) =>
                                n === i ? { ...v, title: e.target.value } : v,
                              ),
                            })
                          }
                        />
                      </label>
                      <label>
                        HTTPS adresi
                        <input
                          type="url"
                          value={s.url}
                          onChange={(e) =>
                            setEditing({
                              ...editing,
                              sources: editing.sources.map((v, n) =>
                                n === i ? { ...v, url: e.target.value } : v,
                              ),
                            })
                          }
                        />
                      </label>
                      <button
                        type="button"
                        className="text-link danger"
                        onClick={() =>
                          setEditing({
                            ...editing,
                            sources: editing.sources.filter((_, n) => n !== i),
                          })
                        }
                      >
                        Kaldır
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="text-link"
                    onClick={() =>
                      setEditing({
                        ...editing,
                        sources: [
                          ...editing.sources,
                          { title: "", url: "https://" },
                        ],
                      })
                    }
                  >
                    <Plus size={15} />
                    Kaynak ekle
                  </button>
                  <p className="notice">
                    Yayımlama öncesi kaynakları, tarihleri, deneyim iddialarını
                    ve varsa paylaşım izinlerini doğrulayın. Taslak ve
                    incelemedeki içerik halka açık sayfalarda görünmez.
                  </p>
                  <Button disabled={busy} type="submit">
                    <Save size={17} />
                    {busy ? "Kaydediliyor…" : "İçeriği Kaydet"}
                  </Button>
                </form>
              ) : (
                <>
                  <div className="admin-toolbar">
                    <label className="admin-search">
                      <Search size={17} />
                      <span className="sr-only">İçeriklerde ara</span>
                      <input
                        value={query}
                        placeholder="Başlık, adres veya dil ara…"
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      aria-label="Yayın durumuna göre filtrele"
                    >
                      <option value="all">Tüm durumlar</option>
                      <option value="draft">Taslak</option>
                      <option value="review">İncelemede</option>
                      <option value="published">Yayımlandı</option>
                    </select>
                    <Button
                      className="button-small"
                      onClick={() => {
                        const now = new Date().toISOString();
                        setEditing({
                          id: "tr:blog:yeni-yazi",
                          slug: "yeni-yazi",
                          locale: "tr",
                          type: "blog",
                          title: "Yeni yazı",
                          description: "İçerik açıklamasını buraya ekleyin.",
                          body: [{ title: "Giriş", text: "" }],
                          sources: [],
                          status: "draft",
                          author: "Kenya Danışmanlık Editör Ekibi",
                          createdAt: now,
                          updatedAt: now,
                        });
                      }}
                    >
                      <Plus size={16} />
                      İçerik Ekle
                    </Button>
                  </div>
                  <div className="admin-content-table">
                    <div className="content-table-heading">
                      <span>İçerik</span>
                      <span>Tür / Dil</span>
                      <span>Durum</span>
                      <span>İşlem</span>
                    </div>
                    {filteredContent.map((c) => (
                      <div className="content-table-row" key={c.id}>
                        <div>
                          <strong>{c.title}</strong>
                          <small>
                            /{c.locale === "en" ? "en/" : ""}
                            {typePath[c.type]}/{c.slug}
                          </small>
                        </div>
                        <span>
                          {
                            {
                              service: "Hizmet",
                              blog: "Blog",
                              guide: "Rehber",
                              sector: "Sektör",
                            }[c.type]
                          }{" "}
                          · {c.locale.toUpperCase()}
                        </span>
                        <span className={`badge badge-${c.status}`}>
                          {c.status === "draft"
                            ? "Taslak"
                            : c.status === "review"
                              ? "İncelemede"
                              : "Yayımlandı"}
                        </span>
                        <button
                          className="text-link"
                          onClick={() => setEditing(c)}
                        >
                          Düzenle
                          <ArrowUpRight size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ))}
            {tab === "settings" && settings && (
              <form
                className="admin-form admin-panel settings-editor"
                onSubmit={saveSettings}
              >
                <h2>Marka, iletişim ve kurucu</h2>
                <p>
                  Boş bırakılan iletişim alanları sitede gösterilmez. WhatsApp
                  numarası eklenmediyse sahte bağlantı oluşturulmaz.
                </p>
                <div className="admin-form-grid">
                  {(Object.keys(settings) as (keyof Settings)[])
                    .filter((k) => k !== "legalApproved")
                    .map((key) => (
                      <label
                        key={key}
                        className={
                          key.includes("Bio") ||
                          key.includes("Description") ||
                          key.includes("privacyText")
                            ? "full-width"
                            : ""
                        }
                      >
                        {settingLabels[key]}
                        {key.includes("Bio") ||
                        key.includes("Description") ||
                        key.includes("privacyText") ? (
                          <textarea
                            rows={key.includes("privacyText") ? 8 : 4}
                            value={settings[key] as string}
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                [key]: e.target.value,
                              })
                            }
                          />
                        ) : (
                          <input
                            value={settings[key] as string}
                            type={
                              key === "email"
                                ? "email"
                                : key === "calendarUrl"
                                  ? "url"
                                  : "text"
                            }
                            onChange={(e) =>
                              setSettings({
                                ...settings,
                                [key]: e.target.value,
                              })
                            }
                          />
                        )}
                      </label>
                    ))}
                  <label className="upload-label full-width">
                    <ImagePlus size={18} />
                    Kurucu fotoğrafı yükle
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f)
                          upload(f, (url) =>
                            setSettings({ ...settings, founderImage: url }),
                          );
                      }}
                    />
                  </label>
                  <label className="admin-checkbox full-width">
                    <input
                      type="checkbox"
                      checked={settings.legalApproved}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          legalApproved: e.target.checked,
                        })
                      }
                    />
                    {settingLabels.legalApproved}
                  </label>
                </div>
                <p className="notice">
                  Üretimde formu açmak için kalıcı PostgreSQL veritabanı ve her
                  iki dilde onaylı gizlilik metni gerekir. E-posta sağlayıcısı
                  ve oturum sırları ortam değişkenleriyle tanımlanır. Görsel
                  yüklemeleri güvenli kayıt deposunda saklanır.
                </p>
                <Button disabled={busy} type="submit">
                  <Save size={17} />
                  {busy ? "Kaydediliyor…" : "Site Ayarlarını Kaydet"}
                </Button>
              </form>
            )}
          </>
        )}
      </main>
    </div>
  );
}
