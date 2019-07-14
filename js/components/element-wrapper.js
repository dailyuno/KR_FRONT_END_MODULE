Vue.component('element-wrapper', {
    template: `
        <div class="element-wrapper">
            <!-------------------- Elements -------------------->
            <template v-for="element in elements">
                <app-element
                    :element="element"
                    @selectElement="handleSelect">
                    
                    <div class="nodes">
                        <template v-for="node in nodes">
                            <div
                                class="node"
                                :data-id="node.id"
                                @click="$emit('showLink', [element, node])"
                                @mousedown.shift.stop="$emit('cloneItem', [event, element, node])"
                                @mouseup="$emit('linking', [element, node])">
                                <span>{{node.id}}</span>
                            </div>
                        </template>
                    </div>
                </app-element>
            </template>
            <!-------------------- //Elements -------------------->
    
            <!-------------------- Clone Element -------------------->
            <transition name="fade">
                <div class="clone"
                    v-if="clone"
                    :style="{left: clone.pos.x + 'px', top: clone.pos.y + 'px'}">
                    {{clone.node.id}}
                </div>
            </transition>
            <!-------------------- //Clone Element -------------------->
        </div>
    `,
    props: {
        elements: Array,
        clone: Object
    },
    data() {
        return {
            nodes: NODES
        }
    },
    methods: {
        handleSelect(element) {
            this.$emit('selectElement', element);
        }
    }
});