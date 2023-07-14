export default {
    template: `
        <header class="app-header main-layout">
        <RouterLink to="/" class="logo">
            <h1>Just <span>DO</span>IT</h1>
        </RouterLink>
            <div class="progress-bar-outer" title="% of Done Todos">
                <div class="progress-bar-inner"><span></span></div>
            </div>
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/todo">Todos</RouterLink>
            </nav>
            <h5>
                <img class="user-img" :src="'https://robohash.org/' + user.fullname + '/?set=set5'" alt="user.img">
                <RouterLink to="/user" class="user">{{ user.fullname }}</RouterLink>
            </h5>
        </header>
    `,

    computed: {
        user() { return this.$store.state.user },
    }
}