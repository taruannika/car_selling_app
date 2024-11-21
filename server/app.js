import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import { MONGO_URI } from "./utils/config.js";

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

// unknown route

// error handler

export default app;
