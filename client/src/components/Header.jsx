import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Logo from "./Logo";
import UserInfo from "./UserInfo";
import Navigation from "./Navigation";
import { apiRequest } from "../services/api";
import styles from "../styles/components/Header.module.css";

function Header() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      const token = sessionStorage.getItem("token");

      if (!token || token === "undefined") {
        setUser(null);
        return;
      }

      try {
        const response = await apiRequest("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (isMounted) {
          setUser(response.data);
        }
      } catch {
        sessionStorage.removeItem("token");

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

        {user && (
          <div className={styles.user}>
            <Navigation />
            <UserInfo user={user} />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
