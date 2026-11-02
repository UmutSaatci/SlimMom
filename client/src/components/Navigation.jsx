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
        Diary
      </NavLink>

      <NavLink
        to="/calculator"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Calculator
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Profile
      </NavLink>
    </nav>
  );
}

export default Navigation;
