import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { useDispatch, useSelector } from 'react-redux';
import { hitRequested } from '../features/enemy/slice';
import { useEngine } from '../hooks/useEngine';
import { useTicker } from '../hooks/useTicker';
import { useTweenSystem } from '../hooks/useTweenSystem';
import { SpineSystem } from '../systems/SpineSystem';
import TWEEN from '@tweenjs/tween.js';
import type { RootState } from '../store';
import type { Spine } from 'pixi-spine';

const MainPage: React.FC = () => {
  const { containerRef, engine } = useEngine({ width: 800, height: 600, fps: 30 });
  const sceneRef = useRef<PIXI.Container>(null);
  const enemyRef = useRef<Spine>(null);
  const dispatch = useDispatch();
  const hits = useSelector((s: RootState) => s.enemy.hits);

  // запускаем Tween.update
  useTweenSystem();

  // инициализация сцены + врага
  useEffect(() => {
    if (!engine) return;
    const scene = new PIXI.Container();
    engine.startScene(scene);
    sceneRef.current = scene;

    SpineSystem.create('/assets/spine/enemy/Enemy.json').then(enemy => {
      enemyRef.current = enemy;
      enemy.state.setAnimation(0, 'Idle', true);

      enemy.interactive = true;
    //   enemy.buttonMode = true;
      enemy.on('pointerdown', () => {
        // запрос на хит — сага проиграет звук и потом hitSuccess
        dispatch(hitRequested());
      });

      enemy.position.set(
        engine.app.renderer.width  / 2,
        engine.app.renderer.height / 2
      );
      scene.addChild(enemy);
    });
  }, [engine, dispatch]);

  // при каждом изменении hits «поп-эффект» через Tween.js
  useEffect(() => {
    const enemy = enemyRef.current;
    if (!enemy) return;

    // масштабируем на 20% и возвращаем
    new TWEEN.Tween(enemy.scale)
      .to({ x: 1.2, y: 1.2 }, 150)
      .easing(TWEEN.Easing.Back.Out)
      .yoyo(true)
      .repeat(1)
      .start();
  }, [hits]);

  // можно тут ещё что-то тикировать
  // useTicker(delta => {
  //   // например, плавно вращаем
  //   if (enemyRef.current) {
  //     enemyRef.current.rotation += 0.005 * delta;
  //   }
  // }, [engine]);

  return (
    <div style={{ position: 'relative', width: 800, height: 600, margin: '0 auto' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      <div style={{ position: 'absolute', top: 10, left: 10, color: 'white' }}>
        Хитов по врагу: {hits}
      </div>
    </div>
  );
};

export default MainPage;
