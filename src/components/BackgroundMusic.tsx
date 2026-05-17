import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const MUSIC_SRC = "/music/background.mp3";
const DEFAULT_VOLUME = 0.45;
const FADE_DURATION_MS = 2500;
const STORAGE_KEY = "bg-music-enabled";
const VOLUME_KEY = "bg-music-volume";

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

const readSavedVolume = (): number => {
  try {
    const v = localStorage.getItem(VOLUME_KEY);
    if (v === null) return DEFAULT_VOLUME;
    const n = parseFloat(v);
    if (Number.isNaN(n)) return DEFAULT_VOLUME;
    return Math.max(0, Math.min(1, n));
  } catch {
    return DEFAULT_VOLUME;
  }
};

const saveVolume = (v: number) => {
  try {
    localStorage.setItem(VOLUME_KEY, String(v));
  } catch {
    // ignore
  }
};

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<number | null>(null);
  const volumeRef = useRef<number>(readSavedVolume());
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState<number>(volumeRef.current);
  const [expanded, setExpanded] = useState(false);

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
          fadeTo(audio, volumeRef.current);
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
            fadeTo(audio, volumeRef.current);
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
          fadeTo(audio, volumeRef.current);
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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    volumeRef.current = v;
    setVolume(v);
    saveVolume(v);
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      clearFade();
      audio.volume = v;
    }
  };

  const icon = !playing ? "VolumeX" : volume < 0.05 ? "VolumeX" : volume < 0.4 ? "Volume1" : "Volume2";

  return (
    <div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{
        position: "fixed",
        right: "clamp(0.75rem, 2vw, 1.5rem)",
        bottom: "clamp(0.75rem, 2vw, 1.5rem)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "6px",
        paddingRight: expanded ? "16px" : "6px",
        background: "rgba(10,10,10,0.55)",
        border: "1px solid rgba(61,90,254,0.6)",
        borderRadius: "999px",
        backdropFilter: "blur(8px)",
        boxShadow: "0 0 22px rgba(61,90,254,0.55)",
        transition: "padding 0.3s ease, border-color 0.25s ease",
      }}
    >
      <button
        onClick={toggle}
        aria-label={playing ? "Выключить музыку" : "Включить музыку"}
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "999px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          transition: "transform 0.25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <Icon name={icon} size={22} />
      </button>

      <div
        style={{
          width: expanded ? "110px" : "0px",
          opacity: expanded ? 1 : 0,
          overflow: "hidden",
          transition: "width 0.3s ease, opacity 0.25s ease",
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
          aria-label="Громкость музыки"
          style={{
            width: "100%",
            accentColor: "#3d5afe",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
}