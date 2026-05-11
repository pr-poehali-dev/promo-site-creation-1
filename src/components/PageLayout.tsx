import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const HERO_IMG = "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/files/c906dad4-5275-4aa1-a0e9-8b39ba15ca55.jpg";

const NAV_ITEMS = [
  { label: "Главная", path: "/" },
  { label: "Обо мне", path: "/about" },
  { label: "Фотогалерея", path: "/gallery" },
  { label: "Контакты", path: "/contacts" },
];

interface PageLayoutProps {
  children?: React.ReactNode;
  noBackground?: boolean;
}

export default function PageLayout({ children, noBackground }: PageLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

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
    <div className="grain min-h-screen bg-background text-foreground relative" style={{ cursor: "none" }}>
      <div ref={cursorRef} className="cursor hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />

      {!noBackground && (
        <div className="absolute inset-0 overflow-hidden">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0" style={{ background: "hsl(204,60%,10%)" }} />
        </div>
      )}

      <div className="relative z-10 px-8 md:px-16 py-4 flex items-center justify-between">
        <span
          className="font-cormorant text-4xl italic"
          style={{ color: "#ff1a1a", textShadow: "0 0 10px rgba(255,26,26,0.6)", cursor: "none" }}
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
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 p-2"
            style={{ cursor: "none" }}
          >
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
                  style={{ cursor: "none" }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}