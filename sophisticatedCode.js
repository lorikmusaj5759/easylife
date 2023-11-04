/*
File: sophisticatedCode.js 
Description: This code is an elaborate implementation of a task management system using JavaScript. It includes multiple classes, inheritance, and various methods for managing tasks and projects.

Note: This code is fictional and serves as an example of a complex JavaScript project.

*/

// Task class represents individual tasks
class Task {
  constructor(title, description, priority) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.completed = false;
  }

  complete() {
    this.completed = true;
  }
}

// Project class represents a collection of tasks
class Project {
  constructor(name, description) {
    this.name = name;
    this.description = description;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(task) {
    const taskIndex = this.tasks.indexOf(task);
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
    }
  }
}

// SubProject class inherits from Project class and adds additional functionality
class SubProject extends Project {
  constructor(name, description, parentProject) {
    super(name, description);
    this.parentProject = parentProject;
  }

  getParentProject() {
    return this.parentProject;
  }
}

// TaskManager class manages multiple projects and tasks
class TaskManager {
  constructor() {
    this.projects = [];
  }

  addProject(project) {
    this.projects.push(project);
  }

  removeProject(project) {
    const projectIndex = this.projects.indexOf(project);
    if (projectIndex !== -1) {
      this.projects.splice(projectIndex, 1);
    }
  }

  getProjectTasks(project) {
    return project.tasks;
  }
}

// Create instances of TaskManager, projects, and tasks
const taskManager = new TaskManager();

const project1 = new Project("Project 1", "This is the first project");
const project2 = new Project("Project 2", "This is the second project");
const subProject = new SubProject("Subproject 1", "This is a subproject", project1);

const task1 = new Task("Task 1", "This is the first task", "High");
const task2 = new Task("Task 2", "This is the second task", "Medium");
const task3 = new Task("Task 3", "This is the third task", "Low");

// Add tasks to projects
project1.addTask(task1);
project1.addTask(task2);
subProject.addTask(task3);

// Add projects to the task manager
taskManager.addProject(project1);
taskManager.addProject(project2);

// Output project and task details
console.log("Task Manager Projects:");
console.log(taskManager.projects);
console.log("\nProject 1 tasks:");
console.log(taskManager.getProjectTasks(project1));
console.log("\nSubproject 1 parent project:");
console.log(subProject.getParentProject());

// Complete a task
task1.complete();
console.log("\nTask 1 completed status: " + task1.completed);
