import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { useDispatch, useSelector } from "react-redux";
import { hitRequested } from "../features/enemy/slice";
import { useEngine } from "../hooks/useEngine";
import { useTicker } from "../hooks/useTicker";
import { SpineSystem } from "../systems/SpineSystem";
import type { RootState } from "../store";
import type { Spine } from "pixi-spine";

const MainPage: React.FC = () => {
  const { containerRef, engine } = useEngine({
    width: 800,
    height: 600,
    fps: 30,
  });
  const sceneRef = useRef<PIXI.Container>(null);
  const enemyRef = useRef<Spine>(null);
  const dispatch = useDispatch();
  const hits = useSelector((s: RootState) => s.enemy.hits);

  // scene init + enemy
  useEffect(() => {
    if (!engine) return;
    const scene = new PIXI.Container();
    engine.startScene(scene);
    sceneRef.current = scene;

    SpineSystem.create("/assets/spine/enemy/Enemy.json").then((enemy) => {
      enemyRef.current = enemy;
      enemy.state.setAnimation(0, "Idle", true);
      enemy.scale.set(0.5)
      enemy.interactive = true;
      //   enemy.buttonMode = true;
      enemy.state.data.setMix("Idle", "OnHit", 0.2)
      enemy.state.data.setMix("OnHit", "Idle", 0.2)
      
      enemy.on("pointerdown", () => {
        // hit request - saga will play the sound and then hitSuccess
        dispatch(hitRequested());

        enemy.state.setAnimation(0, "OnHit", true);
        enemy.state.addAnimation(0, "Idle", true, 0);
      });

      enemy.position.set(
        engine.app.renderer.width / 2,
        engine.app.renderer.height / 2
      );
      scene.addChild(enemy);
    });
  }, [engine, dispatch]);


  // You can add ticker, if you want
  // useTicker(delta => {
  //   // for example, rotation
  //   if (enemyRef.current) {
  //     enemyRef.current.rotation += 0.005 * delta;
  //   }
  // }, [engine]);

  return (
    <div
      style={{
        position: "relative",
        width: 800,
        height: 600,
        margin: "0 auto",
      }}
    >
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          color: "white",
          fontSize: "24px",
          fontWeight:'bold',
        }}
      >
        Enemy hits count: {hits}
      </div>
    </div>
  );
};

export default MainPage;
