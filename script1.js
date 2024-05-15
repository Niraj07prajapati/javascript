document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');
    
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    savedTodos.forEach(todo => addTodoToList(todo.text, todo.completed));

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const todoText = input.value.trim();
        if (todoText !== '') {
            addTodoToList(todoText);
            saveTodoToLocalStorage(todoText);
            input.value = '';
        }
    });

    function addTodoToList(todoText, completed = false) {
        const listItem = document.createElement('li');
        listItem.textContent = todoText;

        const completeBtn = document.createElement('button');
        completeBtn.innerHTML = '&#10003;';
        completeBtn.classList.add('complete-btn');
        completeBtn.addEventListener('click', function() {
            listItem.classList.toggle('completed');
            updateTodoInLocalStorage(todoText, 'completed', listItem.classList.contains('completed'));
        });

        const editBtn = document.createElement('button');
        editBtn.innerHTML = '&#9998;';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', function() {
            editTodoItem(listItem, todoText);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '&#10005;';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            list.removeChild(listItem);
            removeTodoFromLocalStorage(todoText);
        });

        listItem.appendChild(completeBtn);
        listItem.appendChild(editBtn);
        listItem.appendChild(deleteBtn);
        list.appendChild(listItem);
        
        if (completed) {
            listItem.classList.add('completed');
        }
    }

    function editTodoItem(listItem, oldText) {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = oldText;
        listItem.innerHTML = '';
        listItem.appendChild(input);
        input.focus();

        input.addEventListener('blur', () => {
            const newText = input.value.trim();
            if (newText !== '' && newText !== oldText) {
                listItem.textContent = newText;
                addTodoActions(listItem, newText);
                updateTodoInLocalStorage(oldText, 'text', newText);
            } else {
                listItem.textContent = oldText;
                addTodoActions(listItem, oldText);
            }
        });
    }

    function addTodoActions(listItem, todoText) {
        const completeBtn = document.createElement('button');
        completeBtn.innerHTML = '&#10003;';
        completeBtn.classList.add('complete-btn');
        completeBtn.addEventListener('click', function() {
            listItem.classList.toggle('completed');
            updateTodoInLocalStorage(todoText, 'completed', listItem.classList.contains('completed'));
        });

        const editBtn = document.createElement('button');
        editBtn.innerHTML = '&#9998;';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', function() {
            editTodoItem(listItem, todoText);
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '&#10005;';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            list.removeChild(listItem);
            removeTodoFromLocalStorage(todoText);
        });

        listItem.appendChild(completeBtn);
        listItem.appendChild(editBtn);
        listItem.appendChild(deleteBtn);
    }

    function saveTodoToLocalStorage(todoText) {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push({ text: todoText, completed: false });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function updateTodoInLocalStorage(oldText, key, value) {
        let todos = JSON.parse(localStorage.getItem('todos'));
        todos = todos.map(todo => {
            if (todo.text === oldText) {
                todo[key] = value;
            }
            return todo;
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function removeTodoFromLocalStorage(todoText) {
        let todos = JSON.parse(localStorage.getItem('todos'));
        todos = todos.filter(todo => todo.text !== todoText);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
});
