import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

const PHOTO_PLACEHOLDER_1 =
  "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/572b2706-dbbc-4d45-930d-b1bcab9ffdb3.jpg";

export default function About() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <PageLayout>
      <section className="relative px-4 sm:px-6 md:px-16 pt-4 md:pt-6 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[0.9fr_1.6fr] gap-8 sm:gap-10 md:gap-14 items-center">
            {/* Левая колонка — фото */}
            <div className="relative" style={{ animation: "aboutFadeLeft 1.3s cubic-bezier(0.22,1,0.36,1) 0.2s both" }}>
              <div
                className="relative overflow-hidden mx-auto"
                style={{
                  maxWidth: "560px",
                  boxShadow:
                    "0 0 30px rgba(61,90,254,0.18), 0 0 60px rgba(0,0,0,0.5)",
                }}
              >
                <img
                  src={PHOTO_PLACEHOLDER_1}
                  alt="Фото"
                  className="w-full object-cover"
                  style={{
                    height: "clamp(320px, 60vh, 620px)",
                    filter: "brightness(0.92) contrast(1.05)",
                    animation: "aboutImgZoom 1.6s cubic-bezier(0.22,1,0.36,1) 0.3s both",
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.55) 100%)",
                  }}
                />
              </div>

            </div>

            {/* Правая колонка — текст */}
            <div className="space-y-5 sm:space-y-6">
              <p
                className="font-cormorant italic leading-relaxed"
                style={{
                  fontSize: "clamp(1.2rem, 2vw, 1.9rem)",
                  color: "rgba(255,255,255,0.92)",
                  textShadow: "0 2px 14px rgba(0,0,0,0.6)",
                  animation: "aboutFadeRight 1s cubic-bezier(0.22,1,0.36,1) 0.2s both",
                }}
              >
                Привет, меня зовут Эльвира.{" "}
                <span
                  style={{
                    display: "inline-block",
                    verticalAlign: "middle",
                    marginLeft: "0.3em",
                    animation: "heartBeat 1.6s ease-in-out infinite",
                    filter: "drop-shadow(0 0 8px rgba(255,77,109,0.7)) drop-shadow(0 0 16px rgba(255,77,109,0.4))",
                  }}
                >
                  <svg
                    width="1.1em"
                    height="1.1em"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <radialGradient id="heartGradient" cx="35%" cy="30%" r="75%">
                        <stop offset="0%" stopColor="#ffd1dc" />
                        <stop offset="35%" stopColor="#ff6b8a" />
                        <stop offset="75%" stopColor="#e63465" />
                        <stop offset="100%" stopColor="#a01840" />
                      </radialGradient>
                      <linearGradient id="heartShine" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M16 28.5 C 16 28.5 3 19.8 3 11.4 C 3 6.8 6.6 3.5 10.6 3.5 C 13.2 3.5 14.9 4.8 16 6.6 C 17.1 4.8 18.8 3.5 21.4 3.5 C 25.4 3.5 29 6.8 29 11.4 C 29 19.8 16 28.5 16 28.5 Z"
                      fill="url(#heartGradient)"
                      stroke="#7a0d2e"
                      strokeWidth="0.6"
                    />
                    <path
                      d="M9 8.5 C 10.5 6.5 13 6 14.5 7.5"
                      stroke="url(#heartShine)"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <ellipse cx="11.5" cy="11" rx="1.6" ry="2.4" fill="rgba(255,255,255,0.45)" transform="rotate(-25 11.5 11)" />
                  </svg>
                </span>
                <span style={{ marginLeft: "0.6em" }}>
                  <br className="block md:hidden" />
                  Я живу и учусь в городе Саратов.
                </span>
              </p>

              <p
                className="font-cormorant italic leading-relaxed"
                style={{
                  fontSize: "clamp(1.2rem, 2vw, 1.9rem)",
                  color: "rgba(255,255,255,0.92)",
                  textShadow: "0 2px 14px rgba(0,0,0,0.6)",
                  animation: "aboutFadeRight 1s cubic-bezier(0.22,1,0.36,1) 0.35s both",
                }}
              >
                Знаешь, что такое настоящий индивидуальный подход?
              </p>

              <p
                className="font-cormorant italic leading-relaxed"
                style={{
                  fontSize: "clamp(1.2rem, 2vw, 1.9rem)",
                  color: "rgba(255,255,255,0.92)",
                  textShadow: "0 2px 14px rgba(0,0,0,0.6)",
                  animation: "aboutFadeRight 1s cubic-bezier(0.22,1,0.36,1) 0.5s both",
                }}
              >
                Это когда ты приходишь в гости к девушке, которая по-настоящему хорошо выглядит, в прекрасном настроении и свежа, как утренняя роса. Это когда ты общаешься на самые разные темы, как с хорошей знакомой, и отдыхаешь полностью и телом, и разумом.
              </p>

              <p
                className="font-cormorant italic leading-relaxed"
                style={{
                  fontSize: "clamp(1.2rem, 2vw, 1.9rem)",
                  color: "rgba(255,255,255,0.92)",
                  textShadow: "0 2px 14px rgba(0,0,0,0.6)",
                  animation: "aboutFadeRight 1s cubic-bezier(0.22,1,0.36,1) 0.65s both",
                }}
              >
                Когда она не провожает тебя ровно через час, а наоборот, заботится о том, чтобы тебе было комфортно. Это когда секс с тобой — это настоящее удовольствие, а не работа, а потому он улётный.
              </p>

              <p
                className="font-cormorant italic leading-relaxed"
                style={{
                  fontSize: "clamp(1.2rem, 2vw, 1.9rem)",
                  color: "rgba(255,255,255,0.92)",
                  textShadow: "0 2px 14px rgba(0,0,0,0.6)",
                  animation: "aboutFadeRight 1s cubic-bezier(0.22,1,0.36,1) 0.8s both",
                }}
              >
                Хочешь настоящий индивидуальный подход?{" "}
                <span style={{ whiteSpace: "nowrap" }}>
                  Звони...
                  <span
                  style={{
                    display: "inline-block",
                    fontSize: "1.1em",
                    lineHeight: 1,
                    transformOrigin: "center",
                    animation: "lipsPulse 2.4s ease-in-out infinite",
                    filter: "drop-shadow(0 0 8px rgba(255,77,109,0.7))",
                  }}
                >
                  💋
                  </span>
                </span>
              </p>

            </div>
          </div>

          <div
            className="mt-12 flex flex-col items-center justify-center gap-3"
            style={{
              animation: "aboutFadeUp 1s cubic-bezier(0.22,1,0.36,1) 1.1s both",
            }}
          >
            <button
              onClick={() => setIsOpen(true)}
              className="font-cormorant italic relative group"
              style={{
                fontSize: "clamp(1.4rem, 2vw, 1.8rem)",
                color: "#fff",
                padding: "0.75em 2.4em",
                border: "2px solid transparent",
                borderRadius: "8px",
                background:
                  "linear-gradient(rgba(4,6,20,0.85), rgba(4,6,20,0.85)) padding-box, linear-gradient(135deg, #3d5afe 0%, #7c4dff 50%, #b16cff 100%) border-box",
                boxShadow:
                  "0 0 20px rgba(61,90,254,0.5), 0 0 40px rgba(124,77,255,0.3)",
                cursor: "pointer",
                textShadow: "0 0 10px rgba(61,90,254,0.6)",
                animation: "framePulse 3.6s ease-in-out infinite",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Формат встреч
            </button>
            <p
              className="font-cormorant italic flex items-center gap-2"
              style={{
                fontSize: "clamp(1rem, 1.3vw, 1.2rem)",
                color: "rgba(255,255,255,0.7)",
                textShadow: "0 2px 8px rgba(0,0,0,0.6)",
              }}
            >
              <Icon name="MousePointerClick" size={18} />
              нажми, чтобы узнать подробнее
            </p>
          </div>
        </div>
      </section>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="about-modal max-w-2xl border-0 p-0"
          style={{
            background:
              "linear-gradient(rgba(4,6,20,0.96), rgba(4,6,20,0.96)) padding-box, linear-gradient(135deg, #3d5afe 0%, #7c4dff 50%, #b16cff 100%) border-box",
            border: "2px solid transparent",
            borderRadius: "12px",
            boxShadow:
              "0 0 32px rgba(61,90,254,0.6), 0 0 64px rgba(124,77,255,0.4)",
          }}
        >
          <div className="p-6 md:p-8">
            <DialogHeader>
              <DialogTitle
                className="font-cormorant italic text-left"
                style={{
                  fontSize: "clamp(2rem, 3vw, 2.8rem)",
                  fontWeight: 600,
                  color: "#fff",
                  textShadow:
                    "0 0 16px rgba(61,90,254,0.7), 0 2px 16px rgba(0,0,0,0.7)",
                  marginBottom: "0.4em",
                  lineHeight: 1.1,
                }}
              >
                Форматы встреч:
              </DialogTitle>
            </DialogHeader>
            <ul
              className="font-cormorant leading-relaxed space-y-2 mt-2"
              style={{
                fontSize: "clamp(1.3rem, 1.8vw, 1.7rem)",
                color: "rgba(255,255,255,0.92)",
                listStyle: "none",
                padding: 0,
              }}
            >
              <li>
                <span style={{ color: "#3d5afe" }}>•</span> Еврочас — 7000 ₽{" "}
                <span
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontStyle: "italic",
                  }}
                >
                  (только для города Саратов)
                </span>
              </li>
              <li>
                <span style={{ color: "#3d5afe" }}>•</span> Час — 10000 ₽
              </li>
            </ul>
            <p
              className="font-cormorant leading-relaxed mt-4"
              style={{
                fontSize: "clamp(1.3rem, 1.8vw, 1.7rem)",
                color: "rgba(255,255,255,0.88)",
              }}
            >
              Встречи в Саратове возможны в гостинице либо на выезд к вам. Выезда в другие города от 3 часов с компенсацией проезда в обе стороны. Также возможно пригласить подругу для совместной встречи.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        @keyframes aboutModalIn {
          0% { opacity: 0; transform: translate(-50%, -46%) scale(0.94); filter: blur(6px); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1); filter: blur(0); }
        }
        @keyframes aboutModalOut {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1); filter: blur(0); }
          100% { opacity: 0; transform: translate(-50%, -47%) scale(0.96); filter: blur(4px); }
        }
        .about-modal {
          animation: aboutModalIn 0.55s cubic-bezier(0.22,1,0.36,1) both !important;
        }
        .about-modal[data-state="closed"] {
          animation: aboutModalOut 0.4s cubic-bezier(0.4,0,0.2,1) both !important;
        }
        @keyframes heartBeat {
          0%, 100% { transform: scale(1) rotate(-3deg); }
          25% { transform: scale(1.18) rotate(2deg); }
          50% { transform: scale(1.05) rotate(-2deg); }
          75% { transform: scale(1.22) rotate(3deg); }
        }
        @keyframes lipsPulse {
          0%, 100% { transform: scale(1) rotate(-6deg); filter: drop-shadow(0 0 6px rgba(255,77,109,0.5)); }
          50% { transform: scale(1.15) rotate(6deg); filter: drop-shadow(0 0 14px rgba(255,77,109,0.85)); }
        }
        @keyframes aboutFadeUp {
          0% { opacity: 0; transform: translateY(36px); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes aboutFadeLeft {
          0% { opacity: 0; transform: translateX(-50px); filter: blur(8px); }
          100% { opacity: 1; transform: translateX(0); filter: blur(0); }
        }
        @keyframes aboutFadeRight {
          0% { opacity: 0; transform: translateX(40px); filter: blur(6px); }
          100% { opacity: 1; transform: translateX(0); filter: blur(0); }
        }
        @keyframes framePulse {
          0%, 100% { box-shadow: 0 0 24px rgba(61,90,254,0.55), 0 0 48px rgba(124,77,255,0.35), inset 0 0 24px rgba(61,90,254,0.18); }
          50% { box-shadow: 0 0 32px rgba(61,90,254,0.75), 0 0 64px rgba(124,77,255,0.5), inset 0 0 32px rgba(124,77,255,0.25); }
        }
        @keyframes aboutImgZoom {
          0% { transform: scale(1.12); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </PageLayout>
  );
}