import { MaxRange, Segment, Wave } from "./types";
import { hexToRgb } from "./utils";

const DEBUG = false;

export class WavesLogic {
  private context: CanvasRenderingContext2D;
  private canvasWidth: number;
  private canvasHeight: number;
  private waves: Wave[] = [];
  private gapTop: number = 100;
  private gapBottom: number = 0;
  public uuid: string;
  private active: boolean;

  constructor(
    context: CanvasRenderingContext2D,
    color: string,
    numberOfWaves: number,
    wavesSmoothing: number,
    speed: number,
    turbulence: number,
  ) {
    if (!context) {
      throw new Error("Canvas context is required to draw waves");
    }

    this.active = true;
    this.uuid = Math.random().toString(36).substring(7);
    this.context = context;
    this.canvasWidth = context.canvas.width;
    this.canvasHeight = context.canvas.height;

    for (let i = 0; i < numberOfWaves; i++) {
      // Sets the minHeight and maxHeight of the wave
      const minHeight = Math.max(
        this.canvasHeight - this.gapTop,
        (this.canvasHeight / numberOfWaves) * i + Math.random() * turbulence,
      );
      const maxHeight = Math.max(
        this.gapBottom,
        (this.canvasHeight / numberOfWaves) * i - Math.random() * turbulence,
      );

      // Creates the segments of the wave
      const numberOfSegments = Math.ceil(this.canvasWidth / wavesSmoothing); // Number of segments to create, wavesSmoothing is the distance between each segment

      let newWaveSegments: Segment[] = [];
      for (let j = 0; j < numberOfSegments; j++) {
        const newSegmentX = Math.round(
          (this.canvasWidth / (numberOfSegments - 1)) * j,
        );
        const newSegmentY = Math.floor(
          Math.random() * (maxHeight - minHeight + 1) + minHeight,
        );

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

      // Defines the opacity of the wave, the last wave will be 100% opaque and the others will be less opaque
      const nextWaveOpacity = i < numberOfWaves - 1 ? 1 / numberOfWaves : 1;

      this.waves.push({
        segments: newWaveSegments,
        color:
          "rgba(" +
          hexToRgb(color)?.r +
          ", " +
          hexToRgb(color)?.g +
          ", " +
          hexToRgb(color)?.b +
          ", " +
          nextWaveOpacity +
          ")",
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
    if (!this.active) {
      return;
    }

    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.waves.forEach((wave) => {
      //Sets the fill color of the wave and its opacity
      this.context.fillStyle = wave.color;
      this.context.beginPath();
      this.context.moveTo(0, this.canvasHeight); // Move drawing cursor to the bottom left of the canvas to draw the wave then we will move to the first segment

      wave.segments.forEach((segment, segmentIndex) => {
        // If first segment, we make a line from the bottom left of the canvas (see upper) to the first segment coordinates
        if (segmentIndex === 0) {
          this.context.lineTo(segment.x, segment.y);
        }

        // ASSIGN NEXT POSITION
        // Ckeck if the segment hasn't got a next position or if it has reached it (with a dead zone of 2px)
        if (
          !segment.nextPosition ||
          (Math.abs(segment.nextPosition.x - segment.x) < 2 &&
            Math.abs(segment.nextPosition.y - segment.y) < 2)
        ) {
          segment.acceleration = 0;

          const segmentNextPositionNewX = Math.floor(
            Math.random() *
              (segment.maxRange.xMax - segment.maxRange.xMin + 1) +
              segment.maxRange.xMin,
          );
          const segmentNextPositionNewY = Math.floor(
            Math.random() *
              (segment.maxRange.yMax - segment.maxRange.yMin + 1) +
              segment.maxRange.yMin,
          );

          segment.nextPosition = {
            // Sets new next position for the segment withing the max range
            x: segmentNextPositionNewX,
            y: segmentNextPositionNewY,
            segmentInitialX: segment.x,
            segmentInitialY: segment.y,
            initialDistance: Math.sqrt(
              Math.pow(segmentNextPositionNewX - segment.x, 2) +
                Math.pow(segmentNextPositionNewY - segment.y, 2),
            ),
          };
        }

        // MOVE SEGMENT
        // Rotates slowly the segment towards its next position
        const direction = Math.atan2(
          segment.nextPosition.y - segment.y,
          segment.nextPosition.x - segment.x,
        );

        // Accelerates the segment towards its next position before the mid of the distance and decelerates after the mid of the distance
        const distanceFromInitialPosition = Math.sqrt(
          Math.pow(segment.x - segment.nextPosition.segmentInitialX, 2) +
            Math.pow(segment.y - segment.nextPosition.segmentInitialY, 2),
        );

        if (
          distanceFromInitialPosition <
            segment.nextPosition.initialDistance / 2 &&
          segment.acceleration < wave.speed / 3
        ) {
          segment.acceleration += wave.speed / 10000;
        } else if (
          distanceFromInitialPosition >
            segment.nextPosition.initialDistance / 2 &&
          segment.acceleration > wave.speed / 100
        ) {
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
          this.context.arc(
            segment.nextPosition.x,
            segment.nextPosition.y,
            3,
            0,
            2 * Math.PI,
          );
          this.context.fill();

          this.context.fillStyle = wave.color;
        }

        // DRAW SEGMENT CURVE
        let nextSegment: Segment | null = wave.segments[segmentIndex + 1];
        if (nextSegment) {
          // If there is a segment after this one, we draw a bezier curve between this segment and the next one
          this.context.bezierCurveTo(
            segment.x - 4 + (nextSegment.x - segment.x) / 2,
            segment.y,
            segment.x + (nextSegment.x - segment.x) / 2,
            nextSegment.y,
            nextSegment.x,
            nextSegment.y,
          );
        } else {
          // If there is no segment after this one, this is the last segment, we draw a line to the bottom right of the canvas to close the wave
          this.context.lineTo(this.canvasWidth, this.canvasHeight);
        }
      });

      // This is the end of the wave, we close the path and fill it
      this.context.closePath();
      this.context.fill();
    });

    requestAnimationFrame(this.update);
  };

  disable = () => {
    this.active = false;
  };

  enable = () => {
    this.active = true;
    this.update();
  };
}
