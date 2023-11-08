import Image from "next/image";

import styles from "./TechBadge.module.scss";

type TechBadgeProps = {
  name: string;
  icon: string;
};

const TechBadge = ({ name, icon }: TechBadgeProps) => {
  return (
    <div className={styles.container}>
      <span className={styles.name}>{name}</span>
      <Image
        src={icon}
        width={15}
        height={15}
        className={styles.icon}
        alt={`${name} icon`}
      />
    </div>
  );
};

export default TechBadge;
