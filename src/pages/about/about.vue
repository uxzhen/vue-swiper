<template>
    <div>
        <div>
			
		</div>
    </div>
</template>

<script>
export default {
    methods: {
        dd() {
            this.$router.push(`/`);
        },
    },
    created() {
        this.$store.commit("upPath", "/");
    },
};
</script>

<style lang="scss" scoped>
</style>