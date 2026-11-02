import { useState } from "react";
import styles from "../styles/components/CalculatorCalorieForm.module.css";

function CalculatorCalorieForm({
  onCalculate,
  loading = false,
  initialData = null,
}) {
  const [formData, setFormData] = useState(() => ({
    heightCm: String(initialData?.heightCm ?? ""),
    age: String(initialData?.age ?? ""),
    currentWeightKg: String(initialData?.currentWeightKg ?? ""),
    desiredWeightKg: String(initialData?.desiredWeightKg ?? ""),
    bloodGroup: String(initialData?.bloodGroup ?? ""),
  }));

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
      !Number.isFinite(heightCm) ||
      !Number.isFinite(age) ||
      !Number.isFinite(currentWeightKg) ||
      !Number.isFinite(desiredWeightKg) ||
      heightCm < 50 ||
      heightCm > 250 ||
      age < 1 ||
      age > 120 ||
      !Number.isInteger(age) ||
      currentWeightKg < 1 ||
      currentWeightKg > 500 ||
      desiredWeightKg < 1 ||
      desiredWeightKg > 500 ||
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
      <h2 className={styles.title}>Calculate your daily calorie intake</h2>

      <label className={styles.label} htmlFor="calculator-height">
        Height (cm)
      </label>
      <input
        className={styles.input}
        id="calculator-height"
        name="heightCm"
        type="number"
        min="50"
        max="250"
        step="any"
        value={formData.heightCm}
        onChange={handleChange}
        required
      />

      <label className={styles.label} htmlFor="calculator-age">
        Age
      </label>
      <input
        className={styles.input}
        id="calculator-age"
        name="age"
        type="number"
        min="1"
        max="120"
        step="1"
        value={formData.age}
        onChange={handleChange}
        required
      />

      <label className={styles.label} htmlFor="calculator-current-weight">
        Current weight (kg)
      </label>
      <input
        className={styles.input}
        id="calculator-current-weight"
        name="currentWeightKg"
        type="number"
        min="1"
        max="500"
        step="any"
        value={formData.currentWeightKg}
        onChange={handleChange}
        required
      />

      <label className={styles.label} htmlFor="calculator-desired-weight">
        Desired weight (kg)
      </label>
      <input
        className={styles.input}
        id="calculator-desired-weight"
        name="desiredWeightKg"
        type="number"
        min="1"
        max="500"
        step="any"
        value={formData.desiredWeightKg}
        onChange={handleChange}
        required
      />

      <label className={styles.label} htmlFor="calculator-blood-group">
        Blood group
      </label>
      <select
        className={styles.input}
        id="calculator-blood-group"
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

      <button className={styles.button} type="submit" disabled={loading}>
        {loading ? "Calculating..." : "Calculate"}
      </button>
    </form>
  );
}

export default CalculatorCalorieForm;
