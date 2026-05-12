import PageLayout from "@/components/PageLayout";

const PHOTO_PLACEHOLDER_1 =
  "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/572b2706-dbbc-4d45-930d-b1bcab9ffdb3.jpg";
const PHOTO_PLACEHOLDER_2 =
  "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/de67aff0-5994-4139-92fa-81cba6775a5e.jpg";

export default function About() {
  return (
    <PageLayout>
      <section className="relative px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <h1
            className="font-cormorant italic font-semibold text-center mb-12"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              color: "rgba(255,255,255,0.95)",
              textShadow: "0 2px 24px rgba(0,0,0,0.7), 0 0 20px rgba(61,90,254,0.25)",
            }}
          >
            Обо мне
          </h1>

          <div className="grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-16 items-center">
            {/* Левая колонка — фото */}
            <div className="relative">
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
                  style={{ filter: "brightness(0.92) contrast(1.05)" }}
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
                  fontSize: "clamp(1.15rem, 1.5vw, 1.4rem)",
                  color: "rgba(255,255,255,0.92)",
                  textShadow: "0 2px 14px rgba(0,0,0,0.6)",
                }}
              >
                Знаешь, что такое настоящий индивидуальный подход?
              </p>

              <p
                className="font-cormorant leading-relaxed"
                style={{
                  fontSize: "clamp(1.05rem, 1.25vw, 1.2rem)",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                Это когда ты приходишь в гости к девушке, которая по-настоящему хорошо выглядит, в прекрасном настроении и свежа, как утренняя роса. Это когда ты общаешься на самые разные темы, как с хорошей знакомой, и отдыхаешь полностью и телом и разумом.
              </p>

              <p
                className="font-cormorant leading-relaxed"
                style={{
                  fontSize: "clamp(1.05rem, 1.25vw, 1.2rem)",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                Когда она не провожает тебя ровно через час, а наоборот, заботится о том, чтобы тебе было комфортно. Это когда секс с тобой — это настоящее удовольствие, а не работа, а потому он улётный.
              </p>

              <p
                className="font-cormorant italic"
                style={{
                  fontSize: "clamp(1.25rem, 1.7vw, 1.5rem)",
                  color: "#fff",
                  textShadow:
                    "0 0 12px rgba(61,90,254,0.6), 0 2px 14px rgba(0,0,0,0.6)",
                }}
              >
                Хочешь настоящий индивидуальный подход? Звони...{" "}
                <span style={{ color: "#3d5afe" }}>:)</span>
              </p>

              <div
                className="mt-8 pl-5 border-l-2"
                style={{
                  borderColor: "#3d5afe",
                  boxShadow: "-2px 0 18px -8px rgba(61,90,254,0.7)",
                }}
              >
                <p
                  className="font-cormorant italic leading-relaxed"
                  style={{
                    fontSize: "clamp(1.05rem, 1.3vw, 1.25rem)",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  Выезд от 2 часов и большая просьба!!! Звонить хотя бы за час до встречи.{" "}
                  <span style={{ color: "#ff4d6d", textShadow: "0 0 12px rgba(255,77,109,0.6)" }}>
                    Пока
                  </span>{" "}
                  <span
                    className="inline-block align-middle"
                    style={{ fontSize: "1.1em", animation: "lipsPulse 2.4s ease-in-out infinite" }}
                  >
                    💋
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes lipsPulse {
          0%, 100% { transform: scale(1) rotate(-6deg); filter: drop-shadow(0 0 6px rgba(255,77,109,0.5)); }
          50% { transform: scale(1.15) rotate(6deg); filter: drop-shadow(0 0 14px rgba(255,77,109,0.85)); }
        }
      `}</style>
    </PageLayout>
  );
}
