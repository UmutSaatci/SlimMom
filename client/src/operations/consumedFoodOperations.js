import { apiRequest } from "../services/api";

export const getConsumedFoodsOperation = async (token, date) => {
  return await apiRequest(`/consumed-foods?date=${date}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addConsumedFoodOperation = async (token, foodData) => {
  return await apiRequest("/consumed-foods", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(foodData),
  });
};

export const deleteConsumedFoodOperation = async (token, foodId) => {
  return await apiRequest(`/consumed-foods/${foodId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
