import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { useEngine } from '../hooks/useEngine';

const SecondPage: React.FC = () => {
  const { containerRef, engine } = useEngine({ width: 800, height: 600, fps: 60 });
  const circleRef = useRef<PIXI.Graphics>(null);

  useEffect(() => {
    if (!engine) return;
    const scene = new PIXI.Container();
    engine.startScene(scene);

    const circle = new PIXI.Graphics()
      .beginFill(0xff9900)
      .drawCircle(0, 0, 30)
      .endFill();
    circle.x = 30;
    circle.y = engine.app.renderer.height / 2;
    scene.addChild(circle);
    circleRef.current = circle;
  }, [engine]);

  return (
    <div style={{ position: 'relative', width: 800, height: 600, margin: '0 auto' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default SecondPage;
