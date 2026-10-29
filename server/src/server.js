import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectMongoDB } from "./db/connectMongoDB.js";
import authRouter from "./routes/authRoutes.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import profileRouter from "./routes/profileRoutes.js";
import productRouter from "./routes/productRoutes.js";
import calculatorRouter from "./routes/calculatorRoutes.js";
import consumedFoodRouter from "./routes/consumedFoodRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/products", productRouter);
app.use("/api/calculator", calculatorRouter);
app.use("/api/consumed-foods", consumedFoodRouter);
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "SlimMom API is running!",
  });
});

const startServer = async () => {
  await connectMongoDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
