initiateTodoList();
function initiateTodoList() {  
  let todoContainer = document.getElementById('toDocontainer');
  let todoButton = document.createElement('button');
  todoButton.classList.add('open-button');
  todoButton.addEventListener('click', createTodo)
  todoButton.textContent = "Todo";
  todoContainer.appendChild(todoButton);
}

function closeButton() {
  let node = document.getElementById("AiFillCloseCircle");
  let clone = node.cloneNode(true);
  clone.style.opacity = "1";
  let closeButton = document.createElement('button');
  closeButton.style.width = "fit-content";
  closeButton.style.backgroundColor = "transparent";
  closeButton.style.zIndex = "5";
  closeButton.addEventListener('click', (e) => { 
    removeTask
    e.stopPropagation();
  })
  closeButton.style.border = "none";
  closeButton.appendChild(clone);
  return closeButton;
}

function createTodo() {
  let todoArea = document.getElementById('todoArea');
  let todoModal = document.createElement('div');
  todoModal.setAttribute('data-todo', 'todoModal')
  todoModal.classList.add('todo-modal');
  todoArea.append(todoModal);  

  let todoApp = document.createElement('div');
  todoModal.appendChild(todoApp);
  
  let setTodoTitle  = document.createElement('input');
  setTodoTitle.classList.add('userInput');
  setTodoTitle.setAttribute('placeholder', 'Write title for todo list');
  setTodoTitle.style.fontSize = "1rem";
  setTodoTitle.style.width = "100%";
  setTodoTitle.style.marginBottom = "1rem";
  setTodoTitle.style.paddingBottom = "0.5rem";
  setTodoTitle.addEventListener('keyup', SetTodoTitle);
  todoApp.appendChild(setTodoTitle);

  let wrapper = document.createElement('div');
  wrapper.setAttribute('data-wrapper','wrapper');
  wrapper.setAttribute('name','wrapper');
  todoApp.appendChild(wrapper);

  let todoForm = document.createElement('div');
  todoForm.classList.add('todo-form');
  todoApp.appendChild(todoForm);

  let todoInput = document.createElement('input');
  todoInput.setAttribute('type', 'text');
  todoInput.setAttribute('class', 'todo-input');
  todoInput.setAttribute('placeholder', 'What is your agenda today?');
  todoForm.appendChild(todoInput);
  todoInput.addEventListener('keyup', addTask)

  loadTasks();
}

function SetTodoTitle(e) {
  if (e.keyCode !== 13) return
  
  let todoTitle = document.createElement('label');
  todoTitle.setAttribute('data-todo', 'todoTitle')
  todoTitle.setAttribute('name', 'todoTitle')
  todoTitle.innerHTML = e.target.value;
  e.target.parentElement.insertBefore(todoTitle, e.target);
  e.target.remove();
}

//display form

// function openForm() {
//   let x = document.getElementById('myForm');
//   if (x.style.display === "block") {
//     x.style.display = "none";
//   } else{
//     x.style.display = "block";
//   }
// }

// On app load, get all tasks from localStorage

    // window.onload = loadTasks;

//Reload tasks on Refresh  ---------------->

function loadTasks() {
  if (localStorage.getItem("tasks") == null) return;
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

  let todoWrapper = document.querySelector("[data-wrapper=wrapper]");
  let todoTasks = document.createElement("div");
  todoTasks.style.maxHeight = "20rem";
  todoTasks.style.overflow = "auto";
  todoTasks.style.marginBottom = "1rem";
  todoTasks.setAttribute('name', 'removableTasks');
  todoWrapper.appendChild(todoTasks);

  tasks.forEach(function (todo) {
    taskCompartment(todoTasks, todo);
  });
}

function taskCompartment(todoTasks, todo) {
  let taskDiv = document.createElement("div");
  taskDiv.classList.add("flex-row");
  taskDiv.classList.add("todoCompartment");

  let todoChkbox = document.createElement('input');
  todoChkbox.setAttribute('type', 'checkbox');
  todoChkbox.setAttribute('class', 'item_0');
  todoChkbox.setAttribute('name', 'todoChk');
  todoChkbox.classList.add('checkbox')
  todoChkbox.addEventListener('click', finishedTask)

  let todoTaskName = document.createElement('input');
  todoTaskName.setAttribute('type', 'text');
  todoTaskName.setAttribute('class', 'item-center');
  todoTaskName.setAttribute('disabled', 'disabled');
  todoTaskName.setAttribute('name', 'todoValue');
  todoTaskName.value = todo.task;

  let todoDeleteTask = closeButton();
  todoDeleteTask.addEventListener('click', removeTask)

  taskDiv.appendChild(todoChkbox);
  taskDiv.appendChild(todoTaskName);
  taskDiv.appendChild(todoDeleteTask);
  
  todoTasks.appendChild(taskDiv);
}

//Add Tasks to Local Storage  ---------------->

function addTask(e) {
  if (e.keyCode !== 13) return
  if (e.target.value.trim() === "" ) return
  
  localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: e.target.value}]));
  e.target.parentElement.parentElement.children.wrapper.children.removableTasks.remove()
  e.target.value = "";
  loadTasks();
}

//Remove task from Local Storage  ---------------->

function removeTask() {  
  if (!this.parentElement.children.todoChk.checked) return;
  let taskName = this.parentElement.children.todoValue.value;           
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
  let filteredTasks = tasks.filter((todo) => todo.task !== taskName);  
  localStorage.setItem("tasks", JSON.stringify( filteredTasks));   
  this.parentElement.remove();
}

function finishedTask(e) {  
  e.target.checked ? e.target.parentElement.children.todoValue.style.textDecoration = "line-through" :
  e.target.parentElement.children.todoValue.style.textDecoration = "none" ;  
}


    
    // On double click feature
    // let removeEntry = document.getElementById('item_center');
    // entry.addEventListener('dblclick', removeTask)
