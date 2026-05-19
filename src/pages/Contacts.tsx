import { useRef, useState } from "react";
import PageLayout from "@/components/PageLayout";

const CITIES = [
  { name: "Москва", slug: "moskva", region: "Москва и Московская область" },
  { name: "Санкт-Петербург", slug: "spb", region: "СПб и Ленинградская область" },
  { name: "Саратов", slug: "saratov", region: "Саратов и область" },
  { name: "Воронеж", slug: "voronezh", region: "Воронеж и область" },
  { name: "Самара", slug: "samara", region: "Самара и область" },
  { name: "Волгоград", slug: "volgograd", region: "Волгоград и область" },
];

const SEND_LEAD_URL = "https://functions.poehali.dev/f5ce1336-690a-4620-b301-14c6b668bb09";

export default function Contacts() {
  const [form, setForm] = useState({ name: "", phone: "", city: "", message: "", website: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorText, setErrorText] = useState("");
  const formMountedAt = useRef<number>(Date.now());

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!form.name.trim() || !form.phone.trim()) {
      setStatus("error");
      setErrorText("Заполни имя и телефон.");
      return;
    }
    const elapsed_ms = Date.now() - formMountedAt.current;
    if (elapsed_ms < 2500) {
      setStatus("success");
      setForm({ name: "", phone: "", city: "", message: "", website: "" });
      setTimeout(() => setStatus("idle"), 6000);
      return;
    }
    setStatus("sending");
    setErrorText("");
    try {
      const res = await fetch(SEND_LEAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, elapsed_ms }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ошибка отправки");
      setStatus("success");
      setForm({ name: "", phone: "", city: "", message: "", website: "" });
      formMountedAt.current = Date.now();
      setTimeout(() => setStatus("idle"), 6000);
    } catch (err) {
      setStatus("error");
      setErrorText(err instanceof Error ? err.message : "Ошибка отправки");
    }
  };

  return (
    <PageLayout noBackground>
      <div className="px-8 md:px-16 pt-6 md:pt-8 pb-16">
        <div className="flex flex-col items-center gap-8">
          <a
            href="tel:+79869852111"
            className="flex items-center gap-3 sm:gap-5 group flex-nowrap whitespace-nowrap"
            style={{ animation: "aboutFadeUp 1.1s cubic-bezier(0.22,1,0.36,1) 0.1s both" }}
          >
            <span style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)" }}>📞</span>
            <span
              className="font-cormorant italic tracking-wide group-hover:text-accent transition-colors duration-300 whitespace-nowrap"
              style={{
                color: "#fff",
                textShadow: "0 2px 24px rgba(0,0,0,0.85), 0 0 18px rgba(61,90,254,0.35)",
                fontSize: "clamp(1.5rem, 6vw, 5rem)",
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              8 (986) 985-21-11
            </span>
          </a>

          <a
            href="tel:+79869852111"
            className="inline-flex items-center gap-3 font-cormorant italic px-10 py-4 rounded-full border border-white/50 backdrop-blur-sm hover:border-white hover:scale-105 transition-all duration-300"
            style={{
              color: "#fff",
              background: "rgba(61,90,254,0.22)",
              boxShadow: "0 0 28px rgba(61,90,254,0.55), inset 0 0 14px rgba(255,255,255,0.1)",
              textShadow: "0 2px 12px rgba(0,0,0,0.7)",
              fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
              animation: "aboutFadeUp 1.1s cubic-bezier(0.22,1,0.36,1) 0.22s both",
            }}
          >
            <span style={{ fontSize: "1.15em" }}>☎️</span>
            <span>Позвонить</span>
          </a>

          <p
            className="font-cormorant italic text-center max-w-2xl mt-6 leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.92)",
              fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
              textShadow: "0 2px 16px rgba(0,0,0,0.7)",
              animation: "aboutFadeUp 1.1s cubic-bezier(0.22,1,0.36,1) 0.6s both",
            }}
          >
            По поводу встречи, звони по телефону или напиши мне.
          </p>

          <form
            onSubmit={submit}
            className="w-full max-w-xl mt-14 md:mt-20 flex flex-col gap-4 p-6 md:p-8 rounded-3xl border border-white/25 backdrop-blur-md"
            style={{
              background: "rgba(20,16,30,0.55)",
              boxShadow: "0 0 40px rgba(61,90,254,0.35), inset 0 0 18px rgba(255,255,255,0.06)",
              animation: "aboutFadeUp 1.1s cubic-bezier(0.22,1,0.36,1) 0.7s both",
            }}
          >
            <h2
              className="font-cormorant italic text-center"
              style={{
                color: "#fff",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                fontWeight: 600,
                textShadow: "0 2px 14px rgba(0,0,0,0.85), 0 0 18px rgba(255,77,109,0.4)",
                lineHeight: 1.1,
              }}
            >
              Оставь заявку — перезвоню сама 💋
            </h2>
            <p
              className="font-cormorant italic text-center"
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
                textShadow: "0 2px 10px rgba(0,0,0,0.7)",
                marginTop: "-0.5rem",
              }}
            >
              Конфиденциально. Без спама.
            </p>

            <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "-9999px", width: "1px", height: "1px", overflow: "hidden", opacity: 0, pointerEvents: "none" }}>
              <label>
                Website (не заполнять)
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                />
              </label>
            </div>

            <input
              type="text"
              placeholder="Как тебя зовут"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={100}
              required
              className="lead-input"
            />
            <input
              type="tel"
              placeholder="Телефон для связи"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              maxLength={30}
              required
              className="lead-input"
            />
            <select
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="lead-input"
            >
              <option value="">Выбери город</option>
              {CITIES.map((c) => (
                <option key={c.slug} value={c.name} style={{ color: "#222" }}>
                  {c.name}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Комментарий (необязательно)"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              maxLength={1000}
              rows={3}
              className="lead-input"
              style={{ resize: "vertical" }}
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="font-cormorant italic px-8 py-4 rounded-full border border-white/60 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02]"
              style={{
                color: "#fff",
                background: "linear-gradient(135deg, rgba(255,77,109,0.6), rgba(61,90,254,0.6))",
                boxShadow: "0 0 28px rgba(255,77,109,0.55), inset 0 0 14px rgba(255,255,255,0.15)",
                textShadow: "0 2px 12px rgba(0,0,0,0.6)",
                fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                fontWeight: 600,
                cursor: status === "sending" ? "wait" : "pointer",
              }}
            >
              {status === "sending" ? "Отправляю..." : "Отправить заявку 💌"}
            </button>

            {status === "success" && (
              <div
                className="font-cormorant italic text-center px-4 py-3 rounded-2xl"
                style={{
                  background: "rgba(76,175,80,0.2)",
                  border: "1px solid rgba(76,175,80,0.6)",
                  color: "#a8f0a8",
                  fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
                  textShadow: "0 2px 10px rgba(0,0,0,0.6)",
                }}
              >
                Заявка отправлена. Скоро свяжусь с тобой ❤️
              </div>
            )}
            {status === "error" && (
              <div
                className="font-cormorant italic text-center px-4 py-3 rounded-2xl"
                style={{
                  background: "rgba(255,77,109,0.15)",
                  border: "1px solid rgba(255,77,109,0.6)",
                  color: "#ffb3c0",
                  fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
                  textShadow: "0 2px 10px rgba(0,0,0,0.6)",
                }}
              >
                {errorText || "Не удалось отправить. Позвони напрямую."}
              </div>
            )}
          </form>
        </div>
      </div>

      <style>{`
        .lead-input {
          width: 100%;
          padding: 14px 18px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.08);
          color: #fff;
          font-family: 'Cormorant', serif;
          font-style: italic;
          font-size: clamp(1.05rem, 1.5vw, 1.25rem);
          outline: none;
          transition: border-color 0.3s, box-shadow 0.3s, background 0.3s;
          backdrop-filter: blur(6px);
        }
        .lead-input::placeholder {
          color: rgba(255,255,255,0.55);
          font-style: italic;
        }
        .lead-input:focus {
          border-color: rgba(255,77,109,0.85);
          box-shadow: 0 0 22px rgba(255,77,109,0.4), inset 0 0 10px rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.12);
        }
        select.lead-input option {
          background: #1a1426;
          color: #fff;
        }
        .city-card:hover {
          transform: translateY(-3px) scale(1.02);
          border-color: rgba(255,255,255,0.85) !important;
          box-shadow: 0 0 32px rgba(61,90,254,0.6), inset 0 0 14px rgba(255,255,255,0.12) !important;
        }
        .city-card-active {
          animation: cityPulse 1.2s ease-in-out 2;
        }
        @keyframes cityPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes lipsPulse {
          0%, 100% { transform: scale(1) rotate(-6deg); filter: drop-shadow(0 0 6px rgba(255,77,109,0.5)); }
          50% { transform: scale(1.15) rotate(6deg); filter: drop-shadow(0 0 14px rgba(255,77,109,0.85)); }
        }
        @keyframes aboutFadeUp {
          0% { opacity: 0; transform: translateY(36px); filter: blur(8px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes cityFramePulse {
          0%, 100% {
            box-shadow: 0 0 24px rgba(61,90,254,0.55), 0 0 48px rgba(124,77,255,0.35), inset 0 0 18px rgba(61,90,254,0.18);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 36px rgba(61,90,254,0.85), 0 0 72px rgba(124,77,255,0.55), inset 0 0 28px rgba(124,77,255,0.28);
            transform: scale(1.025);
          }
        }
        @keyframes cityPin {
          0%, 100% { transform: translateY(0) rotate(-4deg); }
          50% { transform: translateY(-4px) rotate(4deg); }
        }
      `}</style>
    </PageLayout>
  );
}