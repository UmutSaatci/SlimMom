import { NavLink } from "react-router-dom";
import styles from "../styles/components/Navigation.module.css";

function Navigation() {
  return (
    <nav className={styles.navigation} aria-label="Ana navigasyon">
      <NavLink
        to="/diary"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Günlük
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Profil
      </NavLink>
    </nav>
  );
}

export default Navigation;
