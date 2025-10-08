import express from "express";
import taskRouters from "./routes/taskRouters.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();
// midware
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}

// router
app.use("/api/tasks", taskRouters);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../fontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../fontend/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server đang chạy Port : ", PORT);
  });
});
