export default function GalleryStyles() {
  return (
    <style>{`
      @keyframes tileIn {
        0% { opacity: 0; transform: translateY(24px) scale(0.97); filter: blur(8px); }
        100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
      }
      @keyframes lightboxFade {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
      @keyframes lightboxZoom {
        0% { opacity: 0; transform: scale(0.94); filter: blur(8px); }
        100% { opacity: 1; transform: scale(1); filter: blur(0); }
      }

      .masonry {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-auto-flow: dense;
        gap: 10px;
      }
      @media (max-width: 1280px) {
        .masonry { grid-template-columns: repeat(3, 1fr); }
      }
      @media (max-width: 900px) {
        .masonry { grid-template-columns: repeat(2, 1fr); gap: 8px; }
      }
      @media (max-width: 520px) {
        .masonry { grid-template-columns: 1fr; }
      }

      .tile {
        position: relative;
        border-radius: 8px;
        overflow: visible;
        transform-style: preserve-3d;
        transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease;
        will-change: transform;
        aspect-ratio: 3 / 4;
      }
      .tile:hover {
        z-index: 5;
        box-shadow: 0 30px 60px rgba(0,0,0,0.7), 0 0 30px rgba(61,90,254,0.35);
      }
      .tile-inner {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 8px;
        overflow: hidden;
        cursor: zoom-in;
        isolation: isolate;
      }
      .tile-inner img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center top;
        background: #0a0a0a;
        filter: grayscale(15%) brightness(0.88);
        transition: transform 0.6s cubic-bezier(0.22,1,0.36,1), filter 0.4s ease;
      }
      .tile:hover .tile-inner img {
        transform: scale(1.08);
        filter: grayscale(0%) brightness(1);
      }

      /* Лок-эффект 18+ */
      .tile.is-locked .tile-inner {
        cursor: not-allowed;
        pointer-events: auto;
      }
      .tile.is-locked .tile-inner img {
        filter: blur(14px) brightness(0.55) saturate(1.1);
        transform: scale(1.1);
      }
      .tile.is-locked:hover .tile-inner img {
        filter: blur(14px) brightness(0.55) saturate(1.1);
        transform: scale(1.1);
      }
      .tile-lock-hint {
        display: inline-block;
        margin-top: 10px;
        padding: 8px 16px;
        font-size: 1.05rem;
        font-family: "Cormorant Garamond", serif;
        font-style: italic;
        letter-spacing: 0.06em;
        color: #fff;
        text-decoration: none;
        background: rgba(61,90,254,0.28);
        border: 1px solid rgba(255,255,255,0.55);
        border-radius: 999px;
        cursor: pointer;
        pointer-events: auto;
        transition: background 0.25s ease, transform 0.25s ease, border-color 0.25s ease;
      }
      .tile-lock-hint:hover {
        background: rgba(255,77,109,0.45);
        border-color: rgba(255,255,255,0.9);
        transform: translateY(-1px);
      }
      .tile-lock {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        color: #fff;
        background: linear-gradient(180deg, rgba(10,10,10,0.25), rgba(10,10,10,0.55));
        z-index: 2;
        font-family: "Cormorant Garamond", serif;
        font-style: italic;
        letter-spacing: 0.04em;
        font-size: 1.25rem;
        text-shadow: 0 2px 14px rgba(0,0,0,0.85);
        padding: 16px;
        text-align: center;
      }
      .tile-lock svg {
        filter: drop-shadow(0 0 12px rgba(255,77,109,0.85));
      }

      /* Подпись снизу */
      .tile-overlay {
        position: absolute;
        left: 0; right: 0; bottom: 0;
        padding: 14px 14px 12px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        background: linear-gradient(to top, rgba(8,8,18,0.85) 0%, rgba(61,90,254,0.08) 60%, transparent 100%);
        opacity: 0;
        transform: translateY(8px);
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 2;
        color: #fff;
      }
      .tile:hover .tile-overlay {
        opacity: 1;
        transform: translateY(0);
      }
      .tile-zoom {
        width: 32px;
        height: 32px;
        border-radius: 999px;
        background: rgba(61,90,254,0.25);
        border: 1px solid rgba(61,90,254,0.55);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #fff;
      }

      /* Кнопка лайка */
      .like-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 36px;
        height: 36px;
        border-radius: 999px;
        background: rgba(10,10,10,0.55);
        border: 1px solid rgba(255,255,255,0.18);
        color: rgba(255,255,255,0.85);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        backdrop-filter: blur(6px);
        z-index: 4;
        transition: transform 0.2s ease, background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
      }
      .like-btn:hover {
        transform: scale(1.12);
        border-color: rgba(255,77,109,0.6);
        color: #ff8aa0;
      }
      .like-btn.is-liked {
        background: rgba(255,77,109,0.18);
        border-color: #ff4d6d;
        color: #ff4d6d;
        box-shadow: 0 0 18px rgba(255,77,109,0.55);
        animation: likePop 0.45s cubic-bezier(0.22,1,0.36,1);
      }
      .like-btn.is-liked svg { fill: currentColor; }
      @keyframes likePop {
        0% { transform: scale(1); }
        40% { transform: scale(1.35); }
        100% { transform: scale(1); }
      }

      /* Lightbox */
      .lightbox {
        position: fixed;
        inset: 0;
        z-index: 9999;
        background: rgba(0,0,0,0.94);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        animation: lightboxFade 0.25s ease both;
        cursor: zoom-out;
      }
      .lightbox-stage {
        position: relative;
        max-width: 95vw;
        max-height: 92vh;
        cursor: default;
      }
      .lightbox-img {
        max-width: 95vw;
        max-height: 92vh;
        object-fit: contain;
        border-radius: 6px;
        box-shadow: 0 30px 90px rgba(0,0,0,0.85);
        animation: lightboxZoom 0.35s cubic-bezier(0.22,1,0.36,1) both;
        display: block;
      }
      .lightbox-img.is-blurred {
        filter: blur(48px) brightness(0.45) saturate(0.7);
        transform: scale(1.08);
      }
      .lightbox-lock {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        color: #fff;
        text-align: center;
        padding: 24px;
        font-family: "Cormorant Garamond", serif;
      }
      .lightbox-lock p {
        font-size: 1.5rem;
        font-style: italic;
        margin: 0;
        text-shadow: 0 4px 24px rgba(0,0,0,0.9);
      }
      .lightbox-lock span {
        color: rgba(255,255,255,0.65);
        font-size: 0.95rem;
        letter-spacing: 0.05em;
      }
      .lightbox-lock svg {
        color: #ff4d6d;
        filter: drop-shadow(0 0 18px rgba(255,77,109,0.85));
      }
      .lightbox-caption {
        position: absolute;
        left: 0; right: 0; bottom: -42px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: rgba(255,255,255,0.75);
        font-family: "Cormorant Garamond", serif;
        font-style: italic;
        font-size: 1rem;
        padding: 0 4px;
      }
      .lightbox-counter {
        font-family: "IBM Plex Mono", monospace;
        font-style: normal;
        font-size: 0.8rem;
        letter-spacing: 0.15em;
        color: rgba(255,255,255,0.55);
      }
      .lightbox-close {
        position: absolute;
        top: 18px;
        right: 22px;
        width: 44px;
        height: 44px;
        background: rgba(10,10,10,0.6);
        border: 1px solid rgba(61,90,254,0.5);
        color: #fff;
        border-radius: 999px;
        cursor: pointer;
        transition: all 0.25s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
      }
      .lightbox-close:hover {
        background: rgba(61,90,254,0.3);
        border-color: #3d5afe;
        box-shadow: 0 0 22px rgba(61,90,254,0.65);
        transform: scale(1.08);
      }
      .lightbox-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 56px;
        height: 56px;
        font-size: 2.4rem;
        line-height: 1;
        background: rgba(10,10,10,0.55);
        border: 1px solid rgba(61,90,254,0.45);
        color: #fff;
        border-radius: 999px;
        cursor: pointer;
        transition: all 0.25s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 4px;
        backdrop-filter: blur(8px);
      }
      .lightbox-arrow:hover {
        background: rgba(61,90,254,0.3);
        border-color: #3d5afe;
        box-shadow: 0 0 24px rgba(61,90,254,0.65);
      }
      .lightbox-arrow-left { left: 24px; }
      .lightbox-arrow-right { right: 24px; }
      @media (max-width: 640px) {
        .lightbox-arrow { width: 44px; height: 44px; font-size: 1.8rem; }
        .lightbox-arrow-left { left: 8px; }
        .lightbox-arrow-right { right: 8px; }
      }

      /* Слайд-шоу */
      .ss { width: 100%; }
      .ss-stage {
        position: relative;
        width: 100%;
        aspect-ratio: 3 / 4;
        max-height: 78vh;
        margin: 0 auto;
        border-radius: 12px;
        overflow: hidden;
        background: #0a0a0a;
        box-shadow: 0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(61,90,254,0.25);
        touch-action: pan-y;
      }
      @media (min-width: 768px) {
        .ss-stage { aspect-ratio: 16 / 10; max-width: 900px; }
      }
      .ss-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center top;
        display: block;
        opacity: 1;
        transform: scale(1);
        transition: opacity 0.3s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1);
      }
      .ss-img.is-fading {
        opacity: 0;
        transform: scale(1.04);
      }
      .ss-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 54px;
        height: 54px;
        font-size: 2.3rem;
        line-height: 1;
        padding-bottom: 4px;
        background: rgba(10,10,10,0.5);
        border: 1px solid rgba(61,90,254,0.45);
        color: #fff;
        border-radius: 999px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(8px);
        transition: all 0.25s ease;
        z-index: 3;
      }
      .ss-arrow:hover {
        background: rgba(61,90,254,0.32);
        border-color: #3d5afe;
        box-shadow: 0 0 24px rgba(61,90,254,0.65);
      }
      .ss-arrow-left { left: 14px; }
      .ss-arrow-right { right: 14px; }
      @media (max-width: 640px) {
        .ss-arrow { width: 42px; height: 42px; font-size: 1.7rem; }
        .ss-arrow-left { left: 8px; }
        .ss-arrow-right { right: 8px; }
      }
      .ss-caption {
        position: absolute;
        left: 0; right: 0; bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 28px 20px 16px;
        background: linear-gradient(to top, rgba(8,8,18,0.85) 0%, transparent 100%);
        color: #fff;
        z-index: 2;
        transition: opacity 0.3s ease;
      }
      .ss-caption.is-fading { opacity: 0; }
      .ss-title {
        font-family: "Cormorant Garamond", serif;
        font-style: italic;
        font-size: 1.5rem;
        text-shadow: 0 2px 14px rgba(0,0,0,0.85);
      }
      .ss-counter {
        font-family: "IBM Plex Mono", monospace;
        font-size: 0.85rem;
        letter-spacing: 0.15em;
        color: rgba(255,255,255,0.7);
      }
      .ss-dots {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
        margin-top: 22px;
      }
      .ss-dot {
        width: 10px;
        height: 10px;
        border-radius: 999px;
        border: 1px solid rgba(255,255,255,0.4);
        background: transparent;
        cursor: pointer;
        transition: all 0.25s ease;
        padding: 0;
      }
      .ss-dot:hover { border-color: #3d5afe; }
      .ss-dot.is-active {
        background: #3d5afe;
        border-color: #3d5afe;
        box-shadow: 0 0 12px rgba(61,90,254,0.8);
        transform: scale(1.2);
      }
    `}</style>
  );
}