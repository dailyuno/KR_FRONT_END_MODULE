Vue.component('link-wrapper', {
    template: `
        <svg id="map">
            <template v-for="link in links">
                <app-link
                    :origin="link.origin"
                    :target="link.target"
                    :selected="link.selected"
                    @selectLink="$emit('selectLink', link)"/>
            </template>
        </svg>
    `,
    props: {
        links: Array
    },
    created() {
        console.log(this.links)
    }
});