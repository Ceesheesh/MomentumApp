
//display form

function openForm() {
  let x = document.getElementById('myForm');
  if (x.style.display === "block") {
    x.style.display = "none";
  } else{
    x.style.display = "block";
  }
}

// On app load, get all tasks from localStorage

    window.onload = loadTasks;

// On form submit add task ------------------>

    let entry = document.getElementById('form');
    entry.addEventListener('keypress', function(e) {
      if(e.key === "Enter"){
        e.preventDefault();
        addTask();
      }
    })

//Reload tasks on Refresh  ---------------->

    function loadTasks() {

    if (localStorage.getItem("tasks") == null) return;

    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

    tasks.forEach(task => {
      const list = document.getElementById("ul-wrapper");
      const li = document.createElement("li");
      li.innerHTML = `<input type="checkbox" class="check" id="item_0"><input type="text" value="${task.task}" class="task" id="item-center" disabled="disabled"><i class="fa-regular fa-circle-xmark" onclick="removeTask(this)" id="item_1"></i>`
      list.insertBefore(li, list.children[0]);
    });
    }

//Add Tasks to Local Storage  ---------------->

    function addTask() {
      const task = document.getElementById('myInput');
      const list = document.getElementById("ul-wrapper");

      if (task.value === "") {
        return false;
      }

      localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: task.value}]));

      // create list item, add innerHTML and append to ul
      const li = document.createElement("li");
      li.innerHTML = `<input type="checkbox" class="check" id="item_0"><input type="text" value="${task.value}" class="task" id="item-center" disabled="disabled"><i class="fa-regular fa-circle-xmark" onclick="removeTask(this)" id="item_1"></i>`
      list.insertBefore(li, list.children[0]);
      // clear input
      task.value = "";

      
    }

//Remove task from Local Storage  ---------------->

    function removeTask(event) {
      let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
      tasks.forEach(task => {
        if (task.task === event.parentNode.children[1].value) {
          // delete task
          tasks.splice(tasks.indexOf(task), 1);
        }
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      event.parentElement.remove();
    }


    
    // On double click feature
    // let removeEntry = document.getElementById('item_center');
    // entry.addEventListener('dblclick', removeTask)
