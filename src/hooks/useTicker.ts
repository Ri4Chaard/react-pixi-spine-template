import { useEffect } from 'react';
import { Ticker } from 'pixi.js';

/**
 * Subscribes to PIXI.Ticker.shared.
 * @param callback — called every frame with delta parameter (number of frames passed, as number)
 * @param deps — dependencies to recreate subscription
 */
export function useTicker(
  callback: (delta: number) => void,
  deps: any[] = []
) {
  useEffect(() => {
    const ticker = Ticker.shared;
    ticker.add(callback);
    return () => void ticker.remove(callback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
