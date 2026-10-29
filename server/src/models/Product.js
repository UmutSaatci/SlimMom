import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    categories: {
      type: String,
      required: true,
      index: true,
    },
    weight: {
      type: Number,
      required: true,
      min: 1,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    calories: {
      type: Number,
      required: true,
      min: 0,
    },
    groupBloodNotAllowed: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },
  },
  {
    versionKey: false,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
