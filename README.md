[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=24124904&assignment_repo_type=AssignmentRepo)
# Task Manager - Capstone 2 

## Overview

The app lets you add tasks with a title, description and priority, mark
them complete, delete them, and see a running completed/total count. Data
persists to `localStorage` so tasks survive a page refresh. The codebase
is split into the following ES6 modules including a testing module:

- `utils.js` — small helpers (storage, id generation, priority checks)
- `app.js` — task-management logic and the `TaskManager` object
- `dom.js` — all browser/DOM code; the only file that touches `document`
-`app.test.js`- all jest testing functions

## Fixes Implemented

- **Variables & operators**: all `var` replaced with `let`/`const`; the
  implicit global `taskList` now has a proper `let` declaration; every
  `==` and stray `=` inside a condition replaced with `===`.
- **Control flow**: fixed the off-by-one `for` loop and the infinite
  `while` loop; added a real base case to the recursive
  `countCompletedTasks`; guarded `calculateAveragePriority` against an
  empty array; wrapped DOM setup in `DOMContentLoaded`.
- **Functions & functional programming**: added the missing `title`
  parameter to `findTaskByTitle`; replaced manual loops with `map`,
  `filter`, `reduce`, `find`, `some`, and `every`; added a higher-order
  function.
- **OOP**: `Task` now has an `id` and `toggleCompletion()`; `SubTask`
  correctly calls `super()` before using `this`; `TaskManager` gained two
  new methods and a getter so its `tasks` list can never go stale.
- **Modern JavaScript**: added object and function-parameter
  destructuring, template literals everywhere string concatenation used
  to be, the spread operator (`mergeTasks`, array copies), a rest
  parameter, and ES6 `import`/`export` across all four modules.
- **DOM**: corrected the selector bugs, added null checks, cleared the
  container before re-rendering (fixing duplicate tasks), switched task
  id lookup to `data-*` attributes with event delegation on the task
  list container, and added JSON-aware `localStorage` save/load.
- **Testing**: rewrote `app.test.js` with real imports, a `beforeEach`
  reset, and 20+ passing tests covering every required category
  (classes, inheritance, array ops, recursion, destructuring, edge cases,
  error handling).
- **Error handling & quality**: added `try/catch` around storage and task
  creation, `typeof`/range validation on task inputs, and comments
  throughout explaining *why* each fix was needed, not just what changed.


## Getting Started

Because the app uses real ES6 modules (`<script type="module">`), open it
through a local server rather than double-clicking `index.html` (browsers
block module imports over the `file://` protocol):

1. Install dependencies: `npm install`
2. Right-click on the `index.html` file then run it on the live server, this should open the app on your browser.

## Testing

Run Jest tests with:
```
npm test
```

All tests should pass with 0 failures.

## Screenshots


## Reflection
