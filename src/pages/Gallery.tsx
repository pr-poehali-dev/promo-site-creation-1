import { useCallback, useEffect, useRef, useState } from "react";
import PageLayout from "@/components/PageLayout";
import { GALLERY } from "@/components/gallery/data";
import GalleryHeader from "@/components/gallery/GalleryHeader";
import GalleryTile from "@/components/gallery/GalleryTile";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import GalleryStyles from "@/components/gallery/GalleryStyles";

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const tileRefs = useRef<Array<HTMLDivElement | null>>([]);

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
  };
  const resetTilt = (i: number) => () => {
    const el = tileRefs.current[i];
    if (!el) return;
    el.style.transform = "";
  };

  const total = GALLERY.length;
  const current = openIndex !== null ? GALLERY[openIndex] : null;

  return (
    <PageLayout>
      <section className="relative px-2 sm:px-3 md:px-4 pt-4 md:pt-8 pb-16">
        <div className="w-full">
          <GalleryHeader total={total} />

          <div className="masonry">
            {GALLERY.map((item, i) => (
              <GalleryTile
                key={item.img}
                ref={(el) => (tileRefs.current[i] = el)}
                item={item}
                index={i}
                onOpen={setOpenIndex}
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