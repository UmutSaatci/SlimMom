import styles from "../styles/components/DailyCalorieIntake.module.css";

function DailyCalorieIntake({ dailyCalories, restrictedProducts = [] }) {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Your daily calorie intake</h2>

      <p className={styles.description}>
        Your recommended daily calorie target is:
      </p>

      <p className={styles.calories}>
        {dailyCalories} <span>kcal/day</span>
      </p>

      <div className={styles.products}>
        <h3 className={styles.subtitle}>Products not recommended for you</h3>

        {restrictedProducts.length > 0 ? (
          <ul className={styles.list}>
            {restrictedProducts.map((product, index) => {
              const productName =
                typeof product === "string"
                  ? product
                  : product.title || product.name || product._id;

              return (
                <li key={product._id || product.id || index}>{productName}</li>
              );
            })}
          </ul>
        ) : (
          <p className={styles.empty}>No restricted products were found.</p>
        )}
      </div>
    </section>
  );
}

export default DailyCalorieIntake;
