import { Engine } from './Engine';
import type { Scene } from './types';

export class SceneManager {
  private engine: Engine;
  private scenes: Record<string, Scene> = {};

  constructor(engine: Engine) {
    this.engine = engine;
  }

  /**
   * Регистрирует сцену по имени.
   */
  public register(name: string, scene: Scene) {
    this.scenes[name] = scene;
  }

  /**
   * Переключается на ранее зарегистрированную сцену.
   */
  public goTo(name: string) {
    const scene = this.scenes[name];
    if (scene) {
      this.engine.startScene(scene);
    } else {
      console.warn(`Scene "${name}" not found`);
    }
  }
}
