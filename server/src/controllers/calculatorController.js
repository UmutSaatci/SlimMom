import Product from "../models/Product.js";
import UserProfile from "../models/UserProfile.js";

const calculateDailyCalories = ({
  currentWeightKg,
  heightCm,
  age,
  desiredWeightKg,
}) => {
  return Math.round(
    10 * currentWeightKg +
      6.25 * heightCm -
      5 * age -
      161 -
      10 * (currentWeightKg - desiredWeightKg),
  );
};

const getRestrictedProducts = async (bloodGroup) => {
  return Product.find({
    [`groupBloodNotAllowed.${bloodGroup}`]: true,
  })
    .select("title categories weight calories")
    .sort({ title: 1 })
    .lean();
};

const validateProfileData = (data) => {
  const { heightCm, age, currentWeightKg, desiredWeightKg, bloodGroup } = data;

  return (
    Number.isFinite(heightCm) &&
    heightCm > 0 &&
    Number.isInteger(age) &&
    age > 0 &&
    Number.isFinite(currentWeightKg) &&
    currentWeightKg > 0 &&
    Number.isFinite(desiredWeightKg) &&
    desiredWeightKg > 0 &&
    Number.isInteger(bloodGroup) &&
    [1, 2, 3, 4].includes(bloodGroup)
  );
};

// Public endpoint: calculate using submitted profile data.
export const calculatePublicCalories = async (req, res, next) => {
  try {
    const profileData = {
      heightCm: Number(req.body.heightCm),
      age: Number(req.body.age),
      currentWeightKg: Number(req.body.currentWeightKg),
      desiredWeightKg: Number(req.body.desiredWeightKg),
      bloodGroup: Number(req.body.bloodGroup),
    };

    if (!validateProfileData(profileData)) {
      return res.status(400).json({
        status: "error",
        message: "Please provide valid profile information.",
      });
    }

    const dailyCalories = calculateDailyCalories(profileData);
    const restrictedProducts = await getRestrictedProducts(
      profileData.bloodGroup,
    );

    return res.status(200).json({
      status: "success",
      data: {
        dailyCalories,
        restrictedProducts,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Private endpoint: calculate using the logged-in user's saved profile.
export const getMyCalories = async (req, res, next) => {
  try {
    const profile = await UserProfile.findOne({
      userId: req.user.userId,
    }).lean();

    if (!profile) {
      return res.status(404).json({
        status: "error",
        message: "Profile not found.",
      });
    }

    const dailyCalories = calculateDailyCalories(profile);
    const restrictedProducts = await getRestrictedProducts(profile.bloodGroup);

    return res.status(200).json({
      status: "success",
      data: {
        dailyCalories,
        restrictedProducts,
        profile,
      },
    });
  } catch (error) {
    next(error);
  }
};
