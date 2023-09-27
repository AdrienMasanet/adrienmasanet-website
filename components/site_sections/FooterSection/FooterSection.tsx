import Link from "next/link";

import styles from "./FooterSection.module.scss";

const FooterSection = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.copyright}>
        - Adrien Masanet - {new Date().getFullYear()}
        <br />
        <Link href="https://github.com/AdrienMasanet/adrienmasanet-website">
          Voir le repository de ce site sur Github
        </Link>
      </div>
      <div className={styles.legal}>
        Ce site est protégé par reCAPTCHA et Google.&nbsp;
        <a href="https://policies.google.com/privacy">
          Politique de confidentialité
        </a>{" "}
        et&nbsp;
        <a href="https://policies.google.com/terms">
          Conditions d&apos;utilisation
        </a>
      </div>
    </footer>
  );
};

export default FooterSection;
