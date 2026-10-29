import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const response = await apiRequest("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const profile = response.data.profile;

        setFormData({
          heightCm: String(profile.heightCm),
          age: String(profile.age),
          currentWeightKg: String(profile.currentWeightKg),
          desiredWeightKg: String(profile.desiredWeightKg),
          bloodGroup: profile.bloodGroup ? String(profile.bloodGroup) : "",
        });

        const target =
          10 * profile.currentWeightKg +
          6.25 * profile.heightCm -
          5 * profile.age -
          161 -
          10 * (profile.currentWeightKg - profile.desiredWeightKg);

        setCalorieTarget(Math.round(target));
      } catch (error) {
        if (error.message === "Profile not found.") {
          return;
        }

        setError(error.message);
      }
    };

    loadProfile();
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
    setLoading(true);

    try {
      const profile = {
        heightCm: Number(formData.heightCm),
        age: Number(formData.age),
        currentWeightKg: Number(formData.currentWeightKg),
        desiredWeightKg: Number(formData.desiredWeightKg),
        bloodGroup: Number(formData.bloodGroup),
      };

      const token = sessionStorage.getItem("token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      await apiRequest("/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      const { heightCm, age, currentWeightKg, desiredWeightKg } = profile;

      const target =
        10 * currentWeightKg +
        6.25 * heightCm -
        5 * age -
        161 -
        10 * (currentWeightKg - desiredWeightKg);

      setCalorieTarget(Math.round(target));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>Complete your profile</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="heightCm">Height (cm)</label>
        <input
          id="heightCm"
          name="heightCm"
          type="number"
          min="1"
          step="any"
          value={formData.heightCm}
          onChange={handleChange}
          required
        />

        <label htmlFor="age">Age</label>
        <input
          id="age"
          name="age"
          type="number"
          min="1"
          step="1"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <label htmlFor="currentWeightKg">Current weight (kg)</label>
        <input
          id="currentWeightKg"
          name="currentWeightKg"
          type="number"
          min="1"
          step="any"
          value={formData.currentWeightKg}
          onChange={handleChange}
          required
        />

        <label htmlFor="desiredWeightKg">Desired weight (kg)</label>
        <input
          id="desiredWeightKg"
          name="desiredWeightKg"
          type="number"
          min="1"
          step="any"
          value={formData.desiredWeightKg}
          onChange={handleChange}
          required
        />

        <label htmlFor="bloodGroup">Blood group</label>
        <select
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

        {error && <p role="alert">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Calculate my calories"}
        </button>
      </form>

      {calorieTarget !== null && (
        <section aria-live="polite">
          <h2>Your daily calorie target</h2>
          <p>{calorieTarget} kcal/day</p>

          <button type="button" onClick={() => navigate("/dashboard")}>
            Go to dashboard
          </button>
        </section>
      )}
    </main>
  );
}

export default ProfilePage;
