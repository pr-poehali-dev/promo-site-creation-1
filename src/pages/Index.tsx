import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/files/c906dad4-5275-4aa1-a0e9-8b39ba15ca55.jpg";
const ABOUT_IMG = "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/files/6d12cd67-5832-4e6f-ad31-3ac550f477df.jpg";
const WAVE_IMG = "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/files/7992655e-f917-401f-ae11-9f6f84044208.jpg";

const GALLERY = [
  { img: HERO_IMG, title: "Сцена", sub: "2024" },
  { img: WAVE_IMG, title: "Волна", sub: "Звук" },
  { img: ABOUT_IMG, title: "Образ", sub: "Портрет" },
  { img: HERO_IMG, title: "Свет", sub: "Концерт" },
  { img: WAVE_IMG, title: "Частота", sub: "Студия" },
  { img: ABOUT_IMG, title: "Тишина", sub: "Момент" },
];

export default function Index() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6"
        style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.95) 0%, transparent 100%)" }}
      >
        <button
          onClick={() => scrollTo("hero")}
          className="font-cormorant text-xl tracking-widest text-foreground hover:text-accent transition-colors"
        >
          З&nbsp;&amp;&nbsp;О
        </button>

        <div className="hidden md:flex items-center gap-10">
          {[["hero", "Главная"], ["gallery", "Галерея"], ["about", "О проекте"], ["contact", "Контакты"]].map(
            ([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="nav-link">
                {label}
              </button>
            )
          )}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={20} />
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-10">
          {[["hero", "Главная"], ["gallery", "Галерея"], ["about", "О проекте"], ["contact", "Контакты"]].map(
            ([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="font-cormorant text-4xl italic text-foreground hover:text-accent transition-colors"
              >
                {label}
              </button>
            )
          )}
        </div>
      )}

      {/* HERO */}
      <section id="hero" className="relative h-screen flex flex-col justify-end pb-20 px-8 md:px-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-50" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #0a0a0a 25%, rgba(10,10,10,0.3) 70%, #0a0a0a 100%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-3xl">
          <p className="animate-fade-up delay-100 font-mono text-xs tracking-[0.3em] text-accent mb-6 uppercase">
            Музыкальный проект
          </p>
          <h1 className="animate-fade-up delay-200 font-cormorant text-6xl md:text-8xl font-light leading-[0.9] tracking-tight text-foreground mb-8">
            Звук
            <br />
            <em className="not-italic text-foreground/50">&amp;</em>
            <br />
            Образ
          </h1>
          <p className="animate-fade-up delay-400 font-sans text-sm font-light text-muted-foreground max-w-sm leading-relaxed mb-10">
            Там, где музыка перестаёт быть просто звуком и становится пространством.
          </p>
          <div className="animate-fade-up delay-600 flex items-center gap-6">
            <button
              onClick={() => scrollTo("gallery")}
              className="font-mono text-xs tracking-widest uppercase border border-border px-8 py-3 text-foreground hover:border-accent hover:text-accent transition-all duration-300"
            >
              Смотреть
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="font-mono text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Связаться →
            </button>
          </div>
        </div>

        <div className="animate-fade-in delay-800 absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-2 text-muted-foreground">
          <Icon name="ArrowDown" size={14} className="animate-bounce" />
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-8 md:px-16">
        <div className="section-hidden mb-16 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-accent uppercase mb-3">02 — Галерея</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-foreground">Визуал</h2>
          </div>
          <span className="accent-line mb-3" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {GALLERY.map((item, i) => (
            <div
              key={i}
              className={`gallery-item section-hidden ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <img
                src={item.img}
                alt={item.title}
                className={`w-full object-cover ${i === 0 ? "h-64 md:h-[480px]" : "h-48 md:h-56"}`}
              />
              <div className="overlay" />
              <div className="absolute bottom-0 left-0 p-4 z-10">
                <p className="font-cormorant text-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">{item.title}</p>
                <p className="font-mono text-xs text-white/60">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-8 md:px-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="section-hidden order-2 md:order-1">
            <p className="font-mono text-xs tracking-[0.3em] text-accent uppercase mb-3">03 — О проекте</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-foreground mb-8 leading-tight">
              Больше,
              <br />
              чем
              <br />
              <em>музыка</em>
            </h2>
            <div className="space-y-5 text-muted-foreground font-sans text-sm font-light leading-loose">
              <p>
                Проект родился из желания создать нечто большее, чем просто звук. Каждая композиция — это история,
                рассказанная через несколько языков одновременно.
              </p>
              <p>
                Визуал, свет, тишина между нотами — всё это части единого высказывания. Мы работаем на стыке жанров,
                не пытаясь вписаться в рамки.
              </p>
              <p>Живые выступления, студийные записи, арт-инсталляции — форма меняется, суть остаётся.</p>
            </div>
            <div className="mt-10 flex items-center gap-8">
              {[["12", "ТРЕКОВ"], ["07", "ПОКАЗОВ"], ["3", "ГОДА"]].map(([num, label], i) => (
                <div key={i} className="flex items-center gap-8">
                  {i > 0 && <div className="w-px h-12 bg-border" />}
                  <div className="text-center">
                    <p className="font-cormorant text-4xl font-light text-foreground">{num}</p>
                    <p className="font-mono text-xs text-muted-foreground tracking-widest mt-1">{label}</p>
                  </div>
                </div>
              ))}
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
              style={{ background: "linear-gradient(to top, #0a0a0a, transparent)" }}
            />
          </div>
        </div>
      </section>

      {/* QUOTE BANNER */}
      <section className="section-hidden relative h-64 md:h-72 overflow-hidden">
        <img src={WAVE_IMG} alt="" className="w-full h-full object-cover opacity-30" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, #0a0a0a, transparent 30%, transparent 70%, #0a0a0a)" }}
        />
        <div className="absolute inset-0 flex items-center justify-center px-8">
          <p className="font-cormorant text-2xl md:text-4xl italic text-foreground/70 text-center max-w-2xl leading-relaxed">
            «Музыка начинается там, где слова заканчиваются»
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-8 md:px-16">
        <div className="max-w-2xl mx-auto">
          <div className="section-hidden text-center mb-16">
            <p className="font-mono text-xs tracking-[0.3em] text-accent uppercase mb-3">04 — Контакты</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light text-foreground mb-6">Напишите нам</h2>
            <p className="font-sans text-sm text-muted-foreground font-light leading-relaxed">
              Для коллабораций, бронирования выступлений или просто разговора о музыке.
            </p>
          </div>

          <form className="section-hidden space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-3">
                  Имя
                </label>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full bg-transparent border-b border-border pb-3 text-foreground font-sans text-sm font-light placeholder:text-muted-foreground/30 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-3">
                  Почта
                </label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="w-full bg-transparent border-b border-border pb-3 text-foreground font-sans text-sm font-light placeholder:text-muted-foreground/30 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-3">
                Сообщение
              </label>
              <textarea
                rows={4}
                placeholder="Расскажите о вашем запросе..."
                className="w-full bg-transparent border-b border-border pb-3 text-foreground font-sans text-sm font-light placeholder:text-muted-foreground/30 focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="font-mono text-xs tracking-widest uppercase border border-border px-10 py-4 text-foreground hover:border-accent hover:text-accent transition-all duration-300"
              >
                Отправить
              </button>
            </div>
          </form>

          <div className="section-hidden mt-20 pt-10 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex gap-8">
              {["Instagram", "Telegram", "VK"].map((s) => (
                <button
                  key={s}
                  className="font-mono text-xs tracking-widest text-muted-foreground hover:text-foreground transition-colors uppercase"
                >
                  {s}
                </button>
              ))}
            </div>
            <p className="font-mono text-xs text-muted-foreground/40 tracking-wider">© 2024 Звук &amp; Образ</p>
          </div>
        </div>
      </section>
    </div>
  );
}
