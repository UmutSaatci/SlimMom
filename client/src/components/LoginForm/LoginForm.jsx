import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAction } from "../../actions/authActions";
import styles from "../../styles/auth/LoginForm.module.css";
function LoginForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const email = formData.email.trim();
    const password = formData.password;

    if (!email || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const data = await loginAction({ email, password });

      const { token } = data;

      if (!token) {
        throw new Error("Login response does not contain a token.");
      }

      sessionStorage.setItem("token", token);

      navigate("/diary", { replace: true });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="login-email">
          Email
        </label>

        <input
          className={styles.input}
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className={styles.label} htmlFor="login-password">
          Password
        </label>

        <input
          className={styles.input}
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <button
          className={styles.submitButton}
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p className={styles.registerText}>
        Don't have an account?{" "}
        <Link className={styles.registerLink} to="/register">
          Register
        </Link>
      </p>
    </>
  );
}

export default LoginForm;
