import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const HERO_IMG = "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/files/c906dad4-5275-4aa1-a0e9-8b39ba15ca55.jpg";

const NAV_ITEMS = [
  { label: "Главная", path: "/" },
  { label: "Обо мне", path: "/about" },
  { label: "Фотогалерея", path: "/gallery" },
];

interface PageLayoutProps {
  children?: React.ReactNode;
  noBackground?: boolean;
  backgroundSlot?: React.ReactNode;
}

export default function PageLayout({ children, noBackground, backgroundSlot }: PageLayoutProps) {
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

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {backgroundSlot ? backgroundSlot : !noBackground && (
          <>
            <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0" style={{ background: "hsl(204,60%,10%)" }} />
          </>
        )}
      </div>

      <div className="relative z-10 px-6 md:px-12 pt-6 pb-3 flex items-center justify-between gap-6">
        <span
          className="font-cormorant italic font-bold inline-block"
          style={{ cursor: "none", fontSize: "clamp(1.75rem, 2.8vw, 2.8rem)", lineHeight: 1, fontWeight: 700, paddingTop: "0.35em", animation: "logoFadeUp 1.1s ease-out 0s both" }}
          onClick={() => go("/")}
        >
          <span style={{ color: "#ff1a1a", textShadow: "0 0 10px rgba(255,26,26,0.6)" }}>Сладкие</span>
          <span className="inline-block select-none align-middle" style={{ fontSize: "0.7em", margin: "0 0.15em", filter: "drop-shadow(0 0 8px rgba(255,26,26,0.7))" }}>🍓</span>
          <span style={{ color: "#3d5afe", textShadow: "0 0 10px rgba(61,90,254,0.75), 0 0 18px rgba(61,90,254,0.45)", animation: "neonBlue 2.8s ease-in-out infinite" }}>Грёзы</span>
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
              className="fixed top-16 right-8 md:right-16 flex flex-col min-w-[180px] border border-border/40 overflow-hidden"
              style={{ background: "rgba(10,10,10,0.97)", zIndex: 99999, animation: "menuFade 0.35s ease-out both" }}
            >
              {NAV_ITEMS.map(({ label, path }, idx) => (
                <button
                  key={label}
                  onClick={() => go(path)}
                  className="font-cormorant text-xl italic text-left px-6 py-3 text-foreground/80 hover:text-accent hover:bg-white/5 transition-colors duration-200 border-b border-border/20 last:border-0"
                  style={{ cursor: "none", animation: `menuItemFade 0.5s ease-out ${0.12 + idx * 0.08}s both` }}
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

      <style>{`
        @keyframes neonBlue {
          0%, 100% { text-shadow: 0 0 10px rgba(61,90,254,0.55), 0 0 18px rgba(61,90,254,0.3); opacity: 0.92; }
          50% { text-shadow: 0 0 14px rgba(61,90,254,1), 0 0 28px rgba(61,90,254,0.7), 0 0 48px rgba(61,90,254,0.4); opacity: 1; }
        }
        @keyframes logoFadeUp {
          0% { opacity: 0; transform: translateY(28px); filter: blur(6px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes menuFade {
          0% { opacity: 0; transform: translateY(-8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes menuItemFade {
          0% { opacity: 0; transform: translateY(-10px); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
      `}</style>
    </div>
  );
}