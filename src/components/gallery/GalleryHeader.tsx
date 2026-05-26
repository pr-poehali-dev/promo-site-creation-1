import Icon from "@/components/ui/icon";

type Props = {
  total: number;
  likedCount: number;
};

export default function GalleryHeader({ total, likedCount }: Props) {
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
        <p className="text-white/55 text-sm md:text-base mt-2 font-light">
          {total} снимков · наведи на фото для эффекта объёма
        </p>
      </div>
      <div className="flex items-center gap-2 text-white/70 text-sm">
        <Icon name="Heart" size={16} className="text-[#ff4d6d]" />
        <span>
          В избранном: <span className="text-white font-medium">{likedCount}</span>
        </span>
      </div>
    </div>
  );
}
