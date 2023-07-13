import { utilService } from "../services/util.service.js"

export default {
	template: `
        <fieldset class="todo-filter">
			<legend>Search Todo</legend>
			<input 
				placeholder="Enter Todo's Title" 
				type="text" 
				v-model="filterBy.title">
        </fieldset>
    `,

	data() {
		return {
			filterBy: {
				title: '',
			},
		}
	},

	created() {
		this.filter = utilService.debounce(() => {
			this.$emit('filter', this.filterBy)
		}, 600)
	},

	watch: {
		filterBy: {
			handler() {
				this.filter()
			},
			deep: true,
		},
	},
}
