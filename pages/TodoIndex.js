import { showSuccessMsg } from '../services/event-bus.service.js'

import TodoList from '../cmps/TodoList.js'

export default {
    template: `
        <section class="todo-index main-layout">
            <TodoList :todos="todos"/>
        </section>
    `,
    methods: {

    },
    computed: {
        todos() {
            return this.$store.state.todos
        }
    },
    components: {
        TodoList
    }
}