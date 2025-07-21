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
    if (!urls.length) {
      setLoaded(true);
      return;
    }

    const bundleName = `assets_${Date.now()}`;
    Assets.addBundle(bundleName, Object.fromEntries(urls.map(u => [u, u])));

    // loading and counting progress
    Assets.loadBundle(bundleName, ratio => {
      setProgress(Math.round(ratio * 100));
    })
      .then(() => {
        setLoaded(true);
      })
      .catch(err => {
        console.error('Loader error:', err);
      });

    return () => {
      Assets.unloadBundle(bundleName);
      setLoaded(false);
      setProgress(0);
    };
  }, [urls.join('|')]);

  return { loaded, progress };
}
