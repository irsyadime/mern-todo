const express = require("express");
const router = express.Router();
const {
  getAllTodo,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

router.get("/", getAllTodo);
router.post("/", createTodo);
router.get("/:id", getTodoById);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
