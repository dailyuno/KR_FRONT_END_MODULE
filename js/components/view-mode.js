Vue.component('view-mode', {
    template: `
        <div id="view-mode">
            <transition
                :leave-active-class="leave"
                :enter-active-class="enter">
                <div
                    class="content"
                    v-if="page"
                    :key="currentPage">
                    <div v-html="page.html"></div>
                </div>
            </transition>

            <div class="controls">
                <template v-for="control in page.controls">
                    <button @click="movePage(control)">{{control.type}}</button>
                </template>
            </div>
        </div>
    `,
    props: {
        elements: Array,
        links: Array
    },
    data() {
        return {
            pages: [],
            currentPage: 'root',
            animation: 'fade'
        }
    },
    methods: {
        start(pages) {
            this.pages = pages;
        },

        movePage(control) {
            this.currentPage = control.id;
            this.animation = control.type;
        },

        findControls(id) {
            let items = [];

            this.links.forEach((x) => {
                let element;
                let node;

                if (x.origin.element.id === id) {
                    element = x.target.element;
                    node = x.origin.node;
                } else if (x.target.element.id === id) {
                    element = x.origin.element;
                    node = x.target.node;
                }

                if (element && node) {
                    items.push(Object.assign({}, element, {
                        type: node.type
                    }));
                }
            });

            return items;
        }
    },
    computed: {
        page() {
            return this.pages.find((x) => x.id === this.currentPage);
        },

        enter() {
            return `${this.animation}-enter`;
        },

        leave() {
            return `${this.animation}-leave`;
        }
    },
    created() {
        this.pages = this.elements.map((x) => {
            return Object.assign({}, x, {
                controls: this.findControls(x.id)
            });
        });

        console.log(this.pages);
    }
});