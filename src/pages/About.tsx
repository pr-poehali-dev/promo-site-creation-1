import PageLayout from "@/components/PageLayout";

const PHOTO_PLACEHOLDER_1 =
  "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/572b2706-dbbc-4d45-930d-b1bcab9ffdb3.jpg";
const PHOTO_PLACEHOLDER_2 =
  "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/de67aff0-5994-4139-92fa-81cba6775a5e.jpg";

export default function About() {
  return (
    <PageLayout>
      <section className="relative px-6 md:px-16 pt-4 md:pt-6 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-16 items-center">
            {/* Левая колонка — фото */}
            <div className="relative" style={{ animation: "aboutFadeLeft 1.3s cubic-bezier(0.22,1,0.36,1) 0.2s both" }}>
              <div
                className="relative overflow-hidden"
                style={{
                  boxShadow:
                    "0 0 30px rgba(61,90,254,0.18), 0 0 60px rgba(0,0,0,0.5)",
                }}
              >
                <img
                  src={PHOTO_PLACEHOLDER_1}
                  alt="Фото"
                  className="w-full h-[420px] md:h-[560px] object-cover"
                  style={{
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

              <div
                className="hidden md:block absolute -bottom-10 -right-10 w-44 h-56 overflow-hidden border-2"
                style={{
                  borderColor: "#3d5afe",
                  boxShadow: "0 0 24px rgba(61,90,254,0.45)",
                  animation: "aboutFadeUp 1.1s cubic-bezier(0.22,1,0.36,1) 0.7s both",
                }}
              >
                <img
                  src={PHOTO_PLACEHOLDER_2}
                  alt="Фото"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Правая колонка — текст */}
            <div className="space-y-6">
              <p
                className="font-cormorant italic leading-relaxed"
                style={{
                  fontSize: "clamp(1.7rem, 2.3vw, 2.1rem)",
                  color: "#fff",
                  textShadow: "0 2px 14px rgba(0,0,0,0.6), 0 0 12px rgba(61,90,254,0.4)",
                  animation: "aboutFadeRight 1s cubic-bezier(0.22,1,0.36,1) 0.2s both",
                }}
              >
                Привет 👋 Познакомимся? Меня зовут Эльвира{" "}
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
                <span
                  style={{
                    marginLeft: "0.6em",
                    fontSize: "0.85em",
                    color: "rgba(255,255,255,0.92)",
                    textShadow: "0 2px 14px rgba(0,0,0,0.6)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Я живу и учусь в городе Саратов
                </span>
              </p>

              <p
                className="font-cormorant italic leading-relaxed"
                style={{
                  fontSize: "clamp(1.5rem, 2vw, 1.9rem)",
                  color: "rgba(255,255,255,0.92)",
                  textShadow: "0 2px 14px rgba(0,0,0,0.6)",
                  animation: "aboutFadeRight 1s cubic-bezier(0.22,1,0.36,1) 0.35s both",
                }}
              >
                Знаешь, что такое настоящий индивидуальный подход?
              </p>

              <p
                className="font-cormorant leading-relaxed"
                style={{
                  fontSize: "clamp(1.35rem, 1.7vw, 1.65rem)",
                  color: "rgba(255,255,255,0.85)",
                  animation: "aboutFadeRight 1s cubic-bezier(0.22,1,0.36,1) 0.5s both",
                }}
              >
                Это когда ты приходишь в гости к девушке, которая по-настоящему хорошо выглядит, в прекрасном настроении и свежа, как утренняя роса. Это когда ты общаешься на самые разные темы, как с хорошей знакомой, и отдыхаешь полностью и телом и разумом.
              </p>

              <p
                className="font-cormorant leading-relaxed"
                style={{
                  fontSize: "clamp(1.35rem, 1.7vw, 1.65rem)",
                  color: "rgba(255,255,255,0.85)",
                  animation: "aboutFadeRight 1s cubic-bezier(0.22,1,0.36,1) 0.65s both",
                }}
              >
                Когда она не провожает тебя ровно через час, а наоборот, заботится о том, чтобы тебе было комфортно. Это когда секс с тобой — это настоящее удовольствие, а не работа, а потому он улётный.
              </p>

              <p
                className="font-cormorant italic"
                style={{
                  fontSize: "clamp(1.6rem, 2.2vw, 2rem)",
                  color: "#fff",
                  textShadow:
                    "0 0 12px rgba(61,90,254,0.6), 0 2px 14px rgba(0,0,0,0.6)",
                  animation: "aboutFadeRight 1s cubic-bezier(0.22,1,0.36,1) 0.8s both",
                }}
              >
                Хочешь настоящий индивидуальный подход? Звони...{" "}
                <span style={{ color: "#3d5afe" }}>:)</span>
              </p>

              <div
                className="mt-8 p-6 md:p-8 rounded-lg relative"
                style={{
                  border: "2px solid transparent",
                  background:
                    "linear-gradient(rgba(10,14,40,0.55), rgba(10,14,40,0.55)) padding-box, linear-gradient(135deg, #3d5afe 0%, #7c4dff 50%, #b16cff 100%) border-box",
                  boxShadow:
                    "0 0 24px rgba(61,90,254,0.55), 0 0 48px rgba(124,77,255,0.35), inset 0 0 24px rgba(61,90,254,0.18)",
                  animation: "aboutFadeRight 1s cubic-bezier(0.22,1,0.36,1) 0.95s both, framePulse 3.6s ease-in-out infinite",
                }}
              >
                <p
                  className="font-cormorant italic"
                  style={{
                    fontSize: "clamp(1.55rem, 2vw, 1.9rem)",
                    color: "#fff",
                    textShadow: "0 0 12px rgba(61,90,254,0.55), 0 2px 14px rgba(0,0,0,0.6)",
                    marginBottom: "0.6em",
                  }}
                >
                  Форматы встреч:
                </p>
                <ul
                  className="font-cormorant leading-relaxed space-y-2"
                  style={{
                    fontSize: "clamp(1.35rem, 1.75vw, 1.7rem)",
                    color: "rgba(255,255,255,0.92)",
                    listStyle: "none",
                    padding: 0,
                  }}
                >
                  <li>
                    <span style={{ color: "#3d5afe" }}>•</span> Еврочас — 7000 ₽{" "}
                    <span style={{ color: "rgba(255,255,255,0.7)", fontStyle: "italic" }}>
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
                    fontSize: "clamp(1.3rem, 1.65vw, 1.6rem)",
                    color: "rgba(255,255,255,0.88)",
                  }}
                >
                  Встречи в Саратове возможны в гостинице либо на выезд к вам. Выезда в другие города от 3 часов с компенсацией проезда в обе стороны. Также возможно пригласить подругу для совместной встречи.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
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