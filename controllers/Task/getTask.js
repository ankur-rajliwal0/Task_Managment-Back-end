const Task = require("../../models/Task.js");

async function getUserTasks(req, res) {
  try {
   
    if (!req.user || !req.user._id) {
      return res.status(400).json({ error: "User ID missing in request" });
    }

    const userId = req.user._id; // Get the authenticated user's ID

    // Fetch tasks that belong to the authenticated user
    const tasks = await Task.find({ user: userId });

    if (!tasks.length) {
      return res.status(404).json({ msg: "No tasks found for this user" });
    }

    return res.status(200).json({
      msg: "User tasks retrieved successfully",
      tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { getUserTasks };
