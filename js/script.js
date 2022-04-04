//Subprograma

const clearList = () => {
  const children = [...tasksList.children];
  children.forEach((child) => {
    tasksList.removeChild(child);
  });
}

const handleDeleteClick = (targetTask) => {
  const filtered = tasks.filter((task) => {
    return task != targetTask;
  });
  tasks = filtered;
  updateList();
}


const updateList = () => {
  console.log('updateList', tasks);
  clearList();
  
  tasks.forEach((task) => {   
    const listItem = document.createElement('li');
    listItem.textContent = task.title;
    
    const buttonDelete = document.createElement('button');
    buttonDelete.innerHTML = 'delete';
    listItem.appendChild(buttonDelete);
    buttonDelete.onclick = () => {
      handleDeleteClick(task);
    }

    tasksList.appendChild(listItem);
  });
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
  }
  
  tasks.push(newTask);
  updateList();
  
}





//Programa Principal

const newTaskForm = document.querySelector('#new-task-form');

const tasksList = document.querySelector('#task-list');

let tasks = [];

newTaskForm.addEventListener('submit', handleSubmit);


