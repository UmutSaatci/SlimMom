import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyCaloriesAction,
  updateProfileAction,
  getProfileAction,
} from "../actions/calculatorActions";
import CalculatorCalorieForm from "../components/CalculatorCalorieForm";
import CalculatorSideBar from "../components/CalculatorSideBar";
import Loader from "../components/Loader";
import styles from "../styles/pages/CalculatorPage.module.css";

function CalculatorPage() {
  const navigate = useNavigate();

  const [calorieData, setCalorieData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadCalories = async (authToken) => {
    const response = await getMyCaloriesAction(authToken);
    setCalorieData(response.data);
  };

  useEffect(() => {
    let isMounted = true;

    const initializePage = async () => {
      const authToken = sessionStorage.getItem("token");

      if (!authToken || authToken === "undefined") {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const [caloriesResponse, profileResponse] = await Promise.all([
          getMyCaloriesAction(authToken),
          getProfileAction(authToken),
        ]);

        if (isMounted) {
          setCalorieData(caloriesResponse.data);
          setProfileData(profileResponse.data.profile);
        }
      } catch (error) {
        if (error.status === 401) {
          sessionStorage.removeItem("token");
          navigate("/login", { replace: true });
          return;
        }

        if (error.status !== 404 && isMounted) {
          setError(error.message || "Failed to load calorie information.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initializePage();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleCalculate = async (profileData) => {
    const authToken = sessionStorage.getItem("token");

    if (!authToken || authToken === "undefined") {
      navigate("/login", { replace: true });
      return;
    }

    setSaving(true);
    setError("");

    try {
      await updateProfileAction(authToken, profileData);
      await loadCalories(authToken);
    } catch (error) {
      if (error.status === 401) {
        sessionStorage.removeItem("token");
        navigate("/login", { replace: true });
        return;
      }

      setError(error.message || "Calculation failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Calorie Calculator</h1>

      <div className={styles.content}>
        <div className={styles.form}>
          <CalculatorCalorieForm
            onCalculate={handleCalculate}
            loading={saving}
            initialData={profileData}
          />
        </div>

        <div className={styles.sidebar}>
          {calorieData ? (
            <CalculatorSideBar
              dailyCalories={calorieData.dailyCalories}
              restrictedProducts={calorieData.restrictedProducts}
            />
          ) : (
            <p>
              Please enter your information to calculate your daily calories.
            </p>
          )}
        </div>
      </div>

      {error && <p role="alert">{error}</p>}
    </main>
  );
}

export default CalculatorPage;
