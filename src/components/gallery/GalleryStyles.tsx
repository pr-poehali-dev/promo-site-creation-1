export default function GalleryStyles() {
  return (
    <style>{`
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
      .ss-bg {
        position: absolute;
        inset: 0;
        background-size: cover;
        background-position: center;
        filter: blur(28px) brightness(0.5) saturate(1.1);
        transform: scale(1.15);
        z-index: 0;
        transition: opacity 0.3s ease;
      }
      .ss-bg.is-fading { opacity: 0; }
      .ss-img {
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
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
