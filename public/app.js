const { createApp } = Vue

import { router } from './router.js'
import { store } from './store/store.js'

import AppHeader from './cmps/AppHeader.js'
import AppFooter from './cmps/AppFooter.js'
import UserMsg from './cmps/UserMsg.js'
import BackDrop from './cmps/BackDrop.js'

const options = {
	template: `
        <section>
            <AppHeader />
            <RouterView />
            <AppFooter />
            <UserMsg />
            <BackDrop />
        </section>
    `,

    created() {
        this.$store.dispatch({ type: 'loadTodos' })
    },

	components: {
		AppHeader,
		AppFooter,
		UserMsg,
        BackDrop
	},
}

const app = createApp(options)

app.use(router)
app.use(store)

app.mount('#app')
