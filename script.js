const todoButton = document.querySelector('.todo-btn');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const completeFilterBtn = document.querySelector('.completed-filter');
const notcompleteFilterBtn = document.querySelector('.remaining-filter');
const allFilter = document.querySelector('.all-filter');

const init = () => {
  let todoListArr;

  if (localStorage.getItem('todoList')) {
    todoListArr = JSON.parse(localStorage.getItem('todoList'));
  }
  else{
    todoListArr = [];
  }

  todoList.innerHTML = '';
  todoListArr.forEach((todo) => {

    const newTodo = document.createElement('div');
    newTodo.classList.add('todo');
  
    const newTodoListItem = document.createElement('li');
    newTodoListItem.innerText = todo.text;
    if(todo.complete)
    {
      newTodoListItem.classList.add('mark-complete')
    }
  
    const newTodoBtnContainer = document.createElement('div');
    newTodoBtnContainer.classList.add('todo-btn-container');
    const completeBtn = document.createElement('button');
    completeBtn.classList.add('check');   
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('trash-bin');   
  
    completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  
    newTodoBtnContainer.appendChild(completeBtn);
    newTodoBtnContainer.appendChild(deleteBtn);
  
    newTodo.appendChild(newTodoListItem);
    newTodo.appendChild(newTodoBtnContainer);
  
    todoList.appendChild(newTodo);
  })
};
// updated screen as per requirement
const updateList = (todoListArr) => {

  todoList.innerHTML = '';
  todoListArr.forEach((todo) => {

    const newTodo = document.createElement('div');
    newTodo.classList.add('todo');
  
    const newTodoListItem = document.createElement('li');
    newTodoListItem.innerText = todo.text;
    if(todo.complete)
    {
      newTodoListItem.classList.add('mark-complete')
    }
  
    const newTodoBtnContainer = document.createElement('div');
    newTodoBtnContainer.classList.add('todo-btn-container');
    const completeBtn = document.createElement('button');
    completeBtn.classList.add('check');   
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('trash-bin');   
  
    completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  
    newTodoBtnContainer.appendChild(completeBtn);
    newTodoBtnContainer.appendChild(deleteBtn);
  
    newTodo.appendChild(newTodoListItem);
    newTodo.appendChild(newTodoBtnContainer);
  
    todoList.appendChild(newTodo);
  })
};


document.addEventListener('DOMContentLoaded' ,init);

todoButton.addEventListener('click', (event) => {
  // prevent default behavior
  event.preventDefault();

  const todoText = todoInput.value;

  if (!todoText) return;
  
  // Save to Local Storage
  saveTodoListToLocalStorage(todoText);

  const newTodo = document.createElement('div');
  newTodo.classList.add('todo');

  const newTodoListItem = document.createElement('li');
  newTodoListItem.innerText = todoText;

  const newTodoBtnContainer = document.createElement('div');
  newTodoBtnContainer.classList.add('todo-btn-container');
  const completeBtn = document.createElement('button');
  completeBtn.classList.add('check');   
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('trash-bin');   

  completeBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

  newTodoBtnContainer.appendChild(completeBtn);
  newTodoBtnContainer.appendChild(deleteBtn);

  newTodo.appendChild(newTodoListItem);
  newTodo.appendChild(newTodoBtnContainer);

  todoList.appendChild(newTodo);

  todoInput.value = '';
});

const saveTodoListToLocalStorage = (todo) => {
  let todoListArr = [];

  // Retrieve existing to-do list from local storage
  if (localStorage.getItem('todoList')) {
    todoListArr = JSON.parse(localStorage.getItem('todoList'));
  }

  // Add the new to-do item to the list
  todoListArr.push({text: todo, completed: false});

  // Save the updated to-do list back to local storage
  localStorage.setItem('todoList', JSON.stringify(todoListArr));
}

todoList.addEventListener('click', (event)=>{
  const item=event.target;

  if(item.classList.contains('trash-bin') || item.classList.contains('fa-trash'))
  {
    const elementType = item.classList.contains('fa-trash') ? 1 : 2;
    const btnContainer = elementType === 1 ? item.parentElement.parentElement : item.parentElement ;

    const todoListItem = btnContainer.previousElementSibling;
    const todoText = todoListItem.textContent;

    deleteTodo(todoText);
    init();
  }
  else if(item.classList.contains('check') || item.classList.contains('fa-check'))
  {
    const elementType = item.classList.contains('fa-check') ? 1 : 2;
    const btnContainer = elementType === 1 ? item.parentElement.parentElement : item.parentElement ;

    const todoListItem = btnContainer.previousElementSibling;
    const todoText = todoListItem.textContent;

    markComplete(todoText);
    init();
  }
});

const markComplete = (todoText)=>{
  let todoListArr;
  if(localStorage.getItem('todoList'))
  {
    todoListArr = JSON.parse(localStorage.getItem('todoList'));
  } else {
    todoListArr=[];
  }

  const updatedTodoList = todoListArr.map((todo) => {
    if(todo.text === todoText)
    {
      return {text: todo.text, complete: !todo.complete};
    }

    return todo;
  });

  localStorage.setItem('todoList',JSON.stringify(updatedTodoList));
}

// to delete from local storage

const deleteTodo = (todoText) =>{
  let todoListArr;
  if(localStorage.getItem('todoList'))
  {
    todoListArr = JSON.parse(localStorage.getItem('todoList'));
  } else {
    todoListArr=[];
  }

  const updatedTodo = todoListArr.filter((todo) => {
    return todo.text !== todoText; 
  });

  localStorage.setItem('todoList', JSON.stringify(updatedTodo));
}

allFilter.addEventListener('click', (e) =>{
  let todoListArr;

  if(localStorage.getItem('todoList'))
  {
    todoListArr=JSON.parse(localStorage.getItem('todoList'));
  }
  else{
    todoListArr = [];
  }

  updateList(todoListArr);
})

completeFilterBtn.addEventListener('click', (e) => {
  let todoListArr
  
  if(localStorage.getItem('todoList'))
  {
    todoListArr = JSON.parse(localStorage.getItem('todoList'));
  }else{
    todoListArr = [];
  }

  const completedTodoList = todoListArr.filter((todo) => {
    return todo.complete === true; // Filter completed todos
  });

  updateList(completedTodoList); // Update list with completed todos
});

notcompleteFilterBtn.addEventListener('click', (e) => {
  let todoListArr
  
  if(localStorage.getItem('todoList'))
  {
    todoListArr = JSON.parse(localStorage.getItem('todoList'));
  }else{
    todoListArr = [];
  }

  const notcompletedTodoList = todoListArr.filter((todo) => {
    return todo.complete !== true; // Filter completed todos
  });

  updateList(notcompletedTodoList); // Update list with completed todos
});