const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

todoButton.addEventListener("click", function (e) {
  e.preventDefault();

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //add todo to local storage
  saveLocal(todoInput.value, 0);

  const checkmark = document.createElement("button");
  checkmark.innerHTML = "<i class='fas fa-check'></i>";
  checkmark.classList.add("complete-btn");
  todoDiv.appendChild(checkmark);

  const trash = document.createElement("button");
  trash.innerHTML = "<i class='fas fa-trash'></i>";
  trash.classList.add("delete-btn");
  todoDiv.appendChild(trash);

  todoList.appendChild(todoDiv);

  todoInput.value = "";
});

todoList.addEventListener("click", function (e) {
  const item = e.target;

  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function (e) {
      todo.remove();
    });
  } else if (item.classList[0] === "complete-btn") {
    let todo = item.parentElement;
    todo.classList.toggle("completed");
    let todoText = todo.children[0].innerText;

    var todos;
    todos = JSON.parse(localStorage.getItem("todos"));

    for(let i = 0; i < todos.length; i++) {
      if(todos[i]["text"] == todoText) {
        todos[i]["completed"] = 1;
      }
    }
  }
  localStorage.setItem("todos", JSON.stringify(todos));

});

filterOption.addEventListener("click", function (e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
});

function saveLocal(text, completed) {
  //check if I already have something in local storage

  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push({text: `${text}`, completed: `${completed}`});
  localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener("DOMContentLoaded", getTodos);

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    if(todo.completed == 1) {
      todoDiv.classList.add("completed")
    }

    const newTodo = document.createElement("li");
    newTodo.innerText = todo.text;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const checkmark = document.createElement("button");
    checkmark.innerHTML = "<i class='fas fa-check'></i>";
    checkmark.classList.add("complete-btn");
    todoDiv.appendChild(checkmark);

    const trash = document.createElement("button");
    trash.innerHTML = "<i class='fas fa-trash'></i>";
    trash.classList.add("delete-btn");
    todoDiv.appendChild(trash);

    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);

  localStorage.setItem("todos", JSON.stringify(todos));
}
