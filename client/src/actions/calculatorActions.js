import {
  getMyCaloriesOperation,
  updateProfileOperation,
  getProfileOperation,
  calculateCaloriesOperation,
} from "../operations/calculatorOperations";
// Get the user's calorie information
export const getMyCaloriesAction = async (token) => {
  return await getMyCaloriesOperation(token);
};

// Update the user's profile
export const updateProfileAction = async (token, profileData) => {
  return await updateProfileOperation(token, profileData);
};

export const getProfileAction = async (token) => {
  return await getProfileOperation(token);
};

// Calculate daily calorie needs
export const calculateCaloriesAction = async (profileData) => {
  return await calculateCaloriesOperation(profileData);
};
