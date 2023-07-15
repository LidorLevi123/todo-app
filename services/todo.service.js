import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const TODOS_KEY = 'todosDB'

_createTodos()

export const todoService = {
    query,
    get,
    remove,
    save,
    getEmptyTodo,
}

function query(filterBy) {
    
    return storageService.query(TODOS_KEY)
        .then(todos => {
            // Filter
            if(filterBy === undefined) return todos

            if (filterBy.title) {
                const regex = new RegExp(filterBy.title, 'i')
                todos = todos.filter(todo => regex.test(todo.title))
            }
            if (filterBy.isActive !== null && filterBy.isActive !== undefined) {
                todos = todos.filter(todo => todo.isActive === filterBy.isActive)
            }
            
            // Sort
            const desc = filterBy.isDescending ? 1 : -1
            const { sortBy } = filterBy

            if(sortBy === 'title') todos = todos.sort((t1, t2) => t1.title.localeCompare(t2.title) * desc)
            else if(sortBy === 'active') todos.sort((t1, t2) => (t1.isActive - t2.isActive) * desc)
            else if(sortBy === 'createdAt') todos.sort((t1, t2) => (t1.createdAt - t2.createdAt) * desc)
            return todos
        })
}

function get(todoId) {
    return storageService.get(TODOS_KEY, todoId)
}

function remove(todoId) {
    return storageService.remove(TODOS_KEY, todoId)
}

function save(todo) {
    if (todo._id) {
        return storageService.put(TODOS_KEY, todo)
    } else {
        return storageService.post(TODOS_KEY, todo, false)
    }
}

function getEmptyTodo(title = '', isActive = true) {
    return { _id: '', title, isActive }
}

function _createTodos() {
    let todos = utilService.loadFromStorage(TODOS_KEY)
    if (!todos || !todos.length) {
        todos = []
        todos.push(_createTodo('Learn Vuex', true))
        todos.push(_createTodo('Play Katan', true))
        todos.push(_createTodo('Finish This Project', false))
        todos.push(_createTodo('Eat Lunch', true))
        utilService.saveToStorage(TODOS_KEY, todos)
    }
}

function _createTodo(name, price) {
    const todo = getEmptyTodo(name, price)
    todo._id = utilService.makeId()
    todo.createdAt = Date.now()
    return todo
}