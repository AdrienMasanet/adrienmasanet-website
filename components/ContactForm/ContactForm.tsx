import styles from "./ContactForm.module.scss";

const ContactForm = () => {
  const submitMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    // Console log key values of the form
    const formData = new FormData(event.target as HTMLFormElement);
  };

  return (
    <form className={styles.container} name="message" id="email" onSubmit={submitMessage}>
      <div className={styles.inlineinputs}>
        <input className={`${styles.formelement} ${styles.inputname}`} type="email" name="email" id="email" placeholder="Adresse e-mail" required />
        <input className={`${styles.formelement} ${styles.inputcompany}`} type="text" name="company" id="company" placeholder="Entreprise" />
      </div>
      <textarea className={styles.formelement} rows={15} placeholder="Écrivez votre gentil message ici !" required />
      <button className="hoverable" type="submit">
        Envoyer
      </button>
    </form>
  );
};

export default ContactForm;
