import ProgressBar from "./ProgressBar.js"

export default {
	template: `
        <footer class="app-footer main-layout">
            <div>
                <h5>Todos done:</h5>
                <ProgressBar/>
            </div>
            <small>&copy; By Lidor</small>
        </footer>
    `,

    components: {
        ProgressBar
    }
}
