import 'pixi-spine';
import * as PIXI from 'pixi.js';
import { Spine } from 'pixi-spine';

export class SpineSystem {
  /**
   * Loads and creates a Spine sprite.
   * @param spineJson — URL to your Spine .json file (spec + atlas).
   */
  static async create(spineJson: string): Promise<Spine> {
    // After `import ‘pixi-spine’`, Assets knows how to parse .json/atlas Spine
    const resource = await PIXI.Assets.load(spineJson);
    const spine = new Spine(resource.spineData);
    return spine;
  }
}
