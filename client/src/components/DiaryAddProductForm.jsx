import { useState } from "react";
import FoodSearch from "./FoodSearch";
import FoodAddForm from "./FoodAddForm";
import { addConsumedFoodAction } from "../actions/consumedFoodActions";
import styles from "../styles/components/DiaryAddProductForm.module.css";
function DiaryAddProductForm({ selectedDate, onFoodAdded }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [weight, setWeight] = useState(100);
  const [addLoading, setAddLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formMessage, setFormMessage] = useState("");

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setWeight(100);
    setFormError("");
    setFormMessage("");
  };

  const handleAddFood = async (event) => {
    event.preventDefault();

    if (!selectedProduct) {
      setFormError("Please select a product first.");
      return;
    }

    const numericWeight = Number(weight);

    if (!Number.isFinite(numericWeight) || numericWeight <= 0) {
      setFormError("Weight must be greater than zero.");
      return;
    }

    const token = sessionStorage.getItem("token");

    if (!token || token === "undefined") {
      setFormError("Please log in again.");
      return;
    }

    setAddLoading(true);
    setFormError("");
    setFormMessage("");

    try {
      await addConsumedFoodAction(token, {
        productId: selectedProduct._id,
        weight: numericWeight,
        date: selectedDate,
      });

      await onFoodAdded();

      setFormMessage("Food added successfully.");
      setSelectedProduct(null);
      setWeight(100);
    } catch (error) {
      setFormError(error.message || "Failed to add food. Please try again.");
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <section className={styles.container}>
      <FoodSearch onSelectProduct={handleSelectProduct} />

      <FoodAddForm
        selectedProduct={selectedProduct}
        weight={weight}
        onWeightChange={setWeight}
        onSubmit={handleAddFood}
        loading={addLoading}
      />

      {formError && (
        <p className={styles.error} role="alert">
          {formError}
        </p>
      )}

      {formMessage && (
        <p className={styles.success} role="status">
          {formMessage}
        </p>
      )}
    </section>
  );
}

export default DiaryAddProductForm;
