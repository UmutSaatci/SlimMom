import Loader from "../components/Loader";
import { loaderReducer } from "../context/loaderReducer";
import FoodAddForm from "../components/FoodAddForm";
import FoodDiary from "../components/FoodDiary";
import FoodSearch from "../components/FoodSearch";
import CalorieGoal from "../components/CalorieGoal";
import { useEffect, useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";

function DashboardPage() {
  const navigate = useNavigate();
  const [deletingFoodId, setDeletingFoodId] = useState(null);
  const [user, setUser] = useState(null);
  const [loaderState, dispatchLoader] = useReducer(loaderReducer, {
    isLoading: true,
  });

  const loading = loaderState.isLoading;
  const [error, setError] = useState("");

  const [dailyCalories, setDailyCalories] = useState(null);
  const [calorieLoading, setCalorieLoading] = useState(true);

  const [consumedFoods, setConsumedFoods] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [foodsLoading, setFoodsLoading] = useState(true);
  const [foodsError, setFoodsError] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [weight, setWeight] = useState(100);

  const [addLoading, setAddLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formMessage, setFormMessage] = useState("");

  const getToday = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const fetchConsumedFoods = async (token) => {
    const foodsData = await apiRequest(`/consumed-foods?date=${getToday()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setConsumedFoods(foodsData.data.consumedFoods);
    setTotalCalories(foodsData.data.totalCalories);
  };

  useEffect(() => {
    const checkUser = async () => {
      const token = sessionStorage.getItem("token");

      if (!token || token === "undefined") {
        dispatchLoader({ type: "loader/stop" });
        setCalorieLoading(false);
        setFoodsLoading(false);
        return;
      }

      try {
        const data = await apiRequest("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(data);

        const calorieData = await apiRequest("/calculator/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDailyCalories(calorieData.data.dailyCalories);
      } catch (error) {
        setError(error.message);
      } finally {
        dispatchLoader({ type: "loader/stop" });
        setCalorieLoading(false);
      }

      try {
        const foodsData = await apiRequest(
          `/consumed-foods?date=${getToday()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setConsumedFoods(foodsData.data.consumedFoods);
        setTotalCalories(foodsData.data.totalCalories);
        setFoodsError("");
      } catch (error) {
        setFoodsError(error.message);
      } finally {
        setFoodsLoading(false);
      }
    };

    checkUser();
  }, [navigate]);

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

    setAddLoading(true);
    setFormError("");
    setFormMessage("");

    try {
      const token = sessionStorage.getItem("token");

      if (!token || token === "undefined") {
        navigate("/login", { replace: true });
        return;
      }

      await apiRequest("/consumed-foods", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: selectedProduct._id,
          weight: numericWeight,
          date: getToday(),
        }),
      });

      await fetchConsumedFoods(token);

      setFormMessage("Food added successfully.");
      setSelectedProduct(null);
      setWeight(100);
    } catch (error) {
      setFormError(error.message);
    } finally {
      setAddLoading(false);
    }
  };

  const handleDeleteFood = async (foodId) => {
    const token = sessionStorage.getItem("token");

    if (!token || token === "undefined") {
      navigate("/login", { replace: true });
      return;
    }

    setDeletingFoodId(foodId);
    setFormError("");

    try {
      await apiRequest(`/consumed-foods/${foodId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchConsumedFoods(token);
    } catch (error) {
      setFormError(error.message);
    } finally {
      setDeletingFoodId(null);
    }
  };

  if (loading) {
    return <Loader />;
  }
  if (!user) {
    return error ? <p role="alert">{error}</p> : null;
  }

  return (
    <main>
      <CalorieGoal dailyCalories={dailyCalories} loading={calorieLoading} />

      <FoodSearch
        onSelectProduct={(product) => {
          setSelectedProduct(product);
          setWeight(100);
          setFormError("");
          setFormMessage("");
        }}
      />

      <FoodAddForm
        selectedProduct={selectedProduct}
        weight={weight}
        onWeightChange={setWeight}
        onSubmit={handleAddFood}
        loading={addLoading}
      />

      {formError && <p role="alert">{formError}</p>}
      {formMessage && <p role="status">{formMessage}</p>}

      <FoodDiary
        consumedFoods={consumedFoods}
        totalCalories={totalCalories}
        loading={foodsLoading}
        error={foodsError}
        onDeleteFood={handleDeleteFood}
        deletingFoodId={deletingFoodId}
      />
    </main>
  );
}

export default DashboardPage;
