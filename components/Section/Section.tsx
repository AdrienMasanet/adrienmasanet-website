import styles from "./Section.module.scss";
import Waves from "../Waves/Waves";
import { WavesDirection } from "../Waves/types";

type SectionProps = {
  title: string;
  sectionColor: string;
  nextSectionColor: string;
  textColor: string;
  children: React.ReactNode;
  waveSection?: boolean;
};

const Section = ({ title, sectionColor, nextSectionColor, textColor, children, waveSection }: SectionProps) => {
  return (
    <>
      {waveSection && <Waves wavesNumber={3} wavesSmoothing={350} wavesColor={sectionColor} wavesSpeed={4} absolute={true} />}
      <section className={styles.section} style={{ backgroundColor: sectionColor, color: textColor }}>
        <div className="maxed-container">
          <h2 className={styles.title}>{title}</h2>
          {children}
          <hr className={waveSection ? styles.spacersm : styles.spacerlg} />
        </div>
        {waveSection && <Waves wavesNumber={3} wavesSmoothing={350} wavesColor={nextSectionColor} wavesSpeed={4} />}
      </section>
    </>
  );
};

export default Section;
