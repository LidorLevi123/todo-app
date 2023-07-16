import HomePage from './pages/HomePage.js'
import TodoIndex from './pages/TodoIndex.js'
import UserProfile from './pages/UserProfile.js'

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
			component: UserProfile,
		},
	],
}

export const router = createRouter(routerOptions)