export default {
    props: ['todos'],
    template: `
        <section class="todo-list">
            <ul class="clean-list">
                <li v-for="todo in todos">
                    <pre>{{ todo }}</pre>
                </li>
            </ul>
        </section>
    `,
    methods: {
        
    },
    components: {
        
    }
}