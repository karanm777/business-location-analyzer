import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import analysisRoutes from "./routes/analysis.routes.js";
import errorMiddleware, { notFoundMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*"
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Business Location Analyzer API is running"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api", analysisRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
