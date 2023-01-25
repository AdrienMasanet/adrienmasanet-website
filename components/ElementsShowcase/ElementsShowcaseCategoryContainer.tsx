import { ElementsShowcaseCategory, ElementsShowcaseItem } from "./types";
import ElementsShowcaseElementItem from "./ElementsShowcaseElementItem";
import styles from "./ElementsShowcase.module.scss";
import { useEffect, useState } from "react";
import Image from "next/image";
import scssThemeVariables from "../../styles/javascript_variables.module.scss";

type ElementsShowcaseCategoryContainerProps = {
  category: ElementsShowcaseCategory;
  reviewing?: boolean;
  position: number;
  isScrolling?: boolean;
};

const ElementsShowcaseCategoryContainer = ({ category, position, isScrolling }: ElementsShowcaseCategoryContainerProps) => {
  const [itemReviewing, setItemReviewing] = useState<ElementsShowcaseItem | null>(null);

  useEffect(() => {
    if (position !== 0) {
      setItemReviewing(null);
    }
  }, [position]);

  return (
    <>
      <div
        className={`
      ${styles.categorycontainer}
      ${isScrolling ? styles.grabbing : ""}
      ${position == 0 && !isScrolling ? styles.reviewing : ""}`}
        style={{
          transform: `translate3d(${-50 + position * 100}%, ${-50 + Math.abs(position) * 10}%, 0) scale(${1 - Math.abs(position) * 0.1 + 0.1}) ${itemReviewing ? "rotateY(180deg)" : "rotateY(0deg)"} `,
          opacity: position == 0 ? 1 : 1 / Math.abs(position * 5),
          zIndex: position == 0 ? 10 : 0, // This is to make sure the reviewing category is always on top of the other categories
        }}
      >
        <h3 className={styles.title}>{category.name}</h3>
        <hr className={styles.divider} />
        <div className={styles.itemscontainer}>
          {category.items &&
            category.items.map((element) => (
              <div
                key={element.id}
                onClick={() => {
                  if (position == 0) {
                    setItemReviewing(element);
                  }
                }}
              >
                <ElementsShowcaseElementItem item={element} />
              </div>
            ))}
        </div>
      </div>
      <div
        className={`
      ${styles.flipped}
      ${styles.categorycontainer}
      ${isScrolling ? styles.grabbing : ""}
      ${position == 0 ? styles.reviewing : ""}`}
        style={{
          transform: `translate3d(${-50 + position * 100}%, ${-50 + Math.abs(position) * 10}%, 0) scale(${1 - Math.abs(position) * 0.1 + 0.1}) ${itemReviewing ? "rotateY(0deg)" : "rotateY(180deg)"}`,
          opacity: position == 0 ? 1 : 1 / Math.abs(position * 5),
          zIndex: position == 0 ? 10 : 0,
        }}
      >
        {itemReviewing && (
          <>
            <div className={styles.backarrow} onClick={() => setItemReviewing(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.41 16.09L10.83 11.5L15.41 6.91L14 5.5L8 11.5L14 17.5L15.41 16.09Z" fill={scssThemeVariables.scssThemeClDarkblue} />
              </svg>
            </div>
            <h4 className={styles.title}>{itemReviewing.name}</h4>
            <Image className={styles.image} src={itemReviewing.image} alt={`${itemReviewing.name} logo`} width={100} height={100} />
            <p className={styles.description}>{itemReviewing.description} </p>
          </>
        )}
      </div>
    </>
  );
};

export default ElementsShowcaseCategoryContainer;
