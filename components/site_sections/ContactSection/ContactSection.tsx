"use client";

import scssThemeVariables from "../../../styles/javascript_variables.module.scss";
import Section from "../../common/Section/Section";
import SocialMediaIcon from "../../common/SocialMediaIcon/SocialMediaIcon";
import ContactForm from "./ContactForm/ContactForm";
import styles from "./ContactSection.module.scss";

const ContactSection = () => {
  return (
    <Section
      waveSection={true}
      title="Vous souhaitez me contacter ?"
      subtitle="N'hésitez pas et envoyez-moi un petit message !"
      sectionColor={scssThemeVariables.scssThemeClWhite}
      nextSectionColor={scssThemeVariables.scssThemeClDarkblue}
      textColor={scssThemeVariables.scssThemeClDarkblue}
      spaceBelow="spacer-md"
      spaceAfterTitles="spacer-md"
      lastSection={true}
    >
      <ContactForm />
      <div className={styles.socialcontainer}>
        <SocialMediaIcon
          name="LinkedIn"
          icon="/images/linkedin.png"
          link="https://www.linkedin.com/in/adrienmasanet"
        />
        <SocialMediaIcon
          name="Github"
          icon="/images/github.png"
          link="https://github.com/AdrienMasanet"
        />
        <SocialMediaIcon
          name="WeLoveDevs"
          icon="/images/welovedevs.png"
          link="https://adrien-masanet.welovedevs.com"
        />
        <SocialMediaIcon
          name="Codingame"
          icon="/images/codingame.png"
          link="https://www.codingame.com/profile/ef9dcf317935f78353d3e35b25c84c733938225"
        />
        <SocialMediaIcon
          name="Stackoverflow"
          icon="/images/stackoverflow.png"
          link="https://stackoverflow.com/users/14763037/maza"
        />
      </div>
    </Section>
  );
};

export default ContactSection;
