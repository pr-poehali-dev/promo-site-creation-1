import { useCallback, useEffect, useRef, useState } from "react";
import PageLayout from "@/components/PageLayout";

const GALLERY = [
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/25ebae46-7ba9-4578-bf0d-143b11e13dd7.jpg", title: "Прогулка" },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/6cb55b51-beaf-4c4b-9929-88ec189dcc88.jpg", title: "Сцена" },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/9fc2dbd6-6a08-418e-9843-54336b1f1d73.jpg", title: "Грация" },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/d7bec23c-93fa-4969-bdcd-be1720513233.jpg", title: "Этюд" },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/d0e31965-0530-42d8-9995-d734d1d1b20a.jpg", title: "Взгляд" },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/3138f5f3-691c-46f7-b827-5eec91cdebe7.jpg", title: "Корсет" },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/65750f7a-e45e-4678-b25d-19065f8f9879.jpg", title: "Поездка" },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/15ce670a-19b9-4685-b85f-76e994429bf1.jpg", title: "Профиль" },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/fbc1b343-4159-4b67-85da-5a4f918ea00d.jpg", title: "Энергия" },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/613e002a-001c-4a4e-912f-90b75833213c.jpg", title: "Портрет" },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/d99d0679-23e1-4500-8e59-063e0bc3088d.jpg", title: "Лёгкость" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Gallery() {
  const [items] = useState(() => shuffle(GALLERY));
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }, [items.length]);
  const next = useCallback(() => {
    setIndex((i) => (i + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const current = items[index];

  return (
    <PageLayout>
      <section className="relative px-4 md:px-12 pt-4 md:pt-6 pb-10">
        <div className="max-w-6xl mx-auto">
          <div
            className="slideshow"
            style={{ animation: "aboutFadeLeft 1.3s cubic-bezier(0.22,1,0.36,1) 0.2s both" }}
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
              className="slide-arrow slide-arrow-left"
              onClick={prev}
              aria-label="Предыдущее фото"
            >
              ‹
            </button>

            <div className="slide-frame">
              <img
                key={current.img}
                src={current.img}
                alt={current.title}
                className="slide-img"
              />
            </div>

            <button
              className="slide-arrow slide-arrow-right"
              onClick={next}
              aria-label="Следующее фото"
            >
              ›
            </button>
          </div>

          <p
            className="slide-caption font-cormorant"
            style={{ animation: "aboutFadeRight 1s cubic-bezier(0.22,1,0.36,1) 0.45s both" }}
          >
            <span className="slide-counter">
              {index + 1} / {items.length}
            </span>
          </p>

          <div
            className="thumbs"
            style={{ animation: "aboutFadeUp 1.1s cubic-bezier(0.22,1,0.36,1) 0.6s both" }}
          >
            {items.map((item, i) => (
              <button
                key={item.img}
                className={`thumb ${i === index ? "is-active" : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Открыть фото: ${item.title}`}
              >
                <img src={item.img} alt={item.title} />
              </button>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes aboutFadeUp {
          0% { opacity: 0; transform: translateY(36px); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes aboutFadeLeft {
          0% { opacity: 0; transform: translateX(-50px); filter: blur(8px); }
          100% { opacity: 1; transform: translateX(0); filter: blur(0); }
        }
        @keyframes aboutFadeRight {
          0% { opacity: 0; transform: translateX(40px); filter: blur(6px); }
          100% { opacity: 1; transform: translateX(0); filter: blur(0); }
        }
        @keyframes slideFade {
          0% { opacity: 0; transform: scale(0.98); filter: blur(6px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }
        .slideshow {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .slide-frame {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(10,10,10,0.55);
          border: 1px solid rgba(61,90,254,0.25);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 18px 60px rgba(0,0,0,0.55);
        }
        .slide-img {
          width: 100%;
          height: clamp(360px, 70vh, 760px);
          object-fit: contain;
          background: #050505;
          animation: slideFade 0.5s ease both;
        }
        .slide-arrow {
          flex-shrink: 0;
          width: 56px;
          height: 56px;
          font-size: 2.4rem;
          line-height: 1;
          padding-bottom: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(10,10,10,0.5);
          border: 1px solid rgba(61,90,254,0.5);
          color: #fff;
          border-radius: 999px;
          backdrop-filter: blur(6px);
          transition: all 0.25s ease;
          cursor: pointer;
        }
        .slide-arrow:hover {
          background: rgba(61,90,254,0.28);
          border-color: #3d5afe;
          box-shadow: 0 0 22px rgba(61,90,254,0.65);
          transform: scale(1.08);
        }
        .slide-caption {
          text-align: center;
          margin-top: 18px;
          color: rgba(255,255,255,0.85);
          font-style: italic;
          letter-spacing: 0.08em;
          font-size: clamp(1.1rem, 1.8vw, 1.5rem);
        }
        .slide-counter {
          margin-left: 14px;
          color: rgba(255,255,255,0.45);
          font-size: 0.85em;
        }
        .thumbs {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 22px;
        }
        .thumb {
          width: 72px;
          height: 72px;
          padding: 0;
          border: 2px solid rgba(255,255,255,0.18);
          border-radius: 6px;
          overflow: hidden;
          background: #050505;
          cursor: pointer;
          transition: all 0.25s ease;
          opacity: 0.55;
        }
        .thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .thumb:hover {
          opacity: 1;
          border-color: rgba(61,90,254,0.6);
        }
        .thumb.is-active {
          opacity: 1;
          border-color: #3d5afe;
          box-shadow: 0 0 14px rgba(61,90,254,0.6);
        }
        @media (max-width: 640px) {
          .slide-arrow { width: 44px; height: 44px; font-size: 2rem; }
          .thumb { width: 56px; height: 56px; }
        }
      `}</style>
    </PageLayout>
  );
}