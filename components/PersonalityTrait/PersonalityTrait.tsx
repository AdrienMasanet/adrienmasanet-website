"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";

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
  const { ref: imageRef, inView } = useInView({
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
        className={`${styles.image} ${inView ? styles.active : ""}`}
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
