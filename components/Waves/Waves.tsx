import { useRef, useEffect, useState } from "react";
import { WavesLogic } from "./logic";
import styles from "./Waves.module.scss";

export enum WavesDirection {
  Up,
  Down,
}

type WavesProps = {
  wavesDirection?: WavesDirection;
  wavesNumber?: number | undefined;
  wavesColor: string;
  wavesSmoothing?: number | undefined;
  wavesSpeed?: number | undefined;
  wavesTurbulences?: number | undefined;
  absolute?: boolean;
};

const Waves = ({ wavesDirection = WavesDirection.Down, wavesNumber = 3, wavesColor, wavesSmoothing = 250, wavesSpeed = 15, wavesTurbulences = 70, absolute = false }: WavesProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wavesLogicRef = useRef<WavesLogic | null>(null);
  const [yOffset, setYOffset] = useState("0px");
  const timeoutRedrawRef = useRef<NodeJS.Timeout | null>(null);

  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    canvas.width = canvas.parentElement?.offsetWidth || 0;

    const canvasContext = canvas.getContext("2d");
    if (!canvasContext) {
      return;
    }

    if (wavesDirection === WavesDirection.Up) {
      canvasContext.translate(0, canvas.height);
      canvasContext.scale(1, -1);
    }

    wavesLogicRef.current = new WavesLogic(canvasContext, wavesColor, wavesNumber, wavesSmoothing, wavesSpeed, wavesTurbulences);
  };

  useEffect(() => {
    if (canvasRef.current && absolute && wavesDirection === WavesDirection.Down) {
      setYOffset(`-${canvasRef.current?.height - 2}px`);
    } else {
      setYOffset("0px");
    }
  }, [canvasRef, absolute, wavesDirection]);

  useEffect(() => {
    // We need to update the width of the canvas when resizing the window
    window.addEventListener("resize", () => {
      // Use a timeout to avoid redrawing the canvas too often which would be performance heavy
      if (timeoutRedrawRef.current) {
        clearTimeout(timeoutRedrawRef.current);
      }

      timeoutRedrawRef.current = setTimeout(() => {
        initializeCanvas();
      }, 10);
    });

    initializeCanvas();

    return () => {
      window.removeEventListener("resize", () => {
        initializeCanvas();
      });

      if (timeoutRedrawRef.current) {
        clearTimeout(timeoutRedrawRef.current);
      }
    };
  }, [wavesDirection, wavesNumber, wavesColor, wavesSmoothing, wavesSpeed, wavesTurbulences]);

  return <canvas style={{ position: absolute ? "absolute" : "relative", marginTop: yOffset }} className={styles.canvas} height={200} ref={canvasRef} />;
};

export default Waves;
