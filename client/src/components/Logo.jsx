import { Link } from "react-router-dom";
import styles from "../styles/components/Logo.module.css";

function Logo() {
  return (
    <Link to="/" className={styles.logo} aria-label="SlimMom ana sayfa">
      SlimMom
    </Link>
  );
}

export default Logo;
