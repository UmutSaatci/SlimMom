import { useLocation } from "react-router-dom";
import LoginForm from "../components/LoginForm/LoginForm";
import styles from "../styles/auth/LoginPage.module.css";

function LoginPage() {
  const location = useLocation();
  const successMessage = location.state?.message;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome back to SlimMom!</h1>

        {successMessage && (
          <p className={styles.successMessage} role="status">
            {successMessage}
          </p>
        )}

        <LoginForm />
      </div>
    </main>
  );
}

export default LoginPage;
