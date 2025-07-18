import * as PIXI from 'pixi.js';

/**
 * Простая абстракция сцены — контейнер PIXI.
 */
export type Scene = PIXI.Container;

/**
 * Опции для конфигурации движка.
 */
export interface EngineOptions {
  width?: number;
  height?: number;
  backgroundColor?: number;
  fps?: number;
  antialias?: boolean;
}
