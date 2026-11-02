import { Router } from "express";
import { getProfile, saveProfile } from "../controllers/profileController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const profileRouter = Router();

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get the authenticated user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     profile:
 *                       type: object
 *                       properties:
 *                         heightCm:
 *                           type: number
 *                           example: 165
 *                         age:
 *                           type: integer
 *                           example: 30
 *                         currentWeightKg:
 *                           type: number
 *                           example: 70
 *                         desiredWeightKg:
 *                           type: number
 *                           example: 60
 *                         bloodGroup:
 *                           type: integer
 *                           example: 1
 *       401:
 *         description: Missing or invalid authentication token
 *       404:
 *         description: Profile not found
 *       500:
 *         description: Failed to retrieve profile
 */
profileRouter.get("/", authMiddleware, getProfile);

/**
 * @swagger
 * /api/profile:
 *   put:
 *     summary: Create or update the authenticated user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
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
 *         description: Profile saved successfully
 *       400:
 *         description: Invalid profile information
 *       401:
 *         description: Missing or invalid authentication token
 *       500:
 *         description: Failed to save profile
 */
profileRouter.put("/", authMiddleware, saveProfile);

export default profileRouter;
