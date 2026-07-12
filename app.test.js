const { Task, addTask, findTaskByTitle, updateTaskPriority, calculateAveragePriority, mergeTasks, getHighPriorityTasks } = require('./app.js');

describe('Task Class', () => {
    test('should create a task', () => {
        const task = new Task('Test Task', 'Description', 3);
        expect(task.title).toBe('Test Task');
        expect(task.description).toBe('Description');
        expect(task.priority).toBe(3);
        expect(task.completed).toBe(false);
        expect(task.id).toBeDefined();
        expect(typeof task.id).toBe('number');

    });
    
    test("getInfo should return a template-literal formatted string", () => {
        const task = new Task("Buy groceries", "Milk and eggs", 1);
        const info = task.getInfo();
        expect(info).toContain("Buy groceries");
        expect(info).toContain("1");
        expect(typeof info).toBe("string");
    });

    test("should toggle task completion correctly", () => {
        const task = new Task("Read book", "Chapter 1", 2);
        expect(task.completed).toBe(false);
        task.toggleCompletion();
        expect(task.completed).toBe(true);
        task.toggleCompletion();
        expect(task.completed).toBe(false);
    });
});

describe('Task Functions', () => {
    // Missing: beforeEach to reset taskList
    
    test('should add task', () => {
        var task = addTask('New Task', 'Test', 2);
        // Wrong assertion - should check taskList
        expect(task).toBeDefined();
    });
    
    // Missing: test for findTaskByTitle
    // Missing: test for updateTaskPriority
    // Missing: test for calculateAveragePriority
});

describe("Error Handling", () => {
  beforeEach(() => { taskList.length = 0; });

  test("addTask should throw when title is not a string", () => {
    expect(() => addTask(null, "desc", 3)).toThrow("addTask: title is required and must be a string.");
  });

  test("addTask should throw when priority is not a number", () => {
    expect(() => addTask("Valid", "desc", "high")).toThrow("addTask: priority must be a number.");
  });

  test("calculateAveragePriority should return 0 for empty taskList (edge case)", () => {
    taskList.length = 0;
    expect(calculateAveragePriority()).toBe(0);
  });
});


describe('Array Operations', () => {
    beforeEach(() => {
        taskList.length = 0;
        addTask("Task A", "Desc A", 3);
        addTask("Task B", "Desc B", 5);
        addTask("Task C", "Desc C", 1);
    });

    test("mergeTasks should combine two arrays with spread operator", () => {
        const list1 = [new Task("M1", "", 1)];
        const list2 = [new Task("M2", "", 2)];
        const merged = mergeTasks(list1, list2);
        expect(merged.length).toBe(2);
        expect(merged[0].title).toBe("M1");
        expect(merged[1].title).toBe("M2");
    });

    test("getHighPriorityTasks should filter using Array.filter", () => {
        const high = getHighPriorityTasks(3);
        expect(Array.isArray(high)).toBe(true);
        expect(high.length).toBe(1);
        expect(high[0].title).toBe("Task B");
    });
});

describe("Recursive Function — countCompletedTasks", () => {
  test("should count completed tasks recursively", () => {
    const t1 = new Task("T1", "", 1);
    const t2 = new Task("T2", "", 2);
    const t3 = new Task("T3", "", 3);
    t1.toggleCompletion();
    t3.toggleCompletion();
    expect(countCompletedTasks([t1, t2, t3])).toBe(2);
  });

  test("should return 0 for empty array (edge case)", () => {
    expect(countCompletedTasks([])).toBe(0);
  });
});


describe("SubTask Inheritance", () => {
  test("SubTask should inherit Task properties via super()", () => {
    const sub = new SubTask("Fix bug", "Login page", 4, "Sprint 1");
    expect(sub.title).toBe("Fix bug");
    expect(sub.priority).toBe(4);
    expect(sub.completed).toBe(false);
    expect(sub.parentTask).toBe("Sprint 1");
    expect(sub.id).toBeDefined();
  });
});

describe("Destructuring and Spread Operations", () => {
  test("getTaskDetails should use object destructuring correctly", () => {
    const task = new Task("Refactor code", "Clean up", 4);
    const details = getTaskDetails(task);
    expect(details.title).toBe("Refactor code");
    expect(details.priority).toBe(4);
    expect(details.completed).toBe(false);
    expect(details.id).toBeDefined();
  });

  test("getDestructuredTask should work with destructured parameter", () => {
    const task = new Task("Deploy app", "Production", 5);
    const result = getDestructuredTask(task);
    expect(result).toContain("Deploy app");
    expect(result).toContain("5");
  });
});
