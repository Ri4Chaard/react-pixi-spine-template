// src/hooks/useEngine.ts
import { useRef, useEffect } from 'react';
import { Engine, type EngineOptions,  } from '../core/Engine';

export function useEngine(options?: EngineOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Engine | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1) создаём движок один раз
    const eng = new Engine(container, options);
    engineRef.current = eng;

    // 2) при анмаунте — уничтожаем
    return () => {
      eng.destroy(true);
    };
  }, []); // ПУСТОЙ массив зависимостей!

  return {
    containerRef,
    engine: engineRef.current, // может быть null до первого рендера эффекта
  };
}
