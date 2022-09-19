"use strict";

// На странице находится форма: инпут для ввода текста и кнопка.

// Пользователь может ввести что-то в инпут и нажать на кнопку, после этого в списке ниже должна отобразится строка,
//  с тем что было введено в инпуте.После этого инпут в форме должен очистится

// Добавить в каждую строку кнопку “Delete”, при клике на которую элемент удаляется из списка

// Если пользователь нажимает на кнопку “Add” - а инпут пустой, то выводить ошибку.
//  Ошибка должна исчезать - если пользователь снова начал вводить текст в инпут.
// Добавлять атрибуты, классы и тд можно по своему усмотрению.


const form = document.forms.worksheet;
const { username } = form;
const { add } = document.forms.worksheet.elements;

const ulNode = document.getElementById("list");
const errorMessage = document.querySelector(".error-message");


form.onsubmit = (event) => {
  event.preventDefault();

  if (username.value.trim().length === 0) {
    username.classList.add("error");
    errorMessage.innerHTML = "Please, enter valid username";
    return;
  }
  console.log("submit");
};

username.oninput = () => {
  const isErrorField = username.classList.contains("error");

  if (isErrorField) {
    username.classList.remove("error");
    errorMessage.innerHTML = "";
  }
};

add.onclick = () => {
    
    let li = document.createElement('li');
    ulNode.appendChild(li);
    li.innerHTML = username.value;
    li.classList.add("username");

    let button = document.createElement('button');
    li.appendChild(button);
    button.innerHTML = "Delete";
    button.classList.add("remove-button");

};

ulNode.addEventListener("click", (event) => {

    const isRemoveButton = event.target.className === "remove-button";

    if (isRemoveButton) {
        const removeButton = event.target;
        const username = removeButton.closest(".username");
        username.remove();
    }
});

username.onclick = function() {
    username.value = "";
};



