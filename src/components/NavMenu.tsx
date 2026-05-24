import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { label: "Главная", path: "/" },
  { label: "Обо мне", path: "/about" },
  { label: "Фотогалерея", path: "/gallery" },
  { label: "Контакты", path: "/contacts" },
];

interface NavMenuProps {
  marginRight?: string;
}

export default function NavMenu({ marginRight = "clamp(1rem, 4vw, 4rem)" }: NavMenuProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  const activeLabel =
    NAV_LINKS.find((l) => l.path === location.pathname)?.label ?? "Меню";

  return (
    <div ref={wrapRef} className="nav-menu-wrap" style={{ marginRight }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Открыть меню разделов"
        className={`nav-menu-btn font-cormorant italic ${open ? "is-open" : ""}`}
        style={{ animation: "logoFadeUp 1.1s ease-out 0s both" }}
      >
        <span className="nav-menu-label">{activeLabel}</span>
        <span className={`nav-menu-caret ${open ? "is-open" : ""}`} aria-hidden>
          ▾
        </span>
      </button>

      {open && (
        <ul className="nav-menu-list" role="menu">
          {NAV_LINKS.map(({ label, path }) => {
            const isActive = location.pathname === path;
            return (
              <li key={path} role="none">
                <button
                  role="menuitem"
                  onClick={() => go(path)}
                  className={`nav-menu-item font-cormorant italic ${isActive ? "is-active" : ""}`}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <style>{`
        .nav-menu-wrap {
          position: relative;
          z-index: 60;
        }
        .nav-menu-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6em;
          color: #fff;
          background: rgba(37, 65, 255, 0.18);
          border: 1px solid rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(8px);
          border-radius: 999px;
          padding: 0.55em 1.25em;
          font-size: clamp(0.95rem, 1.4vw, 1.4rem);
          letter-spacing: 0.02em;
          text-shadow: 0 2px 12px rgba(0,0,0,0.7);
          box-shadow:
            0 0 18px rgba(37, 65, 255, 0.35),
            inset 0 0 10px rgba(255,255,255,0.08);
          transition: box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease;
          white-space: nowrap;
          width: clamp(170px, 14vw, 220px);
          min-width: clamp(170px, 14vw, 220px);
          box-sizing: border-box;
        }
        .nav-menu-label {
          flex: 1;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        @media (max-width: 480px) {
          .nav-menu-btn {
            padding: 0.45em 0.95em;
            width: 150px;
            min-width: 150px;
            font-size: 0.95rem;
          }
        }
        @media (max-width: 360px) {
          .nav-menu-btn {
            width: 130px;
            min-width: 130px;
            padding: 0.4em 0.8em;
            font-size: 0.85rem;
          }
        }
        .nav-menu-btn:hover,
        .nav-menu-btn.is-open {
          border-color: #fff;
          background: rgba(37, 65, 255, 0.32);
          box-shadow:
            0 0 24px rgba(37, 65, 255, 0.65),
            inset 0 0 14px rgba(255,255,255,0.14);
        }
        .nav-menu-caret {
          display: inline-block;
          font-size: 0.7em;
          transition: transform 0.25s ease;
        }
        .nav-menu-caret.is-open {
          transform: rotate(-180deg);
        }
        .nav-menu-list {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          min-width: 220px;
          max-width: calc(100vw - 32px);
          max-height: calc(100vh - 120px);
          overflow-y: auto;
          margin: 0;
          padding: 8px;
          list-style: none;
          background: rgba(10, 10, 12, 0.85);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(37, 65, 255, 0.45);
          border-radius: 16px;
          box-shadow:
            0 18px 50px rgba(0,0,0,0.55),
            0 0 24px rgba(37, 65, 255, 0.4);
          animation: navMenuOpen 0.25s cubic-bezier(0.22,1,0.36,1) both;
        }
        @media (max-width: 480px) {
          .nav-menu-list {
            min-width: 180px;
          }
        }
        .nav-menu-item {
          width: 100%;
          text-align: left;
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.85);
          padding: 0.55em 0.9em;
          border-radius: 10px;
          font-size: clamp(1.05rem, 1.3vw, 1.3rem);
          transition: all 0.2s ease;
        }
        .nav-menu-item:hover {
          color: #fff;
          background: rgba(37, 65, 255, 0.22);
          text-shadow: 0 0 10px rgba(37, 65, 255, 0.65);
        }
        .nav-menu-item.is-active {
          color: #fff;
          background: rgba(37, 65, 255, 0.32);
          box-shadow: inset 0 0 12px rgba(37, 65, 255, 0.4);
          text-shadow: 0 0 12px rgba(37, 65, 255, 0.75);
        }
        @keyframes navMenuOpen {
          0% { opacity: 0; transform: translateY(-6px) scale(0.96); filter: blur(6px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
      `}</style>
    </div>
  );
}