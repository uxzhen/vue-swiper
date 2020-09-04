<template>
    <nav class="flex f0 f3" v-if="path.title">
        <div class="flex1 bt">
            <i class="icon icondenglu_fanhui fz30" @click="r_back()" v-show="back"></i>
        </div>
        <div class="flex1 tc fz28">{{path.name}}</div>
        <div class="flex1"></div>
    </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            title: "加载中",
            back: true,
        };
    },
    computed: {
        ...mapState(["path", "history"]),
    },
    created() {},
    watch: {
        $route(newd, oldd) {
            if (
                newd.path == "/index" ||
                newd.path == "/me" ||
                newd.path == "/share"
            ) {
                this.back = false;
            } else {
                this.back = true;
            }
            // console.log(this.back, newd.path, oldd.path);
        },
    },
    methods: {
        r_back() {
            // this.$router.go(-1);
            // return false;
            if (this.history.length <= 1) {
                this.$router.push("/index");
            } else {
                this.$router.go(-1);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
nav {
    width: 7.5rem;
    height: 0.75rem;
    background: #8490fa;
    position: sticky;
    color: #fff;
    font-weight: bold;
    top: 0;
    z-index: 99;
    > div {
        height: 100%;
        line-height: 0.75rem;
    }
    i {
        display: inline-block;
        height: 0.75rem;
        width: 0.75rem;
        padding-left: 0.2rem;
        padding-right: 1rem;
    }
}
</style>