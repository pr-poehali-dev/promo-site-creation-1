import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/files/c906dad4-5275-4aa1-a0e9-8b39ba15ca55.jpg";
const ABOUT_IMG = "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/572b2706-dbbc-4d45-930d-b1bcab9ffdb3.jpg";
const WAVE_IMG = "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/files/7992655e-f917-401f-ae11-9f6f84044208.jpg";

const GALLERY = [
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/bda19b9a-9369-47b6-ba30-b69a935602e5.jpg", title: "Студия" },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/de67aff0-5994-4139-92fa-81cba6775a5e.jpg", title: "Момент" },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/5b0e74aa-45b8-43e3-bd92-6545210e34fb.jpg", title: "Ночь" },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/9c318f77-b373-4bba-a816-af8f3ba9fbad.jpg", title: "Кресло" },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/65750f7a-e45e-4678-b25d-19065f8f9879.jpg", title: "Поездка" },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/d99d0679-23e1-4500-8e59-063e0bc3088d.jpg", title: "Лёгкость" },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/d0e31965-0530-42d8-9995-d734d1d1b20a.jpg", title: "Взгляд" },
  { img: "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/fbc1b343-4159-4b67-85da-5a4f918ea00d.jpg", title: "Энергия" },
];

export default function Index() {
  const navigate = useNavigate();
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{ img: string; title: string } | null>(null);

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

  useEffect(() => {
    const els = document.querySelectorAll(".section-hidden");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("section-visible");
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="grain min-h-screen bg-background text-foreground">
      <div ref={cursorRef} className="cursor hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />

      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-4"
        style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.95) 0%, transparent 100%)" }}
      >
        <span
          className="font-cormorant text-4xl italic"
          style={{ color: "#ff1a1a", textShadow: "0 0 10px rgba(255,26,26,0.6)" }}
        >
          Сладкие Грёз
          <span className="relative inline-block">
            ы
            <span
              className="absolute left-1/2 -translate-x-1/2 text-lg select-none"
              style={{ top: "-0.6em", filter: "drop-shadow(0 0 8px rgba(255,26,26,0.7))" }}
            >
              🍓
            </span>
          </span>
        </span>

        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 p-2 group"
          >
            <span className={`block w-6 h-px bg-foreground transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-px bg-foreground transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-px bg-foreground transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>

          {menuOpen && (
            <div className="absolute top-full right-0 mt-3 flex flex-col min-w-[180px] border border-border/40 overflow-hidden"
              style={{ background: "rgba(10,10,10,0.97)" }}>
              <button
                onClick={() => { setMenuOpen(false); navigate("/"); }}
                className="font-cormorant text-xl italic text-left px-6 py-3 text-foreground/80 hover:text-accent hover:bg-white/5 transition-colors duration-200 border-b border-border/20"
              >
                Главная
              </button>
              {[["about", "Обо мне"], ["gallery", "Фотогалерея"], ["contact", "Контакты"]].map(
                ([id, label]) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="font-cormorant text-xl italic text-left px-6 py-3 text-foreground/80 hover:text-accent hover:bg-white/5 transition-colors duration-200 border-b border-border/20 last:border-0"
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" className="relative h-screen flex flex-col justify-center px-8 md:px-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-50" />
          <div
            className="absolute inset-0"
            style={{ background: "hsl(204,60%,10%)" }}
          />
        </div>


      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-8 md:px-16">
        <div className="section-hidden mb-16 flex items-end justify-between">
          <div>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-foreground">Фотогалерея</h2>
          </div>
          <span className="accent-line mb-3" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {GALLERY.map((item, i) => (
            <div
              key={i}
              className={`gallery-item section-hidden cursor-pointer ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
              onClick={() => setLightbox(item)}
            >
              <img
                src={item.img}
                alt={item.title}
                className={`w-full object-cover ${i === 0 ? "h-64 md:h-[480px]" : "h-48 md:h-56"}`}
              />
              <div className="overlay" />
              <div className="absolute bottom-0 left-0 p-4 z-10">
                <p className="font-cormorant text-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-6 text-white/70 hover:text-white font-mono text-2xl transition-colors"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          <img
            src={lightbox.img}
            alt={lightbox.title}
            className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-cormorant text-white/60 text-lg tracking-widest">
            {lightbox.title}
          </p>
        </div>
      )}

      {/* ABOUT */}
      <section id="about" className="py-24 px-8 md:px-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="section-hidden order-2 md:order-1">
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-foreground mb-8 leading-tight">
              О проекте
              <br />
              <em>Сладкие Грёзы</em>
            </h2>
            <div className="space-y-5 text-muted-foreground font-sans text-sm font-light leading-loose">
              <p>
                Привет, я Эльвира, предлагаю тебе, мой дорогой мужчина, гибкий формат досуга, созданный специально для тех моментов, когда тебе становится скучно: после работы, в выходной день или просто в минуты застоя.
              </p>
              <p>
                Так же в списке услуг имеется ваниль, если ты понимаешь о чём я :))
              </p>
            </div>
          </div>

          <div className="section-hidden order-1 md:order-2 relative">
            <div className="absolute -top-4 -left-4 w-full h-full border border-border" />
            <img
              src={ABOUT_IMG}
              alt="О проекте"
              className="w-full h-80 md:h-[500px] object-cover relative z-10 brightness-75"
            />
            <div
              className="absolute bottom-0 left-0 right-0 h-1/3 z-20"
              style={{ background: "linear-gradient(to top, hsl(204,60%,10%), transparent)" }}
            />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-8 md:px-16">
        <div className="max-w-2xl mx-auto">
          <div className="section-hidden text-center mb-16">
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-foreground mb-6">Напишите нам</h2>
            <p className="font-sans text-sm text-muted-foreground font-light leading-relaxed">
              Для встречи и исполнения твоих потаённых желаний.
            </p>
          </div>
          <form className="section-hidden space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-3">Имя</label>
                <input type="text" placeholder="Ваше имя" className="w-full bg-transparent border-b border-border pb-3 text-foreground font-sans text-sm font-light placeholder:text-muted-foreground/30 focus:outline-none focus:border-accent transition-colors" />
              </div>
              <div>
                <label className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-3">Почта</label>
                <input type="email" placeholder="email@example.com" className="w-full bg-transparent border-b border-border pb-3 text-foreground font-sans text-sm font-light placeholder:text-muted-foreground/30 focus:outline-none focus:border-accent transition-colors" />
              </div>
            </div>
            <div>
              <label className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-3">Сообщение</label>
              <textarea rows={4} placeholder="Расскажите о вашем запросе..." className="w-full bg-transparent border-b border-border pb-3 text-foreground font-sans text-sm font-light placeholder:text-muted-foreground/30 focus:outline-none focus:border-accent transition-colors resize-none" />
            </div>
            <div className="flex justify-end pt-2">
              <button type="submit" className="font-mono text-xs tracking-widest uppercase border border-border px-10 py-4 text-foreground hover:border-accent hover:text-accent transition-all duration-300">
                Отправить
              </button>
            </div>
          </form>
        </div>
      </section>


    </div>
  );
}