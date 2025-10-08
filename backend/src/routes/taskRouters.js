import express from "express";
import {
  getAll,
  addTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
const router = express.Router();

export default router;
router.get("/", getAll);
router.post("/", addTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
