import mongoose from "mongoose";
import userSchema from "../models/userSchema.js";
import taskSchema from "../models/taskSchema.js";

 const addTask = async (req, res, next) => {
  const { title, description, taskStatus, dueDate, user } = req.body;
  let existingUser;
  try {
      existingUser = await userSchema.findById(user);
  } catch (err) {
      return console.log(err);
  }
  if (!existingUser) {
      return res.status(400).json({ message: "Unable to find user by this id" });
  }
  const task = new taskSchema({
      title,
      description,
      taskStatus,
      dueDate,
      user
  });
  try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await task.save({ session });
      existingUser.tasks.push(task);
      await existingUser.save({ session });
      await session.commitTransaction();
  } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
  }
  return res.status(200).json({ task });
};

export const getAllTasks = async (req, res, next) => {
  let tasks;
  try {
      tasks = await taskSchema.find().populate("user");
  } catch (err) {
      return console.log(err);
  }
  if (!tasks) {
      return res.status(404).json({ message: "no tasks found" });
  }
  return res.status(200).json({ tasks });
};

export const getTaskById = async(req, res, next) => {
  const id = req.params.id;
  let task;
  try {
      task = await taskSchema.findById(id).populate('user');
  } catch (err) {
      return console.log(err)
  }
  if (!task) {
      return res.status(404).json({ message: "Unable to find task by this id" });
  }
  return res.status(200).json({ task });
}

export const updateTask= async (req, res, next) => {
  const { title, description, dueDate, taskStatus } = req.body;
  const taskId = req.params.id;
  let task;
  try {
      task= await taskSchema.findByIdAndUpdate(taskId, {
          title,
          description,
          taskStatus,
          dueDate
      });
  } catch (err) {
      return console.log(err);
  }
  if (!task) {
      return res.status(500).json({ message: "Unable to update task" });
  }
  return res.status(200).json({ task });
}

export const getByUserId = async (req, res, next) => {
    const userId = req.params.id;
    let userTasks;
    try {
        userTasks = await userSchema.findById(userId).populate('tasks');
    } catch (err) {
        return console.log(err);
    }
    if (!userTasks) {
        return res.status(404).json({ message: "NO TASK FOUND" });
    }
    return res.status(200).json({ user: userTasks });
}

export const deleteTask = async (req, res, next) => {
  const id = req.params.id;
  let task;
  try {
      task = await taskSchema.findByIdAndRemove(id).populate('user');
      await task.user.tasks.pull(task);
      await task.user.save();
  } catch (err) {
      return console.log(err);
  }
  if (!task) {
      return res.status(500).json({ message: "unable to delete" });
  }
  return res.status(200).json({ message: "deleted successfully" });
}

export default addTask;