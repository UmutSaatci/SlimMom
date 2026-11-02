import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

import Logo from "./Logo";
import UserInfo from "./UserInfo";
import Navigation from "./Navigation";
import { getCurrentUserAction } from "../actions/authActions";
import styles from "../styles/components/Header.module.css";

function Header() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      const token = sessionStorage.getItem("token");

      if (!token || token === "undefined") {
        if (isMounted) {
          setUser(null);
        }
        return;
      }

      try {
        const response = await getCurrentUserAction(token);

        if (isMounted) {
          setUser(response.data);
        }
      } catch (error) {
        if (error.status === 401) {
          sessionStorage.removeItem("token");
        }

        if (isMounted) {
          setUser(null);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [location.pathname]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />

        {user ? (
          <div className={styles.user}>
            <Navigation />
            <UserInfo user={user} />
          </div>
        ) : (
          <nav className={styles.authLinks}>
            <Link to="/login" className={styles.authLink}>
              Log in
            </Link>

            <Link to="/register" className={styles.authLink}>
              Registration
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
