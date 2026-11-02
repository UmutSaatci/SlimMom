import { useState } from "react";
import DailyCaloriesForm from "../components/DailyCaloriesForm";
import DailyCalorieIntake from "../components/DailyCalorieIntake";
import Modal from "../components/Modal";
import Loader from "../components/Loader";
import { calculateCaloriesAction } from "../actions/calculatorActions";
import styles from "../styles/components/MainPage.module.css";

function MainPage() {
  const [calorieData, setCalorieData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCalculate = async (profileData) => {
    setError("");
    setCalorieData(null);
    setLoading(true);

    try {
      const response = await calculateCaloriesAction(profileData);

      setCalorieData(response.data);
    } catch (error) {
      setError(error.message || "Calculation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setCalorieData(null);
  };

  return (
    <main className={styles.main}>
      <DailyCaloriesForm onCalculate={handleCalculate} />

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      {loading && <Loader />}

      {calorieData && (
        <Modal onClose={handleCloseModal}>
          <DailyCalorieIntake
            dailyCalories={calorieData.dailyCalories}
            restrictedProducts={calorieData.restrictedProducts}
          />
        </Modal>
      )}
    </main>
  );
}

export default MainPage;
