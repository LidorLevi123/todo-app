import ProgressBar from "./ProgressBar.js"

export default {
    template: `
        <header class="app-header main-layout">
            <RouterLink to="/" class="logo">
                <h1>Just <span>DO</span>IT</h1>
            </RouterLink>
            <ProgressBar/>
            <nav>
                <h5>
                    <img class="user-img" :src="'https://robohash.org/' + user.fullname + '/?set=set5'" alt="user.img">
                    <RouterLink to="/user" class="user">{{ user.fullname }}</RouterLink>
                </h5>
                <RouterLink to="/" @click="closeMenu">Home</RouterLink>
                <RouterLink to="/todo" @click="closeMenu">Todos</RouterLink>
            </nav>
            <img class="menu-img" src="assets/img/menu.png" alt="" @click="openMenu">
        </header>
    `,

    computed: {
        user() { return this.$store.getters.user },
    },

    methods: {
        openMenu() {
            document.body.classList.add('menu-open')
        },
        closeMenu() {
            document.body.classList.remove('menu-open')
        }
    },
    
    components: {
        ProgressBar
    }
}