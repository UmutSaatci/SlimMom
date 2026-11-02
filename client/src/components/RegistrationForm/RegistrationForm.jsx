import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerAction } from "../../actions/authActions";
import styles from "../../styles/auth/RegistrationForm.module.css";
function RegistrationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

    const name = formData.name.trim();
    const email = formData.email.trim();
    const password = formData.password;

    if (name.length === 0) {
      setError("Name is required.");
      return;
    }

    if (email.length === 0 || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      await registerAction({
        name,
        email,
        password,
      });

      navigate("/login", {
        replace: true,
        state: {
          message: "Registration successful! Please log in.",
        },
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="register-name">
          Name
        </label>

        <input
          className={styles.input}
          id="register-name"
          name="name"
          type="text"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className={styles.label} htmlFor="register-email">
          Email
        </label>

        <input
          className={styles.input}
          id="register-email"
          name="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className={styles.label} htmlFor="register-password">
          Password
        </label>

        <input
          className={styles.input}
          id="register-password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
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
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className={styles.loginText}>
        Already have an account?{" "}
        <Link className={styles.loginLink} to="/login">
          Log in
        </Link>
      </p>
    </>
  );
}

export default RegistrationForm;
