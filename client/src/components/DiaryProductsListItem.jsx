import styles from "../styles/components/DiaryProductsListItem.module.css";

function DiaryProductsListItem({ food, onDelete, deleting }) {
  return (
    <li className={styles.item}>
      <span className={styles.details}>
        <span className={styles.title}>{food.title}</span>
        <span className={styles.meta}>
          {food.weight} g — {food.calories} kcal
        </span>
      </span>

      <button
        className={styles.deleteButton}
        type="button"
        onClick={() => onDelete(food._id)}
        disabled={deleting}
        aria-label={`${food.title} kaydını sil`}
      >
        {deleting ? "Deleting..." : "Delete"}
      </button>
    </li>
  );
}

export default DiaryProductsListItem;
