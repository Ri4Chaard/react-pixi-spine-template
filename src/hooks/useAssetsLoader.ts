// src/hooks/useAssetsLoader.ts
import { useState, useEffect } from 'react';
import { Assets } from 'pixi.js';

interface LoaderResult {
  loaded: boolean;
  progress: number; // 0–100
}

export function useAssetsLoader(urls: string[]): LoaderResult {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1. Регистрируем bundle 'assets' с ключами = URL
    const resources = urls.reduce<Record<string, string>>(
      (acc, url) => ({ ...acc, [url]: url }),
      {}
    );
    Assets.addBundle('assets', resources);

    // 2. Запускаем загрузку bundle с коллбэком прогресса
    // callback получает число 0.0–1.0 на каждом продвинутом шаге загрузки
    Assets.loadBundle('assets', (ratio: number) => {
      setProgress(Math.round(ratio * 100));
    }).then(() => {
      setLoaded(true);
    });

    // Assets кеширует всё сам — сбрасывать не нужно
  }, [urls]);

  return { loaded, progress };
}
