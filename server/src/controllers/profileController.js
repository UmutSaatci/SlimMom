import UserProfile from "../models/UserProfile.js";

export const getProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({
      userId: req.user.userId,
    });

    if (!profile) {
      return res.status(404).json({
        status: "error",
        message: "Profile not found.",
      });
    }

    return res.status(200).json({
      status: "success",
      data: { profile },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to retrieve profile.",
    });
  }
};

export const saveProfile = async (req, res) => {
  try {
    const { heightCm, age, currentWeightKg, desiredWeightKg, bloodGroup } =
      req.body;

    const profile = await UserProfile.findOneAndUpdate(
      { userId: req.user.userId },
      {
        heightCm,
        age,
        currentWeightKg,
        desiredWeightKg,
        bloodGroup,
      },
      {
        returnDocument: "after",
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );

    return res.status(200).json({
      status: "success",
      message: "Profile saved successfully.",
      data: { profile },
    });
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        status: "error",
        message: "Please provide valid profile information.",
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Failed to save profile.",
    });
  }
};
