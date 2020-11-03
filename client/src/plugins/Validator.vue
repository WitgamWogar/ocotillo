<script>
    export default {
        data() {
            return {
                errors: {},
            }
        },
        methods: {
            get(fieldKey) {
                return this.errors[fieldKey];
            },
            add(error) {
                this.$set(this.errors, error.field, error.msg);
            },
            clear(field = null) {
                if (field) {
                    delete this.errors[field];
                } else {
                    this.errors = {};
                }
            }
        },
    };
</script>
