const todos = [
  { id: 1, text: "Learn full-stack basics", done: false }
];

export function getTodos() {
  return todos;
}

export function addTodo(text) {
  const nextId = todos.length ? todos[todos.length - 1].id + 1 : 1;
  const todo = { id: nextId, text, done: false };
  todos.push(todo);
  return todo;
}

export function toggleTodo(id) {
  const todo = todos.find((item) => item.id === id);
  if (!todo) return null;
  todo.done = !todo.done;
  return todo;
}

export function deleteTodo(id) {
  const index = todos.findIndex((item) => item.id === id);
  if (index === -1) return null;
  return todos.splice(index, 1)[0];
}
