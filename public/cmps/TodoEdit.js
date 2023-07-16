import { todoService } from '../services/todo.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export default {
	template: `
    <section v-if="todoToAdd" class="todo-edit">
        <form @submit.prevent="addTodo" class="group">
            <input v-model="todoToAdd.title" required="" type="text" class="input">
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>What needs to be done?</label>
			<button class="btn-add">Add</button>
        </form>
    </section>
    `,
	data() {
		return {
			todoToAdd: todoService.getEmptyTodo(),
		}
	},

	methods: {
		addTodo() {
			this.todoToAdd.createdAt = Date.now()

			this.$store.dispatch({ type: 'addTodo', todo: this.todoToAdd })
				.then(() => {
					showSuccessMsg('Todo Added!')
					this.todoToAdd = todoService.getEmptyTodo()
				})
				.catch(() => showErrorMsg('Couldn\'t add todo'))
		},
	},
}
