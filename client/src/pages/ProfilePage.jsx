import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProfileAction,
  updateProfileAction,
} from "../actions/calculatorActions";
import styles from "../styles/pages/ProfilePage.module.css";

function ProfilePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    heightCm: "",
    age: "",
    currentWeightKg: "",
    desiredWeightKg: "",
    bloodGroup: "",
  });

  const [calorieTarget, setCalorieTarget] = useState(null);
  const [error, setError] = useState("");
  const [profileLoading, setProfileLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      const token = sessionStorage.getItem("token");

      if (!token || token === "undefined") {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const response = await getProfileAction(token);
        const profile = response.data.profile;

        if (!isMounted) return;

        setFormData({
          heightCm: String(profile.heightCm),
          age: String(profile.age),
          currentWeightKg: String(profile.currentWeightKg),
          desiredWeightKg: String(profile.desiredWeightKg),
          bloodGroup: String(profile.bloodGroup),
        });

        const target =
          10 * profile.currentWeightKg +
          6.25 * profile.heightCm -
          5 * profile.age -
          161 -
          10 * (profile.currentWeightKg - profile.desiredWeightKg);

        setCalorieTarget(Math.round(target));
      } catch (error) {
        if (error.status === 401) {
          sessionStorage.removeItem("token");
          navigate("/login", { replace: true });
          return;
        }

        if (error.status === 404) {
          return;
        }

        if (isMounted) {
          setError(error.message);
        }
      } finally {
        if (isMounted) {
          setProfileLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      const profile = {
        heightCm: Number(formData.heightCm),
        age: Number(formData.age),
        currentWeightKg: Number(formData.currentWeightKg),
        desiredWeightKg: Number(formData.desiredWeightKg),
        bloodGroup: Number(formData.bloodGroup),
      };

      const token = sessionStorage.getItem("token");

      if (!token || token === "undefined") {
        navigate("/login", { replace: true });
        return;
      }

      await updateProfileAction(token, profile);

      const { heightCm, age, currentWeightKg, desiredWeightKg } = profile;

      const target =
        10 * currentWeightKg +
        6.25 * heightCm -
        5 * age -
        161 -
        10 * (currentWeightKg - desiredWeightKg);

      setCalorieTarget(Math.round(target));
    } catch (error) {
      if (error.status === 401) {
        sessionStorage.removeItem("token");
        navigate("/login", { replace: true });
        return;
      }

      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  if (profileLoading) {
    return (
      <p className={styles.loading} role="status">
        Loading profile...
      </p>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Complete your profile</h1>

        <div className={styles.content}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label} htmlFor="heightCm">
              Height (cm)
            </label>
            <input
              className={styles.input}
              id="heightCm"
              name="heightCm"
              type="number"
              min="1"
              step="any"
              value={formData.heightCm}
              onChange={handleChange}
              required
            />

            <label className={styles.label} htmlFor="age">
              Age
            </label>
            <input
              className={styles.input}
              id="age"
              name="age"
              type="number"
              min="1"
              step="1"
              value={formData.age}
              onChange={handleChange}
              required
            />

            <label className={styles.label} htmlFor="currentWeightKg">
              Current weight (kg)
            </label>
            <input
              className={styles.input}
              id="currentWeightKg"
              name="currentWeightKg"
              type="number"
              min="1"
              step="any"
              value={formData.currentWeightKg}
              onChange={handleChange}
              required
            />

            <label className={styles.label} htmlFor="desiredWeightKg">
              Desired weight (kg)
            </label>
            <input
              className={styles.input}
              id="desiredWeightKg"
              name="desiredWeightKg"
              type="number"
              min="1"
              step="any"
              value={formData.desiredWeightKg}
              onChange={handleChange}
              required
            />

            <label className={styles.label} htmlFor="bloodGroup">
              Blood group
            </label>
            <select
              className={styles.select}
              id="bloodGroup"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
            >
              <option value="">Select your blood group</option>
              <option value="1">O (I)</option>
              <option value="2">A (II)</option>
              <option value="3">B (III)</option>
              <option value="4">AB (IV)</option>
            </select>

            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}

            <button
              className={styles.submitButton}
              type="submit"
              disabled={saving}
            >
              {saving ? "Saving..." : "Calculate my calories"}
            </button>
          </form>

          <div className={styles.sidebar}>
            {calorieTarget !== null && (
              <section className={styles.result} aria-live="polite">
                <h2 className={styles.resultTitle}>
                  Your daily calorie target
                </h2>

                <p className={styles.calorieValue}>{calorieTarget} kcal/day</p>

                <button
                  className={styles.diaryButton}
                  type="button"
                  onClick={() => navigate("/diary")}
                >
                  Go to diary
                </button>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
