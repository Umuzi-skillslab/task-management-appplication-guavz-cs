import { Task, SubTask, taskList, addTask, findTaskByTitle, updateTaskPriority, getTaskDetails, mergeTasks, countCompletedTasks, calculateAveragePriority, getHighPriorityTasks, TaskManager, resetTasks } from './app.js';

import { isHighPriority, generateRandomId, formatTaskName } from './utils.js';

beforeEach(() => {
    resetTasks();
});

describe("Task class", () => {
    test("creates a task with all expected properties, including a unique id", () => {
        const task = new Task("Test Task", "Description", 3);
        expect(task.title).toBe("Test Task");
        expect(task.description).toBe("Description");
        expect(task.priority).toBe(3);
        expect(task.completed).toBe(false);
        expect(typeof task.id).toBe("number");
    });

    test("toggleCompletion flips the completed flag both ways", () => {
        const task = new Task("Test Task", "Description", 1);
        expect(task.completed).toBe(false);
        expect(task.toggleCompletion()).toBe(true);
        expect(task.completed).toBe(true);
        expect(task.toggleCompletion()).toBe(false);
        expect(task.completed).toBe(false);
    });

    test("getInfo returns a formatted string via template literals", () => {
        const task = new Task("Buy milk", "From the shop", 2);
        expect(task.getInfo()).toBe("Task: Buy milk - Priority: 2");
    });

    test("throws when constructed with an invalid title", () => {
        expect(() => new Task("", "desc", 1)).toThrow(TypeError);
        expect(() => new Task(123, "desc", 1)).toThrow(TypeError);
    });
});


describe('Task Functions', () => {
    test("addTask adds a new task to taskList", () => {
        const task = addTask("New Task", "Test", 2);
        expect(task).toBeDefined();
        expect(taskList).toHaveLength(1);
        expect(taskList[0].title).toBe("New Task");
    });

    test("addTask rejects an invalid title (error handling)", () => {
        const result = addTask(123, "Test", 2);
        expect(result).toBeNull();
        expect(taskList).toHaveLength(0);
    });

    test("addTask rejects an out-of-range priority (error handling)", () => {
        const result = addTask("Valid title", "Test", 99);
        expect(result).toBeNull();
    });

    test("findTaskByTitle finds an existing task", () => {
        addTask("Find me", "desc", 1);
        const found = findTaskByTitle("Find me");
        expect(found).toBeDefined();
        expect(found.title).toBe("Find me");
    });

    test("findTaskByTitle returns undefined for a title that doesn't exist", () => {
        expect(findTaskByTitle("Nope")).toBeUndefined();
    });

    test("updates the priority of an existing task", () => {
        const task = addTask("Task", "desc", 1);
        const result = updateTaskPriority(task.id, 3);
        expect(result).toBe(true);
        expect(task.priority).toBe(3);
    });

    test("returns false for a non-existent task id", () => {
        expect(updateTaskPriority(99999, 3)).toBe(false);
    });

    // Missing: test for calculateAveragePriority
    // Missing: test for error handling
});

describe('Array Operations', () => {
    test("mergeTasks combines two arrays using the spread operator", () => {
        const listA = [new Task("A", "", 1)];
        const listB = [new Task("B", "", 2)];
        const merged = mergeTasks(listA, listB);
        expect(merged).toHaveLength(2);
        expect(merged[0].title).toBe("A");
        expect(merged[1].title).toBe("B");
    });

    test("getHighPriorityTasks filters correctly", () => {
        const tasks = [
        new Task("Low", "", 1),
        new Task("High", "", 3),
        ];
        const result = getHighPriorityTasks(tasks, 2);
        expect(result).toHaveLength(1);
        expect(result[0].title).toBe("High");
    });

    test("counts completed tasks correctly", () => {
        const tasks = [new Task("A", "", 1), new Task("B", "", 2), new Task("C", "", 3)];
        tasks[0].toggleCompletion();
        tasks[2].toggleCompletion();
        expect(countCompletedTasks(tasks)).toBe(2);
    });

    test("edge case: returns 0 for an empty array instead of recursing forever", () => {
        expect(countCompletedTasks([])).toBe(0);
    });

    test("edge case: returns 0 for null/undefined input", () => {
        expect(countCompletedTasks(null)).toBe(0);
        expect(countCompletedTasks(undefined)).toBe(0);
    });
});

describe("SubTask inheritance", () => {
    test("SubTask is an instance of both SubTask and Task", () => {
        const parent = new Task("Parent", "desc", 2);
        const sub = new SubTask("Child", "desc", 1, parent);
        expect(sub).toBeInstanceOf(SubTask);
        expect(sub).toBeInstanceOf(Task); 
        expect(sub.parentTask).toBe(parent);
        expect(sub.title).toBe("Child");
    });

    test("SubTask.getInfo overrides Task.getInfo and includes the parent", () => {
        const parent = new Task("Parent", "desc", 2);
        const sub = new SubTask("Child", "desc", 1, parent);
        expect(sub.getInfo()).toContain("Subtask of: Parent");
    });
});

describe("Destructuring / getTaskDetails", () => {
    test("getTaskDetails returns a plain object with the right fields", () => {
        const task = new Task("Title", "Desc", 2);
        const details = getTaskDetails(task);
        expect(details).toEqual({
        title: "Title",
        description: "Desc",
        priority: 2,
        completed: false,
        });
    });
});


describe("utils.js helpers", () => {
    test("isHighPriority returns a real boolean, not a string", () => {
        const highTask = { priority: "high" };
        const lowTask = { priority: "low" };
        expect(isHighPriority(highTask)).toBe(true);
        expect(isHighPriority(lowTask)).toBe(false);
    });

    test("generateRandomId returns an integer", () => {
        const id = generateRandomId();
        expect(Number.isInteger(id)).toBe(true);
    });

    test("formatTaskName trims and capitalizes", () => {
        expect(formatTaskName("  buy milk  ")).toBe("Buy milk");
        expect(formatTaskName("")).toBe("");
    });
});
