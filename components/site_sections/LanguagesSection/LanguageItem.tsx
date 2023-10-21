import OutlinedContainer from "../../OutlinedContainer/OutlinedContainer";
import Image from "next/image";

import styles from "./LanguagesSection.module.scss";

type LanguageItemProps = {
  image: string;
  name: string;
  description: string;
};

const LanguageItem = ({ image, name, description }: LanguageItemProps) => {
  return (
    <div className={`${styles.languagecontainer}`}>
      <div className={styles.title}>{name}</div>
      <Image src={image} width={166} height={111} alt={name} />
      <OutlinedContainer>
        <div className={styles.description}>{description}</div>
      </OutlinedContainer>
    </div>
  );
};

export default LanguageItem;
