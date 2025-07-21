import { useLayoutEffect, useRef, useState } from 'react';
import { Engine, type EngineOptions } from '../core/Engine';

export function useEngine(options?: EngineOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [engine, setEngine] = useState<Engine | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const eng = new Engine(container, options);
    setEngine(eng);

    return () => {
      eng.destroy(true);
      setEngine(null);
    };
  }, [options?.width, options?.height, options?.backgroundColor, options?.fps, options?.antialias]);

  return { containerRef, engine };
}
