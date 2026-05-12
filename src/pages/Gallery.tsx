import { useCallback, useEffect, useRef, useState } from "react";
import PageLayout from "@/components/PageLayout";
import Icon from "@/components/ui/icon";
import func2url from "../../backend/func2url.json";

const API_URL = (func2url as Record<string, string>).gallery;

type Photo = { id: number; url: string; title: string };

const FALLBACK_PHOTOS: Photo[] = [
  { id: -1, url: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/65750f7a-e45e-4678-b25d-19065f8f9879.jpg", title: "Поездка" },
  { id: -2, url: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/d99d0679-23e1-4500-8e59-063e0bc3088d.jpg", title: "Лёгкость" },
  { id: -3, url: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/d0e31965-0530-42d8-9995-d734d1d1b20a.jpg", title: "Взгляд" },
  { id: -4, url: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/fbc1b343-4159-4b67-85da-5a4f918ea00d.jpg", title: "Энергия" },
];

export default function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Включение режима администратора по нажатию A на клавиатуре
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === "a" || e.key === "A" || e.key === "ф" || e.key === "Ф")) {
        setAdminMode((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const loadPhotos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      const list: Photo[] = data.photos || [];
      setPhotos(list.length > 0 ? list : FALLBACK_PHOTOS);
    } catch {
      setPhotos(FALLBACK_PHOTOS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  const onUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const base64 = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(",")[1] || "");
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            file_base64: base64,
            content_type: file.type || "image/jpeg",
            title: file.name.replace(/\.[^.]+$/, "").slice(0, 60),
          }),
        });
      }
      await loadPhotos();
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const onDelete = async (id: number) => {
    if (id < 0) return;
    if (!confirm("Удалить фото?")) return;
    await fetch(`${API_URL}?id=${id}`, { method: "DELETE" });
    await loadPhotos();
  };

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + photos.length) % photos.length,
    );
  }, [photos.length]);
  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length));
  }, [photos.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, close, prev, next]);

  const current = lightboxIndex !== null ? photos[lightboxIndex] : null;

  return (
    <PageLayout>
      <section className="relative px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <h1
            className="font-cormorant italic font-semibold text-center mb-6"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              color: "rgba(255,255,255,0.95)",
              textShadow: "0 2px 24px rgba(0,0,0,0.7), 0 0 20px rgba(61,90,254,0.25)",
              animation: "aboutFadeUp 1.1s cubic-bezier(0.22,1,0.36,1) 0.05s both",
            }}
          >
            Фотогалерея
          </h1>

          {adminMode && (
            <div
              className="mb-10 flex flex-col items-center gap-3 p-5 mx-auto max-w-xl border"
              style={{
                borderColor: "#3d5afe",
                background: "rgba(61,90,254,0.06)",
                boxShadow: "0 0 22px rgba(61,90,254,0.25)",
              }}
            >
              <p className="font-cormorant italic text-white/85 text-lg">
                Режим администратора. Загрузи свои фото:
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => onUpload(e.target.files)}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 px-6 py-3 font-cormorant italic text-lg text-white border-2 transition-all"
                style={{
                  borderColor: "#3d5afe",
                  background: uploading ? "rgba(61,90,254,0.4)" : "rgba(61,90,254,0.15)",
                  boxShadow: "0 0 18px rgba(61,90,254,0.45)",
                  cursor: uploading ? "wait" : "pointer",
                }}
              >
                <Icon name={uploading ? "Loader2" : "Upload"} size={20} className={uploading ? "animate-spin" : ""} />
                {uploading ? "Загружаю..." : "Выбрать фото"}
              </button>
              <p className="text-white/50 text-xs">Можно выбрать несколько файлов сразу</p>
            </div>
          )}

          {!adminMode && (
            <p
              className="text-center text-white/30 text-xs mb-10"
              style={{ animation: "aboutFadeUp 1.1s cubic-bezier(0.22,1,0.36,1) 0.15s both" }}
            >
              Alt + A — режим администратора
            </p>
          )}

          {loading ? (
            <div className="text-center text-white/60 font-cormorant italic text-xl py-20">
              Загружаю фото...
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {photos.map((item, i) => (
                <div
                  key={item.id}
                  className="gallery-item cursor-pointer relative"
                  onClick={() => setLightboxIndex(i)}
                  style={{
                    animation: `galleryFadeUp 1s cubic-bezier(0.22,1,0.36,1) ${0.15 + i * 0.1}s both`,
                  }}
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full object-cover h-48 md:h-56"
                  />
                  <div className="overlay" />
                  <div className="absolute bottom-0 left-0 p-4 z-10">
                    <p className="font-cormorant text-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">{item.title}</p>
                  </div>

                  {adminMode && item.id > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(item.id);
                      }}
                      className="absolute top-2 right-2 z-20 w-9 h-9 rounded-full flex items-center justify-center text-white"
                      style={{
                        background: "rgba(220, 38, 38, 0.85)",
                        boxShadow: "0 0 12px rgba(220, 38, 38, 0.6)",
                      }}
                      aria-label="Удалить"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {current && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={close}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
            touchStartY.current = e.touches[0].clientY;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null || touchStartY.current === null) return;
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            const dy = e.changedTouches[0].clientY - touchStartY.current;
            touchStartX.current = null;
            touchStartY.current = null;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
              if (dx < 0) next();
              else prev();
            }
          }}
        >
          <button
            className="lightbox-btn absolute top-5 right-6 text-white/80 hover:text-white font-mono text-2xl"
            onClick={(e) => { e.stopPropagation(); close(); }}
            aria-label="Закрыть"
          >
            ✕
          </button>

          <button
            className="lightbox-btn lightbox-arrow absolute left-4 md:left-8 top-1/2 -translate-y-1/2"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Предыдущее фото"
          >
            ‹
          </button>

          <button
            className="lightbox-btn lightbox-arrow absolute right-4 md:right-8 top-1/2 -translate-y-1/2"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Следующее фото"
          >
            ›
          </button>

          <img
            key={current.url}
            src={current.url}
            alt={current.title}
            className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "lightboxFade 0.45s ease both" }}
          />
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-cormorant text-white/70 text-lg tracking-widest">
            {current.title}{" "}
            <span className="text-white/40 text-sm ml-2">
              {(lightboxIndex ?? 0) + 1} / {photos.length}
            </span>
          </p>
        </div>
      )}

      <style>{`
        @keyframes aboutFadeUp {
          0% { opacity: 0; transform: translateY(36px); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes galleryFadeUp {
          0% { opacity: 0; transform: translateY(40px) scale(0.96); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes lightboxFade {
          0% { opacity: 0; transform: scale(0.96); filter: blur(6px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }
        .lightbox-btn {
          background: rgba(10,10,10,0.5);
          border: 1px solid rgba(61,90,254,0.5);
          color: #fff;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          backdrop-filter: blur(6px);
          transition: all 0.25s ease;
          cursor: pointer;
        }
        .lightbox-arrow {
          font-size: 2.2rem;
          line-height: 1;
          padding-bottom: 4px;
        }
        .lightbox-btn:hover {
          background: rgba(61,90,254,0.25);
          border-color: #3d5afe;
          box-shadow: 0 0 18px rgba(61,90,254,0.6);
          transform: scale(1.08);
        }
        .lightbox-arrow:hover {
          transform: translateY(-50%) scale(1.08);
        }
      `}</style>
    </PageLayout>
  );
}
