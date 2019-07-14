/**
 * 2019 Kazan Gold Medal
 */
const app = new Vue({
    el: '#app',

    /**
     * App Data
     */
    data() {
        return {
            elements: [
                {
                    id: 'root',
                    pos: {
                        x: window.innerWidth / 2 - 50,
                        y: window.innerHeight / 2 - 50
                    },
                    mode: 0,
                    selected: false,
                    html: 'root'
                }
            ],

            links: [],

            selectedElement: null,

            selectedLink: null,

            clone: null,

            page: 'edit-mode'
        }
    },

    methods: {
        createElement(option = {}) {
            const element = {
                id: option.id || uuid(),
                pos: option.pos || {x: 0, y: 0},
                mode: option.mode || 0,
                selected: false,
                html: ''
            };

            this.elements.push(element);
            return element;
        },

        createLink(origin, target, id = uuid(), selected = false) {
            const link = {id, origin, target, selected};

            this.links.push(link);
            return link;
        },

        findElement(id) {
            return this.elements.find((x) => x.id === id);
        },

        findNode(id) {
            return NODES.find((x) => x.id === id);
        },

        findLink(id) {
            return this.links.find((x) => x.id === id);
        },

        selectElement(element) {
            this.elements.forEach(x => x.selected = false);
            element.selected = true;
        },

        selectLink(link) {
            this.links.forEach(x => x.selected = false);
            link.selected = true;
        },

        removeElement(id) {
            this.links = this.links.filter((x) => {
                return (x.origin.element.id !== id && x.target.element.id !== id);
            });
            this.elements.splice(this.elements.findIndex((x) => x.id === id), 1);
        },

        removeLink(id) {
            this.links.splice(this.links.findIndex((x) => x.id === id), 1);
        },

        onKeyEvent(ev) {
            if (ev.key == 'Delete') {
                const link = this.links.find((x) => x.selected === true);
                const element = this.elements.find(x => x.selected === true);

                if (element) this.removeElement(element.id);
                if (link) this.removeLink(link.id);
            }
        },

        linkToShape(obj) {
            return {
                element: this.findElement(obj.element),
                node: this.findNode(obj.node)
            }
        },

        itemToKey(element, node) {
            return {
                element: element.id,
                node: node.id
            };
        },

        existsLink(element, node) {
            return this.links.some(({ origin, target }) => (
                (origin.element === element && origin.node === node) ||
                (target.element === element && target.node === node)
            ));
        },

        showLink([element, node]) {
            if (this.existsLink(element.id, node.id)) return;

            let relationNode = this.findNode(node.relation);
            let relationElement = this.createElement({
                pos: {
                    x: element.pos.x + node.coordinate.x,
                    y: element.pos.y + node.coordinate.y
                }
            });

            this.createLink({element, node}, {
                element: relationElement,
                node: relationNode
            });
        },

        linking([element, node]) {
            if (!this.clone) return;

            const { element: cloneElement, node: cloneNode } = this.clone;

            if (cloneElement === element && cloneNode === node) return;
            if (this.existsLink(element.id, node.id)) return;
            if (this.existsLink(cloneElement.id, cloneNode.id)) return;

            this.createLink({
                element: cloneElement,
                node: cloneNode
            }, {element, node});
        },

        cloneItem([ev, element, node]) {
            const pos = {x: ev.pageX - 15, y: ev.pageY - 15};

            this.clone = {pos, element, node};
            draggable(ev, this.clone);
            this.elements.forEach(x => x.mode = 1);

            const removeClone = () => {
                this.clone = null;
                this.elements.forEach(x => x.mode = 0);
                document.removeEventListener('mouseup', removeClone);
            };

            document.addEventListener('mouseup', removeClone);
        },

        view() {
            this.page = 'view-mode';
        }
    },

    computed: {
        pages() {
            return this.elements.map((element) => {
                let controls = [];

                this.links.forEach((x) => {
                    let element;
                    let node;

                    if (x.origin.element === element.id) {
                        element = x.target.element;
                        node = x.origin.node;
                    }

                    if (x.target.element === element.id) {
                        element = x.origin.element;
                        node = x.target.node;
                    }

                    if (element && node) {
                        controls.push({element, node});
                    }
                });

                return Object.assign({}, element, {controls});
            });
        }
    },

    watch: {
        elements: {
            deep: true,
            handler() {
                localStorage.setItem('elements', JSON.stringify(this.elements));
            }
        },
        links: {
            deep: true,
            handler() {
                const links = this.links.map((x) => ({
                    ...x,
                    origin: this.itemToKey(x.origin.element, x.origin.node),
                    target: this.itemToKey(x.target.element, x.target.node)
                }));

                localStorage.setItem('links', JSON.stringify(links));
            }
        }
    },

    created() {
        if (localStorage.getItem('elements')) this.elements = JSON.parse(localStorage.getItem('elements'));
        if (localStorage.getItem('links')) {
            const links = JSON.parse(localStorage.getItem('links'));
            this.links = links.map(x => ({
                ...x,
                origin: this.linkToShape(x.origin),
                target: this.linkToShape(x.target)
            }));
        }

        document.addEventListener('keydown', this.onKeyEvent);
    }
})