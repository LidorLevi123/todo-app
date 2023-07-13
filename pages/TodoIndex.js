import { showSuccessMsg } from '../services/event-bus.service.js'

import Spinner from '../cmps/Spinner.js'

export default {
    template: `
        <section class="todo-index main-layout">
            <h1>Todos!</h1>
        </section>
    `,
    methods: {

    },
    computed: {
        
    },
    components: {
        Spinner,
    }
}