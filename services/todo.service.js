import fs from 'fs'
import { utilService } from './util.service.js'

export const todoService = {
    query,
    get,
    remove,
    save,
}

const todos = utilService.readJsonFile('data/todo.json')

function query(filterBy) {
    if (!filterBy) return Promise.resolve(todos)
    // Filter
    let filteredTodos

    const regex = new RegExp(filterBy.title, 'i')
    filteredTodos = todos.filter(todo => regex.test(todo.title))

    const { isActive } = filterBy

    if(isActive !== null) {
        if(isActive === 'true') filteredTodos = filteredTodos.filter(todo => todo.isActive)
        else filteredTodos = filteredTodos.filter(todo => !todo.isActive)
    }

    // Sort
    filterBy.isDescending = (filterBy.isDescending === 'true') ? true : false
    const desc = filterBy.isDescending ? 1 : -1
    const { sortBy } = filterBy

    if (sortBy === 'title') filteredTodos.sort((t1, t2) => t1.title.localeCompare(t2.title) * desc)
    else if (sortBy === 'active') filteredTodos.sort((t1, t2) => (t1.isActive - t2.isActive) * desc)
    else if (sortBy === 'createdAt') filteredTodos.sort((t1, t2) => (t1.createdAt - t2.createdAt) * desc)

    // Paging
    filterBy.isPagingUsed = (filterBy.isPagingUsed === 'true') ? true : false
    const { isPagingUsed, pageSize, pageIdx } = filterBy

    if (pageIdx !== undefined && isPagingUsed) {
        const startPageIdx = pageIdx * pageSize
        filteredTodos = filteredTodos.slice(startPageIdx, startPageIdx + pageSize)
    }

    return Promise.resolve(filteredTodos)
}

function get(todoId) {
    const todo = todos.find(todo => todo._id === todoId)
    return Promise.resolve(todo)
}

function remove(todoId) {
    const idx = todos.findIndex(todo => todo._id === todoId)
    if (idx === -1) return Promise.reject('No Such todo')
    todos.splice(idx, 1)
    return _saveTodosToFile()
}

function save(todo) {
    if (todo._id) {
        const idx = todos.findIndex(currTodo => currTodo._id === todo._id)
        if (idx === -1) throw new Error('Couldn\'t find todo')
        todos[idx] = todo
    } else {
        todo._id = utilService.makeId()
        todo.createdAt = Date.now()
        todo.isActive = true
        todos.unshift(todo)
    }

    return _saveTodosToFile().then(() => todo)
}

function _saveTodosToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(todos, null, 2)
        fs.writeFile('data/todo.json', data, (err) => {
            if (err) {
                return reject(err)
            }
            resolve()
        })
    })
}