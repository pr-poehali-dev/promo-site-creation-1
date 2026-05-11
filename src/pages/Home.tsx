import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

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
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrev(current);
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
      if (ringRef.current) {
        ringRef.current.style.left = e.clientX + "px";
        ringRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const go = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="grain min-h-screen bg-background text-foreground relative overflow-hidden" style={{ cursor: "none" }}>
      <div ref={cursorRef} className="cursor hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />

      {/* Слайды фона */}
      {SLIDES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0, zIndex: 1 }}
        >
          <img src={src} alt="" className="w-full h-full object-cover opacity-50" />
        </div>
      ))}
      <div className="absolute inset-0" style={{ background: "rgba(10,10,10,0.55)", zIndex: 2 }} />

      {/* Навбар */}
      <div className="relative px-8 md:px-16 py-4 flex items-center justify-between" style={{ zIndex: 30 }}>
        <span
          className="font-cormorant text-4xl italic"
          style={{ color: "#ff1a1a", textShadow: "0 0 10px rgba(255,26,26,0.6)", cursor: "none" }}
          onClick={() => go("/")}
        >
          Сладкие Грёз
          <span className="relative inline-block">
            ы
            <span className="absolute left-1/2 -translate-x-1/2 text-lg select-none" style={{ top: "-0.6em", filter: "drop-shadow(0 0 8px rgba(255,26,26,0.7))" }}>
              🍓
            </span>
          </span>
        </span>

        <div className="relative">
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-1.5 p-2" style={{ cursor: "none" }}>
            <span className={`block w-6 h-px bg-foreground transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-px bg-foreground transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-foreground transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>

          {menuOpen && (
            <div
              className="fixed top-16 right-8 md:right-16 flex flex-col min-w-[180px] border border-border/40 overflow-hidden"
              style={{ background: "rgba(10,10,10,0.97)", zIndex: 99999 }}
            >
              {NAV_ITEMS.map(({ label, path }) => (
                <button
                  key={label}
                  onClick={() => go(path)}
                  className="font-cormorant text-xl italic text-left px-6 py-3 text-foreground/80 hover:text-accent hover:bg-white/5 transition-colors duration-200 border-b border-border/20 last:border-0"
                  style={{ cursor: "none" }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Центральный текст */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 pointer-events-none" style={{ zIndex: 20 }}>
        <h1 className="font-cormorant text-6xl md:text-8xl font-semibold italic mb-6" style={{ color: "#fff", textShadow: "0 2px 30px rgba(0,0,0,0.8)" }}>
          Привет, я Эльвира
        </h1>
        <p className="font-cormorant text-2xl md:text-3xl italic mb-10" style={{ color: "rgba(255,255,255,0.75)", textShadow: "0 2px 20px rgba(0,0,0,0.7)" }}>
          Хочешь со мной встретиться?
        </p>
        <a
          href="tel:+79179865198"
          className="pointer-events-auto flex items-center gap-3 px-8 py-4 rounded-full border-2 transition-all duration-300"
          style={{ borderColor: "#ff1a1a", background: "rgba(255,26,26,0.08)", boxShadow: "0 0 20px rgba(255,26,26,0.3)" }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 40px rgba(255,26,26,0.6)")}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 20px rgba(255,26,26,0.3)")}
        >
          <span className="text-xl" style={{ animation: "ring 1.8s ease-in-out infinite", display: "inline-block", transformOrigin: "top center" }}>📞</span>
          <span className="font-cormorant text-2xl italic tracking-wider" style={{ color: "#fff", textShadow: "0 0 12px rgba(255,26,26,0.7)" }}>
            8 (917) 986-51-98
          </span>
        </a>

        <button
          onClick={() => navigate("/services")}
          className="pointer-events-auto font-cormorant text-lg italic px-8 py-3 rounded-full border transition-colors duration-200 mt-6"
          style={{ borderColor: "rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.75)", background: "transparent", cursor: "none" }}
        >
          Мои услуги
        </button>
      </div>

      {/* Точки-индикаторы */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3" style={{ zIndex: 20 }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setPrev(current); setCurrent(i); }}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{ background: i === current ? "#ff1a1a" : "rgba(255,255,255,0.3)", transform: i === current ? "scale(1.4)" : "scale(1)", cursor: "none" }}
          />
        ))}
      </div>

      <style>{`
        @keyframes ring {
          0%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(15deg); }
          20% { transform: rotate(-12deg); }
          30% { transform: rotate(10deg); }
          40% { transform: rotate(-8deg); }
          50% { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
}