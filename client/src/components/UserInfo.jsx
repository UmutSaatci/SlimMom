import { useNavigate } from "react-router-dom";
import styles from "../styles/components/UserInfo.module.css";

function UserInfo({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  if (!user) {
    return null;
  }

  const displayName = user.name || user.email || "Kullanıcı";

  return (
    <div className={styles.container}>
      <span className={styles.name}>{displayName}</span>

      <button className={styles.logout} type="button" onClick={handleLogout}>
        Çıkış yap
      </button>
    </div>
  );
}

export default UserInfo;
