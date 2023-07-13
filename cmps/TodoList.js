import TodoPreview from '../cmps/TodoPreview.js'

export default {
    props: ['todos'],
    template: `
        <section class="todo-list main-layout">
            <ul class="clean-list">
                <li @click="onCheckTodo(todo)" v-for="todo in todos">
                    <TodoPreview :todo="todo"/>
                    <i class="btn-remove fa fa-sharp fa-light fa-circle-xmark" 
                       title="Remove Todo"
                       @click="onRemoveTodo(todo._id, $event)"></i>
                </li>
            </ul>
        </section>
    `,
    data() {
        return {
            isMouseOver: false
        }
    },

    methods: {
        onRemoveTodo(todoId, ev) {
            ev.stopPropagation()
            this.$emit('remove', todoId)
        },
        onCheckTodo(todo) {
            this.$emit('check', todo)
        }
    },

    components: {
        TodoPreview
    }
}