import FoodDiaryItem from "./FoodDiaryItem";
import styles from "../styles/components/FoodDiary.module.css";

function FoodDiary({
  consumedFoods,
  totalCalories,
  loading,
  error,
  onDeleteFood,
  deletingFoodId,
}) {
  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>Your food diary</h2>

      <p className={styles.total}>
        Total consumed: <strong>{totalCalories} kcal</strong>
      </p>

      {loading ? (
        <p className={styles.message}>Loading food entries...</p>
      ) : error ? (
        <p className={styles.error} role="alert">
          {error}
        </p>
      ) : consumedFoods.length === 0 ? (
        <p className={styles.message}>No food entries for today.</p>
      ) : (
        <ul className={styles.list}>
          {consumedFoods.map((food) => (
            <FoodDiaryItem
              key={food._id}
              food={food}
              onDelete={onDeleteFood}
              deleting={deletingFoodId === food._id}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default FoodDiary;
