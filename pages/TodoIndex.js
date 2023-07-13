import { showSuccessMsg } from '../services/event-bus.service.js'

import TodoFilter from '../cmps/TodoFilter.js'
import TodoList from '../cmps/TodoList.js'

export default {
    template: `
        <section class="todo-index main-layout">
            <TodoFilter @filter="setFilterBy"/>
            <TodoList :todos="todos"/>
        </section>
    `,
    methods: {
        setFilterBy(filterBy) {
            
        }
    },
    computed: {
        todos() {
            return this.$store.state.todos
        }
    },
    components: {
        TodoFilter,
        TodoList
    }
}