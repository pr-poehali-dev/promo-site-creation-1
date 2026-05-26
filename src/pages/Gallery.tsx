import { useCallback, useEffect, useRef, useState } from "react";
import PageLayout from "@/components/PageLayout";
import { GALLERY, LIKES_KEY } from "@/components/gallery/data";
import GalleryHeader from "@/components/gallery/GalleryHeader";
import GalleryTile from "@/components/gallery/GalleryTile";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import GalleryStyles from "@/components/gallery/GalleryStyles";

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
          <GalleryHeader total={total} likedCount={likedCount} />

          <div className="masonry">
            {GALLERY.map((item, i) => (
              <GalleryTile
                key={item.img}
                ref={(el) => (tileRefs.current[i] = el)}
                item={item}
                index={i}
                liked={!!likes[item.img]}
                onOpen={setOpenIndex}
                onToggleLike={toggleLike}
                onMouseMove={handleTilt(i)}
                onMouseLeave={resetTilt(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {openIndex !== null && current && (
        <GalleryLightbox
          current={current}
          index={openIndex}
          total={GALLERY.length}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}

      <GalleryStyles />
    </PageLayout>
  );
}
