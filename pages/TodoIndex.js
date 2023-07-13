import { showSuccessMsg } from '../services/event-bus.service.js'
import { todoService } from '../services/todo.service.js'

import TodoEdit from '../cmps/TodoEdit.js'
import TodoFilter from '../cmps/TodoFilter.js'
import TodoList from '../cmps/TodoList.js'

export default {
    template: `
        <section class="todo-index">
            <TodoEdit/>
            <TodoFilter @filter="setFilterBy"/>
            <TodoList 
                @remove="removeTodo"
                @check="checkTodo"
                :todos="todos"/>
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
                showSuccessMsg('Todo Removed')
            })
        },
        checkTodo(todo) {
            this.$store.commit({ type: 'checkTodo', todoId: todo._id })
            todo.isActive ? 
                showSuccessMsg('You can do better!') :
                showSuccessMsg('Great job! Keep up the good work!') 
        }
    },
    computed: {
        todos() {
            return this.$store.state.todos
        }
    },
    components: {
        TodoEdit,
        TodoFilter,
        TodoList
    }
}