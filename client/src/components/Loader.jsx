import styles from "../styles/components/Loader.module.css";

function Loader() {
  return (
    <div className={styles.overlay} role="status" aria-label="Loading">
      <div className={styles.spinner} />
      <span className={styles.text}>Loading...</span>
    </div>
  );
}

export default Loader;
