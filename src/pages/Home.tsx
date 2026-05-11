import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

const SLIDES = [
  "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/13b7f9a1-9c9e-425e-8e32-eaa1d4bf7949.jpg",
  "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/412cf605-90a0-41f4-a942-e1f96b3b4bb4.jpg",
  "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/e4a28344-5258-4170-9303-6f059e961e57.jpg",
  "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/cb26e28d-9158-47b5-85f9-f17fd4524c78.jpg",
  "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/bf5a658d-7a5d-4d46-842d-2a7d228e314f.jpg",
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setPrev(current);
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const background = (
    <>
      {SLIDES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img src={src} alt="" className="w-full h-full object-cover opacity-50" />
        </div>
      ))}
      <div className="absolute inset-0" style={{ background: "rgba(10,10,10,0.55)" }} />
    </>
  );

  return (
    <PageLayout backgroundSlot={background}>
      {/* Центральный текст */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 pointer-events-none">
        <h1
          className="font-cormorant text-6xl md:text-8xl font-semibold italic mb-6"
          style={{ color: "#fff", textShadow: "0 2px 30px rgba(0,0,0,0.8)" }}
        >
          Привет, я Эльвира
        </h1>
        <p
          className="font-cormorant text-2xl md:text-3xl italic mb-10"
          style={{ color: "rgba(255,255,255,0.75)", textShadow: "0 2px 20px rgba(0,0,0,0.7)" }}
        >
          Хочешь со мной встретиться?
        </p>
        <a
          href="tel:+79179865198"
          className="pointer-events-auto flex items-center gap-3 px-8 py-4 rounded-full border-2 transition-all duration-300"
          style={{ borderColor: "#ff1a1a", background: "rgba(255,26,26,0.08)", boxShadow: "0 0 20px rgba(255,26,26,0.3)" }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 40px rgba(255,26,26,0.6)")}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 20px rgba(255,26,26,0.3)")}
        >
          <span className="text-xl" style={{ animation: "ring 1.8s ease-in-out infinite", display: "inline-block", transformOrigin: "top center" }}>📞</span>
          <span className="font-cormorant text-2xl italic tracking-wider" style={{ color: "#fff", textShadow: "0 0 12px rgba(255,26,26,0.7)" }}>
            8 (917) 986-51-98
          </span>
        </a>

        <div className="pointer-events-auto flex gap-20 mt-6">
          <button
            onClick={() => navigate("/contacts")}
            className="font-cormorant text-lg italic px-8 py-3 rounded-full border transition-colors duration-200"
            style={{ borderColor: "rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.75)", background: "transparent" }}
          >
            Контакты
          </button>
          <button
            onClick={() => navigate("/services")}
            className="font-cormorant text-lg italic px-8 py-3 rounded-full border transition-colors duration-200"
            style={{ borderColor: "rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.75)", background: "transparent" }}
          >
            Мои услуги
          </button>
        </div>
      </div>

      {/* Точки-индикаторы */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3" style={{ zIndex: 20 }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setPrev(current); setCurrent(i); }}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{ background: i === current ? "#ff1a1a" : "rgba(255,255,255,0.3)", transform: i === current ? "scale(1.4)" : "scale(1)" }}
          />
        ))}
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
      `}</style>
    </PageLayout>
  );
}
