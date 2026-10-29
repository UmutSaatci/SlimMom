import styles from "../styles/components/FoodAddForm.module.css";

function FoodAddForm({
  selectedProduct,
  weight,
  onWeightChange,
  onSubmit,
  loading,
}) {
  if (!selectedProduct) {
    return null;
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h3 className={styles.title}>{selectedProduct.title}</h3>

      <label className={styles.label} htmlFor="weight">
        Weight (g)
      </label>

      <input
        className={styles.input}
        id="weight"
        type="number"
        min="1"
        step="any"
        value={weight}
        onChange={(event) => onWeightChange(event.target.value)}
        required
      />

      <button className={styles.button} type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add food"}
      </button>
    </form>
  );
}

export default FoodAddForm;
