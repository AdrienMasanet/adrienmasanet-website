"use client";

import { Tech } from "components/site_sections/TechsSection/TechCategoryContainer/types";
import useMIMEType from "hooks/useMIMEType";
import Image from "next/image";

import styles from "./Achievement.module.scss";
import TechBadge from "./TechBadge/TechBadge";

type AchievementProps = {
  name: string;
  description: string;
  techs: Tech[];
  link?: string;
  repoLink?: string;
  media: string;
};

const Achievement = ({
  name,
  description,
  techs,
  link,
  repoLink,
  media,
}: AchievementProps) => {
  const { mediaCategory: mediaMIMETypeCategory } = useMIMEType(media);
  return (
    <div className={styles.container}>
      <div className={styles.titleanddescriptioncontainer}>
        <p className={styles.title}>{name}</p>
        <p className={styles.description}>{description}</p>
        <div className={styles.options}>
          {link && (
            <a className={styles.link} href={link} target="_blank">
              <Image
                src="/images/ui/link.svg"
                width={20}
                height={20}
                alt={`${name} link`}
              />
            </a>
          )}
          {repoLink && (
            <a className={styles.link} href={repoLink} target="_blank">
              <Image
                src="/images/ui/github.svg"
                width={20}
                height={20}
                alt={`${name} code repository link`}
              />
            </a>
          )}
        </div>
      </div>
      <div className={styles.techstack}>
        {techs.map((tech) => (
          <TechBadge key={tech.id} name={tech.name} icon={tech.image} />
        ))}
      </div>
      {mediaMIMETypeCategory === "video" ? (
        <video
          playsInline
          autoPlay
          loop
          muted
          draggable={false}
          controls={false}
          className={styles.mediabackground}
        >
          <source src={media} />
        </video>
      ) : (
        <Image
          className={styles.mediabackground}
          src={media}
          alt={`${name} presentation image`}
          fill={true}
        />
      )}
    </div>
  );
};

export default Achievement;
