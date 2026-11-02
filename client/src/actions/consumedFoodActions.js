import {
  getConsumedFoodsOperation,
  addConsumedFoodOperation,
  deleteConsumedFoodOperation,
} from "../operations/consumedFoodOperations";

export const getConsumedFoodsAction = async (token, date) => {
  const response = await getConsumedFoodsOperation(token, date);
  return response;
};

export const addConsumedFoodAction = async (token, foodData) => {
  const response = await addConsumedFoodOperation(token, foodData);
  return response;
};

export const deleteConsumedFoodAction = async (token, foodId) => {
  const response = await deleteConsumedFoodOperation(token, foodId);
  return response;
};
