import CalorieGoal from "./CalorieGoal";
import styles from "../styles/components/RightSideBar.module.css";

function RightSideBar({ dailyCalories, totalCalories, calorieLoading }) {
  const remainingCalories =
    dailyCalories != null ? dailyCalories - totalCalories : null;

  return (
    <aside className={styles.sidebar}>
      <CalorieGoal dailyCalories={dailyCalories} loading={calorieLoading} />

      <section className={styles.summary}>
        <h2 className={styles.heading}>Daily summary</h2>

        <p>
          Consumed calories: <strong>{totalCalories} kcal</strong>
        </p>

        {remainingCalories != null && (
          <p>
            Remaining calories: <strong>{remainingCalories} kcal</strong>
          </p>
        )}
      </section>
    </aside>
  );
}

export default RightSideBar;
