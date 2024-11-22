import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import { MONGO_URI } from "./utils/config.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// Connecting to mongo DB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoBD");
  })
  .catch((error) => {
    console.log("Failed connecting to MongoDB", error);
  });

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes

app.use("/api/auth", authRoutes);

// unknown route

// error handler
app.use((err, req, res, next) => {
  console.log(err);
});

export default app;
