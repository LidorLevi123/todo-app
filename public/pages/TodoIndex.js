import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

import Spinner from '../cmps/Spinner.js'
import TodoEdit from '../cmps/TodoEdit.js'
import TodoFilter from '../cmps/TodoFilter.js'
import TodoSort from '../cmps/TodoSort.js'
import TodoList from '../cmps/TodoList.js'

export default {
    template: `
        <section class="todo-index main-layout">
            <TodoEdit />
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
                @toggle-check="toggleCheckTodo"
                @change-page="changePage"
                :todos="todos"
                :emptyListMsg="emptyListMsg"
                :filterBy="filterBy"/>
                <section v-else class="Spinner">
                    <Spinner />
                </section>
        </section>
    `,

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
        }
    },

    methods: {
        setFilterBy(filterBy) {
            this.filterBy = { ...this.filterBy, ...filterBy }
            this.$store.dispatch({ type: 'loadTodos', filterBy: { ...this.filterBy } })
            this.setEmptyListMsg(filterBy)
        },
        setEmptyListMsg({ isActive }) {
            if (isActive) this.emptyListMsg = 'No Active Todos'
            else if (isActive === false) this.emptyListMsg = 'No Todos Done (YET)'
            else this.emptyListMsg = 'No Todos Left'
        },
        removeTodo(todo) {
            this.$store.dispatch({ type: 'removeTodo', todo})
                .then(() => showSuccessMsg('Todo Removed'))
                .catch(() => showErrorMsg('Couldn\'t remove todo'))
        },
        toggleCheckTodo(todo) {
            var msg = todo.isActive ? 'You can do better!' : 'Great job! Keep up the good work!'
            var activityTxt = todo.isActive ? `Unchecked a Todo: '${todo.title}'` : `Checked a Todo: '${todo.title}'`

            todo.isActive = !todo.isActive

            this.$store.dispatch({ type: 'toggleCheckTodo', todo, activityTxt})
                .then(() => showSuccessMsg(msg))
                .catch(() => showErrorMsg('Couldn\'t remove todo'))
        },
        changePage(dir) {
            const todosLength = this.todosCountMap.all
            const { pageSize, pageIdx } = this.filterBy

            if (pageIdx <= 0 && dir === -1) return
            else if (pageIdx >= Math.ceil(todosLength / pageSize) && dir === 1) return

            this.filterBy.pageIdx += dir
            this.$store.dispatch({ type: 'loadTodos', filterBy: { ...this.filterBy } })
        },
        togglePaging() {
            this.filterBy.isPagingUsed = !this.filterBy.isPagingUsed
            this.$store.dispatch({ type: 'loadTodos', filterBy: { ...this.filterBy } })
        },
    },
    computed: {
        todos() {
            return this.$store.getters.todos
        },
        todosCountMap() {
            return this.$store.getters.todosCountMap
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