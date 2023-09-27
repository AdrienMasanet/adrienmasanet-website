"use client";

import { useCallback,useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

import { WavesLogic } from "./logic";
import { WavesDirection } from "./types";
import styles from "./Waves.module.scss";

type WavesProps = {
  wavesDirection?: WavesDirection;
  wavesNumber?: number;
  wavesColor: string;
  wavesSmoothing?: number;
  wavesSpeed?: number | undefined;
  wavesTurbulences?: number;
  absolute?: boolean;
};

const Waves = ({ wavesDirection = WavesDirection.Down, wavesNumber = 3, wavesColor, wavesSmoothing = 250, wavesSpeed = 15, wavesTurbulences = 70, absolute = false }: WavesProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wavesLogicRef = useRef<WavesLogic | null>(null);
  const [yOffset, setYOffset] = useState("0px");
  const timeoutRedrawRef = useRef<NodeJS.Timeout | null>(null);
  const startScreenWidth = useRef(0);
  const { ref: canvasRefIntersectionObserver, inView } = useInView();

  // Set the 2 refs in a useCallback that will set the HTML ref used to draw the canvas and the IntersectionObserver ref
  const setCanvasDoubleRefs = useCallback(
    (node: HTMLCanvasElement | null) => {
      canvasRef.current = node;
      canvasRefIntersectionObserver(node);
    },
    [canvasRefIntersectionObserver]
  );

  const initializeCanvas = useCallback(() => {
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
  }, [wavesColor, wavesDirection, wavesNumber, wavesSmoothing, wavesSpeed, wavesTurbulences]);

  const resizeCanvas = useCallback(() => {
    if (startScreenWidth.current === window.innerWidth) {
      return;
    }

    // Set again the initial width of the screen to avoid redrawing the canvas when resizing the window only on the height
    startScreenWidth.current = window.innerWidth;

    // Use a timeout to avoid redrawing the canvas too often which would be performance heavy
    if (timeoutRedrawRef.current) {
      clearTimeout(timeoutRedrawRef.current);
    }

    timeoutRedrawRef.current = setTimeout(initializeCanvas, 10);
  }, [initializeCanvas]);

  useEffect(() => {
    // We need to store the initial width of the screen to avoid redrawing the canvas when resizing the window only on the height
    startScreenWidth.current = window.innerWidth;

    // Add an offset to the canvas to make it appear as if it was under the previous element
    if (canvasRef.current && absolute && wavesDirection === WavesDirection.Down) {
      setYOffset(`-${canvasRef.current?.height - 2}px`);
    } else {
      setYOffset("0px");
    }
  }, [canvasRef, absolute, wavesDirection]);

  useEffect(() => {
    // We need to update the width of the canvas when resizing the window
    window.addEventListener("resize", resizeCanvas);

    initializeCanvas();

    return () => {
      window.removeEventListener("resize", resizeCanvas);

      if (timeoutRedrawRef.current) {
        clearTimeout(timeoutRedrawRef.current);
      }

      if (wavesLogicRef.current) {
        wavesLogicRef.current.disable();
        wavesLogicRef.current = null;
      }
    };
  }, [wavesDirection, wavesNumber, wavesColor, wavesSmoothing, wavesSpeed, wavesTurbulences, initializeCanvas, resizeCanvas]);

  useEffect(() => {
    if (inView && wavesLogicRef.current) {
      wavesLogicRef.current.enable();
    } else if (!inView && wavesLogicRef.current) {
      wavesLogicRef.current.disable();
    }
  }, [inView]);

  return <canvas style={{ position: absolute ? "absolute" : "relative", marginTop: yOffset }} className={styles.canvas} height={200} ref={setCanvasDoubleRefs} />;
};

export default Waves;
