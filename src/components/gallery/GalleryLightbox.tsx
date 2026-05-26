import Icon from "@/components/ui/icon";
import type { GalleryItem } from "./data";

type Props = {
  current: GalleryItem;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function GalleryLightbox({ current, index, total, onClose, onPrev, onNext }: Props) {
  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button
        className="lightbox-close"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Закрыть"
      >
        <Icon name="X" size={22} />
      </button>
      <button
        className="lightbox-arrow lightbox-arrow-left"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Предыдущее"
      >
        ‹
      </button>
      <div className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
        <img
          key={current.img}
          src={current.img}
          alt={current.title}
          className={`lightbox-img ${current.locked ? "is-blurred" : ""}`}
        />
        {current.locked && (
          <div className="lightbox-lock">
            <Icon name="Lock" size={36} />
            <p>Это фото 18+ — доступно по запросу</p>
            <span>Свяжитесь через раздел «Контакты»</span>
          </div>
        )}
        <div className="lightbox-caption">
          <span className="lightbox-counter">
            {index + 1} / {total}
          </span>
        </div>
      </div>
      <button
        className="lightbox-arrow lightbox-arrow-right"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Следующее"
      >
        ›
      </button>
    </div>
  );
}