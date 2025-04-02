document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const itemsLeft = document.getElementById('items-left');
    const clearCompletedBtn = document.getElementById('clear-completed');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    let currentFilter = 'all';
    
    // Initialize the app
    function init() {
        fetchTodos();
        addEventListeners();
    }
    
    // Add event listeners
    function addEventListeners() {
        addBtn.addEventListener('click', addTodo);
        todoInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') addTodo();
        });
        
        clearCompletedBtn.addEventListener('click', clearCompleted);
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                currentFilter = this.dataset.filter;
                fetchTodos();
            });
        });
    }
    
    // Fetch todos from server
    function fetchTodos() {
        fetch('/api/todos')
            .then(response => response.json())
            .then(todos => {
                renderTodos(todos);
                updateItemsLeft(todos);
            });
    }
    
    // Add a new todo
    function addTodo() {
        const text = todoInput.value.trim();
        if (text) {
            fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text })
            })
            .then(response => response.json())
            .then(() => {
                todoInput.value = '';
                fetchTodos();
            });
        }
    }
    
    // Render todos based on current filter
    function renderTodos(todos) {
        todoList.innerHTML = '';
        
        const filteredTodos = todos.filter(todo => {
            if (currentFilter === 'active') return !todo.completed;
            if (currentFilter === 'completed') return todo.completed;
            return true;
        });
        
        if (filteredTodos.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.textContent = currentFilter === 'all' ? 'No todos yet' : 
                                      currentFilter === 'active' ? 'No active todos' : 'No completed todos';
            emptyMessage.style.textAlign = 'center';
            emptyMessage.style.padding = '1rem';
            emptyMessage.style.color = '#666';
            todoList.appendChild(emptyMessage);
            return;
        }
        
        filteredTodos.forEach(todo => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            if (todo.completed) li.classList.add('completed');
            
            li.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="todo-text">${todo.text}</span>
                <button class="delete-btn">×</button>
            `;
            
            const checkbox = li.querySelector('.todo-checkbox');
            const deleteBtn = li.querySelector('.delete-btn');
            
            checkbox.addEventListener('change', function() {
                fetch(`/api/todos/${todo.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ completed: this.checked })
                })
                .then(() => fetchTodos());
            });
            
            deleteBtn.addEventListener('click', function() {
                fetch(`/api/todos/${todo.id}`, {
                    method: 'DELETE'
                })
                .then(() => fetchTodos());
            });
            
            todoList.appendChild(li);
        });
    }
    
    // Clear completed todos
    function clearCompleted() {
        fetch('/api/todos')
            .then(response => response.json())
            .then(todos => {
                const completedTodos = todos.filter(todo => todo.completed);
                const deletePromises = completedTodos.map(todo => 
                    fetch(`/api/todos/${todo.id}`, { method: 'DELETE' })
                );
                Promise.all(deletePromises).then(() => fetchTodos());
            });
    }
    
    // Update items left counter
    function updateItemsLeft(todos) {
        const count = todos.filter(todo => !todo.completed).length;
        itemsLeft.textContent = `${count} ${count === 1 ? 'item' : 'items'} left`;
    }
    
    init();
});
