import { apiRequest } from "../services/api";

// Search products
export const searchProductsOperation = async (searchTerm) => {
  return await apiRequest(
    `/products?search=${encodeURIComponent(searchTerm)}&page=1&limit=10`,
  );
};
