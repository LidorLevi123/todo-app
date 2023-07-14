import { userService } from './services/user.service.js'
// import { utilService } from './services/util.service.js'

const { createStore } = Vuex

const storeOptions = {
    strict: true,

    state() {
        return {
            todos: null,
            user: userService.getLoggedinUser()
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
        },
        checkTodo({ todos }, { todoId }) {
            const todo = todos.find(todo => todo._id === todoId)
            todo.isActive = !todo.isActive
        },
        resizeProgressBar({ todos }, payload) {
            const elProgressBar = document.querySelector('.app-header .progress-bar-inner')

            const percentage = this.getters.doneTodosPercentage

            elProgressBar.style.width = `${percentage}%`
            elProgressBar.querySelector('span').innerText = `${percentage}%`
        },
        updateUser({ user }, settings) {
            user.fullname = settings.fullname
            user.prefs.color = settings.color
            user.prefs.bgColor = settings.bgColor
            userService.saveUserToStorage(user)
        }
    },

    getters: {
        doneTodosPercentage({ todos }) {
            const activeCount = todos.reduce((count, todo) => {
                if(!todo.isActive) return count + 1
                return count
            }, 0)

            const percentage = (activeCount / todos.length) * 100
            return parseInt(percentage)
        }
    }
}
export const store = createStore(storeOptions)