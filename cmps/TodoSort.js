import { utilService } from "../services/util.service.js"

export default {
    template: `
        <section class="todo-sort">
            <select v-model="filterBy.sortBy" id="sort-select">
                <option value="">Sort by</option>
                <option value="title">Name</option>
                <option value="active">Active</option>
                <option value="at">Time Created</option>
            </select>
            <div>
                <input v-model="filterBy.isDescending" type="checkbox" id="sort-descending" />
                <label for="sort-descending">Descending</label>
            </div>
        </section>
    `,

    data() {
        return {
            filterBy: {
                sortBy: '',
                isDescending: false
            }
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