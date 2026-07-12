
//Fixes: changed var to const as these values are never reassigned 
export const priorities = ["low", "medium", "high"];


//This method serializes data to JSON and saves it to local storage under the key "tasks".
//Fixes: used JSON.stringify to convert the data to a string and added error handling for localStorage.setItem.
export function saveToStorage(data) {
    try {
        const serializedData = JSON.stringify(data);
        localStorage.setItem("tasks", serializedData);
        return true;
    } catch (error) {
        console.error("Failed to save data to storage:", error.message);
        return false;
    }
}

//This method retrieves the tasks from local storage and returns them as an array of objects
//Fixes: used JSON.parse to convert the string back to an array of objects and added error handling for invalid JSON data.
export function loadFromStorage() {
    try {
        const rawData = localStorage.getItem("tasks");
        if (rawData === null || typeof rawData !== "string")  {
            return [];
        }
        return JSON.parse(rawData);
    } catch (error) {
        console.error("Failed to load data from storage:", error.message);
        return [];
    }
}

//This method returns a random integer ID between 0 and 999,999.
//Fixes: used Math.random() which returns a decimal with Math.floor to get an integer
export function generateRandomId() {
    return Math.floor(Math.random() * 1_000_000);
}

//This method formats the task name by capitalizing the first letter and trimming whitespace
export function formatTaskName(name) {
    if (typeof name !== "string" || name.trim().length === 0) {
        throw new TypeError("This method expects a non-empty string");
    }
    const trimmedName = name.trim();
    return `${trimmedName.charAt(0).toUpperCase()}${trimmedName.slice(1)}`;
}


//This method returns a true value if the task has a "high" priority
//Fixes: replaced == with === for a strict comparison and returned a proper boolean value instead of a string.
export function isHighPriority(task) {
    if (!task || typeof task.priority !== "string") {
        throw new TypeError("This method expects a task object with a string priority.");
    }
    return task.priority === "high";
}

