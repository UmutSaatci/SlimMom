import styles from "../styles/components/CalculatorSideBar.module.css";

function CalculatorSideBar({ dailyCalories, restrictedProducts }) {
  return (
    <aside className={styles.sidebar}>
      <section className={styles.calorieGoal}>
        <h2>Your daily calorie target</h2>
        <p>{dailyCalories} kcal/day</p>
      </section>

      <section className={styles.restrictedProducts}>
        <h2>Restricted products</h2>

        {restrictedProducts?.length > 0 ? (
          <ul className={styles.productList}>
            {restrictedProducts.map((product) => (
              <li key={product._id}>{product.title}</li>
            ))}
          </ul>
        ) : (
          <p>No restricted products found.</p>
        )}
      </section>
    </aside>
  );
}

export default CalculatorSideBar;
