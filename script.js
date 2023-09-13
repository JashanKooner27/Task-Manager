
const tasks = [];
function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      tasks.push(...JSON.parse(storedTasks));
    }
  }
  window.addEventListener('load', () => {
    loadTasksFromLocalStorage();
    displayTasks(); 
  });
  function isDueDateValid(dueDate) {
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
    return !isNaN(dueDateObj) && dueDateObj >= currentDate;
  }
function addTask() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const dueDate = document.getElementById('due-date').value;
    const category = document.getElementById('category').value;
    if (isDueDateValid(dueDate)) {
        tasks.push({ title, description, dueDate, category, completed: false });
        displayTasks();
        clearInputs();
        saveTasksToLocalStorage();
      } else {
        alert('Please enter a valid due date that is not in the past.');
      }
}

function displayTasks() {
    const taskList = document.getElementById('tasks');
    taskList.innerHTML = '';

    const search = document.getElementById('search').value.toLowerCase();
    const filterStatus = document.getElementById('filter-status').value;
    const filterCategory = document.getElementById('filter-category').value;

    for (const task of tasks) {
        if (
            (search === '' || task.title.toLowerCase().includes(search)) &&
            (filterStatus === 'all' || (filterStatus === 'completed' && task.completed) || (filterStatus === 'incomplete' && !task.completed)) &&
            (filterCategory === 'all' || filterCategory === task.category)
        ) {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.title}</span>
                <span>${task.dueDate}</span>
                <span id="work-cat" >${task.category}</span>
                <button id="edit-btn" onclick="editTask('${task.title}')"><i class='bx bx-edit-alt'></i></button>
                <button id="delete-btn" onclick="deleteTask('${task.title}')"><i class='bx bxs-trash'></i></button>
                <button id="complete-btn" onclick="markAsCompleted('${task.title}')">${task.completed ? 'Mark as Incomplete' : 'Mark as Completed'}</button>
            `;
            taskList.appendChild(li);
        }
    }
}

function editTask(title) {
    const taskToEdit = tasks.find(task => task.title === title);
    if (taskToEdit) {
        const newTitle = prompt('Enter a new title:', taskToEdit.title);
        if (newTitle !== null) {
            taskToEdit.title = newTitle;
            displayTasks();
            saveTasksToLocalStorage();
        }
    }
}

function deleteTask(title) {
    const indexToDelete = tasks.findIndex(task => task.title === title);
    if (indexToDelete !== -1) {
        tasks.splice(indexToDelete, 1);
        displayTasks();
        saveTasksToLocalStorage();
        
    }
}

function markAsCompleted(title) {
    const taskToComplete = tasks.find(task => task.title === title);
    if (taskToComplete) {
        taskToComplete.completed = !taskToComplete.completed;
        displayTasks();
        saveTasksToLocalStorage();
       

    }
}

function clearInputs() {
    document.getElementById('task-title').value = '';
    document.getElementById('task-description').value = '';
    document.getElementById('due-date').value = '';
    document.getElementById('category').value = 'work';
}

function filterTasks() {
    displayTasks();
}

function resetFilters() {
    document.getElementById('search').value = '';
    document.getElementById('filter-status').value = 'all';
    document.getElementById('filter-category').value = 'all';
    displayTasks();
}
displayTasks();
