"use client";

import styles from "./ContactForm.module.scss";
import Button from "../Button/Button";
import { sendContactMessage } from "../../services/apiRequests";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { useState, useCallback } from "react";

const ContactForm = () => {
  const [reCaptchaToken, setReCaptchaToken] = useState<string>();
  const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [errorStrings, setErrorStrings] = useState<string[]>([]);

  const onReCaptchaVerify = useCallback((token: string) => {
    setReCaptchaToken(token);
  }, []);

  const submitMessage = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const success = await sendContactMessage({ message: formData.get("message"), email: formData.get("email"), company: formData.get("company"), captchaToken: reCaptchaToken });

    if (success) {
      setErrorStrings([]);
      setFormSubmitted(true);
    } else {
      setErrorStrings(["Une erreur est survenue lors de l'envoi du message...", "Mes Oompa Loompa sont sur le coup, pas de panique !"]);
    }

    // Here we refresh the reCaptcha token to avoid spamming by bots
    setRefreshReCaptcha((r) => !r);
  };

  return (
    <>
      {formSubmitted && <div className={styles.success}>Votre message a bien été envoyé ✅</div>}
      <form className={`${styles.container} ${formSubmitted ? styles.submitted : ""}`} name="message" id="email" onSubmit={submitMessage}>
        <div className={styles.inlineinputs}>
          <input className={`${styles.formelement} ${styles.inputname}`} type="email" name="email" id="email" placeholder="Adresse e-mail" required />
          <input className={`${styles.formelement} ${styles.inputcompany}`} type="text" name="company" id="company" placeholder="Entreprise (facultatif)" />
        </div>
        <textarea className={styles.formelement} name="message" id="message" rows={15} placeholder="Écrivez votre message ici" required />
        <GoogleReCaptcha onVerify={onReCaptchaVerify} refreshReCaptcha={refreshReCaptcha} />
        <div className={`${styles.error} ${errorStrings.length > 0 ? styles.active : ""}`}>
          {errorStrings.map((errorString, index) => (
            <p key={index}>{errorString}</p>
          ))}
        </div>
        <Button isSubmit={true} text="Envoyer" color="primary" />
      </form>
    </>
  );
};

export default ContactForm;
