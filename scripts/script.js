const input = document.querySelector("#input-one");
const addBtn = document.querySelector("#add-btn");
const todoList = document.querySelector(".list-group");
const clearBtn = document.querySelector("#clearButton");
const filterInput = document.querySelector("#search-input");

document.addEventListener("DOMContentLoaded", init);

function init() {
  loadTodos();
  addEventListeners();
}

function addEventListeners() {
  addBtn.addEventListener("click", addTodo);
  todoList.addEventListener("click", deleteTodo);
  clearBtn.addEventListener("click", clearTodos);
  filterInput.addEventListener("keyup", filterTodos);

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodo();
  });
}

function getTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

function setTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo() {
  const text = input.value.trim();

  if (!text) {
    showAlert("Lütfen bir todo girin!");
    return;
  }

  const todo = {
    id: Date.now(),
    text,
    completed: false,
  };

  addTodoToUI(todo);
  const todos = getTodos();
  todos.push(todo);
  setTodos(todos);

  input.value = "";
}

function addTodoToUI(todo) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";

  li.innerHTML = `
    <span>${todo.text}</span>
    <a href="#" class="delete-item">
      <i class="fa fa-remove"></i>
    </a>
  `;

  li.dataset.id = todo.id;
  todoList.appendChild(li);
}

function loadTodos() {
  const todos = getTodos();
  todos.forEach(addTodoToUI);
}

function deleteTodo(e) {
  if (!e.target.classList.contains("fa-remove")) return;

  const li = e.target.closest("li");
  const id = Number(li.dataset.id);

  li.remove();

  let todos = getTodos();
  todos = todos.filter(todo => todo.id !== id);
  setTodos(todos);
}

function clearTodos() {
  todoList.innerHTML = "";
  setTodos([]);
}

function filterTodos(e) {
  const value = e.target.value.toLowerCase().trim();

  document.querySelectorAll(".list-group-item").forEach((li) => {

    const todoText = li.querySelector("span").textContent.toLowerCase();

    if (todoText.includes(value)) {
      li.classList.remove("d-none");
    } else {
      li.classList.add("d-none");
    }

  });
}

function showAlert(message) {
  const div = document.createElement("div");
  div.className = "alert alert-warning";
  div.textContent = message;

  document.querySelector(".card-body").appendChild(div);

  setTimeout(() => div.remove(), 500);
}