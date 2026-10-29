import { useState } from "react";
import styles from "../styles/components/DailyCaloriesForm.module.css";

const initialFormData = {
  heightCm: "",
  age: "",
  currentWeightKg: "",
  desiredWeightKg: "",
  bloodGroup: "",
};

function DailyCaloriesForm({ onCalculate }) {
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    const heightCm = Number(formData.heightCm);
    const age = Number(formData.age);
    const currentWeightKg = Number(formData.currentWeightKg);
    const desiredWeightKg = Number(formData.desiredWeightKg);
    const bloodGroup = Number(formData.bloodGroup);

    if (
      !heightCm ||
      !age ||
      !currentWeightKg ||
      !desiredWeightKg ||
      !bloodGroup ||
      heightCm <= 0 ||
      age <= 0 ||
      currentWeightKg <= 0 ||
      desiredWeightKg <= 0 ||
      !Number.isInteger(age) ||
      ![1, 2, 3, 4].includes(bloodGroup)
    ) {
      setError("Please enter valid values in all fields.");
      return;
    }

    onCalculate({
      heightCm,
      age,
      currentWeightKg,
      desiredWeightKg,
      bloodGroup,
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Calculate your daily calorie intake</h1>

      <label className={styles.label} htmlFor="daily-height">
        Height (cm)
      </label>
      <input
        className={styles.input}
        id="daily-height"
        name="heightCm"
        type="number"
        min="1"
        step="any"
        value={formData.heightCm}
        onChange={handleChange}
        required
      />

      <label className={styles.label} htmlFor="daily-age">
        Age
      </label>
      <input
        className={styles.input}
        id="daily-age"
        name="age"
        type="number"
        min="1"
        step="1"
        value={formData.age}
        onChange={handleChange}
        required
      />

      <label className={styles.label} htmlFor="daily-current-weight">
        Current weight (kg)
      </label>
      <input
        className={styles.input}
        id="daily-current-weight"
        name="currentWeightKg"
        type="number"
        min="1"
        step="any"
        value={formData.currentWeightKg}
        onChange={handleChange}
        required
      />

      <label className={styles.label} htmlFor="daily-desired-weight">
        Desired weight (kg)
      </label>
      <input
        className={styles.input}
        id="daily-desired-weight"
        name="desiredWeightKg"
        type="number"
        min="1"
        step="any"
        value={formData.desiredWeightKg}
        onChange={handleChange}
        required
      />

      <label className={styles.label} htmlFor="daily-blood-group">
        Blood group
      </label>
      <select
        className={styles.input}
        id="daily-blood-group"
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

      <button className={styles.button} type="submit">
        Zayıfla
      </button>
    </form>
  );
}

export default DailyCaloriesForm;
