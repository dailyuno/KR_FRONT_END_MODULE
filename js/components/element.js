Vue.component('app-element', {
    template: `
        <div 
            class="element"
            :class="{selected: isSelected}"
            :style="position"
            @dblclick="handleSelect"
            @mousedown="draggable">
            <slot></slot>
        </div>
    `,
    props: {
        element: Object
    },
    methods: {
        draggable(ev) {
            if (this.isSelected) return;

            draggable(ev, this.element);
        },
        handleSelect() {
            this.$emit('selectElement', this.element);
        }
    },
    computed: {
        pos() {
            return this.element.pos;
        },
        position() {
            return `left: ${this.pos.x}px; top: ${this.pos.y}px`;
        },
        isSelected() {
            return this.element.selected || this.element.mode === 1
        }
    }
})