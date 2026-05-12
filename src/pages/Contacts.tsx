import PageLayout from "@/components/PageLayout";

export default function Contacts() {
  return (
    <PageLayout noBackground>
      <div className="px-8 md:px-16 py-16">
        <div className="flex flex-col items-center gap-8">
          <a
            href="tel:+79869852111"
            onClick={e => e.stopPropagation()}
            className="flex items-center gap-4 group"
            style={{ animation: "aboutFadeUp 1.1s cubic-bezier(0.22,1,0.36,1) 0.1s both" }}
          >
            <span className="text-2xl">📞</span>
            <span
              className="font-cormorant text-3xl md:text-4xl italic tracking-wide group-hover:text-accent transition-colors duration-300"
              style={{ color: "#fff", textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
            >
              8 (986) 985-21-11
            </span>
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
            По поводу оказания услуг, звони по телефону указанный выше.{" "}
            <span style={{ color: "#ff4d6d", textShadow: "0 0 12px rgba(255,77,109,0.6)" }}>
              Целую
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

      <style>{`
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