import { userService } from './services/user.service.js'

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

            const activeCount = todos.reduce((count, todo) => {
                if(!todo.isActive) return count + 1
                return count
            }, 0)

            const percentage = (activeCount / todos.length) * 100

            elProgressBar.style.width = `${percentage}%`
            elProgressBar.querySelector('span').innerText = `${parseInt(percentage)}%`
        },
        updateUser({ user }, settings) {
            user.fullname = settings.fullname
            user.prefs.color = settings.color
            user.prefs.bgColor = settings.bgColor
            userService.saveUserToStorage(user)
        },
        addActivity(state, { txt }) {
            state.user.activities.unshift({ txt, at: Date.now()})
            userService.addActivity(txt)
        }
    },
}
export const store = createStore(storeOptions)