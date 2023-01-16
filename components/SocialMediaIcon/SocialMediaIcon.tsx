import styles from "./SocialMediaIcon.module.scss";
import Image from "next/image";
import Link from "next/link";

type SocialMediaIconProps = {
  name: string;
  icon: string;
  link: string;
};

const SocialMediaIcon = ({ name, icon, link }: SocialMediaIconProps) => {
  return (
    <a className={styles.container} href={link} target="_blank" rel="noreferrer">
      <Image src={icon} alt={"Icône du réseau social " + name} width={50} height={50} />
    </a>
  );
};

export default SocialMediaIcon;
