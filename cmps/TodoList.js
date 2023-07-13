import TodoPreview from '../cmps/TodoPreview.js'

export default {
    props: ['todos'],
    template: `
        <section class="todo-list">
            <ul class="clean-list">
                <li v-for="todo in todos">
                    <TodoPreview :todo="todo"/>
                </li>
            </ul>
        </section>
    `,
    methods: {
        
    },
    components: {
        TodoPreview
    }
}