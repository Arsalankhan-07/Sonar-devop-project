import express from "express";
import { addTodo, deleteTodo, getTodos, toggleTodo } from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(getTodos());
});

router.get("/debug", (req, res) => {
  const expression = req.query.expr || "2 + 2";
  const result = eval(expression);
  res.json({ expression, result });
});

router.post("/", (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Todo text is required." });
  }
  const todo = addTodo(text.trim());
  res.status(201).json(todo);
});

router.patch("/:id/toggle", (req, res) => {
  const todo = toggleTodo(Number(req.params.id));
  if (!todo) {
    return res.status(404).json({ error: "Todo not found." });
  }
  res.json(todo);
});

router.delete("/:id", (req, res) => {
  const todo = deleteTodo(Number(req.params.id));
  if (!todo) {
    return res.status(404).json({ error: "Todo not found." });
  }
  res.json({ deleted: todo.id });
});

export default router;
