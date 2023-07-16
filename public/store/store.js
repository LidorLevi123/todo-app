const { createStore } = Vuex

import { todoStore } from "./modules/todo.js"
import { userStore } from "./modules/user.js"

const storeOptions = {
    strict: true,

    modules: {
        todoStore,
        userStore,
    }
}

export const store = createStore(storeOptions)