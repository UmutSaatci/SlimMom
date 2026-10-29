import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    heightCm: {
      type: Number,
      required: true,
      min: 1,
    },
    age: {
      type: Number,
      required: true,
      min: 1,
    },
    currentWeightKg: {
      type: Number,
      required: true,
      min: 1,
    },
    desiredWeightKg: {
      type: Number,
      required: true,
      min: 1,
    },
    bloodGroup: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

export default UserProfile;
