import { todoService } from '../../services/todo.service.js'

export const todoStore = {
    strict: true,

    state() {
        return {
            todos: null,
        }
    },

    mutations: {
        setTodos(state, { todos }) {
            state.todos = todos
        },
        addTodo({ todos }, { todo }) {
            todos.unshift(todo)
        },
        removeTodo({ todos }, { todoId }) {
            const idx = todos.findIndex(todo => todo._id === todoId)
            todos.splice(idx, 1)
        },
        toggleCheckTodo({ todos }, { todoId }) {
            const todo = todos.find(todo => todo._id === todoId)
            todo.isActive = !todo.isActive
        },
    },

    getters: {
        todos({ todos }) {
            return todos
        },
        todosCountMap({ todos }) {
            return todos?.reduce((map, todo) => {
                map.all++
                if (todo.isActive) map.active++
                else if (!todo.isActive) map.done++

                return map
            }, { all: 0, active: 0, done: 0 })
        },
        activeTodosPercentage({ todos }) {
            const activeCount = todos.reduce((count, todo) => {
                if (!todo.isActive) return count + 1
                return count
            }, 0)

            return (activeCount / todos.length) * 100
        }
    },

    actions: {
        loadTodos({ commit }, { filterBy }) {
            return todoService.query(filterBy)
                .then(todos => {
                    commit({ type: 'setTodos', todos })
                })
        },
        addTodo({ commit }, { todo }) {
            return todoService.save(todo)
                .then(savedTodo => {
                    commit({ type: 'addTodo', todo: savedTodo })
                    commit({ type: 'addActivity', txt: `Added a Todo: '${savedTodo.title}'` })
                })
                .catch(err => {
                    console.log(err)
                    return Promise.reject()
                })
        },
        removeTodo({ commit }, { todo }) {
            return todoService.remove(todo._id)
                .then(() => {
                    commit({ type: 'removeTodo', todoId: todo._id })
                    commit({ type: 'addActivity', txt: `Removed a Todo: '${todo.title}'` })
                })
                .catch(err => {
                    console.log(err)
                    return Promise.reject()
                })
        },
        toggleCheckTodo({ commit }, { todo, activityTxt }) {
            return todoService.save(todo)
                .then(() => {
                    commit({ type: 'toggleCheckTodo', todoId: todo._id })
                    commit({ type: 'addActivity', txt: activityTxt })
                })
                .catch(err => {
                    console.log(err)
                    return Promise.reject()
                })
        }
    }
}