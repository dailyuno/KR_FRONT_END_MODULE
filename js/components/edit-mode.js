Vue.component('edit-mode', {
    template: `
        <div class="edit-mode">
            <!------------------- Link Wrapper -------------------->
            <link-wrapper 
                :links="links" 
                @selectLink="$emit('select-link', $event)">
            </link-wrapper>
            <!-------------------- //Link Wrapper -------------------->
            
            <!------------------- Element Wrapper -------------------->
            <element-wrapper 
                :elements="elements"
                :clone="clone"
                @selectElement="handleSelect"
                @showLink="$emit('show-link', $event)"
                @linking="$emit('linking', $event)"
                @cloneItem="$emit('clone-item', $event)">
            </element-wrapper>
            <!------------------- //Element Wrapper -------------------->
        </div>
    `,
    props: {
        links: Array,
        elements: Array,
        clone: Object
    },
    methods: {
        handleSelect(element) {
            this.$emit('select-element', element);
        }
    }
});