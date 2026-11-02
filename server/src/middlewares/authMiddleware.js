import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: "error",
      message: "Authentication required.",
    });
  }

  const token = authHeader.split(" ")[1];

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Invalid or expired token.",
    });
  }

  try {
    const user = await User.findById(decoded.userId).select("tokenVersion");

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "User not found.",
      });
    }

    const tokenVersion = decoded.tokenVersion ?? 0;
    const currentTokenVersion = user.tokenVersion ?? 0;

    if (tokenVersion !== currentTokenVersion) {
      return res.status(401).json({
        status: "error",
        message: "Token has been revoked.",
      });
    }

    req.user = { userId: decoded.userId };

    next();
  } catch (error) {
    console.error("Authentication error:", error.message);

    return res.status(500).json({
      status: "error",
      message: "Authentication failed.",
    });
  }
};
