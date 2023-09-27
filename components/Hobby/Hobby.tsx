"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";

import styles from "./Hobby.module.scss";

type HobbyProps = {
  name: string;
  description: string;
  images: string[];
  imagesScale?: number;
};

const Hobby = ({
  name,
  description,
  images,
  imagesScale = 100,
}: HobbyProps) => {
  const [carouselRotation, setCarouselRotation] = useState<number>(0);
  const carouselAnimationRef = useRef<any>();
  const [imagesContainerRef, isImagesContainerInView] = useInView();

  const AnimateCarousel = useCallback(() => {
    setCarouselRotation((prev) => prev + 0.0002);
    carouselAnimationRef.current = requestAnimationFrame(AnimateCarousel);
  }, []);

  useEffect(() => {
    if (isImagesContainerInView) {
      carouselAnimationRef.current = requestAnimationFrame(AnimateCarousel);
    } else {
      cancelAnimationFrame(carouselAnimationRef.current);
    }
  }, [isImagesContainerInView, AnimateCarousel]);

  return (
    <div className={styles.container}>
      <div className={styles.titleanddescriptioncontainer}>
        <h3 className={styles.title}>{name}</h3>
        <hr />
        <p>{description}</p>
      </div>
      <div className={styles.imagescontainer} ref={imagesContainerRef}>
        {images &&
          images.length > 0 &&
          images.map((image, index) => (
            <Image
              key={index}
              className={styles.image}
              src={image}
              alt={image}
              width={imagesScale}
              height={imagesScale}
              style={{
                transform: `translate(${
                  Math.cos(
                    (index * 2 * Math.PI) / images.length + carouselRotation,
                  ) * 80
                }%, ${
                  Math.sin(
                    (index * 2 * Math.PI) / images.length + carouselRotation,
                  ) * 80
                }%) translate(50%, 50%)`,
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default Hobby;
