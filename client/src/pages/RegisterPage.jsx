import RegistrationForm from "../components/RegistrationForm/RegistrationForm";
import styles from "../styles/auth/RegistrationPage.module.css";

function RegisterPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Create your SlimMom account</h1>

        <RegistrationForm />
      </div>
    </main>
  );
}

export default RegisterPage;
