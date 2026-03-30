const API_BASE = "http://localhost:4000/api/todos";

async function safeFetch(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || "API request failed");
  }
  return response.json();
}

export function fetchTodos() {
  return safeFetch(API_BASE);
}

export function createTodo(text) {
  return safeFetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
}

export function toggleTodo(id) {
  return safeFetch(`${API_BASE}/${id}/toggle`, { method: "PATCH" });
}

export function deleteTodo(id) {
  return safeFetch(`${API_BASE}/${id}`, { method: "DELETE" });
}
