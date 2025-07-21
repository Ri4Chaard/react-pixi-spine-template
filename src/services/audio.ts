import { Howl, type HowlOptions } from "howler";

const defaultOptions: HowlOptions = {
  src: "",
  volume: 1.0,
  loop: false,
};

export class AudioService {
  private static sounds: Record<string, Howl> = {};

  /**
   * Loads the sound under the id.
   */
  static load(id: string, src: string, options?: HowlOptions) {
    if (!AudioService.sounds[id]) {
      AudioService.sounds[id] = new Howl({
        ...defaultOptions,
        ...options,
        src: [src],
      });
    }
    return AudioService.sounds[id];
  }

  static play(id: string) {
    AudioService.sounds[id]?.play();
  }

  static pause(id: string) {
    AudioService.sounds[id]?.pause();
  }

  static mute(id: string, muted: boolean) {
    AudioService.sounds[id]?.mute(muted);
  }

  static unload(id: string) {
    AudioService.sounds[id]?.unload();
    delete AudioService.sounds[id];
  }
}
