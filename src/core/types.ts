import * as PIXI from 'pixi.js';

/**
 * Simple scene abstraction - PIXI container.
 */
export type Scene = PIXI.Container;

/**
 * Options for engine configuration.
 */
export interface EngineOptions {
  width?: number;
  height?: number;
  backgroundColor?: number;
  fps?: number;
  antialias?: boolean;
}
