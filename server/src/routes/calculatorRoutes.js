import { Router } from "express";
import {
  calculatePublicCalories,
  getMyCalories,
} from "../controllers/calculatorController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const calculatorRouter = Router();

/**
 * @swagger
 * /api/calculator:
 *   post:
 *     summary: Calculate daily calories and restricted foods
 *     tags: [Calculator]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - heightCm
 *               - age
 *               - currentWeightKg
 *               - desiredWeightKg
 *               - bloodGroup
 *             properties:
 *               heightCm:
 *                 type: number
 *                 example: 165
 *               age:
 *                 type: integer
 *                 example: 30
 *               currentWeightKg:
 *                 type: number
 *                 example: 70
 *               desiredWeightKg:
 *                 type: number
 *                 example: 60
 *               bloodGroup:
 *                 type: integer
 *                 enum: [1, 2, 3, 4]
 *                 example: 1
 *     responses:
 *       200:
 *         description: Daily calorie target and restricted foods returned
 *       400:
 *         description: Invalid profile information
 */
calculatorRouter.post("/", calculatePublicCalories);

/**
 * @swagger
 * /api/calculator/me:
 *   get:
 *     summary: Get the logged-in user's calorie target and restricted foods
 *     tags: [Calculator]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Calorie target, restricted foods, and saved profile returned
 *       401:
 *         description: Missing or invalid authentication token
 *       404:
 *         description: Profile not found
 */
calculatorRouter.get("/me", authMiddleware, getMyCalories);

export default calculatorRouter;
