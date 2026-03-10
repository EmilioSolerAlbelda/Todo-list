// 1. Capturamos los elementos del DOM (Document Object Model)
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// 2. Evento para añadir una nueva tarea
todoForm.addEventListener('submit', (evento) => {
    // Evitamos que el formulario recargue la página al pulsar Enter
    evento.preventDefault(); 
    
    // Capturamos el texto y le quitamos los espacios en blanco extra
    const taskText = todoInput.value.trim();
    
    if (taskText !== '') {
        createTask(taskText); // Llamamos a la función que crea el HTML
        todoInput.value = ''; // Vaciamos el input para la siguiente tarea
    }
});

// 3. Función para crear el HTML de la tarea e inyectarlo en la lista
function createTask(text) {
    // Creamos la etiqueta <li>
    const li = document.createElement('li');
    li.classList.add('list_item');
    
    // Usamos Template Literals (comillas invertidas) para inyectar el HTML cómodamente
    li.innerHTML = `
        <div class="list_task">
            <input type="checkbox" class="task_check" />
            <p class="task_text">${text}</p>
        </div>
        <i class="bi bi-trash list_delete"></i>
    `;
    
    // Añadimos el nuevo <li> a nuestra <ul>
    todoList.appendChild(li);
}

// 4. DELEGACIÓN DE EVENTOS (Para marcar como completado o borrar)
todoList.addEventListener('click', (evento) => {
    
    const elementoClicado = evento.target;

    // A. Lógica para BORRAR la tarea
    if (elementoClicado.classList.contains('list_delete')) {
        // .closest() busca al padre más cercano que tenga la clase 'list_item'
        const listItem = elementoClicado.closest('.list_item');
        listItem.remove();
    }
    
    // B. Lógica para TACHAR la tarea
    if (elementoClicado.classList.contains('task_check')) {
        // Buscamos el párrafo que está justo al lado del checkbox
        const taskText = elementoClicado.nextElementSibling;
        // .toggle() añade la clase si no la tiene, y se la quita si ya la tiene
        taskText.classList.toggle('completed');
    }
});