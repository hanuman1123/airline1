import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://jagadeesh-airline.vercel.app", // ✅ add https
];



app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);

server.listen(PORT, () => {
  console.log("Server is running on PORT: " + PORT);
  connectDB();
});
