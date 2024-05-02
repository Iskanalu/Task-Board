// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

$('#add-task').on('click', (e) => handleAddTask(e));

// Todo: create a function to generate a unique task id
function generateTaskId() { 

        const timestamp = new Date().getTime(); // Get current timestamp
        const randomNum = Math.floor(Math.random() * 1000); // Generate a random number
    
        return `task_${timestamp}_${randomNum}`;      
}

// Todo: create a function to create a task card

function createTaskCard(task) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task-card');
    taskElement.innerHTML = `
      <div class="col-sm-12 blog-card">
      <h5>${task.title}</h5>
       <p class="task-description">${task.description}</p>
       <p class ="tak-due-date">Posted by:${task.dueDate}</p>
       <button type="button" class="btn btn-danger">Delete</button>
     </div>
  `;
        return taskElement;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const todo = document.getElementById('todo-cards');
    console.log('rendering tasks  >', taskList);
    taskList.forEach((task) => {
        const taskCard = createTaskCard(task);
        taskCard.setAttribute('draggable', true);
        
        taskCard.addEventListener('click', (e) => { handleDeleteTask(e); })
        taskCard.addEventListener('dragstart', () => {
            // Implement drag start logic
        });

        taskCard.addEventListener('dragend', () => {
            // Implement drag end logic
        });

        todo.appendChild(taskCard);
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    const task = {
        title: $('#taskTitle').val(),
        dueDate: $('#taskDuedate').val(),
        description: $('#taskDescription').val()
    };
    taskList.push(task);
    console.log('adding task  >', taskList);
    localStorage.setItem("tasks",JSON.stringify(taskList));
    $('#moda-close-btn').click();
    renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
