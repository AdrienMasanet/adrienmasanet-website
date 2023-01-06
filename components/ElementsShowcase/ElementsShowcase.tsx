import { useState, useEffect, useRef } from "react";
import { ElementsShowcaseCategory, ElementsShowcaseItem } from "./types";
import ElementsShowcaseCategoryContainer from "./ElementsShowcaseCategoryContainer";
import styles from "./ElementsShowcase.module.scss";
import scssThemeVariables from "../../styles/javascript_variables.module.scss";

type ElementsShowcaseProps = {
  categoriesAndElements: ElementsShowcaseCategory[];
};

// TODO : Fix scrolling on safari and firefox
const ElementsShowcase = ({ categoriesAndElements }: ElementsShowcaseProps) => {
  const [currentCategoryReviewing, setCurrentCategoryReviewing] = useState(0);
  const [isHoldingClick, setIsHoldingClick] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [currentDragSpeed, setCurrentDragDistance] = useState(0);
  const animationFrameId = useRef<number | null>(null);
  const [previousTouchX, setPreviousTouchX] = useState<any>(null);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setIsHoldingClick(true);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (isHoldingClick) {
      if (event.touches[0].clientX !== 0) {
        setIsDragging(true);
      }

      if (isDragging) {
        if (!previousTouchX) {
          setPreviousTouchX(event.touches[0].clientX);
          return;
        }

        if (animationFrameId.current) {
          return;
        }

        animationFrameId.current = requestAnimationFrame(() => {
          animateTouchGrabbing(event.touches[0].clientX);
        });
      }
    }
  };

  const handleTouchEnd = () => {
    setPreviousTouchX(null);
    setIsHoldingClick(false);
    setIsDragging(false);

    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
  };

  const animateTouchGrabbing = (movementX: number) => {
    setPreviousTouchX(movementX);
    let newCurrentDragSpeed = -(movementX - previousTouchX) / 100;
    setCurrentDragDistance(newCurrentDragSpeed);
    scrollSlider(newCurrentDragSpeed, false, false);
    animationFrameId.current = null;
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsHoldingClick(true);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isHoldingClick) {
      if (event.movementX !== 0) {
        setIsDragging(true);
      }

      if (isDragging) {
        if (animationFrameId.current) {
          return;
        }

        animationFrameId.current = requestAnimationFrame(() => animateMouseGrabbing(event.movementX));
      }
    }
  };

  const handleMouseUp = () => {
    setIsHoldingClick(false);
    setIsDragging(false);

    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
  };

  const animateMouseGrabbing = (movementX: number) => {
    let newCurrentDragSpeed = -movementX / 50;
    setCurrentDragDistance(newCurrentDragSpeed);
    scrollSlider(newCurrentDragSpeed, false, false);
    animationFrameId.current = null;
  };

  useEffect(() => {
    // If the user is not dragging anymore, we scroll the slider to the closest category
    if (isDragging === false) {
      scrollSlider(currentDragSpeed, true, false);
    }
  }, [isDragging, currentDragSpeed]);

  const scrollSlider = (amount: number, round: boolean = false, warp: boolean = true) => {
    let currentCategoryReviewingTemp = currentCategoryReviewing;

    if (round) {
      amount = Math.round(amount);
      currentCategoryReviewingTemp = Math.round(currentCategoryReviewingTemp);
    }

    if (currentCategoryReviewingTemp + amount >= categoriesAndElements.length) {
      setCurrentCategoryReviewing(warp ? 0 : categoriesAndElements.length - 1);
    } else if (currentCategoryReviewingTemp + amount < 0) {
      setCurrentCategoryReviewing(warp ? categoriesAndElements.length - 1 : 0);
    } else {
      let move = currentCategoryReviewingTemp + amount;

      if (!warp) {
        // Constraint move between 0 and categoriesAndElements.length - 1
        move = Math.max(0, Math.min(move, categoriesAndElements.length - 1));
      }

      setCurrentCategoryReviewing(move);
    }
  };

  return (
    <div onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <div className={`${styles.maincontainer} ${isDragging ? styles.grabbing : ""}`}>
        <div className={`${styles.arrow} ${styles.left}`} onClick={() => scrollSlider(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke={scssThemeVariables.scssThemeClWhite} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className={styles.slider}>
          {categoriesAndElements.map((category: ElementsShowcaseCategory, index) => (
            <ElementsShowcaseCategoryContainer key={category.name} category={category} position={index - currentCategoryReviewing} isScrolling={isDragging} />
          ))}
        </div>
        <div className={`${styles.arrow} ${styles.right}`} onClick={() => scrollSlider(1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke={scssThemeVariables.scssThemeClWhite} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ElementsShowcase;
