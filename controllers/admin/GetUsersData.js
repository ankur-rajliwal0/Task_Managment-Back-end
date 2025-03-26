const User = require("../../models/User.js");
const Task = require("../../models/Task.js");

async function GetUserforAdmin(req, res) {
  try {
    const tasks = await Task.find().populate("user"); // Populate user details if referenced

    return res.status(200).json({
      message: "Users data retrieved successfully",
      tasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving data",
      error: error.message,
    });
  }
}

module.exports = GetUserforAdmin;
