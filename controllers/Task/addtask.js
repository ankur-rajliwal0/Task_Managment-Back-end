const Task = require("../../models/Task.js");
const mongoose = require("mongoose");

async function addtask(req, res) {  
  try {
    
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized: User ID is missing" });
    }

    const { title, description, status, deadline } = req.body;
    const userId = req.user._id; 

    console.log("User ID:", userId); 

    if (!title || !description || !deadline) {
      return res.status(400).json({ msg: "Title, description, and deadline are required" });
    }

    const newTask = new Task({
      title,
      description,
      status: status || "Pending",
      deadline,
      user: userId, 
    });


    await newTask.save();

    return res.status(201).json({
      msg: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    console.error("Error adding task:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { addtask };
