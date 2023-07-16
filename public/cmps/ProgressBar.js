export default {
    template: `
            <section class="progress-bar-outer" title="% of Done Todos">
                <div class="progress-bar-inner"><span></span></div>
            </section>
    `,

    methods: {
        resizeProgressBar() {
            const percentage = this.$store.getters.activeTodosPercentage
            const elProgressBars = document.querySelectorAll('.progress-bar-inner')

            elProgressBars.forEach(bar => {
                bar.style.width = `${percentage}%`
                bar.querySelector('span').innerText = `${parseInt(percentage)}%`
            })
        }
    },

    computed: {
        todos() {
            return this.$store.getters.todos
        },
    },

    watch: {
        todos: {
            deep: true,
            handler() {
                this.resizeProgressBar()
            },
        },
    },
}