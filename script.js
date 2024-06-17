const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', function() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(taskText) {
        createTaskElement(taskText);
    });
});

addTaskBtn.addEventListener('click', function() {
    const taskText = taskInput.value;
    if (taskText.trim() !== '') {
        createTaskElement(taskText);
        saveTasksToLocalStorage();
        taskInput.value = '';
    }
});

function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;
    taskList.appendChild(li);

    li.addEventListener('click', function() {
        li.classList.toggle('completed');
        saveTasksToLocalStorage();
    });

    li.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        li.remove();
        saveTasksToLocalStorage();
    });
}

function saveTasksToLocalStorage() {
    const tasks = Array.from(taskList.children).map(function(task) {
        return task.textContent;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to create editable task input field
function createEditableTaskInput(li, taskText) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = taskText;
    input.classList.add('edit-input');

    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            taskText = input.value;
            li.textContent = taskText;
            saveTasksToLocalStorage();
        }
    });

    li.textContent = '';
    li.appendChild(input);
    input.focus();
}

// Event listener to enable task editing
taskList.addEventListener('dblclick', function(event) {
    const li = event.target;
    if (li.tagName === 'LI') {
        const taskText = li.textContent;
        createEditableTaskInput(li, taskText);
    }
});

