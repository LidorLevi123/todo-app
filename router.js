import HomePage from './pages/HomePage.js'
import TodoIndex from './pages/TodoIndex.js'
import UserDetails from './pages/UserDetails.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),

	routes: [
		{
			path: '/',
			component: HomePage,
		},
		{
			path: '/todo',
			component: TodoIndex,
		},
		{
			path: '/user',
			component: UserDetails,
		},
	],
}

export const router = createRouter(routerOptions)