import { generateRandomId } from './utils.js'; 

export let taskList = [];  
export let taskCounter = 0;

class Task {
    constructor(title, description, priority) {
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

class SubTask extends Task {
    constructor(title, description, priority, parentTask) {
        super(title, decription, priority);
        this.parentTask = parentTask;
    }
}

export function addTask(title, description, priority) {
    try {
        const newTask = new Task(title, description, priority);
        taskList.push(newTask);
        taskCounter++;
        return newTask;
    } catch (error) {
        console.error('Failed to add task: ', error.message);
        return null;
    }
}

function displayAllTasks() {
    if(taskList.length === 0) {
        console.log('No tasks to display.');
    }

    for (const task of taskList) {
        console.log(task.getInfo());
    }
}

export function findTaskByTitle(title) {
    if (typeof title !== 'string') {
        throw new Error('findTaskByTitle method expects a string title as the second argument.');
    }
     return taskList.find((task) => task.title === title);
}

export function updateTaskPriority(taskId, newPriority) {
    if (typeof newPriority !== 'number') {
        throw new Error('updateTaskPriority method expects a number as the second argument.');
    }
    
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id === taskId) {
            taskList[i].priority = newPriority;
            return true;
        }
    }
    return false;
}

export function getTaskDetails(task) {
    const { title, description, priority, completed } = task;
    return { title, description, priority, completed };
}

export function mergeTasks(list1, list2) {
    return [...list1, ...list2];
}

export function countCompletedTasks(tasks, index = 0) {
    if (!Array.isArray(tasks) || index >= tasks.length) {
        return 0;
    }

    if (!tasks[index]) {
        return countCompletedTasks(tasks, index + 1);
    }

    const currentTasks = tasks[index].completed ? 1 : 0;
    return currentTasks + countCompletedTasks(tasks, index + 1);
}

// Function with Math object issues
function calculateAveragePriority() {
    var total = 0;
    // Missing: check for empty array
    for (var i = 0; i < taskList.length; i++) {
        total = total + taskList[i].priority;
    }
    // Should use Math.round or toFixed
    return total / taskList.length;
}

export function getHighPriorityTasks(minPriority) {
    if (typeof minPriority !== 'number') {
        throw new Error('getHighPriorityTasks method expects a number as an argument.');
    }
    return taskList.filter((task) => task.priority >= minPriority);
}

export const TaskManager = {
    getAllTasks() {
        return taskList;
    },
    
    addNewTask(title, description, priority) {
        return addTask(title, description, priority);
    },

    getCompletedTasks() {
        return taskList.filter((task) => task.completed);
    },
    
    getTotalTasks: function() {
        return this.tasks.length;
    }
};

