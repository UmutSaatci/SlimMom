import { Link } from "react-router-dom";
import styles from "../styles/components/Logo.module.css";

function Logo() {
  return (
    <Link
      to="/diary"
      className={styles.logo}
      aria-label="SlimMom günlük sayfası"
    >
      SlimMom
    </Link>
  );
}

export default Logo;
