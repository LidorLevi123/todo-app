import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { todoService } from '../services/todo.service.js'

import Spinner from '../cmps/Spinner.js'
import TodoEdit from '../cmps/TodoEdit.js'
import TodoFilter from '../cmps/TodoFilter.js'
import TodoSort from '../cmps/TodoSort.js'
import TodoList from '../cmps/TodoList.js'

export default {
    template: `
        <section class="todo-index">
            <TodoEdit @todo-added="loadTodos"/>
            <TodoFilter @filter="setFilterBy" :todosCountMap="todosCountMap"/>
            <TodoSort @filter="setFilterBy"/>
            <div class="use-paging">
                <h4>Use paging?</h4>
                <label class="switch">
                    <input type="checkbox" @click="togglePaging">
                    <span class="slider"></span>
                </label>
            </div>
            <TodoList
                v-if="todos" 
                @remove="removeTodo"
                @check="checkTodo"
                @change-page="changePage"
                :todos="todos"
                :emptyListMsg="emptyListMsg"
                :filterBy="filterBy"/>
                <section v-else class="Spinner">
                    <Spinner />
                </section>
        </section>
    `,

    created() {
        todoService.getTodosCountMap()
            .then(map => this.todosCountMap = map)
    },

    data() {
        return {
            emptyListMsg: '',
            filterBy: {
                pageSize: 5,
                pageIdx: 0,
                isPagingUsed: false,
                title: '',
                isActive: null,
                sortBy: '',
                isDescending: false
            },
            todosCountMap: null
        }
    },

    methods: {
        loadTodos() {
            todoService.query(this.filterBy)
                .then(todos => {
                    this.$store.commit({ type: 'setTodos', todos })
                })
                .catch(() => {
                    showErrorMsg('Cannot Load Todos')
                })
            todoService.getTodosCountMap()
                .then(map => this.todosCountMap = map)
        },
        setFilterBy(filterBy) {
            this.filterBy = { ...this.filterBy, ...filterBy }
            this.loadTodos()
            this.setEmptyListMsg(filterBy)
        },
        setEmptyListMsg({ isActive }) {
            if (isActive) this.emptyListMsg = 'No Active Todos'
            else if (isActive === false) this.emptyListMsg = 'No Todos Done (YET)'
            else this.emptyListMsg = 'No Todos Left'
        },
        removeTodo(todo) {
            todoService.remove(todo._id)
                .then(() => {
                    this.$store.commit({ type: 'removeTodo', todoId: todo._id })
                    this.$store.commit({ type: 'addActivity', txt: `Removed a Todo: '${todo.title}'` })
                    this.$store.commit({ type: 'resizeProgressBar' })
                    showSuccessMsg('Todo Removed')
                    todoService.getTodosCountMap()
                        .then(map => this.todosCountMap = map)
                })
                .catch(() => {
                    showErrorMsg('Cannot Remove Todo')
                })
        },
        checkTodo(todo) {
            todoService.save(todo)
                .then(() => {
                    todoService.getTodosCountMap()
                        .then(map => this.todosCountMap = map)
                })
            this.$store.commit({ type: 'checkTodo', todoId: todo._id })
            this.$store.commit({ type: 'resizeProgressBar' })
            if (todo.isActive) {
                this.$store.commit({ type: 'addActivity', txt: `Unchecked a Todo: '${todo.title}'` })
                showSuccessMsg('You can do better!')
            } else {
                this.$store.commit({ type: 'addActivity', txt: `Checked a Todo: '${todo.title}'` })
                showSuccessMsg('Great job! Keep up the good work!')
            }
        },
        changePage(dir) {
            const todos = this.$store.state.todos
            const { pageSize, pageIdx } = this.filterBy

            if (pageIdx <= 0 && dir === -1) return
            else if (pageIdx >= Math.ceil(todos.length / pageSize) && dir === 1) return

            this.filterBy.pageIdx += dir
            this.loadTodos()
        },
        togglePaging() {
            this.filterBy.isPagingUsed = !this.filterBy.isPagingUsed
            this.loadTodos()
        },
    },
    computed: {
        todos() {
            return this.$store.state.todos
        },
    },
    components: {
        Spinner,
        TodoEdit,
        TodoFilter,
        TodoSort,
        TodoList
    }
}