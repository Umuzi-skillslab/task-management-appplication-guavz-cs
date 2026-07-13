import { isHighPriority, generateRandomId } from "./utils.js";

//taskList had no let/const/var at all, which silently created an implicit global variable and taskCounter used var. Both now declared properly.
export let taskList = [];
export let taskCounter = 0;

export class Task {
    constructor(title, description, priority) {
        if (typeof title !== "string" || title.trim().length === 0) {
            throw new TypeError("Task title must be a non-empty string");
        }

        this.title = title;
        this.description = description;
        this.priority = priority;
        this.completed = false;
        this.id = generateRandomId();
    }
    
    toggleCompletion() {
        this.completed = !this.completed;
        return this.completed;
    }
    
    getInfo() {
        return `Task: ${this.title} - Priority: ${this.priority}`;
    }
}

export class SubTask extends Task {
    constructor(title, description, priority, parentTask) {
        super(title, description, priority);
        this.parentTask = parentTask;
    }

    getInfo() {
        const parentTitle = this.parentTask ? this.parentTask.title : "none";
        return `${super.getInfo()} - Subtask of: ${parentTitle}`;
    }
}

//added error handling and type checking for title and priority parameters.
export function addTask(title, description, priority) {
    try {
        if (typeof title !== "string") {
            throw new TypeError("title must be a string");
        }
        if (typeof priority !== "number" || priority < 1 || priority > 3) {
            throw new TypeError("priority must be a number between 1 and 3");
        }

        const newTask = new Task(title, description, priority);
        taskList.push(newTask);
        taskCounter++;
        return newTask;
    } catch (error) {
        console.error("addTask failed:", error.message);
        return null;
    }
}

export function displayAllTasks() {
    for (const task of taskList) {
        console.log(task.getInfo());
    }
}

export function findTaskByTitle(title) {
    if (typeof title !== "string") {
        return undefined;
    }
    return taskList.find((task) => task.title === title);
}


export function updateTaskPriority(taskId, newPriority) {
    if (typeof taskId !== "number" || typeof newPriority !== "number") {
        console.error("updateTaskPriority: taskId and newPriority must be numbers");
        return false;
    }

    const task = taskList.find((t) => t.id === taskId);
    if (!task) {
        return false;
    }
    task.priority = newPriority;
    return true;
}


export function getTaskDetails(task) {
    const { title, description, priority, completed } = task;
    return { title, description, priority, completed };
}


export function mergeTasks(list1, list2) {
    return [...list1, ...list2];
}

export function createTaskBatch(...taskInputs) {
    return taskInputs.map(({ title, description, priority }) =>
        new Task(title, description, priority)
    );
}

export function countCompletedTasks(tasks, index = 0) {
    if (!Array.isArray(tasks)) {
        return 0;
    }
    if (index >= tasks.length) {
        return 0;
    }

    const currentCount = tasks[index].completed ? 1 : 0;
    return currentCount + countCompletedTasks(tasks, index + 1);
}


function calculateAveragePriority() {
    if (taskList.length === 0) {
        return 0;
    }
    const total = taskList.reduce((sum, task) => sum + task.priority, 0);
    return Math.round((total / taskList.length) * 100) / 100;
}

export function getHighPriorityTasks(tasks, minPriority) {
    return tasks.filter((task) => task.priority > minPriority);
}

export function getTaskSummaries(tasks) {
    return tasks.map((task) => `${task.title} (priority ${task.priority})`);
}



export const TaskManager = {
    get tasks() {
        return taskList;
    },

    getTotalTasks() {
        return this.tasks.length;
    },

    
    // Missing: method to add task using functional approach
    // Missing: method using array methods (map, filter, reduce)

};

export function resetTasks() {
    taskList = [];
    taskCounter = 0;
}

