import { useEffect, useRef } from "react";

const MUSIC_SRC = "/music/background.mp3";
const VOLUME = 0.45;
const FADE_DURATION_MS = 2500;

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    const clearFade = () => {
      if (fadeTimerRef.current !== null) {
        window.clearInterval(fadeTimerRef.current);
        fadeTimerRef.current = null;
      }
    };

    const fadeTo = (target: number) => {
      clearFade();
      const start = audio.volume;
      const startTime = performance.now();
      fadeTimerRef.current = window.setInterval(() => {
        const t = Math.min(1, (performance.now() - startTime) / FADE_DURATION_MS);
        audio.volume = Math.max(0, Math.min(1, start + (target - start) * t));
        if (t >= 1) clearFade();
      }, 40);
    };

    audio
      .play()
      .then(() => fadeTo(VOLUME))
      .catch(() => {});

    const onFirstInteract = () => {
      if (audio.paused) {
        audio.volume = 0;
        audio
          .play()
          .then(() => fadeTo(VOLUME))
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

  return null;
}
