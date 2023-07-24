import express from "express";
import  addTask, { deleteTask, getAllTasks, getTaskById, updateTask, getByUserId }  from "../controllers/taskController.js";
const router1 = express.Router();

router1.get("/", getAllTasks);
router1.post("/add", addTask);
router1.get("/:id", getTaskById);
router1.put("/update/:id",updateTask);
router1.delete("/delete/:id", deleteTask);
router1.get("/user/:id", getByUserId);
export default router1;