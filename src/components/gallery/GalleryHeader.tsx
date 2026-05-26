export default function GalleryHeader() {
  return (
    <div
      className="flex items-end justify-between flex-wrap gap-3 mb-6 md:mb-8"
      style={{ animation: "aboutFadeLeft 1s cubic-bezier(0.22,1,0.36,1) 0.1s both" }}
    >
      <div>
        <h2
          className="font-cormorant italic font-bold leading-none"
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", color: "#fff" }}
        >
          Фотогалерея
        </h2>
      </div>
    </div>
  );
}