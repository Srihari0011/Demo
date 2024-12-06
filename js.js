class TaskManager {
    constructor() {
      this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      this.taskList = document.getElementById("task-list");
      this.loadTasks();
    }
  
    addTask(task) {
      this.tasks.push(task);
      this.saveToStorage();
      this.createTaskElement(task);
    }
  
    deleteTask(task) {
      this.tasks = this.tasks.filter(t => t !== task);
      this.saveToStorage();
      this.renderTasks();
    }
  
    saveToStorage() {
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
  
    loadTasks() {
      this.tasks.forEach(task => this.createTaskElement(task));
    }
  
    createTaskElement(task) {
      const li = document.createElement("li");
      li.textContent = task;
  
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => this.deleteTask(task));
  
      li.appendChild(deleteBtn);
      this.taskList.appendChild(li);
    }
  
    renderTasks() {
      this.taskList.innerHTML = "";
      this.loadTasks();
    }
  }
  document.addEventListener("DOMContentLoaded", () => {
    const taskManager = new TaskManager();
  
    document.getElementById("task-form").addEventListener("submit", event => {
      event.preventDefault();
      const taskInput = document.getElementById("task-input");
      const task = taskInput.value.trim();
      if (task) {
        taskManager.addTask(task);
        taskInput.value = "";
      }
    });
  });
// Simulate API Fetch
async function fetchMockTasks() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(["Learn JavaScript", "Build a website", "Practice coding"]);
      }, 2000); // Simulates 2-second delay
    });
  }
  
  document.addEventListener("DOMContentLoaded", async () => {
    const taskManager = new TaskManager();
  
    // Fetch and load mock tasks
    const mockTasks = await fetchMockTasks();
    mockTasks.forEach(task => taskManager.addTask(task));
  
    document.getElementById("task-form").addEventListener("submit", event => {
      event.preventDefault();
      const taskInput = document.getElementById("task-input");
      const task = taskInput.value.trim();
      if (task) {
        taskManager.addTask(task);
        taskInput.value = "";
      }
    });
  });
      