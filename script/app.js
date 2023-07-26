const todolistForm = document.querySelector("#todolist-form");
const todolistInput = document.querySelector("#todolist-input");
const todolistTaskContainer = document.querySelector("#todolist-taskcontainer");
const clearInputBtn = document.querySelector("#clear-input");

todolistForm.addEventListener("submit", createTask);

const TASKLIST = [];

function createTask(e) {
  e.preventDefault();
  if (todolistInput.value.trim().length > 0) {
    const date = new Date();
    const taskData = {
      taskName: todolistInput.value,
      taskDate: addZeroToTime(date.getDate()),
      taskHour: addZeroToTime(date.getHours()),
      taskMinute: addZeroToTime(date.getMinutes()),
      taskMonth: addZeroToTime(date.getMonth() + 1),
      taskYear: date.getFullYear(),
      taskCompleted: false,
    };
    TASKLIST.unshift(taskData);
    clearInput(todolistInput);
    renderTasks();
  }
}

function renderTasks() {
  while (todolistTaskContainer.firstChild) {
    todolistTaskContainer.removeChild(todolistTaskContainer.firstChild);
  }
  TASKLIST.map((todo, index) => {
    const div = document.createElement("div");
    div.className = "todolist__item";
    div.setAttribute("data-order-number", index);
    div.innerHTML = `
      <strong style="${todo.taskCompleted ? "color:red" : "color:black;"}">${
      todo.taskName
    }</strong>
      <div class="todolist__actions">
        <button class="todolist-btn complete"> <i class="fas fa-check-circle"></i> Complete</button>
        <button class="todolist-btn edit"> <i class="fas fa-edit"></i>  Edit</button>
        <button class="todolist-btn time"> <div class="additonal__time">${
          todo.taskDate
        }/${todo.taskMonth}/${
      todo.taskYear
    }</div> <i class="fas fa-clock"></i> ${todo.taskHour} : ${
      todo.taskMinute
    }</button>
        <button class="todolist-btn delete"> <i class="fas fa-trash"></i> Delete</button>
      </div>
    `;
    todolistTaskContainer.appendChild(div);
  });
}

todolistTaskContainer.addEventListener("click", (e) => {
  let taskIndex = +e.target.parentElement.parentElement.dataset.orderNumber;
  if (e.target.classList.contains("complete")) {
    TASKLIST[taskIndex].taskCompleted = !TASKLIST[taskIndex].taskCompleted;
    renderTasks();
  } else if (e.target.classList.contains("delete")) {
    TASKLIST.splice(taskIndex, 1);
    renderTasks();
  }
});

clearInputBtn.addEventListener("click", () => {
  clearInput(todolistInput);
});

function clearInput(inp) {
  inp.value = "";
}

function addZeroToTime(time) {
  return String(time).padStart(2, "0");
}
