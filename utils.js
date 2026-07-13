
//changed var to const, priorities is never reassigned
export const priorities = ["low", "medium", "high"];

//original code passed the raw object straight to the localStorage.setItem but localStorage can only store strings, so we need to serialize the object to a string using JSON.stringify before saving it to localStorage.
export function saveToStorage(data) {
    try{
        const serializedData = JSON.stringify(data);
        localStorage.setItem("tasks", serializedData);
        return true;
    } catch (error) {
        console.error(`Failed to save to storage:`, error.message);
        return false;
    }
}

//original code returned the raw string from localStorage.getItem, but we need to parse the string back into an object using JSON.parse before returning it.
export function loadFromStorage() {
    try{
        const data = localStorage.getItem("tasks");
        if (data === null) {
            return null; 
        }
        return JSON.parse(data);
    } catch (error) {
        console.error(`Failed to load from storage:`, error.message);
        return null;
    }
}

//Math.random() alone returns a decimal, multiplying and flooring turns it into a usable integer ID.
export function generateRandomId() {
    return Math.floor(Math.random() * 1_000_000);
}

//original code just returned the input unchanged, now it trims whitespace and capitalizes the first letter for better formatting.
export function formatTaskName(name) {
    if (typeof name !== "string" || name.trim().length === 0) {
        return "";
    }
    const trimmed = name.trim();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

//used strict equality and a boolean as returning a string yes or no is not as useful as returning a boolean for checking priority.
export function isHighPriority(task) {
    return task?.priority === "high";
}


