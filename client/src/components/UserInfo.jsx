import { useNavigate } from "react-router-dom";
import { logoutAction } from "../actions/authActions";
import styles from "../styles/components/UserInfo.module.css";

function UserInfo({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutAction();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      navigate("/login", { replace: true });
    }
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
