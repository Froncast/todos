const form = document.querySelector('.todo-control')
const input = document.querySelector('.header-input')
const addBtn = document.querySelector('#add')
const todoList = document.querySelector('#todo')
const completed = document.querySelector('#completed')
const todoContainer = document.querySelector('.todo-container')

const getTodos = function() {
	return JSON.parse(localStorage.getItem('todos')) || localStorage.setItem('todos', JSON.stringify([]))
}


const renderTodos = function() {
	const todos = getTodos()
	todoList.innerHTML = ``
	completed.innerHTML = ``
	todos.forEach(function(todo, i) {
		const newTodo = `
			<li class="todo-item" data-id="${i}">
			<span class="text-todo">${todo.title}</span>
			<div class="todo-buttons">
				<button class="todo-remove"></button>
				<button class="todo-complete"></button>
			</div>
		</li>
		`
		if(todo.status) {
			completed.insertAdjacentHTML('beforeend', newTodo)
		} else {
			todoList.insertAdjacentHTML('beforeend', newTodo)
		}
	})
}

const addTodo = function(e) {
	const todos = getTodos()

	todos.push({
		title: input.value,
		status: false
	})

	localStorage.setItem('todos', JSON.stringify(todos))
	renderTodos()
	e.target.reset()
}

const changeStatus = function(id) {
	const todos = getTodos()
	todos.forEach((todo, i) => {
		if(i === id) {
			todo.status = !todo.status
		}
	})
	localStorage.setItem('todos', JSON.stringify(todos))
	renderTodos()
}

const deleteTodo = function(id) {
	const todos = getTodos()
	todos.splice(id, 1)
	localStorage.setItem('todos', JSON.stringify(todos))
	renderTodos()
}

renderTodos()

todoContainer.addEventListener('click', function(e) {
	const target = e.target
	if(target.matches('.todo-remove')) {
		deleteTodo(+target.closest('li').dataset.id)
	}
	if(target.matches('.todo-complete')) {
		changeStatus(+target.closest('li').dataset.id)
	}
})

form.addEventListener('submit', function(e) {
	e.preventDefault()
	if(input.value.length <= 0) {
		alert('Напишите задачу')
	} else {
		addTodo(e)
	}
})