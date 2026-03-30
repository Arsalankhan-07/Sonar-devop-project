import { useEffect, useState } from "react";
import { createTodo, deleteTodo, fetchTodos, toggleTodo } from "./api";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    try {
      setLoading(true);
      setTodos(await fetchTodos());
    } catch (err) {
      setError("Could not load todos.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!text.trim()) return;

    try {
      const todo = await createTodo(text.trim());
      setTodos([...todos, todo]);
      setText("");
    } catch (err) {
      setError("Unable to add todo.");
    }
  }

  async function handleToggle(id) {
    try {
      await toggleTodo(id);
      setTodos(todos.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
    } catch (err) {
      setError("Unable to update todo.");
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((item) => item.id !== id));
    } catch (err) {
      setError("Unable to delete todo.");
    }
  }

  return (
    <main className="app-shell">
      <section className="card">
        <h1>Devop Full Stack Todo</h1>
        <form onSubmit={handleSubmit} className="todo-form">
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Add a new task"
          />
          <button type="submit">Add</button>
        </form>

        {error && <p className="error">{error}</p>}

        {loading ? (
          <p>Loading todos...</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className={todo.done ? "done" : "pending"}>
                <span>{todo.text}</span>
                <div className="actions">
                  <button onClick={() => handleToggle(todo.id)}>
                    {todo.done ? "Undo" : "Done"}
                  </button>
                  <button className="delete" onClick={() => handleDelete(todo.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
