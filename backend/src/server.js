import express from "express";
import taskRouters from "./routes/taskRouters.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();

// midware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// router
app.use("/api/tasks", taskRouters);
const PORT = process.env.PORT || 5001;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server đang chạy Port : ", PORT);
  });
});
