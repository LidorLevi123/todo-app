// import { userService } from './services/user.service.js'
// import { utilService } from './services/util.service.js'

const { createStore } = Vuex

const storeOptions = {
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
        saveTodo({ todos }, { savedTodo }) {
            todos.unshift(savedTodo)
        },
        removeTodo({ todos }, { todoId }) {
            const idx = todos.findIndex(todo => todo._id === todoId)
            todos.splice(idx, 1)
        }
    },

    getters: {
        
    }
}
export const store = createStore(storeOptions)