import { Engine } from './Engine';
import type { Scene } from './types';

export class SceneManager {
  private engine: Engine;
  private scenes: Record<string, Scene> = {};

  constructor(engine: Engine) {
    this.engine = engine;
  }

  /**
   * Registers the scene by name.
   */
  public register(name: string, scene: Scene) {
    this.scenes[name] = scene;
  }

  /**
   * Switches to a previously registered scene.
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
