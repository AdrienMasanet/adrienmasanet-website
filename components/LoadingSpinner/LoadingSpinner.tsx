import styles from "./LoadingSpinner.module.scss";

type LoadingSpinnerProps = {
  active: boolean;
};

const LoadingSpinner = ({ active }: LoadingSpinnerProps) => {
  return (
    <div className={`${styles.container} ${active ? styles.active : ""}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingSpinner;
