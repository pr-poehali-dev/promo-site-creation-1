import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !shown) {
        setIsOpen(true);
        setShown(true);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && !shown) {
        setIsOpen(true);
        setShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [shown]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="max-w-xl border-0 p-0"
        style={{
          background:
            "linear-gradient(rgba(4,6,20,0.96), rgba(4,6,20,0.96)) padding-box, linear-gradient(135deg, #3d5afe 0%, #7c4dff 50%, #b16cff 100%) border-box",
          border: "2px solid transparent",
          borderRadius: "12px",
          boxShadow:
            "0 0 32px rgba(61,90,254,0.6), 0 0 64px rgba(124,77,255,0.4)",
        }}
      >
        <div className="p-6 md:p-10 text-center">
          <p
            className="font-cormorant italic"
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              fontWeight: 600,
              color: "#fff",
              textShadow:
                "0 0 16px rgba(61,90,254,0.7), 0 2px 16px rgba(0,0,0,0.7)",
              lineHeight: 1.2,
              marginBottom: "0.4em",
            }}
          >
            Уходишь, зай!?
          </p>
          <p
            className="font-cormorant"
            style={{
              fontSize: "clamp(1.3rem, 2vw, 1.8rem)",
              color: "rgba(255,255,255,0.92)",
              lineHeight: 1.3,
            }}
          >
            Дарю тебе{" "}
            <span
              style={{
                color: "#fff",
                fontWeight: 600,
                textShadow: "0 0 12px rgba(255,77,109,0.7)",
              }}
            >
              5% скидку
            </span>{" "}
            на встречу со мной{" "}
            <span
              style={{
                display: "inline-block",
                animation: "lipsPulseExit 2.4s ease-in-out infinite",
                filter: "drop-shadow(0 0 8px rgba(255,77,109,0.7))",
              }}
            >
              💋
            </span>
          </p>
        </div>
        <style>{`
          @keyframes lipsPulseExit {
            0%, 100% { transform: scale(1) rotate(-6deg); }
            50% { transform: scale(1.2) rotate(6deg); }
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}
