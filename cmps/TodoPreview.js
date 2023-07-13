export default {
    props: ['todo'],
    template: `
        <article class="todo-preview">
            <h3>{{ todo.title }}</h3>
        </article>
    `,
    methods: {
        
    },
}