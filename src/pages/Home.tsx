import { useNavigate } from "react-router-dom";
import NavMenu from "@/components/NavMenu";
import Icon from "@/components/ui/icon";

const BG_IMAGE = "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/optimized/2935b944-aac2-4b40-bdd3-0ee94a0d4b4d.jpg";

export default function Home() {
  const navigate = useNavigate();

  const go = (path: string) => {
    navigate(path);
  };

  return (
    <div className="home-root min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Фон — чёрная подложка по краям */}
      <div
        className="absolute inset-0"
        style={{ zIndex: 0, background: "#000" }}
      />
      {/* Фон — основное фото */}
      <div
        className="home-bg absolute inset-0"
        style={{
          zIndex: 1,
          animation: "aboutFadeUp 1.3s cubic-bezier(0.22,1,0.36,1) 0s both",
        }}
      >
        <img
          src={BG_IMAGE}
          alt=""
          className="home-bg-img w-full h-full"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </div>
      {/* Мягкое затемнение по краям — плавный переход к чёрному фону */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 85% at center 45%, transparent 30%, rgba(0,0,0,0.45) 70%, rgba(0,0,0,0.9) 100%)",
          zIndex: 2,
        }}
      />
      {/* Боковая виньетка по горизонтали */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 12%, transparent 25%, transparent 75%, rgba(0,0,0,0.35) 88%, rgba(0,0,0,0.85) 100%)",
          zIndex: 2,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.25) 15%, transparent 35%, transparent 55%, rgba(10,10,10,0.5) 78%, rgba(0,0,0,0.85) 100%)",
          zIndex: 3,
        }}
      />



      {/* Навбар */}
      <div className="nav-bar relative mx-auto w-full home-container px-4 sm:px-6 md:px-12 pt-4 sm:pt-6 pb-3 flex items-center justify-between gap-3 flex-nowrap" style={{ zIndex: 30 }}>
        <span
          className="font-cormorant italic font-bold inline-flex items-center min-w-0"
          style={{ cursor: "pointer", fontSize: "clamp(1.1rem, 2.6vw, 2.6rem)", lineHeight: 1, fontWeight: 700, marginLeft: "clamp(0.25rem, 2vw, 2rem)", animation: "logoFadeUp 1.1s ease-out 0s both", whiteSpace: "nowrap" }}
          onClick={() => go("/")}
        >
          <span className="fire-wrap">
            <span className="fire-sparks" aria-hidden="true">
              <span className="spark spark-1" />
              <span className="spark spark-2" />
              <span className="spark spark-3" />
              <span className="spark spark-4" />
              <span className="spark spark-5" />
              <span className="spark spark-6" />
            </span>
            <span className="fire-text">Сладкие</span>
          </span>
          <span className="inline-block select-none align-middle" style={{ fontSize: "0.7em", margin: "0 0.15em" }}>🍓</span>
          <span style={{ color: "#2541ff", textShadow: "0 0 12px rgba(37,65,255,0.9), 0 0 22px rgba(37,65,255,0.5)" }}>Грёзы</span>
        </span>

        <div className="shrink-0 ml-auto">
          <NavMenu marginRight="clamp(0.25rem, 2vw, 2rem)" />
        </div>
      </div>

      {/* Центральный текст */}
      <div className="hero-center absolute inset-0 flex flex-col items-center text-center px-8 pointer-events-none" style={{ zIndex: 20 }}>
        <h1 className="font-semibold italic mb-6 md:mb-10 leading-none" style={{ fontFamily: '"Playfair Display", serif', fontSize: "clamp(2rem, 7vw, 6.5rem)", color: "rgba(255,255,255,0.95)", textShadow: "0 2px 30px rgba(0,0,0,0.85), 0 0 18px rgba(0,0,0,0.6)", letterSpacing: "0.01em", animation: "fadeUp 1.1s ease-out 0.1s both, shimmerHero 2.6s ease-in-out 1.4s infinite" }}>
          Твой роскошный отдых
        </h1>
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
            background: "rgba(37,65,255,0.28)",
            textShadow: "0 2px 12px rgba(0,0,0,0.7)",
            fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
            position: "relative",
            zIndex: 50,
            animation: "fadeUp 1.1s ease-out 0.9s both, phoneGlow 2.4s ease-in-out 1.6s infinite",
          }}
        >
          <Icon
            name="Phone"
            size={24}
            className="shrink-0"
            style={{ color: "#ff2e2e", filter: "drop-shadow(0 0 8px rgba(255,46,46,0.65))" }}
          />
          <span>8 (986) 985-21-11</span>
        </a>
      </div>

      {/* Города работы — SEO + видимый блок */}
      <div
        className="cities-block absolute left-0 right-0 px-4 sm:px-6 md:px-12 pointer-events-none"
        style={{
          bottom: "max(clamp(0.75rem, 3vh, 2.5rem), env(safe-area-inset-bottom))",
          zIndex: 25,
          animation: "fadeUp 1.1s ease-out 1.4s both",
        }}
      >
        <div className="flex flex-col items-center gap-1 md:gap-1">
          <span
            className="font-cormorant italic uppercase tracking-[0.35em]"
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "clamp(0.7rem, 1vw, 0.9rem)",
              textShadow: "0 2px 12px rgba(0,0,0,0.85)",
              marginTop: "clamp(0.75rem, 2vh, 1.75rem)",
            }}
          >
            Города
          </span>
          <ul
            className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 gap-y-1 md:gap-x-5 pointer-events-auto px-2"
            style={{ listStyle: "none", padding: 0, margin: 0 }}
          >
            {[
              { name: "Саратов", slug: "saratov" },
              { name: "Самара", slug: "samara" },
              { name: "Волгоград", slug: "volgograd" },
              { name: "Воронеж", slug: "voronezh" },
              { name: "Москва", slug: "moskva" },
              { name: "Санкт-Петербург", slug: "spb" },
            ].map(({ name, slug }) => (
              <li key={slug} style={{ listStyle: "none" }}>
                <a
                  href={`/contacts#city-${slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/contacts#city-${slug}`);
                  }}
                  className="font-cormorant italic city-link"
                  style={{
                    color: "rgba(255,255,255,0.92)",
                    fontSize: "clamp(1rem, 1.6vw, 1.5rem)",
                    textShadow: "0 2px 14px rgba(0,0,0,0.85), 0 0 14px rgba(61,90,254,0.3)",
                    textDecoration: "none",
                    transition: "color 0.3s, text-shadow 0.3s",
                  }}
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        .home-root { min-height: 100svh; }
        .home-container { max-width: 1600px; }
        @media (max-width: 640px) {
          .cities-block {
            bottom: max(clamp(4rem, 14vh, 9rem), calc(env(safe-area-inset-bottom) + 4rem)) !important;
          }
        }
        @media (min-width: 1920px) {
          .home-container { max-width: 1760px; }
        }
        @media (min-width: 2400px) {
          .home-container { max-width: 1920px; }
        }
        /* На 2K/4K навбар прижимается к краям асимметрично:
           логотип ближе к левому краю, меню ближе к правому. */
        @media (min-width: 1920px) {
          .nav-bar {
            max-width: none;
            padding-left: 2.5vw;
            padding-right: 4.5vw;
          }
        }
        @media (min-width: 2560px) {
          .nav-bar {
            padding-left: 2vw;
            padding-right: 6vw;
          }
        }
        /* По умолчанию — лицо всегда в кадре, ничего не обрезается сверху */
        .home-bg-img {
          object-fit: contain;
          object-position: center top;
          background: #000;
        }
        /* Широкие экраны — фото целиком сверху, фон чёрный по бокам */
        @media (min-aspect-ratio: 16/9) {
          .home-bg-img { object-fit: contain; object-position: center top; }
        }
        /* Портретные экраны — тоже целиком, лицо вверху */
        @media (max-aspect-ratio: 3/4) {
          .home-bg-img { object-fit: contain; object-position: center top; }
        }
        .hero-center { padding-top: 60vh; padding-top: 60svh; }
        @media (min-width: 1280px) {
          .hero-center { padding-top: 62vh; padding-top: 62svh; }
        }
        @media (min-width: 1920px) {
          .hero-center { padding-top: 64vh; padding-top: 64svh; }
        }
        @media (max-width: 1024px) {
          .hero-center { padding-top: 52vh; padding-top: 52svh; }
        }
        @media (max-width: 768px) {
          .hero-center { padding-top: 44vh; padding-top: 44svh; }
        }
        @media (max-width: 480px) {
          .hero-center { padding-top: 38vh; padding-top: 38svh; }
        }
        /* Низкие лендскейп-экраны */
        @media (max-height: 520px) {
          .hero-center { padding-top: 30vh; }
        }
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
        .city-link:hover {
          color: #fff !important;
          text-shadow: 0 2px 14px rgba(0,0,0,0.85), 0 0 22px rgba(61,90,254,0.9), 0 0 6px rgba(255,255,255,0.6) !important;
        }
        @keyframes aboutFadeUp {
          0% { opacity: 0; transform: translateY(36px); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
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