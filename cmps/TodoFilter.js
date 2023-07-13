import { utilService } from "../services/util.service.js"

export default {
    template: `
        <section class="todo-filter">
			<input 
				placeholder="Search Todo" 
				type="text" 
				v-model="filterBy.title">

            <div class="filter">
                <span>
                    <input type="radio" id="all" name="filter" value="" v-model="filterBy.state" checked>
                    <label for="all">All</label>
                </span>
        
                <span>
                    <input type="radio" id="active" name="filter" value="active" v-model="filterBy.state">
                    <label for="active">Active</label>
                </span>
        
                <span>
                    <input type="radio" id="done" name="filter" value="done" v-model="filterBy.state">
                    <label for="done">Done</label>
                </span>
            </div>
        </section>
    `,

    data() {
        return {
            filterBy: {
                title: '',
                state: ''
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
