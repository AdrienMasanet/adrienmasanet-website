import Image from "next/image";

import MedalIcon from "../MedalIcon/MedalIcon";
import styles from "./ElementsShowcase.module.scss";
import { ElementsShowcaseItem } from "./types";

type ElementsShowcaseElementItemProps = {
  item: ElementsShowcaseItem;
};

const ElementsShowcaseElementItem = ({
  item,
}: ElementsShowcaseElementItemProps) => {
  return (
    <div className={styles.itemcontainer}>
      <Image
        className={styles.image}
        src={item.image}
        alt={`${item.name} logo`}
        fill={true}
        sizes="100%"
      />
      {item.rank && (
        <div className={styles.medalrank}>
          <MedalIcon rank={item.rank} scale={20} />
        </div>
      )}
      <h4 className={styles.title}>{item.name}</h4>
    </div>
  );
};

export default ElementsShowcaseElementItem;
