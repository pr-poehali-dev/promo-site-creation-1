import { forwardRef } from "react";
import Icon from "@/components/ui/icon";
import type { GalleryItem } from "./data";

type Props = {
  item: GalleryItem;
  index: number;
  onOpen: (index: number) => void;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
};

const GalleryTile = forwardRef<HTMLDivElement, Props>(function GalleryTile(
  { item, index, onOpen, onMouseMove, onMouseLeave },
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
        {item.locked && (
          <div className="tile-lock">
            <Icon name="Lock" size={28} />
            <span>Доступно по запросу</span>
          </div>
        )}
        <div className="tile-overlay">
          <span className="tile-zoom">
            <Icon name="ZoomIn" size={18} />
          </span>
        </div>
      </div>
    </div>
  );
});

export default GalleryTile;