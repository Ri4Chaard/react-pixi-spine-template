// src/hooks/useTicker.ts
import { useEffect } from 'react';
import { Ticker } from 'pixi.js';

/**
 * Подписывается на общий PIXI.Ticker.shared.
 * @param callback — вызывается каждый кадр с параметром delta (кол-во прошедших кадров, как number)
 * @param deps — зависимости для пересоздания подписки
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
