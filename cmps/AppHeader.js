export default {
    template: `
        <header class="app-header">
            <h1>Todo App</h1>
            <div class="progress-bar-outer">
                <div class="progress-bar-inner"><span></span></div>
            </div>
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/todo">Todos</RouterLink>
            </nav>
        </header>
    `,
}