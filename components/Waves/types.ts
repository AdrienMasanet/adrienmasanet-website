export type MaxRange = {
  xMax: number;
  xMin: number;
  yMax: number;
  yMin: number;
};

export type Segment = {
  x: number;
  y: number;
  direction: number;
  acceleration: number;
  maxRange: MaxRange;
  nextPosition?: {
    x: number;
    y: number;
    segmentInitialX: number;
    segmentInitialY: number;
    initialDistance: number;
  };
};

export type Wave = {
  segments: Segment[];
  color: string;
  maxHeight: number;
  minHeight: number;
  speed: number;
};

export enum WavesDirection {
  Up,
  Down,
}
