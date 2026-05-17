import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const MUSIC_SRC = "/music/background.mp3";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.volume = 0.45;
    audioRef.current = audio;

    const tryPlay = () => {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    };

    tryPlay();

    const onFirstInteract = () => {
      if (audio.paused) {
        audio
          .play()
          .then(() => setPlaying(true))
          .catch(() => {});
      }
      window.removeEventListener("click", onFirstInteract);
      window.removeEventListener("touchstart", onFirstInteract);
      window.removeEventListener("keydown", onFirstInteract);
    };
    window.addEventListener("click", onFirstInteract);
    window.addEventListener("touchstart", onFirstInteract);
    window.addEventListener("keydown", onFirstInteract);

    return () => {
      window.removeEventListener("click", onFirstInteract);
      window.removeEventListener("touchstart", onFirstInteract);
      window.removeEventListener("keydown", onFirstInteract);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Выключить музыку" : "Включить музыку"}
      style={{
        position: "fixed",
        right: "clamp(0.75rem, 2vw, 1.5rem)",
        bottom: "clamp(0.75rem, 2vw, 1.5rem)",
        zIndex: 100,
        width: "52px",
        height: "52px",
        borderRadius: "999px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(10,10,10,0.55)",
        border: "1px solid rgba(61,90,254,0.6)",
        color: "#fff",
        backdropFilter: "blur(8px)",
        boxShadow: "0 0 22px rgba(61,90,254,0.55)",
        cursor: "pointer",
        transition: "all 0.25s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.08)";
        e.currentTarget.style.borderColor = "#3d5afe";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.borderColor = "rgba(61,90,254,0.6)";
      }}
    >
      <Icon name={playing ? "Volume2" : "VolumeX"} size={22} />
    </button>
  );
}
