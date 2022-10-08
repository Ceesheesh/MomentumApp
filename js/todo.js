initiateTodoList();
function initiateTodoList() {  
  let todoContainer = document.getElementById('toDocontainer');
  let todoButton = document.createElement('label');
  todoButton.setAttribute('id', 'todoToggle')
  todoButton.classList.add('open-button');
  todoButton.addEventListener('click', toggleTodoList)
  todoButton.textContent = "Todo";
  todoContainer.appendChild(todoButton);

  if (localStorage.getItem("tasks") === null || localStorage.getItem("tasks").trim() === "") {
    localStorage.setItem("tasks",JSON.stringify([]))
  };
}

function toggleTodoList() {
  let todoModal = document.querySelector('.todo-modal');  
  !todoModal ? createTodo() : removeTodo() ;
}


function closeButton(todo) {
  let node = document.querySelector("[data-closeBtn=AiFillCloseCircle]");    
  let clone = node.cloneNode(true);
  clone.style.opacity = "1";
  
  let closeButton = document.createElement('button');
  closeButton.setAttribute('name', 'todoClear')
  closeButton.classList.add('clearTodo');
  closeButton.style.width = "fit-content";
  closeButton.style.backgroundColor = "transparent";  
  closeButton.addEventListener('click', removeTask)
  closeButton.style.border = "none";
  closeButton.appendChild(clone);
  return closeButton;
}

function  removeTodo() {
  document.querySelector('.todo-modal')?.remove();  
}

function createTodo() {
  let todoArea = document.getElementById('todoArea');
  let todoModal = document.createElement('div');
  todoModal.setAttribute('data-todo', 'todoModal')
  todoModal.classList.add('todo-modal');
  todoArea.append(todoModal);  

  let todoApp = document.createElement('div');
  todoModal.appendChild(todoApp);
  

  let todoTitleContainer = document.createElement('div');
  todoTitleContainer.style.border = "none";
  todoTitleContainer.style.borderBottom = "1px solid rgb(255,255,255, 0.2)";
  todoTitleContainer.style.padding = "0.5rem";

  todoApp.appendChild(todoTitleContainer);

  let todoTitle = document.createElement('label');
  todoTitle.setAttribute('data-todo', 'todoTitle');
  todoTitle.setAttribute('name', 'todoTitle');
  todoTitle.innerHTML = 'My Todo';
  todoTitle.style.fontSize = '1.1rem';
  todoTitleContainer.appendChild(todoTitle);

  let wrapper = document.createElement('div');
  wrapper.setAttribute('data-wrapper','wrapper');
  wrapper.setAttribute('name','wrapper');
  wrapper.setAttribute('id', 'todoTasks');
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

//Reload tasks on Refresh  ---------------->

function loadTasks() {
  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));  
  let todoWrapper = document.querySelector("[data-wrapper=wrapper]");
  let todoTasks = document.createElement("div");  
  todoTasks.style.margin = "0.5rem";  
  todoTasks.setAttribute('name', 'removableTasks');
  todoWrapper.appendChild(todoTasks);

  tasks.forEach(function (todo) {
    taskCompartment(todoTasks, todo);
  });
  try {
    let allTodo = [...document.querySelectorAll('.todoCompartment')]
    allTodo.forEach(todoCompartment => {
      
      if(todoCompartment.children.todoChk.checked) {
        todoCompartment.children.todoClear.children[0].style.color = "#cc0000"
      } else {
        todoCompartment.children.todoClear.children[0].style.color = "#8e8e8e"
      }

      
    })
  } catch {}
}

function taskCompartment(todoTasks, todo) {
  let taskDiv = document.createElement("div");
  taskDiv.classList.add("flex-row");
  taskDiv.classList.add("todoCompartment");

  let todoChkbox = document.createElement('input');
  todoChkbox.setAttribute('type', 'checkbox');
  // todoChkbox.setAttribute('class', 'item_0');
  todoChkbox.setAttribute('name', 'todoChk');
  // todoChkbox.classList.add('checkbox');
  todoChkbox.classList.add('todoChk')
  todo.isDone && (todoChkbox.checked = true);
  todoChkbox.addEventListener('click', finishedTask)

  let todoTaskName = document.createElement('input');
  todoTaskName.setAttribute('type', 'text');
  todoTaskName.setAttribute('class', 'item-center');
  todoTaskName.setAttribute('disabled', 'disabled');
  todoTaskName.setAttribute('name', 'todoValue');
  todo.isDone && (todoTaskName.style.textDecoration = 'line-through');
  todoTaskName.value = todo.task;

  let todoDeleteTask = closeButton(todo);
  

  todoDeleteTask.addEventListener('click', removeTask)

  taskDiv.appendChild(todoChkbox);
  taskDiv.appendChild(todoTaskName);
  taskDiv.appendChild(todoDeleteTask);
  
  // todo.isDone && (todoDeleteTask.children.style.color = "#cc0000");
  todoTasks.appendChild(taskDiv);
}

//Add Tasks to Local Storage  ---------------->

function addTask(e) {
  if (e.keyCode !== 13) return
  if (e.target.value.trim() === "" ) return
  
  localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: e.target.value, isDone: false}]));
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
  e.target.checked ? e.target.parentElement.children.todoClear.children[0].style.color = "#cc0000" :
  e.target.parentElement.children.todoClear.children[0].style.color = "#8e8e8e";

  let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));  
  tasks.forEach(function (todo) {
    if (todo.task === e.target.parentElement.children.todoValue.value) {
      todo.isDone = !todo.isDone
    }
   
  localStorage.setItem("tasks", JSON.stringify(tasks));
  });
}


    
    // On double click feature
    // let removeEntry = document.getElementById('item_center');
    // entry.addEventListener('dblclick', removeTask)
