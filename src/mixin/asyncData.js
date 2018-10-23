export default {
    computed: {
        asyncData () {
            const componentTag = this.$options.name;
            return this.$store.state[componentTag] ? this.$store.state[componentTag].asyncData : {};
        }
    }
}
