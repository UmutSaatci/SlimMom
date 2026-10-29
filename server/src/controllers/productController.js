import Product from "../models/Product.js";

export const searchProducts = async (req, res, next) => {
  try {
    const { search = "", category, page = "1", limit = "20" } = req.query;

    const currentPage = Number(page);
    const pageSize = Number(limit);

    if (
      !Number.isInteger(currentPage) ||
      currentPage < 1 ||
      !Number.isInteger(pageSize) ||
      pageSize < 1 ||
      pageSize > 100
    ) {
      return res.status(400).json({
        status: "error",
        message:
          "Invalid page or limit. Page must be positive and limit must be between 1 and 100.",
      });
    }

    const filter = {};

    if (search.trim()) {
      filter.title = {
        $regex: search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
        $options: "i",
      };
    }

    if (category?.trim()) {
      filter.categories = category.trim();
    }

    const skip = (currentPage - 1) * pageSize;

    const [products, total] = await Promise.all([
      Product.find(filter)
        .select("title categories weight calories")
        .sort({ title: 1 })
        .skip(skip)
        .limit(pageSize)
        .lean(),
      Product.countDocuments(filter),
    ]);

    return res.status(200).json({
      status: "success",
      data: {
        products,
        pagination: {
          total,
          page: currentPage,
          limit: pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
