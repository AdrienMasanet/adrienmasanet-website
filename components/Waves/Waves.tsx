import { useRef, useEffect } from "react";
import { WavesLogic } from "./logic";
import styles from "./Waves.module.scss";

export enum WavesDirection {
  Up,
  Down,
}

type WavesProps = {
  wavesDirection: WavesDirection;
  wavesNumber?: number | undefined;
  wavesColor: string;
  wavesSmoothing?: number | undefined;
  wavesSpeed?: number | undefined;
  wavesTurbulences?: number | undefined;
};

const Waves = ({ wavesDirection, wavesNumber = 3, wavesColor, wavesSmoothing = 250, wavesSpeed = 15, wavesTurbulences = 70 }: WavesProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    // Set canvas size to parent size if parent is available, otherwise use 0
    canvas.width = canvas.parentElement?.clientWidth || 0;

    const canvasContext = canvas.getContext("2d");
    if (!canvasContext) {
      return;
    }

    if (wavesDirection === WavesDirection.Up) {
      canvasContext.translate(0, canvas.height);
      canvasContext.scale(1, -1);
    }

    new WavesLogic(canvasContext, wavesColor, wavesNumber, wavesSmoothing, wavesSpeed, wavesTurbulences);
  }, [canvasRef]);

  return <canvas className={styles.canvas} height={200} ref={canvasRef} />;
};

export default Waves;
