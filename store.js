// import { userService } from './services/user.service.js'
// import { utilService } from './services/util.service.js'

const { createStore } = Vuex

const storeOptions = {
    strict: true,

    state() {
        return {
            todos: null
        }
    },

    mutations: {
        setTodos(state, { todos }) {
            state.todos = todos
        }
    },

    getters: {
        
    }
}
export const store = createStore(storeOptions)