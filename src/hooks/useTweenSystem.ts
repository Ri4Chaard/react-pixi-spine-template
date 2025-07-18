import { useEffect } from 'react';
import TWEEN from '@tweenjs/tween.js';

/**
 * Запускает TWEEN.update() в каждом кадре.
 */
export function useTweenSystem() {
  useEffect(() => {
    let raf: number;
    const animate = (time: number) => {
      TWEEN.update(time);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);
}
