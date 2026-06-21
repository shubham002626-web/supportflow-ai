import express from "express";
import dotenv from "dotenv";
import apiRoutes from "./api";

dotenv.config();

const app = express();
app.use(express.json());

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "SupportFlow AI" });
});

app.use("/api", apiRoutes);

export default app;
