import { apiRequest } from "../services/api";

// Login operation
export const loginOperation = async (credentials) => {
  const response = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  return response.data;
};

// Registration operation
export const registerOperation = async (userData) => {
  const response = await apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });

  return response.data;
};

// Logout operation
export const logoutOperation = async () => {
  const token = sessionStorage.getItem("token");

  try {
    await apiRequest("/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } finally {
    sessionStorage.removeItem("token");
  }
};

// Get authenticated user information
export const getCurrentUserOperation = async (token) => {
  const response = await apiRequest("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
