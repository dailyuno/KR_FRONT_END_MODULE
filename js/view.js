const view = new Vue({
    el: '#view-mode',

    data() {
        return {
            pages: [],
            mode: false,
            currentPage: 'root',
            animation: 'fade'
        }
    },

    methods: {
        restart() {
            this.currentPgae = 'root';
        },

        start(pages) {
            this.pages = pages;
            this.currentPage = 'root';
            this.mode = true;
        }
    },

    computed: {
        page() {
            return this.pages.find((x) => x.id === this.currentPage);
        },
        enter() {

        },
        leave() {

        }
    }
});