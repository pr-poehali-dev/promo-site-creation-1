import { forwardRef } from "react";
import Icon from "@/components/ui/icon";
import type { GalleryItem } from "./data";

type Props = {
  item: GalleryItem;
  index: number;
  liked: boolean;
  onOpen: (index: number) => void;
  onToggleLike: (img: string) => void;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
};

const GalleryTile = forwardRef<HTMLDivElement, Props>(function GalleryTile(
  { item, index, liked, onOpen, onToggleLike, onMouseMove, onMouseLeave },
  ref,
) {
  return (
    <div
      ref={ref}
      className={`tile ${item.locked ? "is-locked" : ""}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ animation: `tileIn 0.7s cubic-bezier(0.22,1,0.36,1) ${0.05 * index}s both` }}
    >
      <div className="tile-inner" onClick={() => onOpen(index)}>
        <img src={item.img} alt={item.title} loading="lazy" />
        <div className="tile-shine" />
        {item.locked && (
          <div className="tile-lock">
            <Icon name="Lock" size={28} />
            <span>Доступно по запросу</span>
          </div>
        )}
        <div className="tile-overlay">
          <span className="tile-title">{item.title}</span>
          <span className="tile-zoom">
            <Icon name="ZoomIn" size={18} />
          </span>
        </div>
      </div>
      <button
        className={`like-btn ${liked ? "is-liked" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleLike(item.img);
        }}
        aria-label="В избранное"
      >
        <Icon name="Heart" size={18} />
      </button>
    </div>
  );
});

export default GalleryTile;
