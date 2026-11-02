import styles from "../styles/pages/DiaryPage.module.css";
import DiaryDateCalendar from "../components/DiaryDateCalendar";
import Loader from "../components/Loader";
import { loaderReducer, initialState } from "../context/loaderReducer";
import DiaryProductsList from "../components/DiaryProductsList";
import DiaryAddProductForm from "../components/DiaryAddProductForm";
import { getCurrentUserAction } from "../actions/authActions";
import {
  getConsumedFoodsAction,
  deleteConsumedFoodAction,
} from "../actions/consumedFoodActions";
import { getMyCaloriesAction } from "../actions/calculatorActions";
import RightSideBar from "../components/RightSideBar";
import { useEffect, useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";

function DiaryPage() {
  const navigate = useNavigate();
  const [deletingFoodId, setDeletingFoodId] = useState(null);
  const [user, setUser] = useState(null);

  const [loaderState, dispatchLoader] = useReducer(loaderReducer, initialState);

  const loading = loaderState.isLoading;
  const [error, setError] = useState("");

  const [dailyCalories, setDailyCalories] = useState(null);
  const [calorieLoading, setCalorieLoading] = useState(true);

  const [consumedFoods, setConsumedFoods] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [foodsLoading, setFoodsLoading] = useState(true);
  const [foodsError, setFoodsError] = useState("");

  const getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState(getToday());

  const fetchConsumedFoods = async (token, date = selectedDate) => {
    const foodsData = await getConsumedFoodsAction(token, date);

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
        const data = await getCurrentUserAction(token);

        setUser(data);

        const calorieData = await getMyCaloriesAction(token);

        setDailyCalories(calorieData.data.dailyCalories);
      } catch (error) {
        if (error.status === 401) {
          sessionStorage.removeItem("token");
          navigate("/login", { replace: true });
          return;
        }

        setError(error.message);
      } finally {
        dispatchLoader({ type: "loader/stop" });
        setCalorieLoading(false);
      }
    };

    checkUser();
  }, [navigate]);

  useEffect(() => {
    const loadFoods = async () => {
      const token = sessionStorage.getItem("token");

      if (!token || token === "undefined") {
        setFoodsLoading(false);
        return;
      }

      setFoodsLoading(true);
      setFoodsError("");

      try {
        await fetchConsumedFoods(token);
      } catch (error) {
        setFoodsError(error.message);
      } finally {
        setFoodsLoading(false);
      }
    };

    loadFoods();
  }, [selectedDate]);

  const handleDeleteFood = async (foodId) => {
    const token = sessionStorage.getItem("token");

    if (!token || token === "undefined") {
      navigate("/login", { replace: true });
      return;
    }

    setDeletingFoodId(foodId);
    setFoodsError("");

    try {
      await deleteConsumedFoodAction(token, foodId);
      await fetchConsumedFoods(token);
    } catch (error) {
      setFoodsError(error.message);
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
    <main className={styles.container}>
      <div className={styles.content}>
        <section className={styles.main}>
          <DiaryDateCalendar
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />

          <DiaryAddProductForm
            selectedDate={selectedDate}
            onFoodAdded={() => {
              const token = sessionStorage.getItem("token");
              return fetchConsumedFoods(token);
            }}
          />

          <DiaryProductsList
            consumedFoods={consumedFoods}
            totalCalories={totalCalories}
            loading={foodsLoading}
            error={foodsError}
            onDeleteFood={handleDeleteFood}
            deletingFoodId={deletingFoodId}
          />
        </section>

        <RightSideBar
          dailyCalories={dailyCalories}
          totalCalories={totalCalories}
          calorieLoading={calorieLoading}
        />
      </div>
    </main>
  );
}

export default DiaryPage;
