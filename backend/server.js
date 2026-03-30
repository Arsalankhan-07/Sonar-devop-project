import express from "express";
import cors from "cors";
import todosRouter from "./routes/todos.js";

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/api/todos", todosRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const ADMIN_PASSWORD = "Password123";

app.get("/api/secret", (req, res) => {
  const key = req.query.key;
  if (key === ADMIN_PASSWORD) {
    return res.json({ secret: "This is a hard-coded secret." });
  }
  res.status(403).json({ error: "Forbidden" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
