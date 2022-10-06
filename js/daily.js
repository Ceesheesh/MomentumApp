let dailyForm = document.createElement('form');
dailyForm.classList.add("dailyForm");
dailyForm.setAttribute('id','dailyForm')
dailyForm.addEventListener('submit', SubmitDaily);
let dailyContainer = document.querySelector("[data-daily=dailyContainer]")
dailyContainer?.appendChild(dailyForm);
let svgContainer = document.getElementById('svgContainer');
svgContainer.children[0].style.transition = "0.5s"

const appreciationArr = ["Nice", "Good job", "Great work", "Way to go"];
document.getElementById('AiTwotoneDelete').addEventListener('click', ClearDaily)
document.getElementById('MdModeEdit').addEventListener('click', EditDaily)

DailyTask();

function DailyTask() {
  document.getElementById('dailyTask')?.remove();
  document.getElementById('dailyLabel')?.remove();
  document.getElementById('dailyCompletion')?.remove();
  document.querySelector("[data-congratulate=accomplishments]")?.remove();
  let dailyTask = localStorage.getItem("DailyTask"); 

  let location = localStorage.getItem("UserLocation");
  if (location === null || location.trim() === "") return;
  
  if (dailyTask  === null || dailyTask?.trim() === "") {
    dailyForm.style.opacity = "1";
    let labelDaily = document.createElement('h1');
    labelDaily.setAttribute('id', 'dailyLabel');
    labelDaily.innerHTML = 'What is your main focus today ?';
    labelDaily.classList.add('focusLabel');
    dailyForm?.appendChild(labelDaily);

    let dailyTask = document.createElement('input');
    dailyTask.setAttribute('id', 'dailyTask');
    dailyTask.classList.add('userInput');    
    dailyForm?.appendChild(dailyTask);

    dailyForm.classList.add('flex-column');
    dailyForm.classList.remove('flex-row');

  } else {
    dailyForm.style.opacity = "1";
    let dailyChkboxContainer = document.createElement('div');
    dailyChkboxContainer.setAttribute('id', 'dailyCheckContainer')
    let dailyChkbox = document.createElement('input');
    dailyChkbox.setAttribute('type', 'checkbox');
    dailyChkbox.setAttribute('id', 'dailyCompletion')
    dailyChkbox.addEventListener('click', FinishedDaily)
    dailyChkboxContainer.appendChild(dailyChkbox)
    dailyForm.appendChild(dailyChkboxContainer);

    let daily = document.createElement('h1');
    daily.setAttribute('id', 'dailyTask')
    daily.innerHTML = `${dailyTask}`;
    dailyForm.appendChild(daily);

    svgContainer.style.opacity = "1";
    dailyForm.appendChild(svgContainer);

    let doneTask = document.createElement('label');
    doneTask.setAttribute('data-congratulate', 'accomplishments');
    doneTask.style.transition = "1s";
    doneTask.style.opacity = "0";    
    dailyContainer.appendChild(doneTask);

    dailyForm.classList.add('flex-row')
    dailyForm.classList.remove('flex-column')
  }
  try {
    SetTextColor();
  } catch{}
}

function SubmitDaily(e) {      
  localStorage.setItem("DailyTask", this.elements.dailyTask.value.toUpperCase());
  e.preventDefault();
  dailyForm.style.opacity = "0";
  setTimeout(DailyTask, 1000);
}

function FinishedDaily(e) {    
  let task = document.getElementById('dailyTask')
  let doneTask = document.querySelector("[data-congratulate=accomplishments]")
  let svgContainer = document.getElementById('svgContainer');
  
  if (this.checked) {
    task.style.textDecoration = 'line-through' ;
    doneTask.innerHTML = `${appreciationArr[Math.floor(Math.random() * appreciationArr.length)]}!`;
    doneTask.style.opacity = "1"
    svgContainer.children[0].style.color = "#2cbc3d"
    svgContainer.children[1].style.color = "#8e8e8e"
    dailyTask.style.opacity = "0.5"
  } else {
    task.style.textDecoration = '';
    doneTask.style.opacity = "0";
    svgContainer.children[0].style.color = "#8e8e8e"
    svgContainer.children[1].style.color = "#2cbc3d"
    dailyTask.style.opacity = "1"
  }
}

function ClearDaily(e) {
  if (!document.getElementById('dailyCompletion').checked ) return
  localStorage.setItem("DailyTask", "")
  svgContainer.style.opacity = "0"
  svgContainer.children[0].style.color = "#8e8e8e"
  dailyForm.style.opacity = "0";
  setTimeout(DailyTask, 1000);
}

function EditDaily(e) {
 
  if (document.getElementById('dailyCompletion').checked ) return
  let editFocus = document.createElement('input');
  editFocus.classList.add('userInput');
  editFocus.setAttribute('id', 'editFocus')
  editFocus.value = document.getElementById('dailyTask')?.innerHTML;
  document.getElementById('dailyTask').innerHTML = "";
  document.getElementById('dailyTask').appendChild(editFocus);
  document.getElementById('dailyCompletion').style.display = 'none';

  try {
    SetTextColor();
  } catch {}

  editFocus.addEventListener('keydown', function(e) { e.keyCode === 13 && e.preventDefault();})
  editFocus.addEventListener('keyup', function(e) {
    
    if (e.keyCode !== 13) return
    
    localStorage.setItem("DailyTask", editFocus.value);
    document.getElementById('dailyTask').innerHTML = editFocus.value;
    editFocus.remove();
    document.getElementById('dailyCompletion').style.display = 'block';

  })
  
}
