import {
  loginOperation,
  registerOperation,
  logoutOperation,
  getCurrentUserOperation,
} from "../operations/authOperations";

export const loginAction = async (credentials) => {
  return await loginOperation(credentials);
};

export const registerAction = async (userData) => {
  return await registerOperation(userData);
};

export const logoutAction = async () => {
  return await logoutOperation();
};

export const getCurrentUserAction = async (token) => {
  return await getCurrentUserOperation(token);
};
