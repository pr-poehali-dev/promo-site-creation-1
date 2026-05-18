import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

const CITIES = [
  { name: "Москва", slug: "moskva", region: "Москва и Московская область" },
  { name: "Санкт-Петербург", slug: "spb", region: "СПб и Ленинградская область" },
  { name: "Саратов", slug: "saratov", region: "Саратов и область" },
  { name: "Воронеж", slug: "voronezh", region: "Воронеж и область" },
  { name: "Самара", slug: "samara", region: "Самара и область" },
  { name: "Волгоград", slug: "volgograd", region: "Волгоград и область" },
];

export default function Contacts() {
  const location = useLocation();
  const [highlight, setHighlight] = useState<string | null>(null);

  useEffect(() => {
    if (location.hash.startsWith("#city-")) {
      const slug = location.hash.replace("#city-", "");
      const el = document.getElementById(`city-${slug}`);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          setHighlight(slug);
          setTimeout(() => setHighlight(null), 2400);
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <PageLayout noBackground>
      <div className="px-8 md:px-16 py-16">
        <div className="flex flex-col items-center gap-8">
          <a
            href="tel:+79869852111"
            className="flex items-center gap-3 sm:gap-5 group flex-nowrap whitespace-nowrap"
            style={{ animation: "aboutFadeUp 1.1s cubic-bezier(0.22,1,0.36,1) 0.1s both" }}
          >
            <span style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}>📞</span>
            <span
              className="font-cormorant italic tracking-wide group-hover:text-accent transition-colors duration-300 whitespace-nowrap"
              style={{
                color: "#fff",
                textShadow: "0 2px 24px rgba(0,0,0,0.85), 0 0 18px rgba(61,90,254,0.35)",
                fontSize: "clamp(1.5rem, 6vw, 5rem)",
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              8 (986) 985-21-11
            </span>
          </a>

          <a
            href="tel:+79869852111"
            className="inline-flex items-center gap-3 font-cormorant italic px-10 py-4 rounded-full border border-white/50 backdrop-blur-sm hover:border-white hover:scale-105 transition-all duration-300"
            style={{
              color: "#fff",
              background: "rgba(61,90,254,0.22)",
              boxShadow: "0 0 28px rgba(61,90,254,0.55), inset 0 0 14px rgba(255,255,255,0.1)",
              textShadow: "0 2px 12px rgba(0,0,0,0.7)",
              fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
              animation: "aboutFadeUp 1.1s cubic-bezier(0.22,1,0.36,1) 0.22s both",
            }}
          >
            <span style={{ fontSize: "1.15em" }}>☎️</span>
            <span>Позвонить</span>
          </a>

          <div
            className="flex items-center gap-4"
            style={{ animation: "aboutFadeUp 1.1s cubic-bezier(0.22,1,0.36,1) 0.35s both" }}
          >
            <span className="text-2xl">📍</span>
            <span
              className="font-cormorant text-2xl md:text-3xl italic"
              style={{ color: "rgba(255,255,255,0.85)", textShadow: "0 2px 16px rgba(0,0,0,0.75)" }}
            >
              г. Саратов
            </span>
          </div>

          <p
            className="font-cormorant italic text-center max-w-2xl mt-6 leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.92)",
              fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
              textShadow: "0 2px 16px rgba(0,0,0,0.7)",
              animation: "aboutFadeUp 1.1s cubic-bezier(0.22,1,0.36,1) 0.6s both",
            }}
          >
            По поводу встречи, звони по телефону указанный выше.{" "}
            <span style={{ whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: "0.35em", verticalAlign: "baseline" }}>
              <span style={{ color: "#ff4d6d", textShadow: "0 0 12px rgba(255,77,109,0.6)" }}>
                Целую
              </span>
              <span
                style={{
                  fontSize: "1.1em",
                  display: "inline-block",
                  lineHeight: 1,
                  transformOrigin: "center",
                  animation: "lipsPulse 2.4s ease-in-out infinite",
                }}
              >
                💋
              </span>
            </span>
          </p>

          <div
            className="w-full max-w-4xl mt-10 flex flex-col items-center gap-5"
            style={{ animation: "aboutFadeUp 1.1s cubic-bezier(0.22,1,0.36,1) 0.8s both" }}
          >
            <h2
              className="font-cormorant italic uppercase tracking-[0.35em]"
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "clamp(0.85rem, 1.2vw, 1.1rem)",
                textShadow: "0 2px 12px rgba(0,0,0,0.8)",
              }}
            >
              Города работы
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 w-full">
              {CITIES.map(({ name, slug, region }) => (
                <a
                  key={slug}
                  id={`city-${slug}`}
                  href="tel:+79869852111"
                  className={`city-card flex flex-col items-center text-center px-4 py-5 rounded-2xl border backdrop-blur-sm transition-all duration-500 ${highlight === slug ? "city-card-active" : ""}`}
                  style={{
                    borderColor: highlight === slug ? "rgba(255,77,109,0.9)" : "rgba(255,255,255,0.25)",
                    background: highlight === slug ? "rgba(255,77,109,0.18)" : "rgba(61,90,254,0.12)",
                    boxShadow: highlight === slug
                      ? "0 0 40px rgba(255,77,109,0.7), inset 0 0 18px rgba(255,255,255,0.15)"
                      : "0 0 18px rgba(61,90,254,0.25), inset 0 0 10px rgba(255,255,255,0.05)",
                    textDecoration: "none",
                    scrollMarginTop: "120px",
                  }}
                >
                  <span style={{ fontSize: "1.6rem", marginBottom: "0.35rem" }}>📍</span>
                  <span
                    className="font-cormorant italic"
                    style={{
                      color: "#fff",
                      fontSize: "clamp(1.1rem, 1.8vw, 1.6rem)",
                      fontWeight: 600,
                      lineHeight: 1.1,
                      textShadow: "0 2px 12px rgba(0,0,0,0.85)",
                    }}
                  >
                    {name}
                  </span>
                  <span
                    className="font-cormorant italic mt-1"
                    style={{
                      color: "rgba(255,255,255,0.65)",
                      fontSize: "clamp(0.75rem, 1vw, 0.95rem)",
                      textShadow: "0 2px 10px rgba(0,0,0,0.75)",
                    }}
                  >
                    {region}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .city-card:hover {
          transform: translateY(-3px) scale(1.02);
          border-color: rgba(255,255,255,0.85) !important;
          box-shadow: 0 0 32px rgba(61,90,254,0.6), inset 0 0 14px rgba(255,255,255,0.12) !important;
        }
        .city-card-active {
          animation: cityPulse 1.2s ease-in-out 2;
        }
        @keyframes cityPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes lipsPulse {
          0%, 100% { transform: scale(1) rotate(-6deg); filter: drop-shadow(0 0 6px rgba(255,77,109,0.5)); }
          50% { transform: scale(1.15) rotate(6deg); filter: drop-shadow(0 0 14px rgba(255,77,109,0.85)); }
        }
        @keyframes aboutFadeUp {
          0% { opacity: 0; transform: translateY(36px); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
      `}</style>
    </PageLayout>
  );
}