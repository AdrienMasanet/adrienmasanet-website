"use client";

import { useEffect, useMemo, useState } from "react";
import React from "react";
import Image from "next/image";

import scssThemeVariables from "../../styles/javascript_variables.module.scss";
import styles from "./ElementsShowcase.module.scss";
import ElementsShowcaseElementItem from "./ElementsShowcaseElementItem";
import { ElementsShowcaseCategory, ElementsShowcaseItem } from "./types";

type ElementsShowcaseCategoryContainerProps = {
  category: ElementsShowcaseCategory;
  reviewing?: boolean;
  position: number;
  isScrolling?: boolean;
};

const ElementsShowcaseCategoryContainer = ({
  category,
  position,
  isScrolling,
}: ElementsShowcaseCategoryContainerProps) => {
  const [itemReviewing, setItemReviewing] =
    useState<ElementsShowcaseItem | null>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    const target: HTMLElement = event.target as HTMLElement;
    const itemElement: HTMLElement | null = target.closest(".item");

    if (itemElement) {
      const itemId = itemElement.dataset.id;
      const item: ElementsShowcaseItem | undefined = category.items.find(
        (element: ElementsShowcaseItem) => element.id === itemId
      );
      if (item && position === 0) {
        setItemReviewing(item);
      }
    }
  };

  // Use memo to prevent the items from being re-rendered every time the position changes
  const items = useMemo(() => {
    if (category.items) {
      return category.items.map((element: ElementsShowcaseItem) => (
        <div key={element.id} data-id={element.id} className="item">
          <ElementsShowcaseElementItem item={element} />
        </div>
      ));
    }
    return [];
  }, [category.items]);

  useEffect(() => {
    if (position !== 0) {
      setItemReviewing(null);
    }
  }, [position]);

  return (
    <>
      <div
        onClick={handleClick}
        className={`
          ${styles.categorycontainer}
          ${isScrolling ? styles.grabbing : ""}
          ${position === 0 && !isScrolling ? styles.reviewing : ""}`}
        style={{
          transform: `translate3d(${-50 + position * 100}%, ${
            -50 + Math.abs(position) * 10
          }%, 0) scale(${1 - Math.abs(position) * 0.1 + 0.1}) ${
            itemReviewing ? "rotateY(180deg)" : "rotateY(0deg)"
          } `,
          opacity: position === 0 ? 1 : 1 / Math.abs(position * 5),
          zIndex: position === 0 ? 10 : 0,
        }}
      >
        <h3 className={styles.title}>{category.name}</h3>
        <hr className={styles.divider} />
        <div className={styles.itemscontainer}>{items}</div>
      </div>
      <div
        className={`
          ${styles.flipped}
          ${styles.categorycontainer}
          ${isScrolling ? styles.grabbing : ""}
          ${position === 0 ? styles.reviewing : ""}`}
        style={{
          transform: `translate3d(${-50 + position * 100}%, ${
            -50 + Math.abs(position) * 10
          }%, 0) scale(${1 - Math.abs(position) * 0.1 + 0.1}) ${
            itemReviewing ? "rotateY(0deg)" : "rotateY(180deg)"
          }`,
          opacity: position === 0 ? 1 : 1 / Math.abs(position * 5),
          zIndex: position === 0 ? 10 : 0,
        }}
      >
        {itemReviewing && (
          <>
            <div
              className={styles.backarrow}
              onClick={() => setItemReviewing(null)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.41 16.09L10.83 11.5L15.41 6.91L14 5.5L8 11.5L14 17.5L15.41 16.09Z"
                  fill={scssThemeVariables.scssThemeClDarkblue}
                />
              </svg>
            </div>
            <h4 className={styles.title}>{itemReviewing.name}</h4>
            <Image
              className={styles.image}
              src={itemReviewing.image}
              alt={`${itemReviewing.name} logo`}
              width={100}
              height={100}
            />
            <p className={styles.description}>{itemReviewing.description} </p>
          </>
        )}
      </div>
    </>
  );
};

export default ElementsShowcaseCategoryContainer;
