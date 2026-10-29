import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const authRouter = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Test User
 *               email:
 *                 type: string
 *                 format: email
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPass123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       409:
 *         description: Email is already registered
 *       400:
 *         description: Invalid user data
 */
authRouter.post("/register", registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPass123
 *     responses:
 *       200:
 *         description: Login successful; returns a JWT token
 *       401:
 *         description: Invalid email or password
 *       400:
 *         description: Invalid request data
 */
authRouter.post("/login", loginUser);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get the authenticated user's ID
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user ID returned successfully
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
 *                     userId:
 *                       type: string
 *                       example: 6ad94123fca6561e82100001
 *       401:
 *         description: Missing or invalid authentication token
 */

authRouter.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      userId: req.user.userId,
    },
  });
});

export default authRouter;
