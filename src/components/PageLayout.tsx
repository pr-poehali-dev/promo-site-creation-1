import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const HERO_IMG = "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/files/c906dad4-5275-4aa1-a0e9-8b39ba15ca55.jpg";

const NAV_LINKS = [
  { label: "Главная", path: "/" },
  { label: "Обо мне", path: "/about" },
  { label: "Фотогалерея", path: "/gallery" },
  { label: "Контакты", path: "/contacts" },
];

interface PageLayoutProps {
  children?: React.ReactNode;
  noBackground?: boolean;
  backgroundSlot?: React.ReactNode;
}

export default function PageLayout({ children, noBackground, backgroundSlot }: PageLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
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

  return (
    <div className="grain min-h-screen bg-background text-foreground relative" style={{ cursor: "none" }}>
      <div ref={cursorRef} className="cursor hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {backgroundSlot ? backgroundSlot : !noBackground && (
          <>
            <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0" style={{ background: "hsl(0,0%,2%)" }} />
          </>
        )}
      </div>

      <div className="relative z-10 px-6 md:px-12 pt-6 pb-3 flex items-center justify-between gap-6 flex-wrap">
        <span
          className="font-cormorant italic font-bold inline-block"
          style={{ cursor: "none", fontSize: "clamp(1.75rem, 2.8vw, 2.8rem)", lineHeight: 1, fontWeight: 700, paddingTop: "0.35em", marginLeft: "clamp(1rem, 4vw, 4rem)", animation: "logoFadeUp 1.1s ease-out 0s both" }}
          onClick={() => navigate("/")}
        >
          <span style={{ color: "#e30613", textShadow: "0 0 12px rgba(227,6,19,0.85), 0 0 22px rgba(227,6,19,0.45)" }}>Сладкие</span>
          <span className="inline-block select-none align-middle" style={{ fontSize: "0.7em", margin: "0 0.15em" }}>🍓</span>
          <span style={{ color: "#2541ff", textShadow: "0 0 12px rgba(37,65,255,0.9), 0 0 22px rgba(37,65,255,0.5)" }}>Грёзы</span>
        </span>

        <nav className="flex items-center gap-4 md:gap-8 flex-wrap">
          {NAV_LINKS.map(({ label, path }) => {
            const isActive = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={`top-nav-link font-cormorant italic px-5 py-3 ${isActive ? "is-active" : ""}`}
                style={{ cursor: "none", fontSize: "clamp(1.25rem, 1.8vw, 1.75rem)" }}
              >
                {label}
              </button>
            );
          })}
        </nav>
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
      `}</style>
    </div>
  );
}