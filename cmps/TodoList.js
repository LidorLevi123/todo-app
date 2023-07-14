import TodoPreview from '../cmps/TodoPreview.js'

export default {
    props: ['todos', 'emptyListMsg'],
    template: `
        <section class="todo-list main-layout">
            <ul v-if="todos.length" class="clean-list">
                <li @click="onCheckTodo(todo)" v-for="todo in todos">
                    <TodoPreview :todo="todo"/>
                    <i class="btn-remove fa fa-sharp fa-light fa-circle-xmark" 
                       title="Remove Todo"
                       @click="onRemoveTodo(todo, $event)"></i>
                </li>
            </ul>
            <h3 v-else>{{ emptyListMsg }}</h3>
        </section>
    `,

    methods: {
        onRemoveTodo(todo, ev) {
            ev.stopPropagation()
            this.$emit('remove', todo)
        },
        onCheckTodo(todo) {
            this.$emit('check', todo)
        }
    },

    components: {
        TodoPreview
    }
}