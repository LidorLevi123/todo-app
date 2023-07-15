import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { todoService } from '../services/todo.service.js'
import { utilService } from '../services/util.service.js'

import Spinner from '../cmps/Spinner.js'
import TodoEdit from '../cmps/TodoEdit.js'
import TodoFilter from '../cmps/TodoFilter.js'
import TodoSort from '../cmps/TodoSort.js'
import TodoList from '../cmps/TodoList.js'

export default {
    template: `
        <section class="todo-index">
            <TodoEdit/>
            <TodoFilter @filter="setFilterBy"/>
            <TodoSort @filter="setFilterBy"/>
            <TodoList
                v-if="todos" 
                @remove="removeTodo"
                @check="checkTodo"
                :todos="todos"
                :emptyListMsg="emptyListMsg"/>
                <section v-else class="Spinner">
                    <Spinner />
                </section>
        </section>
    `,

    data() {
        return {
            emptyListMsg: ''
        }
    },

    methods: {
        setFilterBy(filterBy) {
            todoService.query(filterBy)
                .then(todos => {
                    this.$store.commit({ type: 'setTodos', todos })
                })
                .catch(() => {
                    showErrorMsg('Cannot Load Todos')
                })
            this.setEmptyListMsg(filterBy)
        },
        setEmptyListMsg({ isActive }) {
            if(isActive) this.emptyListMsg = 'No Active Todos'
            else if(isActive === false) this.emptyListMsg = 'No Todos Done (YET)'
            else this.emptyListMsg = 'No Todos Left'
        },
        removeTodo(todo) {
            todoService.remove(todo._id)
                .then(() => {
                    this.$store.commit({ type: 'removeTodo', todoId: todo._id })
                    this.$store.commit({ type: 'addActivity', txt: `Removed a Todo: '${todo.title}'` })
                    this.$store.commit({ type: 'resizeProgressBar' })
                    showSuccessMsg('Todo Removed')
                })
                .catch(() => {
                    showErrorMsg('Cannot Remove Todo')
                })
        },
        checkTodo(todo) {
            todoService.save(todo)
            this.$store.commit({ type: 'checkTodo', todoId: todo._id })
            this.$store.commit({ type: 'resizeProgressBar' })
            if(todo.isActive) {
                this.$store.commit({ type: 'addActivity', txt: `Unchecked a Todo: '${todo.title}'` })
                showSuccessMsg('You can do better!')
            } else {
                this.$store.commit({ type: 'addActivity', txt: `Checked a Todo: '${todo.title}'` })
                showSuccessMsg('Great job! Keep up the good work!') 
            }
        },
    },
    computed: {
        todos() {
            return this.$store.state.todos
        }
    },
    components: {
        Spinner,
        TodoEdit,
        TodoFilter,
        TodoSort,
        TodoList
    }
}