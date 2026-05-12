import { useState } from "react";
import PageLayout from "@/components/PageLayout";

const GALLERY = [
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/bda19b9a-9369-47b6-ba30-b69a935602e5.jpg", title: "Студия" },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/de67aff0-5994-4139-92fa-81cba6775a5e.jpg", title: "Момент" },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/5b0e74aa-45b8-43e3-bd92-6545210e34fb.jpg", title: "Ночь" },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/9c318f77-b373-4bba-a816-af8f3ba9fbad.jpg", title: "Кресло" },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/65750f7a-e45e-4678-b25d-19065f8f9879.jpg", title: "Поездка" },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/d99d0679-23e1-4500-8e59-063e0bc3088d.jpg", title: "Лёгкость" },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/d0e31965-0530-42d8-9995-d734d1d1b20a.jpg", title: "Взгляд" },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/fbc1b343-4159-4b67-85da-5a4f918ea00d.jpg", title: "Энергия" },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<{ img: string; title: string } | null>(null);

  return (
    <PageLayout>
      <section className="relative px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <h1
            className="font-cormorant italic font-semibold text-center mb-12"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              color: "rgba(255,255,255,0.95)",
              textShadow: "0 2px 24px rgba(0,0,0,0.7), 0 0 20px rgba(61,90,254,0.25)",
              animation: "aboutFadeUp 1.1s cubic-bezier(0.22,1,0.36,1) 0.05s both",
            }}
          >
            Фотогалерея
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {GALLERY.map((item, i) => (
              <div
                key={i}
                className={`gallery-item cursor-pointer ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
                onClick={() => setLightbox(item)}
                style={{
                  animation: `galleryFadeUp 1s cubic-bezier(0.22,1,0.36,1) ${0.15 + i * 0.1}s both`,
                }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className={`w-full object-cover ${i === 0 ? "h-64 md:h-[480px]" : "h-48 md:h-56"}`}
                />
                <div className="overlay" />
                <div className="absolute bottom-0 left-0 p-4 z-10">
                  <p className="font-cormorant text-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-6 text-white/70 hover:text-white font-mono text-2xl transition-colors"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          <img
            src={lightbox.img}
            alt={lightbox.title}
            className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-cormorant text-white/60 text-lg tracking-widest">
            {lightbox.title}
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
      `}</style>
    </PageLayout>
  );
}
