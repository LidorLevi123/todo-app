import TodoPreview from '../cmps/TodoPreview.js'

export default {
    props: ['todos'],
    template: `
        <section class="todo-list main-layout">
            <ul class="clean-list">
                <li v-for="todo in todos">
                    <TodoPreview :todo="todo"/>
                    <i class="btn-remove fa fa-sharp fa-light fa-circle-xmark" 
                       title="Remove Todo"
                       @click="onRemoveTodo(todo._id)"></i>
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
        onRemoveTodo(todoId) {
            this.$emit('remove', todoId)
        }
    },

    components: {
        TodoPreview
    }
}