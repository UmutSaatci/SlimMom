import { useNavigate } from "react-router-dom";
import styles from "../styles/components/CalorieGoal.module.css";

function CalorieGoal({ dailyCalories, loading }) {
  const navigate = useNavigate();

  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>Your daily calorie goal</h2>

      {loading ? (
        <p className={styles.message}>Loading calorie target...</p>
      ) : dailyCalories != null ? (
        <p className={styles.calories}>
          {dailyCalories} <span>kcal/day</span>
        </p>
      ) : (
        <div className={styles.emptyState}>
          <p className={styles.message}>
            Complete your profile to calculate your daily calorie target.
          </p>

          <button
            className={styles.button}
            type="button"
            onClick={() => navigate("/profile")}
          >
            Complete profile
          </button>
        </div>
      )}
    </section>
  );
}

export default CalorieGoal;
