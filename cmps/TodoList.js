import TodoPreview from '../cmps/TodoPreview.js'

export default {
    props: ['todos', 'emptyListMsg', 'filterBy'],
    template: `
        <section class="todo-list main-layout">
            <section v-show="filterBy.isPagingUsed" class="pagination">
				<button @click="onChangePage(-1)" class="cta">
    				<span class="hover-underline-animation"> Prev </span>
				</button>
				<span>{{ filterBy.pageIdx+1 }}</span>
				<button @click="onChangePage(1)" class="cta">
    				<span class="hover-underline-animation"> Next </span>
				</button>
            </section>
            <hr>
            <ul v-if="todos.length" class="clean-list">
                <li @click="onToggleCheckTodo(todo)" v-for="todo in todos">
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
        onToggleCheckTodo(todo) {
            this.$emit('toggle-check', { ...todo })
        },
        onChangePage(dir) {
            this.$emit('change-page', dir)
        }
    },

    components: {
        TodoPreview
    }
}