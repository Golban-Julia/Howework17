"use strict";

// На странице находится форма: инпут для ввода текста и кнопка.

// Пользователь может ввести что-то в инпут и нажать на кнопку, после этого в списке ниже должна отобразится строка,
//  с тем что было введено в инпуте.После этого инпут в форме должен очистится

// Добавить в каждую строку кнопку “Delete”, при клике на которую элемент удаляется из списка

// Если пользователь нажимает на кнопку “Add” - а инпут пустой, то выводить ошибку.
//  Ошибка должна исчезать - если пользователь снова начал вводить текст в инпут.
// Добавлять атрибуты, классы и тд можно по своему усмотрению.


// К Todolist из предыдущего домашнего задания необходимо добавить:
// - У каждого элемента LI будет внутри также checkbox - перед текстом
// - При нажатии на этот checkbox - кнопка и checkbox должны стать неактивными (disabled), а текст внутри LI должен быть зачеркнутым. 
// Это будет значить что Todo выполнена
// Рекомендации: можете применить Bootstrap для стилизации данного задания


const form = document.forms.worksheet;
const taskInput = document.querySelector('#task_input');
const { add } = document.forms.worksheet.elements;

const ulNode = document.getElementById("list");
const errorMessage = document.querySelector(".error-message");
const button = document.querySelector("button");


form.addEventListener('submit', addTask);

function addTask(event) {
  event.preventDefault();

  const taskText = taskInput.value;

  if (taskText.trim().length === 0) {
    taskInput.classList.add("error");
    errorMessage.innerHTML = "Please, enter valid task";
    return;
  }

  taskInput.value = "";
  taskInput.focus();

  const li = document.createElement('li');
  ulNode.appendChild(li);
  li.innerHTML = taskText;
  li.classList.add("task");

  const btn = document.createElement('button');
  li.appendChild(btn);
  btn.innerHTML = "Delete";
  btn.classList.add("remove-button");
  
  const checkbox = document.createElement("input");
  li.appendChild(checkbox);
  checkbox.setAttribute("type", "checkbox");
  li.insertAdjacentElement('afterbegin', checkbox);
  checkbox.classList.add("check");
}


taskInput.oninput = () => {
  const isErrorField = taskInput.classList.contains("error");

  if (isErrorField) {
    taskInput.classList.remove("error");
    errorMessage.innerHTML = "";
  } 
};


//Удалить задачу..

ulNode.addEventListener("click", (event) => {

    const isRemoveButton = event.target.className === "remove-button";

    if (isRemoveButton) {
        const removeButton = event.target;
        const taskInput = removeButton.closest(".task");
        taskInput.remove();
    }
});


//Отмечаем задачу завершенной..

ulNode.addEventListener('change', doneTask)

function doneTask(event) {

  const isChecked = event.target.tagName === "INPUT";

  if (isChecked) {
    const checked = event.target;
    checked.setAttribute('disabled', 'true');

    const taskInput = checked.closest('.task');
    taskInput.classList.toggle('checked');

    const btn = taskInput.querySelector('.remove-button')
    btn.disabled = true;
  }
}
