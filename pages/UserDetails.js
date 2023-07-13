import { userService } from "../services/user.service.js"

export default {
    template: `
        <form @submit.prevent="addFunds" class="add-funds">
            <h3>Add Juba</h3>
            <input v-model="amount" type="number">
            <button>Add</button>
        </form>
        <section v-if="user.orders.length" class="user-details router-view">
            <ul>
                <li v-for="order in user.orders">
                    <pre>{{ order }}</pre>
                    <button @click="toggleOrderStatus(order._id)">
                        {{ order.status === 'Pending' ? 'Approve' : 'Cancel' }}
                    </button>
                </li>
            </ul>
        </section>
        <h3 v-else>No orders yet... Make your <RouterLink to="/shop">first one</RouterLink> </h3>
    `,
    data() {
        return {
            amount: 0,
        }
    },
    methods: {
        toggleOrderStatus(orderId) {
            userService.toggleOrderStatus(orderId)
                .then(() => {
                    this.$store.commit({ type: 'toggleOrderStatus', orderId })
                })
        },
        addFunds() {
            userService.addFunds(this.amount)
                .then(newBalance => {
                    this.$store.commit({ type: 'addFunds', amount: newBalance })
                    this.amount = 0
                })
        }
    },
    computed: {
        user() { return this.$store.state.user }
    }
}