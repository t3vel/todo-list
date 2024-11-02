const addButton = document.querySelector('.btn-add');
const input = document.querySelector('.input-add');
const list = document.querySelector('.todo-list');

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(text => addTodoToDOM(text));
}

function saveTodos() {
    const items = document.querySelectorAll('.todo-list-item');
    const todos = Array.from(items).map(item => item.dataset.text);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function updateListNumbers() {
    const items = document.querySelectorAll('.todo-list-item');
    items.forEach((item, index) => {
        item.querySelector('.item-text').innerText = `${index + 1}. ${item.dataset.text}`;
    });
}

function addTodoToDOM(text) {
    const li = document.createElement('li');
    li.className = 'todo-list-item';
    li.dataset.text = text;

    const itemText = document.createElement('span');
    itemText.className = 'item-text';
    itemText.innerText = text;
    li.appendChild(itemText);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    li.appendChild(deleteBtn);
    list.appendChild(li);

    setTimeout(() => {
        li.classList.add('show');
    }, 10);

    deleteBtn.addEventListener("click", () => {
        li.classList.add('hide');
        setTimeout(() => {
            list.removeChild(li);
            updateListNumbers();
            saveTodos();
        }, 500);
    });

    updateListNumbers();
}

addButton.addEventListener("click", () => {
    const text = input.value.trim();
    if (!text) return;

    addTodoToDOM(text);
    saveTodos();

    input.value = '';
});

document.addEventListener("DOMContentLoaded", loadTodos);
