const { createApp } = Vue

import { router } from './router.js'
import { store } from './store.js'

import { todoService } from './services/todo.service.js'

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
        todoService.query().then(todos => {
            this.$store.commit({ type: 'setTodos', todos })
            this.$store.commit({ type: 'resizeProgressBar' })
        })
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
