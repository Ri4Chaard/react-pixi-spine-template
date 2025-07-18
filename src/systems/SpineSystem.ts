import 'pixi-spine';               // ← регистрирует загрузчик/парсер Spine автоматически :contentReference[oaicite:0]{index=0}
import * as PIXI from 'pixi.js';
import { Spine } from 'pixi-spine'; // класс для создания Spine-спрайтов

export class SpineSystem {
  /**
   * Загружает и создаёт Spine-спрайт.
   * @param spineJson — URL к вашему .json-файлу Spine (спецификация + атлас).
   */
  static async create(spineJson: string): Promise<Spine> {
    // После `import 'pixi-spine'`, Assets знает, как парсить .json/atlas Spine
    const resource = await PIXI.Assets.load(spineJson);
    const spine = new Spine(resource.spineData);
    return spine;
  }
}
