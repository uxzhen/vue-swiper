<template>
    <div class="foot m0 flex f0 f1" v-if="path.foot">
        <nav class="flex f0 f2">
            <router-link
                tag="div"
                v-for="(item,index) in list"
                :key="index"
                :to="item.path+`?id=`+item.active"
                class="tc item"
                @click.native="active=index"
            >
                <img :src="active==index?item.a_img:item.img" alt />
                <div
                    class="fs24"
                    style="color: #c4c4c4;"
                    :class="active==index?'active':''"
                >{{item.name}}</div>
            </router-link>
        </nav>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState(["path", "history"]),
    },
    data() {
        return {
            list: [
                {
                    name: "首页",
                    path: "/index",
                    img: require("@/assets/20.png"),
                    a_img: require("@/assets/21.png"),
                    active: 0,
                },
                // {
                //     name: "分享",
                //     path: "/share",
                //     img: require("@/assets/8.png"),
                //     a_img: require("@/assets/9.png"),
                //     active: 1,
                // },
                {
                    name: "个人中心",
                    path: "/me",
                    img: require("@/assets/10.png"),
                    a_img: require("@/assets/11.png"),
                    active: 1,
                },
            ],
            active: 0,
        };
    },
    watch: {
        $route() {
            // location.reload();
            this.set_active();
        },
    },
    mounted() {},
    created() {},
    methods: {
        set_active() {
            if (this.$route.query.id) {
                this.active = this.$route.query.id;
            } else {
                this.active = 0;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.foot {
    // width: 7.5rem;
    width: 100%;
    height: 0.98rem;
    position: fixed;
    bottom: 0;
    left: 0;
}
.active,
.router-link-exact-active {
    color: #282828 !important;
}

nav {
    width: 7.5rem;
    height: 0.98rem;
    background: #fff;
    border-top: 1px solid #c4c4c4;
    z-index: 999;
    > div {
        // padding: 0.1rem;
        img {
            display: inline-block;
            width: 0.44rem;
            height: 0.44rem;
        }
    }
}
</style>