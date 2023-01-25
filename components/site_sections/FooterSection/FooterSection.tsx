import styles from "./FooterSection.module.scss";
import Link from "next/link";

const FooterSection = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.copyright}>
        - Adrien Masanet - {new Date().getFullYear()}
        <br />
        <Link href="https://github.com/AdrienMasanet/adrienmasanet-website">Voir le repository de ce site sur Github</Link>
      </div>
    </footer>
  );
};

export default FooterSection;
