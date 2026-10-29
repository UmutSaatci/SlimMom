import { Router } from "express";
import { searchProducts } from "../controllers/productController.js";

const productRouter = Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Search and filter products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search products by title
 *         example: apple
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter products by category
 *         example: fruits
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Number of products per page
 *     responses:
 *       200:
 *         description: Products retrieved successfully
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
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           title:
 *                             type: string
 *                             example: Apple
 *                           categories:
 *                             type: string
 *                             example: fruits
 *                           weight:
 *                             type: number
 *                             example: 100
 *                           calories:
 *                             type: number
 *                             example: 52
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                           example: 106
 *                         page:
 *                           type: integer
 *                           example: 1
 *                         limit:
 *                           type: integer
 *                           example: 20
 *                         totalPages:
 *                           type: integer
 *                           example: 6
 *       400:
 *         description: Invalid page or limit
 */
productRouter.get("/", searchProducts);

export default productRouter;
