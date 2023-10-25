"use client";

import React, {
  ReactElement,
  useCallback,
  useEffect as useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import scssThemeVariables from "../../../styles/javascript_variables.module.scss";
import styles from "./ElementsShowcase.module.scss";
import SlideContainer from "./SlideContainer";

type ElementsShowcaseProps = {
  slides: ReactElement[];
  wide?: boolean;
};

const ElementsShowcase = ({ slides, wide = false }: ElementsShowcaseProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHoldingClick, setIsHoldingClick] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [currentDragSpeed, setCurrentDragSpeed] = useState(0);
  const animationFrameId = useRef<number | null>(null);
  const [previousCursorX, setPreviousCursorX] = useState<any>(null);
  const [averageSlidesHeight, setAverageSlidesHeight] = useState<number | null>(
    null
  );
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = useCallback(
    (amount: number, round: boolean = false, warp: boolean = true) => {
      let currentSlideTemp = currentSlide;

      if (round) {
        amount = Math.round(amount);
        currentSlideTemp = Math.round(currentSlideTemp);
      }

      if (currentSlideTemp + amount >= slides.length) {
        setCurrentSlide(warp ? 0 : slides.length - 1);
      } else if (currentSlideTemp + amount < 0) {
        setCurrentSlide(warp ? slides.length - 1 : 0);
      } else {
        let move = currentSlideTemp + amount;

        if (!warp) {
          // Constraint move between 0 and slides.length - 1
          move = Math.max(0, Math.min(move, slides.length - 1));
        }

        setCurrentSlide(move);
      }
    },
    [slides.length, currentSlide]
  );

  const animateGrabbing = useCallback(
    (movementX: number) => {
      setPreviousCursorX(movementX);
      let newCurrentDragSpeed = -(movementX - previousCursorX) / 150;
      setCurrentDragSpeed(newCurrentDragSpeed);
      scrollSlider(newCurrentDragSpeed, false, false);
      animationFrameId.current = null; // Reset the animation frame id to allow the next animation frame to be called
    },
    [scrollSlider, previousCursorX]
  );

  const handleCursorDown = useCallback(() => {
    setIsHoldingClick(true);
  }, []);

  const handleCursorMove = useCallback(
    (
      event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
      // Assign the correct event's cursor X position depending on the event type
      const cursorX =
        "clientX" in event ? event.clientX : event.touches[0].clientX;

      if (isHoldingClick) {
        // If the previous cursor X position is not set it means that the user just started holding the click, so we set it
        if (!previousCursorX) {
          setPreviousCursorX(cursorX);
          return;
        }

        // If the cursor has moved more than 10px while holding the click, we start dragging. It avoids grabbing the slider by mistake
        if (previousCursorX < cursorX - 15 || previousCursorX > cursorX + 15) {
          setIsDragging(true);
        }

        if (isDragging) {
          // If the dragging is currently happening, don't call requestAnimationFrame again
          if (animationFrameId.current) {
            return;
          }

          animationFrameId.current = requestAnimationFrame(() =>
            animateGrabbing(cursorX)
          );
        }
      }
    },
    [isHoldingClick, isDragging, previousCursorX, animateGrabbing]
  );

  const handleCursorUp = useCallback(() => {
    setIsHoldingClick(false);
    setIsDragging(false);
    setPreviousCursorX(null); // Reset the previous cursor X position to avoid a jump when the user starts holding the click again

    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
  }, []);

  useEffect(() => {
    const slidesDomElements: HTMLCollection | null =
      sliderRef.current?.children ?? null;

    if (!slidesDomElements || slidesDomElements.length === 0) return;

    let currentAverage: number = 0;

    for (let i = 0; i < slidesDomElements.length; i++) {
      currentAverage += slidesDomElements[i].scrollHeight;
    }

    setAverageSlidesHeight(currentAverage / slidesDomElements.length);
  }, [slides, sliderRef]);

  useEffect(() => {
    // If the user is not dragging anymore, we scroll the slider to the closest category
    if (isDragging === false) {
      scrollSlider(currentDragSpeed, true, false);
    }
  }, [isDragging, currentDragSpeed, scrollSlider]);

  return (
    <div
      onMouseDown={handleCursorDown}
      onMouseMove={handleCursorMove}
      onMouseUp={handleCursorUp}
      onMouseLeave={handleCursorUp}
      onTouchStart={handleCursorDown}
      onTouchMove={handleCursorMove}
      onTouchEnd={handleCursorUp}
    >
      <div
        className={`${styles.maincontainer} ${
          isDragging ? styles.grabbing : ""
        }`}
        style={{ maxWidth: wide ? "none" : "40em" }}
      >
        <div
          className={`${styles.arrow} ${styles.left}`}
          onClick={() => scrollSlider(-1)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke={scssThemeVariables.scssThemeClWhite}
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          ref={sliderRef}
          className={styles.slider}
          style={{ height: `${averageSlidesHeight}px` }}
        >
          {slides.map((slideElement, index) => (
            <SlideContainer
              key={index}
              position={index - currentSlide}
              isDragging={isDragging}
            >
              {slideElement}
            </SlideContainer>
          ))}
        </div>
        <div
          className={`${styles.arrow} ${styles.right}`}
          onClick={() => scrollSlider(1)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke={scssThemeVariables.scssThemeClWhite}
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ElementsShowcase;
