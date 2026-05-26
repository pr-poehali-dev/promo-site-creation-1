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
        className="lightbox-arrow lightbox-arrow-left"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Предыдущее"
      >
        ‹
      </button>
      <div className="lightbox-stage" onClick={onClose}>
        <img
          key={current.img}
          src={current.img}
          alt={current.title}
          className="lightbox-img"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          style={{ cursor: "zoom-out" }}
        />
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