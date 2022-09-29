let dailyForm = document.createElement('form');
dailyForm.addEventListener('submit', SubmitDaily);
let dailyContainer = document.querySelector("[data-daily=dailyContainer]")
dailyContainer?.appendChild(dailyForm);
let svgContainer = document.getElementById('svgContainer');

const appreciationArr = ["Nice", "Good job", "Great work", "Way to go"]
DailyTask();

function DailyTask() {
  document.getElementById('dailyTask')?.remove()
  document.getElementById('dailyLabel')?.remove()
  document.getElementById('dailyCompletion')?.remove()
  document.querySelector("[data-congratulate=accomplishments]")?.remove()
  let dailyTask = localStorage.getItem("DailyTask");
  if (dailyTask  === null || dailyTask?.trim() === "") {
    let labelDaily = document.createElement('h1');
    labelDaily.setAttribute('id', 'dailyLabel')
    labelDaily.innerHTML = 'What is your main focus today ?';
    dailyForm?.appendChild(labelDaily);

    let dailyTask = document.createElement('input');
    dailyTask.setAttribute('id', 'dailyTask');
    dailyTask.setAttribute('placeholder', 'Write Task Here');
    dailyForm?.appendChild(dailyTask);

  } else {
    let dailyChkbox = document.createElement('input');
    dailyChkbox.setAttribute('type', 'checkbox');
    dailyChkbox.setAttribute('id', 'dailyCompletion')
    dailyChkbox.addEventListener('click', FinishedDaily)
    dailyForm.appendChild(dailyChkbox);

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
    dailyForm.appendChild(doneTask);
  }
}

function SubmitDaily(e) {      
  localStorage.setItem("DailyTask", this.elements.dailyTask.value.toUpperCase());
  e.preventDefault();
  DailyTask();
}

function FinishedDaily(e) {    
  let task = document.getElementById('dailyTask')
  let doneTask = document.querySelector("[data-congratulate=accomplishments]")
  let svgContainer = document.getElementById('svgContainer');
  
  if (this.checked) {
    task.style.textDecoration = 'line-through' ;
    doneTask.innerHTML = `${appreciationArr[Math.floor(Math.random() * appreciationArr.length)]}!`;
    doneTask.style.opacity = "1"
    svgContainer.children[0].style.color = "#fdcb6e"
  } else {
    task.style.textDecoration = '';
    doneTask.style.opacity = "0";
    svgContainer.children[0].style.color = "#8e8e8e"
  }
}

function ClearDaily(e) {
  if (!document.getElementById('dailyCompletion').checked ) return
  localStorage.setItem("DailyTask", "")
  svgContainer.style.opacity = "0"
  svgContainer.children[0].style.color = "#8e8e8e"
  DailyTask();
}
document.getElementById('svgContainer')?.addEventListener('click', ClearDaily)
