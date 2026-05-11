import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SLIDES = [
  "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/13b7f9a1-9c9e-425e-8e32-eaa1d4bf7949.jpg",
  "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/412cf605-90a0-41f4-a942-e1f96b3b4bb4.jpg",
  "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/e4a28344-5258-4170-9303-6f059e961e57.jpg",
  "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/cb26e28d-9158-47b5-85f9-f17fd4524c78.jpg",
  "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/bf5a658d-7a5d-4d46-842d-2a7d228e314f.jpg",
];

const NAV_ITEMS = [
  { label: "Главная", path: "/" },
  { label: "Обо мне", path: "/about" },
  { label: "Фотогалерея", path: "/gallery" },
  { label: "Контакты", path: "/contacts" },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setPrev(current);
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const go = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="grain min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Слайды фона */}
      {SLIDES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <img src={src} alt="" className="w-full h-full object-cover opacity-50" />
        </div>
      ))}
      <div className="absolute inset-0 z-10" style={{ background: "hsl(204,60%,10%,0.6)" }} />

      {/* Навбар */}
      <div className="relative z-20 px-8 md:px-16 py-4 flex items-center justify-between">
        <span
          className="font-cormorant text-4xl italic cursor-pointer"
          style={{ color: "#ff1a1a", textShadow: "0 0 10px rgba(255,26,26,0.6)" }}
          onClick={() => go("/")}
        >
          Сладкие Грёз
          <span className="relative inline-block">
            ы
            <span
              className="absolute left-1/2 -translate-x-1/2 text-lg select-none"
              style={{ top: "-0.6em", filter: "drop-shadow(0 0 8px rgba(255,26,26,0.7))" }}
            >
              🍓
            </span>
          </span>
        </span>

        <div className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-1.5 p-2">
            <span className={`block w-6 h-px bg-foreground transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-px bg-foreground transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-foreground transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>

          {menuOpen && (
            <div
              className="absolute top-full right-0 mt-3 flex flex-col min-w-[180px] border border-border/40 overflow-hidden"
              style={{ background: "rgba(10,10,10,0.97)" }}
            >
              {NAV_ITEMS.map(({ label, path }) => (
                <button
                  key={label}
                  onClick={() => go(path)}
                  className="font-cormorant text-xl italic text-left px-6 py-3 text-foreground/80 hover:text-accent hover:bg-white/5 transition-colors duration-200 border-b border-border/20 last:border-0"
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Точки-индикаторы */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setPrev(current); setCurrent(i); }}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{ background: i === current ? "#ff1a1a" : "rgba(255,255,255,0.3)", transform: i === current ? "scale(1.4)" : "scale(1)" }}
          />
        ))}
      </div>
    </div>
  );
}