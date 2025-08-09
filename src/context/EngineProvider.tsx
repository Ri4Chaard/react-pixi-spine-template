import React, {
  createContext,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { Engine } from "../core/Engine";
import type { EngineOptions } from "../core/types";

interface EngineContextValue {
  engine: Engine | null;
  registerHost: (el: HTMLDivElement | null) => void;
}

const EngineContext = createContext<EngineContextValue>({
  engine: null,
  registerHost: () => {},
});

export function useEngineContext() {
  return React.useContext(EngineContext);
}

interface EngineProviderProps {
  options: EngineOptions;
}

export const EngineProvider: React.FC<
  PropsWithChildren<EngineProviderProps>
> = ({ options, children }) => {
  const [engine, setEngine] = useState<Engine | null>(null);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const resizeObsRef = useRef<ResizeObserver | null>(null);

  useLayoutEffect(() => {
    const eng = new Engine(options);
    setEngine(eng);

    return () => {
      const canvasEl = eng.app.view as HTMLCanvasElement;
      if (canvasEl.parentElement) {
        canvasEl.parentElement.removeChild(canvasEl);
      }
      eng.destroy(true);
      setEngine(null);
    };
  }, [
    options?.width,
    options?.height,
    options?.backgroundColor,
    options?.fps,
    options?.antialias,
  ]);

  const mountIntoHost = useCallback(
    (el: HTMLDivElement | null) => {
      if (!engine) return;
      resizeObsRef.current?.disconnect();
      resizeObsRef.current = null;
      const canvasEl = engine.app.view as HTMLCanvasElement;
      if (canvasEl.parentElement) {
        canvasEl.parentElement.removeChild(canvasEl);
      }
      hostRef.current = el;
      if (el) {
        el.appendChild(engine.app.view as HTMLCanvasElement);
        engine.app.renderer.resize(el.clientWidth, el.clientHeight);
        const ro = new ResizeObserver((entries) => {
          const rect = entries[0].contentRect;
          engine.app.renderer.resize(rect.width, rect.height);
        });
        ro.observe(el);
        resizeObsRef.current = ro;
      }
    },
    [engine]
  );

  const value = useMemo(
    () => ({
      engine,
      registerHost: mountIntoHost,
    }),
    [engine, mountIntoHost]
  );

  return (
    <EngineContext.Provider value={value}>{children}</EngineContext.Provider>
  );
};
