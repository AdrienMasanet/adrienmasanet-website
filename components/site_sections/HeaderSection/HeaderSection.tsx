import Portrait from "../../Portrait/Portrait";
import styles from "./HeaderSection.module.scss";

const HeaderSection = () => {
  return (
    <header className={styles.background}>
      <div className={styles.overlay}>
        <div className={`${styles.portraitandtitlescontainer} maxed-container`}>
          <div className={styles.portrait}>
            <Portrait />
          </div>
          <div className={styles.titlescontainer}>
            <h1 className={styles.title}>
              Adrien
              <br />
              Masanet
            </h1>
            <h2 className={styles.subtitle}>Développeur polyvalent passionné</h2>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;
