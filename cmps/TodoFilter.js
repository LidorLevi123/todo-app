import { utilService } from "../services/util.service.js"

export default {
    props: ['todosCountMap'],

    template: `
        <section class="todo-filter">
			<input 
				placeholder="Search Todo" 
				type="text" 
				v-model="filterBy.title">

            <div class="filter">
                <span>
                    <input type="radio" id="all" name="filter" value="" @change="onSetFilterBy" checked>
                    <label for="all">All <span v-if="todosCountMap">({{ todosCountMap.all }})</span></label>
                </span>
        
                <span>
                    <input type="radio" id="active" name="filter" value="active" @change="onSetFilterBy">
                    <label for="active">Active <span v-if="todosCountMap">({{ todosCountMap.active }})</span></label>
                </span>
        
                <span>
                    <input type="radio" id="done" name="filter" value="done" @change="onSetFilterBy">
                    <label for="done">Done <span v-if="todosCountMap">({{ todosCountMap.done }})</span></label>
                </span>
            </div>
        </section>
    `,

    data() {
        return {
            filterBy: {
                title: '',
                isActive: null,
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
