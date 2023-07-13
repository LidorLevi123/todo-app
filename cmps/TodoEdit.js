import { todoService } from '../services/todo.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export default {
	template: `
    <section v-if="todoToAdd" class="todo-edit">
        <form @submit.prevent="save" class="group">
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
			todoToAdd: null,
		}
	},

	created() {
		const { todoId } = this.$route.params
		if (!todoId) this.todoToAdd = todoService.getEmptyTodo()
		else {
			todoService
				.get(todoId)
				.then((todo) => {
					this.todoToAdd = todo
				})
				.catch(() => {
					showErrorMsg('Cannot load todo for edit')
				})
			}
	},

	methods: {
		save() {
			todoService
				.save({ ...this.todoToAdd })
				.then(savedTodo => {
					this.$store.commit({ type: 'saveTodo', savedTodo })
					showSuccessMsg('Todo Added!')
				})
				.catch(() => {
					showErrorMsg('Cannot save todo')
				})
		},
	},
}
