import { now } from "mongoose";
import Task from "../models/Task.js";

export const getAll = async (req, res) => {
  try {
    const { filter = "today" } = req.query;
    const now = new Date();
    let startDate;
    switch (filter) {
      case "today": {
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // 2025-10-08
        break;
      }
      case "week": {
        const mondayDate =
          now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
        startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
        break;
      }
      case "month": {
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      }
      case "all":
      default: {
        startDate = null;
      }
    }
    const query = startDate ? { createdAt: { $gte: startDate } } : {};
    const result = await Task.aggregate([
      { $match: query },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completedCount: [
            { $match: { status: "completed" } },
            { $count: "count" },
          ],
        },
      },
    ]);
    const tasks = result[0].tasks;
    const activeCount = result[0].activeCount[0]?.count || 0;
    const completedCount = result[0].completedCount[0]?.count || 0;
    res.status(200).json({ tasks, activeCount, completedCount });
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({ mesage: "loi he thong" });
  }
};
export const addTask = async (req, res) => {
  console.log("da vao ham add");

  try {
    const { title } = req.body;
    const task = new Task({ title });
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({ mesage: "loi he thong" });
  }
};
export const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const updateTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        completedAt,
      },
      { new: true }
    );
    if (!updateTask) {
      res.status(400).json({ mesage: "task khong ton tai!" });
    }
    res.status(201).json(updateTask);
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({ mesage: "loi he thong" });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(400).json({ mesage: "task khong ton tai!" });
    }
    res.status(201).json({ mesage: "delete succes" });
  } catch (error) {
    console.log("error : ", error);
    res.status(500).json({ mesage: "loi he thong" });
  }
};
