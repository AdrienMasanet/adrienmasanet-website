"use client";

import { useState } from "react";
import React from "react";
import { useReCaptcha } from "next-recaptcha-v3";

import { sendContactMessage } from "../../services/apiRequests";
import Button from "../Button/Button";
import styles from "./ContactForm.module.scss";

const ContactForm = () => {
  const { executeRecaptcha } = useReCaptcha();
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [errorStrings, setErrorStrings] = useState<string[]>([]);

  const submitMessage = async (event: React.FormEvent) => {
    event.preventDefault();

    // Generate ReCaptcha token
    const token = await executeRecaptcha("send_contact_message");

    const formData = new FormData(event.target as HTMLFormElement);

    const success = await sendContactMessage({ message: formData.get("message"), email: formData.get("email"), company: formData.get("company"), captchaToken: token });

    if (success) {
      setErrorStrings([]);
      setFormSubmitted(true);
    } else {
      setErrorStrings(["Une erreur est survenue lors de l'envoi du message...", "Mes Oompa Loompa sont sur le coup, pas de panique !"]);
    }
  };

  return (
    <>
      {formSubmitted && <div className={styles.success}>Votre message a bien été envoyé ✅</div>}
      <form className={`${styles.container} ${formSubmitted ? styles.submitted : ""}`} name="message" onSubmit={submitMessage}>
        <div className={styles.inlineinputs}>
          <input className={`${styles.formelement} ${styles.inputname}`} type="email" name="email" id="email" placeholder="Adresse e-mail" required />
          <input className={`${styles.formelement} ${styles.inputcompany}`} type="text" name="company" id="company" placeholder="Entreprise (facultatif)" />
        </div>
        <textarea className={styles.formelement} name="message" id="message" rows={15} placeholder="Écrivez votre message ici" required />
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
