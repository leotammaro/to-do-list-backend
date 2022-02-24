const { Schema, model } = require("mongoose");

const tasksSchema = new Schema({
  content: String,
  uidUser: String,
  status: String,
});

const Task = model("Task", tasksSchema);

module.exports = Task;
