import { searchProductsOperation } from "../operations/productOperations";

// Search products
export const searchProductsAction = async (searchTerm) => {
  return await searchProductsOperation(searchTerm);
};
