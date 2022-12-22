import { hexToRgb } from "./utils";

const DEBUG = false;

type MaxRange = {
  xMax: number;
  xMin: number;
  yMax: number;
  yMin: number;
};

type Segment = {
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

type Wave = {
  segments: Segment[];
  color: string;
  maxHeight: number;
  minHeight: number;
  speed: number;
};

export class WavesLogic {
  private context: CanvasRenderingContext2D;
  private canvasWidth: number;
  private canvasHeight: number;
  private waves: Wave[] = [];
  private turbulence: number;
  private speed: number;
  private gapTop: number = 100;
  private gapBottom: number = 0;

  constructor(context: CanvasRenderingContext2D, color: string, numberOfWaves: number, wavesSmoothing: number, speed: number, turbulence: number) {
    if (!context) {
      throw new Error("Canvas context is required to draw waves");
    }

    this.context = context;
    this.canvasWidth = context.canvas.width;
    this.canvasHeight = context.canvas.height;
    this.turbulence = turbulence;
    this.speed = speed;

    for (let i = 0; i < numberOfWaves; i++) {
      // Sets the minHeight and maxHeight of the wave
      const minHeight = Math.max(this.canvasHeight - this.gapTop, (this.canvasHeight / numberOfWaves) * i + Math.random() * turbulence);
      const maxHeight = Math.max(this.gapBottom, (this.canvasHeight / numberOfWaves) * i - Math.random() * turbulence);

      // Creates the segments of the wave
      const numberOfSegments = Math.ceil(this.canvasWidth / wavesSmoothing); // Number of segments to create, wavesSmoothing is the distance between each segment

      let newWaveSegments: Segment[] = [];
      for (let j = 0; j < numberOfSegments; j++) {
        const newSegmentX = Math.round((this.canvasWidth / (numberOfSegments - 1)) * j);
        const newSegmentY = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);

        let maxRange: MaxRange = {
          xMax: newSegmentX + turbulence,
          xMin: newSegmentX - turbulence,
          yMax: newSegmentY + turbulence,
          yMin: newSegmentY - turbulence,
        };

        // If first segment or last segment, the segment should not move on the X axis
        if (j === 0 || j === numberOfSegments - 1) {
          maxRange.xMax = newSegmentX;
          maxRange.xMin = newSegmentX;
        }

        maxRange.yMax = maxHeight;
        maxRange.yMin = minHeight;

        newWaveSegments.push({
          x: newSegmentX,
          y: newSegmentY,
          direction: Math.floor(Math.random() * 360),
          maxRange: maxRange,
          acceleration: 0,
        });
      }

      if (!hexToRgb(color)) {
        throw new Error("Invalid color. Format must be HEX like : #RRGGBB");
      }

      this.waves.push({
        segments: newWaveSegments,
        color: "rgba(" + hexToRgb(color)?.r + ", " + hexToRgb(color)?.g + ", " + hexToRgb(color)?.b + ", " + 1 / numberOfWaves + ")",
        minHeight: minHeight,
        maxHeight: maxHeight,
        speed: speed / numberOfWaves,
      });
    }

    this.initialize();
  }

  initialize = () => {
    this.update();
  };

  update = () => {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.waves.forEach((wave, waveIndex) => {
      //Sets the fill color of the wave and its opacity
      this.context.fillStyle = wave.color;

      wave.segments.forEach((segment, segmentIndex) => {
        //ASSIGN NEXT POSITION
        // Ckeck if the segment hasn't got a next position or if it has reached it (with a dead zone of 2px)
        if (!segment.nextPosition || (Math.abs(segment.nextPosition.x - segment.x) < 2 && Math.abs(segment.nextPosition.y - segment.y) < 2)) {
          segment.acceleration = 0;

          const segmentNextPositionNewX = Math.floor(Math.random() * (segment.maxRange.xMax - segment.maxRange.xMin + 1) + segment.maxRange.xMin);
          const segmentNextPositionNewY = Math.floor(Math.random() * (segment.maxRange.yMax - segment.maxRange.yMin + 1) + segment.maxRange.yMin);

          segment.nextPosition = {
            // Sets new next position for the segment withing the max range
            x: segmentNextPositionNewX,
            y: segmentNextPositionNewY,
            segmentInitialX: segment.x,
            segmentInitialY: segment.y,
            initialDistance: Math.sqrt(Math.pow(segmentNextPositionNewX - segment.x, 2) + Math.pow(segmentNextPositionNewY - segment.y, 2)),
          };
        }

        //MOVE SEGMENT
        // Rotates slowly the segment towards its next position
        const direction = Math.atan2(segment.nextPosition.y - segment.y, segment.nextPosition.x - segment.x);

        // Accelerates the segment towards its next position before the mid of the distance and decelerates after the mid of the distance
        const distanceFromInitialPosition = Math.sqrt(Math.pow(segment.x - segment.nextPosition.segmentInitialX, 2) + Math.pow(segment.y - segment.nextPosition.segmentInitialY, 2));

        if (distanceFromInitialPosition < segment.nextPosition.initialDistance / 2 && segment.acceleration < wave.speed / 3) {
          segment.acceleration += wave.speed / 10000;
        } else if (distanceFromInitialPosition > segment.nextPosition.initialDistance / 2 && segment.acceleration > wave.speed / 100) {
          if (DEBUG) {
            this.context.fillStyle = "green";
            this.context.beginPath();
            this.context.arc(segment.x, segment.y, 5, 0, 2 * Math.PI);
            this.context.fill();
          }
          segment.acceleration -= wave.speed / 10000;
        }

        segment.x += Math.cos(direction) * segment.acceleration;
        segment.y += Math.sin(direction) * segment.acceleration;

        // DEBUG : Draw segment and segment.nextPosition coordinates by drawing a circle
        if (DEBUG) {
          // Segment (blue circle)
          this.context.fillStyle = "blue";
          this.context.beginPath();
          this.context.arc(segment.x, segment.y, 1, 0, 2 * Math.PI);
          this.context.fill();

          // Next position (red circle)
          this.context.fillStyle = "red";
          this.context.beginPath();
          this.context.arc(segment.nextPosition.x, segment.nextPosition.y, 3, 0, 2 * Math.PI);
          this.context.fill();

          this.context.fillStyle = wave.color;
        }

        //DRAW SEGMENT
        // If there is a segment after this one, draw a line between them
        let nextSegment: Segment | null = wave.segments[segmentIndex + 1];
        if (nextSegment) {
          this.context.beginPath();
          this.context.moveTo(segment.x, segment.y);
          this.context.bezierCurveTo(segment.x - 4 + (nextSegment.x - segment.x) / 2, segment.y, segment.x + (nextSegment.x - segment.x) / 2, nextSegment.y, nextSegment.x, nextSegment.y);
          // Close the path to fill the wave
          this.context.lineTo(nextSegment.x, this.canvasHeight);
          this.context.lineTo(segment.x, this.canvasHeight);
          this.context.closePath();
          this.context.fill();
        }
      });
    });

    requestAnimationFrame(this.update);
  };
}
