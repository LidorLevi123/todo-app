import { showSuccessMsg } from '../services/event-bus.service.js'
import { todoService } from '../services/todo.service.js'
import { utilService } from '../services/util.service.js'

import Spinner from '../cmps/Spinner.js'
import TodoEdit from '../cmps/TodoEdit.js'
import TodoFilter from '../cmps/TodoFilter.js'
import TodoList from '../cmps/TodoList.js'

export default {
    template: `
        <section class="todo-index">
            <TodoEdit/>
            <TodoFilter @filter="setFilterBy"/>
            <TodoList
                v-if="todos" 
                @remove="removeTodo"
                @check="checkTodo"
                :todos="todos"/>
                <section v-else class="Spinner">
                    <Spinner />
                </section>
        </section>
    `,

    methods: {
        setFilterBy(filterBy) {
            todoService.query(filterBy).then(todos => {
                this.$store.commit({ type: 'setTodos', todos })
            })
        },
        removeTodo(todoId) {
            todoService.remove(todoId).then(() => {
                this.$store.commit({ type: 'removeTodo', todoId })
                this.$store.commit({ type: 'resizeProgressBar' })
                showSuccessMsg('Todo Removed')
            })
        },
        checkTodo(todo) {
            todoService.save(todo)
            this.$store.commit({ type: 'checkTodo', todoId: todo._id })
            this.$store.commit({ type: 'resizeProgressBar' })
            todo.isActive ? 
                showSuccessMsg('You can do better!') :
                showSuccessMsg('Great job! Keep up the good work!') 
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
        TodoList
    }
}