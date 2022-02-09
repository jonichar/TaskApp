let addTaskButton = document.querySelector('#addTaskButton');
let clearAllButton = document.querySelector('#clearButton')
let taskPendingNumber = document.querySelector('#taskPendingNumber')
let footer = document.querySelector("#footer")
let listOfTasks = document.querySelector('.listOfTasks');
let doneTask = document.querySelector('.done')
let newTask = document.querySelector('#taskBar');
let tasks = JSON.parse(localStorage.getItem("tasks"))

addTaskButton.addEventListener('click', addTask);
clearAllButton.addEventListener('click',clearAll);
rewrite();

function addTask() {
  if (newTask.value != '') {

    let newTaskObject = {
      "task":newTask.value,
      "status":"pending"
    }

    tasks.push(newTaskObject)
    console.log(tasks)
    newTask.value = '';

    rewrite();
  }
}

function toggleTask(event) {
  let target = event.target
  let index = null
  
  if (target.id === ""){ 
    index= target.parentElement.id.replace("task", "")
  }else{
    index = target.id.replace("task","")
  }

  if (tasks[index].status === "done") {
    tasks[index].status = "pending"
  }else{
    tasks[index].status = "done"
  }

  rewrite(); 

}

function rewrite(){

  listOfTasks.innerHTML = ""
  
  for (let i = 0; i < tasks.length; i++) {

    let div = document.createElement('div');
    div.classList.add('taskBox');
    div.id = 'task' + (i);

    div.addEventListener('click', toggleTask);

    let divTaskList = document.createElement('div');
    let text = document.createTextNode(tasks[i].task);
    divTaskList.appendChild(text);
    divTaskList.classList.add('taskList');

    if (tasks[i].status == "done") {
      divTaskList.classList.add("done");
    }

    div.appendChild(divTaskList);
    listOfTasks.appendChild(div);


  }

  validateFooter();
  
  tasksPending = tasks.filter(item => {
    return item.status == "pending"
  })

  taskPendingNumber.innerHTML= tasksPending.length

  saveLocalStorage();
}

function saveLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks))
  
}

function validateFooter() {
  if (tasks.length > 0) {
    footer.classList.remove("oculto")
    footer.classList.add("visible")
  } else {
    footer.classList.remove("visible")
    footer.classList.add("oculto")
  }
}

function clearAll(){
  tasks = tasks.filter(item => {
    return item.status == "pending"
  })

  rewrite()
}



