import express from "express";
import cors from "cors";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Only serve uploads directory in development
if (process.env.NODE_ENV !== "production") {
  app.use("/uploads", express.static("uploads"));
}

app.use("/api/students", studentRoutes);

export default app;