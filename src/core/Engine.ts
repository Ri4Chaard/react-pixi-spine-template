import * as PIXI from "pixi.js";
import "pixi-spine";

export interface EngineOptions {
  width?: number;
  height?: number;
  backgroundAlpha?: number;
  backgroundColor?: number;
  fps?: number;
  antialias?: boolean;
}

export class Engine {
  public app: PIXI.Application;

  constructor(
    container: HTMLElement,
    {
      width = 800,
      height = 600,
      backgroundAlpha = 0,
      backgroundColor = 0x000000,
      fps = 60,
      antialias = true,
    }: EngineOptions = {}
  ) {
    this.app = new PIXI.Application({
      width,
      height,
      backgroundAlpha,
      backgroundColor,
      antialias,
    });

    container.appendChild(this.app.view as HTMLCanvasElement);
    this.app.ticker.maxFPS = fps;
  }

  /**
   * Resets everything to a new stage
   */
  public startScene(scene: PIXI.Container) {
    this.app.stage.removeChildren();
    this.app.stage.addChild(scene);
  }

  /**
   * Change FPS
   */
  public setFPS(fps: number) {
    this.app.ticker.maxFPS = fps;
  }

  /**
   * Complete «kill» of the application:
   * @param removeView — remove canvas from DOM + free all resources
   */
  public destroy(removeView = true) {
    this.app.destroy(removeView, {
      children: true,
      texture: true,
      baseTexture: true,
    });
  }
}
