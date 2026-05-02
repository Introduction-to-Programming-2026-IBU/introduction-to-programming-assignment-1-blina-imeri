/**
 * script.js — Final Project
 * ==========================
 * Build your JavaScript here.
 * 
 * Requirements:
 * - Use const/let (no var)
 * - At least one async/await fetch call with try/catch
 * - At least one use of localStorage
 * - Modular: break code into named functions
 * - No alert() for user messages
 */

console.log('Final project script loaded. Time to build something great! 🚀');

// =========================
// ADDED: DOM ELEMENTS
// =========================
const taskInput = document.querySelector('#task-input');
const addTaskBtn = document.querySelector('#add-task');
const taskList = document.querySelector('#task-list');
const prioritySelect = document.querySelector('#priority');
const dueDateInput = document.querySelector('#due-date');
const taskStats = document.querySelector('#task-stats');

// =========================
// ADDED: DATA STORAGE
// =========================
let tasks = [];

// =========================
// ADDED: CREATE TASK FUNCTION
// =========================
function addTask() {
  const text = taskInput.value.trim();
  const priority = prioritySelect.value;
  const dueDate = dueDateInput.value;

  if (!text) return;

  const task = {
    id: Date.now(),
    text,
    priority,
    dueDate,
    completed: false
  };

  tasks.push(task);

  taskInput.value = '';
  dueDateInput.value = '';

  renderTasks();
  updateStats();
}

// =========================
// ADDED: RENDER FUNCTION
// =========================
function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');

    li.classList.add('task', task.priority);
    if (task.completed) li.classList.add('completed');

    li.innerHTML = `
      <span onclick="toggleTask(${task.id})">
        ${task.text} (${task.dueDate || 'No date'})
      </span>
      <button onclick="deleteTask(${task.id})">X</button>
    `;

    taskList.appendChild(li);
  });
}

// =========================
// ADDED: TOGGLE TASK
// =========================
function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );

  renderTasks();
  updateStats();
}

// =========================
// ADDED: DELETE TASK
// =========================
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);

  renderTasks();
  updateStats();
}

// =========================
// ADDED: UPDATE STATS
// =========================
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;

  taskStats.textContent = `${completed} of ${total} tasks completed`;
}

// =========================
// ADDED: EVENT LISTENER
// =========================
addTaskBtn.addEventListener('click', addTask);
