//Programa Principal
const newTaskForm = document.querySelector('#new-task-form');
const newTaskPopup = document.getElementById('new-task-popup');
const tasksList = document.querySelector('#task-list');
const sideMenu = document.querySelector('#side-menu');

let tasks = [];
let showNewTaskPopUp = false;
let showSideMenu = false;

const clearListView = () => {
  const children = [...tasksList.children];

  children.forEach((child) => {
    tasksList.removeChild(child);
  });
};

const updateListView = () => {
  clearListView();

  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.classList.add('task-list-item');


    const header = document.createElement('div');
    header.classList.add('task-list-item-header');
    listItem.appendChild(header);

    const checkIsDone = document.createElement('input');
    checkIsDone.setAttribute('type', 'checkbox');
    checkIsDone.checked = task.isDone;
    checkIsDone.onchange = () => {
      handleCheckboxChange(task);
    }
    header.appendChild(checkIsDone);

    const title = document.createElement('p');
    title.textContent = task.title;
    header.appendChild(title);

    const buttonDelete = document.createElement('button');
    buttonDelete.classList.add('button-delete');
    buttonDelete.innerHTML = 'Excluir';
    buttonDelete.onclick = () => {
      handleDeleteClick(task);
    };
    listItem.appendChild(buttonDelete);



    tasksList.appendChild(listItem);
  });
}

const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem('tasks');

  if(savedData === null) {
    return;
  }

  const parsedData = JSON.parse(savedData);
  tasks = parsedData;

  updateListView();
}

loadFromLocalStorage();

const saveToLocalStorage = () => {
  const parsedData = JSON.stringify(tasks);
  localStorage.setItem('tasks', parsedData);

}

const handleDeleteClick = (targetTask) => {
  const filtered = tasks.filter((task) => {
    return task != targetTask;
  });

  tasks = filtered;

  saveToLocalStorage();
  updateListView();
};


const handleCheckboxChange = (targetTask) => {
  targetTask.isDone = !targetTask.isDone;
  saveToLocalStorage();
  updateListView();
}

const toggleNewTaskPopUp = () => {
  showNewTaskPopUp = !showNewTaskPopUp;
  if (showNewTaskPopUp === true) {
    newTaskPopup.style.display = 'block';
  } else {
    newTaskPopup.style.display = 'none';
  }
}

const handleSubmit = (event) => {
  event.preventDefault();

  const formData = new FormData(newTaskForm);
  const formEntries = Object.fromEntries(formData);

  const newTask = {
    id: tasks.length,
    title: formEntries.title,
    description: formEntries.description,
    isDone: false
  };


  tasks.unshift(newTask);
  saveToLocalStorage();

  updateListView();

  if (event.keyCode === 13 && showNewTaskPopUp){
    toggleNewTaskPopUp()
  }

  toggleNewTaskPopUp();
  newTaskForm.reset();
};

newTaskForm.addEventListener('submit', handleSubmit);


const handleKeyDown = (event) => {
  //ESC
  if (event.keyCode === 27 && showNewTaskPopUp){
    toggleNewTaskPopUp();
  };
}

document.addEventListener('keydown', handleKeyDown);

const toggleSideMenu = () => {
  showSideMenu = !showSideMenu;

  if (showSideMenu) {
    sideMenu.classList.add('side-menu-open');
  } else {
    sideMenu.classList.remove('side-menu-open');
  };
};

const handleResize = (event) => {
  if (window.innerWidth >= 922 && showSideMenu) {
    toggleSideMenu();
  }
}

window.addEventListener('resize', handleResize);
