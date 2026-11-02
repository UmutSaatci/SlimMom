import { useState } from "react";
import { searchProductsAction } from "../actions/productActions";
import styles from "../styles/components/FoodSearch.module.css";

function FoodSearch({ onSelectProduct }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();

    const term = searchTerm.trim();

    if (!term) {
      setProducts([]);
      setError("Please enter a product name.");
      return;
    }

    setSearchLoading(true);
    setError("");

    try {
      const response = await searchProductsAction(term);

      setProducts(response.data.products);
    } catch (error) {
      setProducts([]);
      setError(error.message || "An error occurred while searching.");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSelectProduct = (product) => {
    onSelectProduct(product);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>Search food</h2>

      <form className={styles.form} onSubmit={handleSearch}>
        <label htmlFor="searchTerm">Product name</label>

        <input
          className={styles.input}
          id="searchTerm"
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="For example, apple"
        />

        <button type="submit" disabled={searchLoading}>
          {searchLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      {products.length > 0 && (
        <ul className={styles.results}>
          {products.map((product) => (
            <li className={styles.item} key={product._id}>
              <button
                className={styles.product}
                type="button"
                onClick={() => handleSelectProduct(product)}
              >
                {product.title} —{" "}
                {product.calories ?? "Calorie data unavailable"} kcal / 100 g
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default FoodSearch;
