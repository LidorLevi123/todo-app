export default {
    template: `
        <header class="app-header main-layout">
            <h1>Todo App</h1>
            <div class="progress-bar-outer" title="% of Done Todos">
                <div class="progress-bar-inner"><span></span></div>
            </div>
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/todo">Todos</RouterLink>
            </nav>
            <h5>
                <RouterLink to="/user">{{ user.fullname }}</RouterLink>
            </h5>
        </header>
    `,

    computed: {
        user() { return this.$store.state.user },
    }
}