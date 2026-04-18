import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import connectDB from "./utils/db.js";
import cookieParser from "cookie-parser";
import roomRoutes from "./routes/room.route.js";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
const PORT = process.env.PORT || 5004;

app.use(
  cors({
    origin: `http://localhost:${PORT}`,
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
