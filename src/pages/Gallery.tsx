import { useCallback, useEffect, useRef, useState } from "react";
import PageLayout from "@/components/PageLayout";
import Icon from "@/components/ui/icon";

const GALLERY = [
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/25ebae46-7ba9-4578-bf0d-143b11e13dd7.jpg", title: "Прогулка", locked: false },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/6cb55b51-beaf-4c4b-9929-88ec189dcc88.jpg", title: "Сцена", locked: false },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/9fc2dbd6-6a08-418e-9843-54336b1f1d73.jpg", title: "Грация", locked: false },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/d7bec23c-93fa-4969-bdcd-be1720513233.jpg", title: "Этюд", locked: false },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/d0e31965-0530-42d8-9995-d734d1d1b20a.jpg", title: "Взгляд", locked: false },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/3138f5f3-691c-46f7-b827-5eec91cdebe7.jpg", title: "Корсет", locked: false },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/15ce670a-19b9-4685-b85f-76e994429bf1.jpg", title: "Профиль", locked: false },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/fbc1b343-4159-4b67-85da-5a4f918ea00d.jpg", title: "Энергия 18+", locked: true },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/613e002a-001c-4a4e-912f-90b75833213c.jpg", title: "Портрет 18+", locked: true },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/d99d0679-23e1-4500-8e59-063e0bc3088d.jpg", title: "Лёгкость 18+", locked: true },
];

const LIKES_KEY = "sg_gallery_likes_v1";

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const tileRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LIKES_KEY);
      if (raw) setLikes(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const toggleLike = useCallback((img: string) => {
    setLikes((prev) => {
      const next = { ...prev, [img]: !prev[img] };
      try {
        localStorage.setItem(LIKES_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i - 1 + GALLERY.length) % GALLERY.length));
  }, []);
  const next = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % GALLERY.length));
  }, []);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex, close, prev, next]);

  const handleTilt = (i: number) => (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tileRefs.current[i];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (py - 0.5) * -10;
    const ry = (px - 0.5) * 12;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.03, 1.03, 1.03)`;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };
  const resetTilt = (i: number) => () => {
    const el = tileRefs.current[i];
    if (!el) return;
    el.style.transform = "";
  };

  const total = GALLERY.length;
  const likedCount = Object.values(likes).filter(Boolean).length;
  const current = openIndex !== null ? GALLERY[openIndex] : null;

  return (
    <PageLayout>
      <section className="relative px-3 sm:px-4 md:px-12 pt-4 md:pt-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div
            className="flex items-end justify-between flex-wrap gap-3 mb-6 md:mb-8"
            style={{ animation: "aboutFadeLeft 1s cubic-bezier(0.22,1,0.36,1) 0.1s both" }}
          >
            <div>
              <h2
                className="font-cormorant italic font-bold leading-none"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#fff" }}
              >
                Фотогалерея
              </h2>
              <p className="text-white/55 text-sm md:text-base mt-2 font-light">
                {total} снимков · наведи на фото для эффекта объёма
              </p>
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Icon name="Heart" size={16} className="text-[#ff4d6d]" />
              <span>
                В избранном: <span className="text-white font-medium">{likedCount}</span>
              </span>
            </div>
          </div>

          <div className="masonry">
            {GALLERY.map((item, i) => (
              <div
                key={item.img}
                ref={(el) => (tileRefs.current[i] = el)}
                className={`tile ${item.locked ? "is-locked" : ""}`}
                onMouseMove={handleTilt(i)}
                onMouseLeave={resetTilt(i)}
                style={{ animation: `tileIn 0.7s cubic-bezier(0.22,1,0.36,1) ${0.05 * i}s both` }}
              >
                <div className="tile-inner" onClick={() => setOpenIndex(i)}>
                  <img src={item.img} alt={item.title} loading="lazy" />
                  <div className="tile-shine" />
                  {item.locked && (
                    <div className="tile-lock">
                      <Icon name="Lock" size={28} />
                      <span>Доступно по запросу</span>
                    </div>
                  )}
                  <div className="tile-overlay">
                    <span className="tile-title">{item.title}</span>
                    <span className="tile-zoom">
                      <Icon name="ZoomIn" size={18} />
                    </span>
                  </div>
                </div>
                <button
                  className={`like-btn ${likes[item.img] ? "is-liked" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(item.img);
                  }}
                  aria-label="В избранное"
                >
                  <Icon name="Heart" size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {openIndex !== null && current && (
        <div className="lightbox" onClick={close} role="dialog" aria-modal="true">
          <button
            className="lightbox-close"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Закрыть"
          >
            <Icon name="X" size={22} />
          </button>
          <button
            className="lightbox-arrow lightbox-arrow-left"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Предыдущее"
          >
            ‹
          </button>
          <div className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
            <img
              key={current.img}
              src={current.img}
              alt={current.title}
              className={`lightbox-img ${current.locked ? "is-blurred" : ""}`}
            />
            {current.locked && (
              <div className="lightbox-lock">
                <Icon name="Lock" size={36} />
                <p>Это фото 18+ — доступно по запросу</p>
                <span>Свяжитесь через раздел «Контакты»</span>
              </div>
            )}
            <div className="lightbox-caption">
              <span>{current.title}</span>
              <span className="lightbox-counter">
                {openIndex + 1} / {GALLERY.length}
              </span>
            </div>
          </div>
          <button
            className="lightbox-arrow lightbox-arrow-right"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Следующее"
          >
            ›
          </button>
        </div>
      )}

      <style>{`
        @keyframes tileIn {
          0% { opacity: 0; transform: translateY(24px) scale(0.97); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes lightboxFade {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes lightboxZoom {
          0% { opacity: 0; transform: scale(0.94); filter: blur(8px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }

        .masonry {
          column-count: 3;
          column-gap: 14px;
        }
        @media (max-width: 900px) {
          .masonry { column-count: 2; column-gap: 10px; }
        }
        @media (max-width: 520px) {
          .masonry { column-count: 1; }
        }

        .tile {
          position: relative;
          break-inside: avoid;
          margin: 0 0 14px;
          border-radius: 8px;
          overflow: visible;
          transform-style: preserve-3d;
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease;
          will-change: transform;
        }
        .tile:hover {
          z-index: 5;
          box-shadow: 0 30px 60px rgba(0,0,0,0.7), 0 0 30px rgba(61,90,254,0.35);
        }
        .tile-inner {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          cursor: zoom-in;
          isolation: isolate;
        }
        .tile-inner img {
          display: block;
          width: 100%;
          height: auto;
          filter: grayscale(15%) brightness(0.88);
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1), filter 0.4s ease;
        }
        .tile:hover .tile-inner img {
          transform: scale(1.08);
          filter: grayscale(0%) brightness(1);
        }

        /* Блик на наведении */
        .tile-shine {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.18), transparent 45%);
          opacity: 0;
          transition: opacity 0.3s ease;
          mix-blend-mode: screen;
          z-index: 3;
        }
        .tile:hover .tile-shine { opacity: 1; }

        /* Лок-эффект 18+ */
        .tile.is-locked .tile-inner img {
          filter: blur(14px) brightness(0.55) saturate(1.1);
          transform: scale(1.1);
        }
        .tile.is-locked:hover .tile-inner img {
          filter: blur(10px) brightness(0.7) saturate(1.2);
          transform: scale(1.12);
        }
        .tile-lock {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #fff;
          background: linear-gradient(180deg, rgba(10,10,10,0.25), rgba(10,10,10,0.55));
          z-index: 2;
          font-family: "Cormorant Garamond", serif;
          font-style: italic;
          letter-spacing: 0.04em;
          font-size: 0.95rem;
          text-shadow: 0 2px 14px rgba(0,0,0,0.85);
        }
        .tile-lock svg {
          filter: drop-shadow(0 0 12px rgba(255,77,109,0.85));
        }

        /* Подпись снизу */
        .tile-overlay {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          padding: 14px 14px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(to top, rgba(8,8,18,0.85) 0%, rgba(61,90,254,0.08) 60%, transparent 100%);
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          z-index: 2;
          color: #fff;
        }
        .tile:hover .tile-overlay {
          opacity: 1;
          transform: translateY(0);
        }
        .tile-title {
          font-family: "Cormorant Garamond", serif;
          font-style: italic;
          font-size: 1.05rem;
          letter-spacing: 0.04em;
        }
        .tile-zoom {
          width: 32px;
          height: 32px;
          border-radius: 999px;
          background: rgba(61,90,254,0.25);
          border: 1px solid rgba(61,90,254,0.55);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }

        /* Кнопка лайка */
        .like-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 36px;
          height: 36px;
          border-radius: 999px;
          background: rgba(10,10,10,0.55);
          border: 1px solid rgba(255,255,255,0.18);
          color: rgba(255,255,255,0.85);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          backdrop-filter: blur(6px);
          z-index: 4;
          transition: transform 0.2s ease, background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .like-btn:hover {
          transform: scale(1.12);
          border-color: rgba(255,77,109,0.6);
          color: #ff8aa0;
        }
        .like-btn.is-liked {
          background: rgba(255,77,109,0.18);
          border-color: #ff4d6d;
          color: #ff4d6d;
          box-shadow: 0 0 18px rgba(255,77,109,0.55);
          animation: likePop 0.45s cubic-bezier(0.22,1,0.36,1);
        }
        .like-btn.is-liked svg { fill: currentColor; }
        @keyframes likePop {
          0% { transform: scale(1); }
          40% { transform: scale(1.35); }
          100% { transform: scale(1); }
        }

        /* Lightbox */
        .lightbox {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0,0,0,0.94);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: lightboxFade 0.25s ease both;
          cursor: zoom-out;
        }
        .lightbox-stage {
          position: relative;
          max-width: 95vw;
          max-height: 92vh;
          cursor: default;
        }
        .lightbox-img {
          max-width: 95vw;
          max-height: 92vh;
          object-fit: contain;
          border-radius: 6px;
          box-shadow: 0 30px 90px rgba(0,0,0,0.85);
          animation: lightboxZoom 0.35s cubic-bezier(0.22,1,0.36,1) both;
          display: block;
        }
        .lightbox-img.is-blurred {
          filter: blur(22px) brightness(0.6);
          transform: scale(1.05);
        }
        .lightbox-lock {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #fff;
          text-align: center;
          padding: 24px;
          font-family: "Cormorant Garamond", serif;
        }
        .lightbox-lock p {
          font-size: 1.5rem;
          font-style: italic;
          margin: 0;
          text-shadow: 0 4px 24px rgba(0,0,0,0.9);
        }
        .lightbox-lock span {
          color: rgba(255,255,255,0.65);
          font-size: 0.95rem;
          letter-spacing: 0.05em;
        }
        .lightbox-lock svg {
          color: #ff4d6d;
          filter: drop-shadow(0 0 18px rgba(255,77,109,0.85));
        }
        .lightbox-caption {
          position: absolute;
          left: 0; right: 0; bottom: -42px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: rgba(255,255,255,0.75);
          font-family: "Cormorant Garamond", serif;
          font-style: italic;
          font-size: 1rem;
          padding: 0 4px;
        }
        .lightbox-counter {
          font-family: "IBM Plex Mono", monospace;
          font-style: normal;
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.55);
        }
        .lightbox-close {
          position: absolute;
          top: 18px;
          right: 22px;
          width: 44px;
          height: 44px;
          background: rgba(10,10,10,0.6);
          border: 1px solid rgba(61,90,254,0.5);
          color: #fff;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }
        .lightbox-close:hover {
          background: rgba(61,90,254,0.3);
          border-color: #3d5afe;
          box-shadow: 0 0 22px rgba(61,90,254,0.65);
          transform: scale(1.08);
        }
        .lightbox-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 56px;
          height: 56px;
          font-size: 2.4rem;
          line-height: 1;
          background: rgba(10,10,10,0.55);
          border: 1px solid rgba(61,90,254,0.45);
          color: #fff;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-bottom: 4px;
          backdrop-filter: blur(8px);
        }
        .lightbox-arrow:hover {
          background: rgba(61,90,254,0.3);
          border-color: #3d5afe;
          box-shadow: 0 0 24px rgba(61,90,254,0.65);
        }
        .lightbox-arrow-left { left: 24px; }
        .lightbox-arrow-right { right: 24px; }
        @media (max-width: 640px) {
          .lightbox-arrow { width: 44px; height: 44px; font-size: 1.8rem; }
          .lightbox-arrow-left { left: 8px; }
          .lightbox-arrow-right { right: 8px; }
        }
      `}</style>
    </PageLayout>
  );
}