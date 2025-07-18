import * as PIXI from "pixi.js";

export interface EngineOptions {
  width?: number;
  height?: number;
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
      backgroundColor = 0x1099bb,
      fps = 60,
      antialias = true,
    }: EngineOptions = {}
  ) {
    this.app = new PIXI.Application({
      width,
      height,
      backgroundColor,
      antialias,
      sharedTicker: true,
    });
    this.app.ticker.maxFPS = fps;
    container.appendChild(this.app.view as HTMLCanvasElement);
  }

  public startScene(scene: PIXI.Container) {
    this.app.stage.removeChildren();
    this.app.stage.addChild(scene);
  }

  public setFPS(fps: number) {
    this.app.ticker.maxFPS = fps;
  }

  /**
   * Полное уничтожение приложения.
   * @param removeView — если true, удалит canvas из DOM.
   */
  public destroy(removeView?: boolean) {
    this.app.destroy(removeView);
  }
}
