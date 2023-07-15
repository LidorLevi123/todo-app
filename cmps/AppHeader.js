import ProgressBar from "./ProgressBar.js"

export default {
    template: `
        <header class="app-header main-layout">
            <RouterLink to="/" class="logo">
                <h1>Just <span>DO</span>IT</h1>
            </RouterLink>
            <ProgressBar/>
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
    },
    
    components: {
        ProgressBar
    }
}