// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));
let dragged = null;
const todo = document.getElementById("todo-cards");
todo.addEventListener("dragover", (event) => {
  event.preventDefault();
});
const inProgress = document.getElementById("in-progress-cards");
inProgress.addEventListener("dragover", (event) => {
  event.preventDefault();
});
const done = document.getElementById("done-cards");
done.addEventListener("dragover", (event) => {
  event.preventDefault();
});

todo.addEventListener("drop", (event) => {
    event.preventDefault();
    if (event.target.closest("#todo-cards")) {
      dragged.parentNode.removeChild(dragged);
      dragged.querySelector('.blog-card')?.classList?.remove('done');
      event.target.closest("#todo-cards").appendChild(dragged);
    }
  });

  inProgress.addEventListener("drop", (event) => {
    event.preventDefault();
    if (event.target.closest("#in-progress-cards")) {
      dragged.parentNode.removeChild(dragged);
      dragged.querySelector('.blog-card')?.classList?.remove('done');
      event.target.closest("#in-progress-cards").appendChild(dragged);
    }
  });

  done.addEventListener("drop", (event) => {
    event.preventDefault();
    if (event.target.closest("#done-cards")) {
      dragged.parentNode.removeChild(dragged);
      dragged.querySelector('.blog-card')?.classList?.add('done');
      event.target.closest("#done-cards").appendChild(dragged);
    }
  });
  
renderTaskList();

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
    
    taskElement.setAttribute('id', `${task.id}`);
    taskElement.innerHTML = `
      <div class="col-sm-12 blog-card ${task.status}">
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
    taskList.forEach((task) => {
      const taskCard = createTaskCard(task);
      renderSingleTask(taskCard, task.id);
    });
}

function renderSingleTask(taskCard, taskId) {
  taskCard.setAttribute('draggable', true);
  
  taskCard.getElementsByTagName('button')[0].addEventListener('click', (e) => { handleDeleteTask(e, taskId); })
  taskCard.addEventListener('dragstart', (event) => {
    dragged = event.target;
  });
  $('#todo-cards').append(taskCard);
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    const title = $('#taskTitle').val();
    const dueDate =  $('#taskDuedate').val();

    if (!dueDate || !title) {
      alert('due date and title is required, please fill in the values');
    }
    const currentDate = new Date(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getDate());
    const userDueDate = new Date(new Date(dueDate).getUTCFullYear(), new Date(dueDate).getUTCMonth(), new Date(dueDate).getUTCDate());

    const task = {
        title,
        dueDate,
        description: $('#taskDescription').val(),
        id: `${title.replace(/ /g, '_')}-${taskList?.length}`,
        status: userDueDate < currentDate ?
         'overdue' : currentDate === userDueDate ? 'deadline' : 'none'
    };
    taskList.push(task);
    localStorage.setItem("tasks",JSON.stringify(taskList));
    $('#moda-close-btn').click();
    const taskCard = createTaskCard(task);
    renderSingleTask(taskCard, task.id);
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event, taskId) {
    event.preventDefault();
    taskList = taskList.filter(function(t) {
        return t.id !== taskId; 
    });
    localStorage.setItem("tasks",JSON.stringify(taskList));
    $(`#${taskId}`).remove();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
