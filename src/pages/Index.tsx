import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HERO_IMG = "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/8b210152-8886-40ff-ac3d-9b7369e5e331.jpg";
const ABOUT_IMG = "https://cdn.poehali.dev/projects/9cdf5cd0-327a-49a6-b274-7ec4148eeedf/bucket/572b2706-dbbc-4d45-930d-b1bcab9ffdb3.jpg";

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
  const [lightbox, setLightbox] = useState<{ img: string; title: string } | null>(null);

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

  return (
    <div className="grain min-h-screen bg-background text-foreground">
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 pt-6 pb-3 gap-6"
        style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.95) 0%, transparent 100%)" }}
      >
        <span
          className="font-cormorant italic font-bold inline-flex items-center"
          style={{ cursor: "pointer", fontSize: "clamp(1.1rem, 2.6vw, 2.6rem)", lineHeight: 1, fontWeight: 700, marginLeft: "clamp(0.25rem, 2vw, 2rem)", animation: "logoFadeUp 1.1s ease-out 0s both", whiteSpace: "nowrap" }}
          onClick={() => navigate("/")}
        >
          <span style={{ color: "#e30613", textShadow: "0 0 12px rgba(227,6,19,0.85), 0 0 22px rgba(227,6,19,0.45)" }}>Сладкие</span>
          <span className="inline-block select-none align-middle" style={{ fontSize: "0.7em", margin: "0 0.15em" }}>🍓</span>
          <span style={{ color: "#2541ff", textShadow: "0 0 12px rgba(37,65,255,0.9), 0 0 22px rgba(37,65,255,0.5)" }}>Грёзы</span>
        </span>

      </nav>

      {/* HERO */}
      <section id="hero" className="relative h-screen flex flex-col justify-center px-8 md:px-16 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-50" />
          <div
            className="absolute inset-0"
            style={{ background: "hsl(0,0%,2%)" }}
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
            <h2 className="font-cormorant font-light text-foreground mb-8 leading-tight" style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}>
              О проекте
              <br />
              <em style={{ fontWeight: 700 }}>Сладкие<span className="inline-block select-none align-middle" style={{ fontSize: "0.7em", margin: "0 0.15em" }}>🍓</span>Грёзы</em>
            </h2>
            <div className="space-y-5 text-muted-foreground font-sans text-sm font-light leading-loose">
              <p>
                Привет, я Эльвира, предлагаю тебе, мой дорогой мужчина, гибкий формат досуга, созданный специально для тех моментов, когда тебе становится скучно: после работы, в выходной день или просто в минуты застоя.
              </p>
              <p>
                Также в списке услуг имеется ваниль, если ты понимаешь, о чём я :))
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

      <footer className="relative z-10 mt-8 px-6 md:px-12 py-8 border-t border-white/10 text-white/40 text-[11px] leading-relaxed font-light">
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

    </div>
  );
}