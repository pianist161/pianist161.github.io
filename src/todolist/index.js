const input = document.querySelector("input");
const button = document.querySelector("button");
const mainDiv = document.querySelector(".mainDiv");
const tasks = [];
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    button.click();
  }
});
button.addEventListener("click", () => {
  mainDiv.textContent = "";
  addTask(input.value);
  displayTasks(tasks);
  input.value = "";
});
const addTask = (task) => {
  if (task !== "") {
    tasks.push(task);
  }
};
const displayTasks = (tasks) => {
  mainDiv.textContent = "";
  tasks.forEach((element, index) => {
    const task = document.createElement("div");
    task.classList.add("task");
    const removebutton = document.createElement("button");
    removebutton.textContent = "X";
    task.textContent = `${element}`;
    removebutton.addEventListener("click", () => removeTask(index));
    task.append(removebutton);
    mainDiv.append(task);
  });
};
const removeTask = (taskid) => {
  tasks.splice(taskid, 1);
  displayTasks(tasks);
};
