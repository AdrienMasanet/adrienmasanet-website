import styles from "./Hobby.module.scss";
import { HobbyImage } from "./types";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";

type HobbyProps = {
  name: string;
  description: string;
  images: HobbyImage[];
  imagesScale?: number;
};

const Hobby = ({ name, description, images, imagesScale = 100 }: HobbyProps) => {
  const [carouselRotation, setCarouselRotation] = useState(0);
  const carouselAnimationRef = useRef<any>();
  const [imagesContainerRef, isImagesContainerInView] = useInView();

  const AnimateCarousel = useCallback(() => {
    setCarouselRotation((prev) => prev + 0.0005);
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
        {images.map((image, index) => (
          <Image key={image.id} className={styles.image} src={image.url} alt={image.name} width={imagesScale} height={imagesScale} style={{ transform: `translate(${Math.cos((index * 2 * Math.PI) / images.length + carouselRotation) * 80}%, ${Math.sin((index * 2 * Math.PI) / images.length + carouselRotation) * 80}%) translate(50%, 50%)` }} />
        ))}
      </div>
    </div>
  );
};

export default Hobby;
