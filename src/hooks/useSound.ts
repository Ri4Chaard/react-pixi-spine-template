import { useState, useEffect, useCallback, useRef } from "react";
import { Howl, type HowlOptions } from "howler";

interface SoundControls {
  play: () => void;
  pause: () => void;
  toggleMute: () => void;
  mute: boolean;
}

/**
 * Hook to control audio via Howler.
 * @param src     Path to audio file
 * @param options Howl options
 */
export function useSound(src: string, options?: HowlOptions): SoundControls {
  const soundRef = useRef<Howl>(null);
  const [mute, setMute] = useState(false);

  useEffect(() => {
    soundRef.current = new Howl({ src: [src], ...options });
    return () => {
      soundRef.current?.unload();
    };
  }, [src, options]);

  const play = useCallback(() => {
    soundRef.current?.play();
  }, []);

  const pause = useCallback(() => {
    soundRef.current?.pause();
  }, []);

  const toggleMute = useCallback(() => {
    setMute((m) => {
      soundRef.current?.mute(!m);
      return !m;
    });
  }, []);

  return { play, pause, toggleMute, mute };
}
