import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const BG_IMAGE = "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/6630b2d3-52cb-4fb4-bc6d-c7badbb528bf.jpg";

const NAV_ITEMS = [
  { label: "Главная", path: "/" },
  { label: "Обо мне", path: "/about" },
  { label: "Фотогалерея", path: "/gallery" },
];

export default function Home() {
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
    <div className="grain min-h-screen bg-background text-foreground relative overflow-hidden" style={{ cursor: "none" }}>
      <div ref={cursorRef} className="cursor hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />

      {/* Фон */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <img
          src={BG_IMAGE}
          alt=""
          className="w-full h-full object-cover opacity-85"
          style={{
            objectPosition: "65% 25%",
            filter: "contrast(1.08) saturate(1.12) brightness(0.92)",
            imageRendering: "crisp-edges",
          }}
          loading="eager"
          decoding="sync"
        />
      </div>
      <div className="absolute inset-0" style={{ background: "rgba(10,10,10,0.45)", zIndex: 2, animation: "bgFade 1.6s ease-out both" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(255,200,90,0.45) 0%, rgba(255,160,50,0.22) 35%, transparent 55%, rgba(180,20,30,0.32) 100%)", mixBlendMode: "overlay", zIndex: 3 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 18% 22%, rgba(255,210,120,0.35) 0%, transparent 35%)", mixBlendMode: "screen", zIndex: 3, animation: "candleFlicker 5.5s ease-in-out infinite" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.35) 0%, transparent 35%, transparent 50%, rgba(10,10,10,0.6) 85%, rgba(10,10,10,0.9) 100%)", zIndex: 4 }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.6) 100%)", zIndex: 5 }} />

      {/* Навбар */}
      <div className="relative px-6 md:px-12 pt-6 pb-3 flex items-center justify-between gap-6" style={{ zIndex: 30 }}>
        <span
          className="font-cormorant italic font-bold inline-block"
          style={{ cursor: "none", fontSize: "clamp(1.75rem, 2.8vw, 2.8rem)", lineHeight: 1, fontWeight: 700, paddingTop: "0.35em", animation: "fadeUp 1.1s ease-out 0s both" }}
          onClick={() => go("/")}
        >
          <span style={{ color: "#ff1a1a", textShadow: "0 0 10px rgba(255,26,26,0.6)" }}>Сладкие</span>
          <span className="inline-block select-none align-middle" style={{ fontSize: "0.7em", margin: "0 0.15em", filter: "drop-shadow(0 0 8px rgba(255,26,26,0.7))" }}>🍓</span>
          <span style={{ color: "#3d5afe", textShadow: "0 0 10px rgba(61,90,254,0.75), 0 0 18px rgba(61,90,254,0.45)", animation: "neonBlue 2.8s ease-in-out infinite" }}>Грёзы</span>
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

      {/* Центральный текст */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 pointer-events-none" style={{ zIndex: 20 }}>
        <h1 className="font-cormorant text-6xl md:text-8xl font-semibold italic mb-6" style={{ color: "rgba(255,255,255,0.95)", textShadow: "0 2px 30px rgba(0,0,0,0.85), 0 0 18px rgba(0,0,0,0.6)", animation: "fadeUp 1.1s ease-out 0.1s both" }}>
          Привет, я Эльвира
        </h1>
        <p className="font-cormorant text-4xl md:text-6xl italic mb-10" style={{ color: "rgba(255,255,255,0.92)", textShadow: "0 2px 20px rgba(0,0,0,0.8), 0 0 14px rgba(0,0,0,0.5)", animation: "fadeUp 1.1s ease-out 0.5s both, shimmer 2.6s ease-in-out 1.6s infinite" }}>
          Встретимся?
        </p>
        <div
          aria-disabled
          className="flex items-center gap-3 px-8 py-4 rounded-full border-2"
          style={{ borderColor: "#ff1a1a", background: "rgba(255,26,26,0.08)", boxShadow: "0 0 20px rgba(255,26,26,0.3)", animation: "fadeUp 1.1s ease-out 0.9s both, pulseBtn 2.4s ease-in-out 2s infinite", transformOrigin: "center", pointerEvents: "none", userSelect: "none" }}
        >
          <span className="text-xl" style={{ animation: "ring 1.8s ease-in-out infinite", display: "inline-block", transformOrigin: "top center" }}>📞</span>
          <span className="font-cormorant text-2xl italic tracking-wider" style={{ color: "#fff", textShadow: "0 0 12px rgba(255,26,26,0.7)", animation: "shimmerPhone 2.6s ease-in-out infinite" }}>
            8 (917) 986-51-98
          </span>
        </div>

        <button
          onClick={() => navigate("/contacts")}
          className="pointer-events-auto font-cormorant text-lg italic px-8 py-3 rounded-full border-2 transition-all duration-300 mt-6"
          style={{ borderColor: "#3d5afe", color: "#fff", textShadow: "0 0 12px rgba(61,90,254,0.8)", background: "rgba(61,90,254,0.08)", cursor: "none", animation: "fadeUp 1.1s ease-out 1.2s both, pulseContactsBlue 2.4s ease-in-out 2.3s infinite", transformOrigin: "center", boxShadow: "0 0 20px rgba(61,90,254,0.3)" }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = "0 0 40px rgba(61,90,254,0.6)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = "0 0 20px rgba(61,90,254,0.3)";
          }}
        >
          Контакты
        </button>
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
        @keyframes shimmer {
          0%, 100% { opacity: 0.75; text-shadow: 0 2px 20px rgba(0,0,0,0.7), 0 0 8px rgba(255,255,255,0.2); }
          50% { opacity: 1; text-shadow: 0 2px 20px rgba(0,0,0,0.7), 0 0 28px rgba(255,255,255,0.7), 0 0 50px rgba(255,26,26,0.35); }
        }
        @keyframes shimmerPhone {
          0%, 100% { opacity: 0.85; text-shadow: 0 0 12px rgba(255,26,26,0.7); }
          50% { opacity: 1; text-shadow: 0 0 18px rgba(255,255,255,0.6), 0 0 32px rgba(255,26,26,0.85); }
        }
        @keyframes pulseBtn {
          0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(255,26,26,0.3); }
          50% { transform: scale(1.04); box-shadow: 0 0 35px rgba(255,26,26,0.55); }
        }
        @keyframes neonBlue {
          0%, 100% { text-shadow: 0 0 10px rgba(61,90,254,0.55), 0 0 18px rgba(61,90,254,0.3); opacity: 0.92; }
          50% { text-shadow: 0 0 14px rgba(61,90,254,1), 0 0 28px rgba(61,90,254,0.7), 0 0 48px rgba(61,90,254,0.4); opacity: 1; }
        }
        @keyframes menuFade {
          0% { opacity: 0; transform: translateY(-8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes menuItemFade {
          0% { opacity: 0; transform: translateY(-10px); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes pulseContactsBlue {
          0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(61,90,254,0.3); }
          50% { transform: scale(1.04); box-shadow: 0 0 35px rgba(61,90,254,0.65); }
        }
        @keyframes pulseContacts {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 rgba(255,255,255,0); border-color: rgba(255,255,255,0.3); }
          50% { transform: scale(1.04); box-shadow: 0 0 20px rgba(255,255,255,0.25); border-color: rgba(255,255,255,0.55); }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(28px); filter: blur(6px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes bgFade {
          0% { background: rgba(10,10,10,0.95); }
          100% { background: rgba(10,10,10,0.45); }
        }
        @keyframes candleFlicker {
          0%, 100% { opacity: 0.9; transform: scale(1) translate(0, 0); filter: blur(0px); }
          18% { opacity: 1; transform: scale(1.04) translate(0.4%, -0.5%); }
          32% { opacity: 0.75; transform: scale(0.98) translate(-0.3%, 0.4%); filter: blur(0.4px); }
          47% { opacity: 1; transform: scale(1.05) translate(0.5%, 0.2%); }
          63% { opacity: 0.82; transform: scale(0.99) translate(-0.2%, -0.4%); filter: blur(0.3px); }
          78% { opacity: 1; transform: scale(1.03) translate(0.3%, 0.3%); }
          92% { opacity: 0.88; transform: scale(1) translate(0, -0.2%); }
        }

      `}</style>
    </div>
  );
}