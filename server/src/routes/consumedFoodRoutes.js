import { Router } from "express";
import {
  getConsumedFoodsByDate,
  addConsumedFood,
  deleteConsumedFood,
} from "../controllers/consumedFoodController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const consumedFoodRouter = Router();

/**
 * @swagger
 * /api/consumed-foods:
 *   get:
 *     summary: Get consumed foods for a specific date
 *     tags: [Consumed Foods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Date to retrieve in YYYY-MM-DD format
 *         example: "2026-10-24"
 *     responses:
 *       200:
 *         description: Daily consumed foods retrieved successfully
 *       400:
 *         description: Invalid or missing date
 *       401:
 *         description: Missing or invalid authentication token
 */
consumedFoodRouter.get("/", authMiddleware, getConsumedFoodsByDate);

/**
 * @swagger
 * /api/consumed-foods:
 *   post:
 *     summary: Add a consumed food entry
 *     tags: [Consumed Foods]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - date
 *               - weight
 *             properties:
 *               productId:
 *                 type: string
 *                 description: MongoDB ID of the product
 *                 example: "5d51694802b2373622ff5543"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2026-10-24"
 *               weight:
 *                 type: number
 *                 description: Consumed amount in grams
 *                 example: 150
 *     responses:
 *       201:
 *         description: Consumed food added successfully
 *       400:
 *         description: Invalid consumed food data
 *       401:
 *         description: Missing or invalid authentication token
 *       404:
 *         description: Product not found
 */
consumedFoodRouter.post("/", authMiddleware, addConsumedFood);

/**
 * @swagger
 * /api/consumed-foods/{id}:
 *   delete:
 *     summary: Delete a consumed food entry
 *     tags: [Consumed Foods]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the consumed food entry
 *     responses:
 *       200:
 *         description: Consumed food deleted successfully
 *       401:
 *         description: Missing or invalid authentication token
 *       404:
 *         description: Consumed food entry not found
 */
consumedFoodRouter.delete("/:id", authMiddleware, deleteConsumedFood);

export default consumedFoodRouter;
