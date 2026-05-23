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
            <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0" style={{ background: "hsl(0,0%,2%)" }} />
          </>
        )}
      </div>

      <div className="relative z-50 mx-auto w-full page-container px-4 sm:px-6 md:px-12 pt-4 sm:pt-6 pb-3 flex items-center justify-between gap-3 flex-nowrap">
        <span
          className="font-cormorant italic font-bold inline-block min-w-0"
          style={{ cursor: "pointer", fontSize: "clamp(1.1rem, 2.6vw, 2.6rem)", lineHeight: 1, fontWeight: 700, paddingTop: "0.35em", marginLeft: "clamp(0.25rem, 2vw, 2rem)", animation: "logoFadeUp 1.1s ease-out 0s both", whiteSpace: "nowrap" }}
          onClick={() => navigate("/")}
        >
          <span style={{ color: "#e30613", textShadow: "0 0 12px rgba(227,6,19,0.85), 0 0 22px rgba(227,6,19,0.45)" }}>Сладкие</span>
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
      `}</style>
    </div>
  );
}