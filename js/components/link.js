Vue.component('app-link', {
    template: `
        <line
            :class="{selected: selected}"
            :x1="originPos.x + originCenter.x"
            :y1="originPos.y + originCenter.y"
            :x2="targetPos.x + targetCenter.x"
            :y2="targetPos.y + targetCenter.y"
            @click="$emit('selectLink')">
        </line>
    `,
    props: {
       origin: Object,
       target: Object,
       selected: Boolean
    },
    computed: {
        originPos() {
            return this.origin.element.pos;
        },
        targetPos() {
            return this.target.element.pos;
        },
        originCenter() {
            return this.origin.node.center;
        },
        targetCenter() {
            return this.target.node.center;
        }
    }
});