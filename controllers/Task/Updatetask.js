const Task = require("../../models/Task.js");
const mongoose = require("mongoose");

// Update Task API using findByIdAndUpdate
async function updateTask(req, res) {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized: User ID is missing" });
    }

    const { taskId } = req.params; // Get task ID from request params
    const { title, description, status, deadline } = req.body; // Fields to update
    const userId = req.user._id; // Authenticated user ID

    console.log("User ID:", userId);
    console.log("Updating Task ID:", taskId);

    // Validate taskId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    // Update task and ensure only the owner can update it
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $set: { title, description, status, deadline } }, // Only update provided fields
      { new: true, runValidators: true } // Return updated document and validate fields
    ).where("user").equals(userId); // Ensure the user owns the task

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }

    return res.status(200).json({ msg: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { updateTask };
