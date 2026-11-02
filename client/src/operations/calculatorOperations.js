import { apiRequest } from "../services/api";

// Get the user's calorie information
export const getMyCaloriesOperation = async (token) => {
  return await apiRequest("/calculator/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Update the user's profile information
export const updateProfileOperation = async (token, profileData) => {
  return await apiRequest("/profile", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });
};

// Get the user's saved profile information
export const getProfileOperation = async (token) => {
  return await apiRequest("/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Calculate daily calorie needs (public endpoint)
export const calculateCaloriesOperation = async (profileData) => {
  return await apiRequest("/calculator", {
    method: "POST",
    body: JSON.stringify(profileData),
  });
};
