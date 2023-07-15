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
		this.todoToAdd = todoService.getEmptyTodo()
	},

	methods: {
		save() {
			this.todoToAdd.createdAt = Date.now()
			todoService
				.save({ ...this.todoToAdd })
				.then(savedTodo => {
					this.$store.commit({ type: 'saveTodo', savedTodo })
					this.$store.commit({ type: 'addActivity', txt: `Added a Todo: '${savedTodo.title}'` })
					this.$store.commit({ type: 'resizeProgressBar' })
					showSuccessMsg('Todo Added!')
				})
				.catch(() => {
					showErrorMsg('Cannot save todo')
				})
		},
	},
}
