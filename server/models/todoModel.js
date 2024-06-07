const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    todo: {
      type: String,
      required: [true, "The todo text field is required"],
    },
    status: {
      type: Boolean,
      default: false,
    },
    onProgress: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
