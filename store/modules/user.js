import { userService } from '../../services/user.service.js'

export const userStore = {
    strict: true,

    state() {
        return {
            user: userService.getLoggedinUser(),
        }
    },

    mutations: {
        updateUser({ user }, settings) {
            user.fullname = settings.fullname
            user.prefs.color = settings.color
            user.prefs.bgColor = settings.bgColor
            userService.saveUserToStorage(user)
        },
        addActivity(state, { txt }) {
            const activity = {
                txt,
                at: Date.now()
            }
            state.user.activities.unshift(activity)
            userService.addActivity(activity)
        },
    },

    getters: {
        user({ user }) {
            return user
        }

    }
}