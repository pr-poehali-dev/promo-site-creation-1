import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const MUSIC_SRC = "/music/background.mp3";
const TARGET_VOLUME = 0.45;
const FADE_DURATION_MS = 2500;
const STORAGE_KEY = "bg-music-enabled";

const readSavedState = (): boolean => {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === null ? true : v === "1";
  } catch {
    return true;
  }
};

const saveState = (enabled: boolean) => {
  try {
    localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
  } catch {
    // ignore
  }
};

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);

  const clearFade = () => {
    if (fadeTimerRef.current !== null) {
      window.clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  };

  const fadeTo = (audio: HTMLAudioElement, target: number, onDone?: () => void) => {
    clearFade();
    const start = audio.volume;
    const startTime = performance.now();
    fadeTimerRef.current = window.setInterval(() => {
      const t = Math.min(1, (performance.now() - startTime) / FADE_DURATION_MS);
      audio.volume = Math.max(0, Math.min(1, start + (target - start) * t));
      if (t >= 1) {
        clearFade();
        onDone?.();
      }
    }, 40);
  };

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    const shouldPlay = readSavedState();

    const startWithFade = () => {
      audio
        .play()
        .then(() => {
          setPlaying(true);
          fadeTo(audio, TARGET_VOLUME);
        })
        .catch(() => setPlaying(false));
    };

    if (shouldPlay) {
      startWithFade();
    }

    const onFirstInteract = () => {
      if (readSavedState() && audio.paused) {
        audio.volume = 0;
        audio
          .play()
          .then(() => {
            setPlaying(true);
            fadeTo(audio, TARGET_VOLUME);
          })
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
      clearFade();
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.volume = 0;
      audio
        .play()
        .then(() => {
          setPlaying(true);
          saveState(true);
          fadeTo(audio, TARGET_VOLUME);
        })
        .catch(() => {});
    } else {
      saveState(false);
      fadeTo(audio, 0, () => {
        audio.pause();
        setPlaying(false);
      });
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