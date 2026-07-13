import { saveToStorage, loadFromStorage, formatTaskName } from "./utils.js";
import { taskList, addTask, getTaskSummaries, TaskManager } from "./app.js";

// Wires up every interactive element on the page: adding tasks (click and
// Enter-key), toggling/deleting tasks via delegation, and clearing completed
// tasks. Bails out early if the required elements aren't on the page.
export function setupEventListeners() {
    const addButton = document.querySelector(".add-task-btn");
    const titleInput = document.querySelector("#title");
    const descInput = document.querySelector("#description");
    const taskListContainer = document.querySelector("#task-list");

    if (!addButton || !taskListContainer) {
        console.error("setupEventListeners: required DOM elements not found");
        return;
    }

    addButton.addEventListener("click", handleAddTask);

    const enterSubmitInputs = [titleInput, descInput];
    for (const input of enterSubmitInputs) {
        if (input) {
            input.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    handleAddTask();
                }
            });
        }
    }

    taskListContainer.addEventListener("click", handleTaskClick);

    const clearButton = document.querySelector(".clear-completed-btn");
    if (clearButton) {
        clearButton.addEventListener("click", handleClearCompleted);
    }
}

// Reads the form inputs, validates/formats them, and hands off to addTask().
// Re-renders and clears the inputs only if the task was actually created.
function handleAddTask() {
    const titleInput = document.querySelector("#title");
    const descInput = document.querySelector("#description");
    const priorityInput = document.querySelector("#priority");

    if (!titleInput || !descInput) {
        return;
    }

    const title = formatTaskName(titleInput.value);
    const description = descInput.value.trim();
    
    const priority = priorityInput ? Number(priorityInput.value) : 1;

    if (!title) {
        console.error("Please enter a task title.");
        return;
    }

    const newTask = addTask(title, description, priority);
    if (!newTask) {
        return; 
    }

    persistTasks();
    displayTasks();

    titleInput.value = "";
    descInput.value = "";
}

export function displayTasks() {
    const container = document.querySelector("#task-list");
    if (!container) {
        console.error("displayTasks: #task-list not found in the DOM");
        return;
    }

    container.innerHTML = "";

    const html = taskList
        .map(
        (task) => `
        <div class="task" data-task-id="${task.id}">
            <h3>${task.title}${task.completed ? " ✓" : ""}</h3>
            <p>${task.description}</p>
            <button class="toggle-btn" data-task-id="${task.id}">
            ${task.completed ? "Mark incomplete" : "Mark complete"}
            </button>
            <button class="delete-btn" data-task-id="${task.id}">Delete</button>
        </div>`
        )
        .join("");

    container.insertAdjacentHTML("beforeend", html);

    renderStatistics();
}

// Handles clicks anywhere inside the task list container. closest() finds
// the button that was actually clicked (or its child), so it doesn't matter
// which element inside the button received the click event.
export function handleTaskClick(event) {
    const button = event.target.closest("button[data-task-id]");
    if (!button) {
        return; 
    }

    const taskId = Number(button.dataset.taskId);
    const task = taskList.find((t) => t.id === taskId);
    if (!task) {
        return;
    }

    if (button.classList.contains("toggle-btn")) {
        task.toggleCompletion();
    } else if (button.classList.contains("delete-btn")) {
        const index = taskList.indexOf(task);
        taskList.splice(index, 1);
    }

    persistTasks();
    displayTasks();
}

function handleClearCompleted() {
    const stillIncomplete = taskList.filter((task) => !task.completed);
    taskList.length = 0;
    taskList.push(...stillIncomplete);
    persistTasks();
    displayTasks();
}

function renderStatistics() {
    const statsContainer = document.querySelector(".statistics");
    if (!statsContainer) {
        return;
    }
    const total = TaskManager.getTotalTasks();
    const completed = TaskManager.getCompletedCount();
    statsContainer.innerHTML = `<p>${completed} of ${total} tasks completed</p>`;
}


function persistTasks() {
    saveToStorage(getTaskSummaries(taskList));
}

export function loadPersistedTasks() {
    return loadFromStorage();
}


document.addEventListener("DOMContentLoaded", () => {
    setupEventListeners();
    displayTasks();
});
