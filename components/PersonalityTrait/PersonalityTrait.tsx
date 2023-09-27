"use client";

import { useInView } from "react-intersection-observer";
import Image from "next/image";

import styles from "./PersonalityTrait.module.scss";

type PersonalityTraitProps = {
  name: string;
  description: string;
  image: string;
};

const PersonalityTrait = ({
  name,
  description,
  image,
}: PersonalityTraitProps) => {
  const [imageRef, isImageInView] = useInView({
    threshold: 0.5,
    rootMargin: "-5.5% 0px -5.5% 0px",
  });

  return (
    <div className={styles.container}>
      <div className={styles.nameanddescriptioncontainer}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <Image
        className={`${styles.image} ${isImageInView ? styles.active : ""}`}
        ref={imageRef}
        src={image}
        alt={name}
        width={160}
        height={160}
      />
    </div>
  );
};

export default PersonalityTrait;
