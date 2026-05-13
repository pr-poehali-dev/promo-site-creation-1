import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BG_IMAGE = "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/8e6982bc-52ae-4eb8-a0f2-0ae568aca7e7.jpg";

export default function Home() {
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

  const go = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden" style={{ cursor: "none" }}>
      <div ref={cursorRef} className="cursor hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />

      {/* Фон */}
      <div className="absolute inset-0" style={{ zIndex: 1 }}>
        <img
          src={BG_IMAGE}
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: "65% 25%" }}
          loading="eager"
          decoding="sync"
        />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.35) 15%, transparent 30%, transparent 45%, rgba(10,10,10,0.55) 65%, rgba(10,10,10,0.85) 82%, rgba(0,0,0,0.95) 100%)",
          zIndex: 2,
        }}
      />

      {/* Навбар */}
      <div className="relative px-6 md:px-12 pt-6 pb-3 flex items-center justify-between gap-6 flex-wrap" style={{ zIndex: 30 }}>
        <span
          className="font-cormorant italic font-bold inline-block"
          style={{ cursor: "none", fontSize: "clamp(1.75rem, 2.8vw, 2.8rem)", lineHeight: 1, fontWeight: 700, paddingTop: "0.35em", marginLeft: "clamp(1rem, 4vw, 4rem)", animation: "fadeUp 1.1s ease-out 0s both" }}
          onClick={() => go("/")}
        >
          <span style={{ color: "#ff1a1a", textShadow: "0 0 10px rgba(255,26,26,0.6)" }}>Сладкие</span>
          <span className="inline-block select-none align-middle" style={{ fontSize: "0.7em", margin: "0 0.15em" }}>🍓</span>
          <span style={{ color: "#3d5afe", textShadow: "0 0 10px rgba(61,90,254,0.75), 0 0 18px rgba(61,90,254,0.45)" }}>Грёзы</span>
        </span>

        <nav className="flex items-center gap-4 md:gap-8 flex-wrap">
          {[
            { label: "Главная", path: "/" },
            { label: "Обо мне", path: "/about" },
            { label: "Фотогалерея", path: "/gallery" },
            { label: "Контакты", path: "/contacts" },
          ].map(({ label, path }) => {
            const isActive = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => go(path)}
                className={`top-nav-link font-cormorant italic px-5 py-3 ${isActive ? "is-active" : ""}`}
                style={{ cursor: "none", fontSize: "clamp(1.25rem, 1.8vw, 1.75rem)" }}
              >
                {label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Центральный текст */}
      <div className="absolute inset-0 flex flex-col items-center text-center px-8 pointer-events-none" style={{ zIndex: 20, paddingTop: "66vh" }}>
        <h1 className="text-6xl md:text-8xl font-semibold italic mb-1 leading-none" style={{ fontFamily: '"Playfair Display", serif', color: "rgba(255,255,255,0.95)", textShadow: "0 2px 30px rgba(0,0,0,0.85), 0 0 18px rgba(0,0,0,0.6)", letterSpacing: "0.01em", animation: "fadeUp 1.1s ease-out 0.1s both, shimmerHero 2.6s ease-in-out 1.4s infinite" }}>
          Твой роскошный отдых
        </h1>
        <p className="font-cormorant text-4xl md:text-6xl italic mb-4 leading-none" style={{ color: "rgba(255,255,255,0.92)", textShadow: "0 2px 20px rgba(0,0,0,0.8)", animation: "fadeUp 1.1s ease-out 0.5s both" }}>
          Встретимся?
        </p>
        <a
          href="tel:+79869852111"
          onClick={(e) => {
            e.stopPropagation();
            window.location.href = "tel:+79869852111";
          }}
          role="button"
          aria-label="Позвонить по номеру 8 986 985 21 11"
          className="pointer-events-auto cursor-pointer inline-flex items-center gap-3 font-cormorant italic px-7 py-3 rounded-full border border-white/50 backdrop-blur-sm hover:border-white hover:scale-105 transition-all duration-300 select-none"
          style={{
            color: "#fff",
            background: "rgba(61,90,254,0.22)",
            boxShadow:
              "0 0 18px rgba(61,90,254,0.35), 0 0 40px rgba(61,90,254,0.18), inset 0 0 10px rgba(255,255,255,0.08)",
            textShadow: "0 2px 12px rgba(0,0,0,0.7)",
            fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
            position: "relative",
            zIndex: 50,
            animation: "fadeUp 1.1s ease-out 0.9s both",
          }}
        >
          <span style={{ fontSize: "1.1em" }}>📞</span>
          <span>8 (986) 985-21-11</span>
        </a>
      </div>

      <style>{`
        @keyframes shimmer {
          0%, 100% { opacity: 0.75; text-shadow: 0 2px 20px rgba(0,0,0,0.7), 0 0 8px rgba(255,255,255,0.2); }
          50% { opacity: 1; text-shadow: 0 2px 20px rgba(0,0,0,0.7), 0 0 28px rgba(255,255,255,0.7), 0 0 50px rgba(61,90,254,0.45); }
        }
        @keyframes shimmerHero {
          0%, 100% { text-shadow: 0 2px 30px rgba(0,0,0,0.85), 0 0 18px rgba(0,0,0,0.6), 0 0 10px rgba(61,90,254,0.25); }
          50% { text-shadow: 0 2px 30px rgba(0,0,0,0.85), 0 0 22px rgba(255,255,255,0.55), 0 0 60px rgba(61,90,254,0.55); }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(28px); filter: blur(6px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes phoneGlow {
          0%, 100% {
            box-shadow:
              0 0 24px rgba(61,90,254,0.65),
              0 0 50px rgba(61,90,254,0.45),
              0 0 90px rgba(61,90,254,0.25),
              inset 0 0 14px rgba(255,255,255,0.12);
          }
          50% {
            box-shadow:
              0 0 38px rgba(61,90,254,1),
              0 0 78px rgba(61,90,254,0.75),
              0 0 130px rgba(61,90,254,0.5),
              inset 0 0 22px rgba(255,255,255,0.22);
          }
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