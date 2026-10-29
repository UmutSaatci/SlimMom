import mongoose from "mongoose";
import ConsumedFood from "../models/ConsumedFood.js";
import Product from "../models/Product.js";

const isValidDate = (date) => {
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return false;
  }

  const parsedDate = new Date(`${date}T00:00:00.000Z`);

  return (
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === date
  );
};

// Get all consumed foods for a specific day.
export const getConsumedFoodsByDate = async (req, res, next) => {
  try {
    const { date } = req.query;

    if (!isValidDate(date)) {
      return res.status(400).json({
        status: "error",
        message: "Please provide a valid date in YYYY-MM-DD format.",
      });
    }

    const consumedFoods = await ConsumedFood.find({
      userId: req.user.userId,
      date,
    })
      .sort({ createdAt: -1 })
      .lean();

    const totalCalories = consumedFoods.reduce(
      (total, item) => total + item.calories,
      0,
    );

    return res.status(200).json({
      status: "success",
      data: {
        date,
        consumedFoods,
        totalCalories: Math.round(totalCalories),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Add a consumed food to a specific day.
export const addConsumedFood = async (req, res, next) => {
  try {
    const { productId, date, weight } = req.body;

    if (
      !mongoose.isValidObjectId(productId) ||
      !isValidDate(date) ||
      !Number.isFinite(weight) ||
      weight <= 0
    ) {
      return res.status(400).json({
        status: "error",
        message: "Please provide a valid productId, date, and weight.",
      });
    }

    const product = await Product.findById(productId).lean();

    if (!product) {
      return res.status(404).json({
        status: "error",
        message: "Product not found.",
      });
    }

    const consumedCalories = (product.calories * weight) / product.weight;

    const consumedFood = await ConsumedFood.create({
      userId: req.user.userId,
      productId: product._id,
      title: product.title,
      date,
      weight,
      calories: Math.round(consumedCalories),
    });

    return res.status(201).json({
      status: "success",
      message: "Consumed food added successfully.",
      data: { consumedFood },
    });
  } catch (error) {
    next(error);
  }
};

// Delete a consumed food entry owned by the logged-in user.
export const deleteConsumedFood = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        status: "error",
        message: "Please provide a valid consumed food ID.",
      });
    }

    const consumedFood = await ConsumedFood.findOneAndDelete({
      _id: id,
      userId: req.user.userId,
    });

    if (!consumedFood) {
      return res.status(404).json({
        status: "error",
        message: "Consumed food not found.",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Consumed food deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};
