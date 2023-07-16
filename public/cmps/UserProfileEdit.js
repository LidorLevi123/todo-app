export default {
	template: `
        <form class="user-profile-edit" @submit.prevent="save">
            <label> 
                <span>Fullname: </span>
                <input type="text" placeholder="Enter name..." v-model="settings.fullname" required="">
            </label>
            <label> 
                <span>Color: </span>
                <input type="color" v-model="settings.color">
            </label>
            <label>
                <span>Background Color: </span>
                <input type="color" v-model="settings.bgColor">
            </label>
            <button type="submit">Apply</button>
        </form>
    `,

    data() {
        return {
            settings: {
                fullname: '',
                color: '#000000',
                bgColor: '#99dbf5'
            }
        }
    },

    methods: {
        save() {
            this.$emit('update-user', this.settings)
            document.body.style.color = this.settings.color
            document.body.style.backgroundColor = this.settings.bgColor
        }
    }
}