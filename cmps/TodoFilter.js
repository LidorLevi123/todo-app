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
                    <input type="radio" id="all" name="filter" value="" @change="onSetFilterBy" checked>
                    <label for="all">All</label>
                </span>
        
                <span>
                    <input type="radio" id="active" name="filter" value="active" @change="onSetFilterBy">
                    <label for="active">Active</label>
                </span>
        
                <span>
                    <input type="radio" id="done" name="filter" value="done" @change="onSetFilterBy">
                    <label for="done">Done</label>
                </span>
            </div>
        </section>
    `,

    data() {
        return {
            filterBy: {
                title: '',
                isActive: false,
            },
        }
    },

    created() {
        this.filter = utilService.debounce(() => {
            this.$emit('filter', this.filterBy)
        }, 600)
    },

    methods: {
        onSetFilterBy(ev) {
            const { value } = ev.target
            if(value === 'active') this.filterBy.isActive = true
            else if(value === 'done') this.filterBy.isActive = false
            else this.filterBy.isActive = null
        }
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
