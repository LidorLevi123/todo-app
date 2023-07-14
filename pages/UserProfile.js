import { userService } from "../services/user.service.js"

import UserProfileEdit from "../cmps/UserProfileEdit.js"

export default {
    template: `
        <section class="user-profile main-layout">
            <div class="user-card">
                <img class="user-img" src="https://robohash.org/asd/?set=set5" alt="">
                <h1 class="user-name">{{ user.fullname }}</h1>
            </div>
            <UserProfileEdit @update-user="updateUser"/>
            <div>
                <ul v-if="user.activities.length" class="clean-list">
                    <li v-for="activity in user.activities">
                        <span>{{ activity.txt }}</span>
                        <span>{{ new Date(activity.at) }} </span>
                    </li>
                </ul>
                <h3 v-else>No activities yet...</h3>
            </div>
        </section>
    `,

    computed: {
        user() { return this.$store.state.user }
    },

    methods: {
        updateUser(settings) {
            this.$store.commit('updateUser', settings)
            this.$store.commit({ type: 'addActivity', txt: 'User changed his settings' })
        }
    },

    components: {
        UserProfileEdit
    }
}