export default {
    props: ['todo'],
    template: `
        <article class="todo-preview">
            <h3 :class="todoClass">{{ todo.title }}</h3>
        </article>
    `,
    methods: {
        
    },

    computed: {
        todoClass() {
            return {
                done: !this.todo.isActive
            }
        }
    }
}