import { useNavigate } from "react-router-dom";
import NavMenu from "@/components/NavMenu";

const HERO_IMG = "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/files/c906dad4-5275-4aa1-a0e9-8b39ba15ca55.jpg";

interface PageLayoutProps {
  children?: React.ReactNode;
  noBackground?: boolean;
  backgroundSlot?: React.ReactNode;
}

export default function PageLayout({ children, noBackground, backgroundSlot }: PageLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="grain page-layout min-h-screen bg-background text-foreground relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {backgroundSlot ? backgroundSlot : !noBackground && (
          <>
            <img src={HERO_IMG} alt="" decoding="async" className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0" style={{ background: "hsl(0,0%,2%)" }} />
          </>
        )}
      </div>

      <div className="relative z-50 mx-auto w-full page-container px-4 sm:px-6 md:px-12 pt-4 sm:pt-6 pb-3 flex items-center justify-between gap-3 flex-nowrap">
        <span
          className="font-cormorant italic font-bold inline-flex items-center min-w-0"
          style={{ cursor: "pointer", fontSize: "clamp(1.1rem, 2.6vw, 2.6rem)", lineHeight: 1, fontWeight: 700, marginLeft: "clamp(0.25rem, 2vw, 2rem)", animation: "logoFadeUp 1.1s ease-out 0s both", whiteSpace: "nowrap" }}
          onClick={() => navigate("/")}
        >
          <span className="fire-wrap" style={{ position: "relative", display: "inline-block" }}>
            <span className="fire-sparks" aria-hidden="true">
              <span className="spark spark-1" />
              <span className="spark spark-2" />
              <span className="spark spark-3" />
              <span className="spark spark-4" />
              <span className="spark spark-5" />
              <span className="spark spark-6" />
            </span>
            <span
              className="fire-text"
              style={{
                background: "linear-gradient(0deg, #7a0000 0%, #e30613 18%, #ff5e1a 45%, #ffb347 75%, #ffe066 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
                filter: "drop-shadow(0 0 8px rgba(255,94,26,0.85)) drop-shadow(0 0 16px rgba(227,6,19,0.55))",
                display: "inline-block",
                position: "relative",
                zIndex: 2,
              }}
            >
              Сладкие
            </span>
          </span>
          <span className="inline-block select-none align-middle" style={{ fontSize: "0.7em", margin: "0 0.15em" }}>🍓</span>
          <span style={{ color: "#2541ff", textShadow: "0 0 12px rgba(37,65,255,0.9), 0 0 22px rgba(37,65,255,0.5)" }}>Грёзы</span>
        </span>

        <div className="shrink-0 ml-auto">
          <NavMenu marginRight="clamp(0.25rem, 2vw, 2rem)" />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full page-container">
        {children}
      </div>

      <footer className="relative z-10 mt-16 px-4 sm:px-6 md:px-12 py-8 border-t border-white/10 text-white/40 text-[11px] leading-relaxed font-light mx-auto w-full page-container">
        <div className="max-w-5xl mx-auto space-y-2">
          <p>
            Сладкие Грёзы — клуб приватного отдыха и встреч для взрослых 18+. Мы предлагаем услуги сопровождения, организацию приватного досуга и роскошного вечернего времяпрепровождения в комфортной обстановке.
          </p>
          <p>
            На сайте представлена анкета девушки, фотогалерея и информация о форматах встреч. Каждая встреча проходит конфиденциально, с уважением к личному пространству и пожеланиям клиента.
          </p>
          <p>
            Ключевые услуги: индивидуальные встречи, сопровождение на мероприятия, приватные вечера, романтический досуг, эскорт-услуги для взрослых.
          </p>
          <p>
            Мы ценим анонимность, безопасность и качество сервиса. Участница старше 18 лет, услуги предоставляются исключительно совершеннолетним лицам по взаимному согласию сторон.
          </p>
          <p>
            Свяжитесь с нами через раздел «Контакты», чтобы узнать подробности, забронировать встречу или получить персональную рекомендацию. Сладкие Грёзы — твой роскошный отдых и яркие эмоции в любое время.
          </p>
          <p className="pt-2 opacity-60">© Сладкие Грёзы. Сайт предназначен для лиц старше 18 лет.</p>
        </div>
      </footer>

      <style>{`
        /* Ограничиваем ширину контента, чтобы на широких мониторах
           не было «пустыни» — всё держится по центру */
        .page-container {
          max-width: 1600px;
        }
        @media (min-width: 1920px) {
          .page-container { max-width: 1760px; }
        }
        @media (min-width: 2400px) {
          .page-container { max-width: 1920px; }
        }
        @keyframes neonBlue {
          0%, 100% { text-shadow: 0 0 10px rgba(61,90,254,0.55), 0 0 18px rgba(61,90,254,0.3); opacity: 0.92; }
          50% { text-shadow: 0 0 14px rgba(61,90,254,1), 0 0 28px rgba(61,90,254,0.7), 0 0 48px rgba(61,90,254,0.4); opacity: 1; }
        }
        @keyframes logoFadeUp {
          0% { opacity: 0; transform: translateY(28px); filter: blur(6px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes fireFlicker {
          0%, 100% {
            filter:
              drop-shadow(0 0 6px rgba(255,180,71,0.95))
              drop-shadow(0 0 14px rgba(255,94,26,0.85))
              drop-shadow(0 0 26px rgba(227,6,19,0.6));
            transform: translateY(0) skewX(0deg);
          }
          15% {
            filter:
              drop-shadow(0 -2px 10px rgba(255,224,102,1))
              drop-shadow(0 0 18px rgba(255,94,26,0.95))
              drop-shadow(0 0 32px rgba(227,6,19,0.7));
            transform: translateY(-0.5px) skewX(-1deg);
          }
          30% {
            filter:
              drop-shadow(0 -1px 8px rgba(255,180,71,0.9))
              drop-shadow(0 0 12px rgba(255,94,26,0.8))
              drop-shadow(0 0 22px rgba(227,6,19,0.55));
            transform: translateY(0.5px) skewX(0.6deg);
          }
          50% {
            filter:
              drop-shadow(0 -3px 14px rgba(255,224,102,1))
              drop-shadow(0 0 22px rgba(255,94,26,1))
              drop-shadow(0 0 38px rgba(227,6,19,0.75));
            transform: translateY(-0.8px) skewX(-0.8deg);
          }
          70% {
            filter:
              drop-shadow(0 -1px 9px rgba(255,180,71,0.92))
              drop-shadow(0 0 16px rgba(255,94,26,0.85))
              drop-shadow(0 0 28px rgba(227,6,19,0.6));
            transform: translateY(0.4px) skewX(0.4deg);
          }
          85% {
            filter:
              drop-shadow(0 -2px 12px rgba(255,224,102,1))
              drop-shadow(0 0 20px rgba(255,94,26,0.95))
              drop-shadow(0 0 34px rgba(227,6,19,0.7));
            transform: translateY(-0.3px) skewX(-0.5deg);
          }
        }
        @keyframes fireGradientShift {
          0%, 100% { background-position: 50% 100%; }
          50% { background-position: 50% 0%; }
        }
        .fire-text {
          background-size: 100% 220% !important;
          background-position: 50% 100%;
          animation: fireFlicker 1.6s ease-in-out infinite, fireGradientShift 3.2s ease-in-out infinite;
        }

        /* Искры, летящие вверх */
        .fire-sparks {
          position: absolute;
          left: 0;
          right: 0;
          top: -0.3em;
          height: 1.6em;
          pointer-events: none;
          z-index: 1;
        }
        .spark {
          position: absolute;
          bottom: 0;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: radial-gradient(circle, #fff5b8 0%, #ffcc55 45%, #ff6a1a 100%);
          box-shadow: 0 0 6px rgba(255,180,71,0.95), 0 0 12px rgba(255,90,20,0.7);
          opacity: 0;
        }
        .spark-1 { left: 10%; animation: sparkRise 2.2s ease-out infinite; animation-delay: 0s;    }
        .spark-2 { left: 26%; animation: sparkRise 2.6s ease-out infinite; animation-delay: -0.4s; }
        .spark-3 { left: 42%; animation: sparkRise 2.0s ease-out infinite; animation-delay: -0.9s; }
        .spark-4 { left: 58%; animation: sparkRise 2.8s ease-out infinite; animation-delay: -1.3s; }
        .spark-5 { left: 74%; animation: sparkRise 2.3s ease-out infinite; animation-delay: -1.7s; }
        .spark-6 { left: 88%; animation: sparkRise 2.5s ease-out infinite; animation-delay: -2.1s; }

        @keyframes sparkRise {
          0%   { transform: translate(0, 0) scale(1);   opacity: 0;   }
          15%  { opacity: 1; }
          60%  { transform: translate(-4px, -1.3em) scale(0.9); opacity: 0.9; }
          100% { transform: translate(6px, -2.2em) scale(0.2);  opacity: 0;   }
        }
      `}</style>
    </div>
  );
}