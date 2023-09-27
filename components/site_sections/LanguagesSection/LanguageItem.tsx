import Image from "next/image";

import styles from "./LanguagesSection.module.scss";

type LanguageItemProps = {
  image: string;
  name: string;
  description: string;
};

const LanguageItem = ({ image, name, description }: LanguageItemProps) => {
  return (
    <div className={`${styles.container} ${styles.language}`}>
      <div className={styles.title}>{name}</div>
      <Image src={image} width={166} height={111} alt={name} />
      <div className={styles.description}>{description}</div>
    </div>
  );
};

export default LanguageItem;
