import { useCallback, useEffect, useRef, useState } from "react";
import { GALLERY } from "./data";

export default function GallerySlideshow() {
  const slides = GALLERY.filter((it) => !it.locked);
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }, [slides.length]);
  const next = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) prev();
    else if (delta < -50) next();
    touchStartX.current = null;
  };

  if (slides.length === 0) return null;

  const current = slides[index];

  return (
    <div className="ss" style={{ animation: "aboutFadeUp 1s cubic-bezier(0.22,1,0.36,1) 0.2s both" }}>
      <div
        className="ss-stage"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <img key={current.img} src={current.img} alt={current.title} className="ss-img" />

        <button className="ss-arrow ss-arrow-left" onClick={prev} aria-label="Предыдущее">
          ‹
        </button>
        <button className="ss-arrow ss-arrow-right" onClick={next} aria-label="Следующее">
          ›
        </button>

        <div className="ss-caption">
          <span className="ss-title">{current.title}</span>
          <span className="ss-counter">
            {index + 1} / {slides.length}
          </span>
        </div>
      </div>

      <div className="ss-dots">
        {slides.map((s, i) => (
          <button
            key={s.img}
            className={`ss-dot ${i === index ? "is-active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={`Слайд ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
