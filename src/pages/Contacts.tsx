import { useRef, useState } from "react";
import PageLayout from "@/components/PageLayout";

const CITIES = [
  { name: "Саратов", slug: "saratov", region: "Саратов" },
  { name: "Самара", slug: "samara", region: "Самара и область" },
  { name: "Волгоград", slug: "volgograd", region: "Волгоград и область" },
  { name: "Воронеж", slug: "voronezh", region: "Воронеж и область" },
  { name: "Москва", slug: "moskva", region: "Москва и Московская область" },
  { name: "Санкт-Петербург", slug: "spb", region: "СПб и Ленинградская область" },
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
    if (!form.name.trim() || !form.phone.trim() || !form.city.trim()) {
      setStatus("error");
      setErrorText("Заполни имя, телефон и выбери город.");
      return;
    }
    const elapsed_ms = Date.now() - formMountedAt.current;
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
      <div className="px-4 sm:px-6 md:px-16 pt-6 md:pt-8 pb-16 max-w-6xl mx-auto">
        <div className="flex flex-col items-center gap-6 sm:gap-8">
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
                fontSize: "clamp(1.6rem, 5.2vw, 4rem)",
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

          <div
            className="flex items-center gap-4 w-full max-w-xl mt-12 sm:mt-16 md:mt-20 mb-6 sm:mb-8"
            style={{
              animation: "aboutFadeUp 1.1s cubic-bezier(0.22,1,0.36,1) 0.55s both",
            }}
          >
            <span
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(61,90,254,0.55), transparent)",
              }}
            />
            <span
              className="font-cormorant italic whitespace-nowrap px-2"
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "clamp(1.05rem, 1.8vw, 1.5rem)",
                textShadow:
                  "0 2px 12px rgba(0,0,0,0.7), 0 0 14px rgba(61,90,254,0.35)",
                letterSpacing: "0.04em",
              }}
            >
              или напишите мне
            </span>
            <span
              className="flex-1 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(61,90,254,0.55), transparent)",
              }}
            />
          </div>

          <form
            onSubmit={submit}
            noValidate
            className="w-full max-w-xl flex flex-col gap-4 p-6 md:p-8 rounded-3xl border border-white/25 backdrop-blur-md relative z-20"
            style={{
              background: "rgba(20,16,30,0.55)",
              boxShadow: "0 0 40px rgba(61,90,254,0.35), inset 0 0 18px rgba(255,255,255,0.06)",
              animation: "aboutFadeUp 1.1s cubic-bezier(0.22,1,0.36,1) 0.7s both",
            }}
          >
            <h2
              className="italic text-center"
              style={{
                fontFamily: '"Playfair Display", serif',
                color: "#fff",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                fontWeight: 700,
                letterSpacing: "0.02em",
                textShadow: "0 2px 14px rgba(0,0,0,0.85), 0 0 18px rgba(255,77,109,0.4)",
                lineHeight: 1.15,
                marginTop: "-0.5rem",
                marginBottom: "0.25rem",
              }}
            >
              Напиши и получи скидку{" "}
              <span
                style={{
                  color: "#ff3e57",
                  fontWeight: 800,
                  fontSize: "1.2em",
                  textShadow:
                    "0 0 14px rgba(255,62,87,0.95), 0 0 28px rgba(255,62,87,0.65), 0 2px 14px rgba(0,0,0,0.85)",
                  animation: "discountPulse 1.8s ease-in-out infinite",
                  display: "inline-block",
                  verticalAlign: "middle",
                }}
              >
                5%
              </span>
              <style>{`
                @keyframes discountPulse {
                  0%, 100% {
                    transform: scale(1);
                    text-shadow: 0 0 14px rgba(255,62,87,0.95), 0 0 28px rgba(255,62,87,0.55), 0 2px 14px rgba(0,0,0,0.85);
                  }
                  50% {
                    transform: scale(1.12);
                    text-shadow: 0 0 18px rgba(255,62,87,1), 0 0 40px rgba(255,62,87,0.85), 0 0 60px rgba(255,62,87,0.45), 0 2px 14px rgba(0,0,0,0.85);
                  }
                }
              `}</style>
            </h2>
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
              className={`lead-input ${form.name.trim().length >= 2 ? "is-valid" : ""}`}
            />
            <input
              type="tel"
              placeholder="Телефон для связи"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              maxLength={30}
              required
              className={`lead-input ${form.phone.replace(/\D/g, "").length >= 10 ? "is-valid" : ""}`}
            />
            <select
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              required
              className={`lead-input lead-select ${form.city === "" ? "is-placeholder" : "is-selected"}`}
            >
              <option value="" disabled hidden>Выбери город</option>
              {CITIES.map((c) => (
                <option key={c.slug} value={c.name}>
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
              className="font-cormorant italic px-8 py-4 rounded-full border border-white/60 transition-all duration-300 hover:scale-[1.02] relative z-30"
              style={{
                color: "#fff",
                background: "linear-gradient(135deg, rgba(255,77,109,0.85), rgba(61,90,254,0.85))",
                boxShadow: "0 0 28px rgba(255,77,109,0.55), inset 0 0 14px rgba(255,255,255,0.15)",
                textShadow: "0 2px 12px rgba(0,0,0,0.6)",
                fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                fontWeight: 600,
                cursor: "pointer",
                opacity: status === "sending" ? 0.7 : 1,
                pointerEvents: status === "sending" ? "none" : "auto",
              }}
            >
              {status === "sending" ? "Отправляю..." : "Отправить 💌"}
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
        .lead-input.is-valid {
          color: #fff;
          border: 2px solid #39ff7a;
          background: rgba(255,255,255,0.08);
          box-shadow: 0 0 22px rgba(57,255,122,0.6), inset 0 0 12px rgba(57,255,122,0.18);
          -webkit-text-fill-color: #fff;
        }
        .lead-input.is-valid:focus {
          border-color: #39ff7a;
          background: rgba(255,255,255,0.12);
          box-shadow: 0 0 30px rgba(57,255,122,0.85), inset 0 0 14px rgba(57,255,122,0.25);
        }
        /* Сброс автозаполнения браузера — фон 100% совпадает с обычными полями */
        .lead-input:-webkit-autofill,
        .lead-input:-webkit-autofill:hover,
        .lead-input:-webkit-autofill:focus,
        .lead-input:-webkit-autofill:active,
        input.lead-input:-webkit-autofill,
        input[type="tel"]:-webkit-autofill,
        input[type="text"]:-webkit-autofill,
        input[type="email"]:-webkit-autofill {
          -webkit-text-fill-color: #fff !important;
          -webkit-background-clip: text !important;
          background-color: rgba(255,255,255,0.08) !important;
          background-image: none !important;
          box-shadow: inset 0 0 0 9999px rgba(20,16,30,0) !important;
          -webkit-box-shadow: inset 0 0 0 9999px rgba(20,16,30,0) !important;
          caret-color: #fff !important;
          transition: background-color 9999s ease-in-out 0s, color 9999s ease-in-out 0s;
        }
        .lead-input.is-valid:-webkit-autofill,
        .lead-input.is-valid:-webkit-autofill:hover,
        .lead-input.is-valid:-webkit-autofill:focus,
        input.lead-input.is-valid:-webkit-autofill {
          -webkit-text-fill-color: #fff !important;
          background-color: rgba(255,255,255,0.08) !important;
          box-shadow: inset 0 0 0 9999px rgba(20,16,30,0), 0 0 22px rgba(57,255,122,0.6), inset 0 0 12px rgba(57,255,122,0.18) !important;
          -webkit-box-shadow: inset 0 0 0 9999px rgba(20,16,30,0), 0 0 22px rgba(57,255,122,0.6), inset 0 0 12px rgba(57,255,122,0.18) !important;
        }
        select.lead-input option {
          background: #1a1426;
          color: #fff;
        }
        .lead-select {
          color: #fff;
          font-weight: 600;
          letter-spacing: 0.02em;
          text-shadow: 0 2px 10px rgba(0,0,0,0.7);
          appearance: none;
          -webkit-appearance: none;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>");
          background-repeat: no-repeat;
          background-position: right 16px center;
          background-size: 16px 16px;
          padding-right: 44px;
        }
        .lead-select.is-placeholder {
          color: #fff;
          opacity: 1;
          text-shadow: 0 2px 12px rgba(0,0,0,0.85), 0 0 14px rgba(255,77,109,0.35);
        }
        .lead-select.is-selected {
          color: #fff;
          font-weight: 600;
          border: 2px solid #39ff7a;
          background-color: rgba(255,255,255,0.08);
          text-shadow: 0 2px 10px rgba(0,0,0,0.7);
          box-shadow: 0 0 22px rgba(57,255,122,0.6), inset 0 0 12px rgba(57,255,122,0.18);
        }
        .lead-select.is-selected:focus {
          border-color: #39ff7a;
          background-color: rgba(255,255,255,0.12);
          box-shadow: 0 0 30px rgba(57,255,122,0.85), inset 0 0 14px rgba(57,255,122,0.25);
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