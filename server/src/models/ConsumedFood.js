import mongoose from "mongoose";

const consumedFoodSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    date: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/,
      index: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    weight: {
      type: Number,
      required: true,
      min: 1,
    },
    calories: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true, versionKey: false },
);

consumedFoodSchema.index({ userId: 1, date: 1 });

const ConsumedFood = mongoose.model("ConsumedFood", consumedFoodSchema);

export default ConsumedFood;
