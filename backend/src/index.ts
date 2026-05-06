import express from "express";
import cors from "cors";
import "dotenv/config";
import job from "./lib/cron";

import authRoutes from "./routes/authRoutes";
import appointmentRoutes from "./routes/appointmentRoutes";

import { connectDB } from "./lib/db";

const app = express();
const PORT = process.env.PORT || 3000;

job.start();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
