const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,    
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  deadline: {
    type: Date,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
