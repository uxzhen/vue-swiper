<template>
    <div class="html">
        <div class="flex fd">
            <div class="logo tc">
                <swiper :dataList="dataList"></swiper>
            </div>
        </div>
    </div>
</template>

<script>
import swiper from "@/components/swiper/swiper1";
export default {
    data() {
        return {
            menu: [
                {
                    name: "首页",
                    path: "/",
                    icon: "icon iconmokao",
                    bg: " #ff4300 46%;",
                },
                {
                    name: "首页",
                    path: "/",
                    icon: "icon iconkecheng",
                    bg: " #F2BA07 27% ;",
                },
                {
                    name: "首页",
                    path: "/",
                    icon: "icon icondangan",
                    bg: "#53841D 47%",
                },
            ],
            dataList: [
                { img: require("@/assets/24.png") },
                { img: require("@/assets/4.png") },
                { img: require("@/assets/12.png") },
            ],
        };
    },
    components: {
        swiper: swiper,
    },
    created() {},
    methods: {
        dd() {
            this.$router.push(`/about`);
        },
    },
};
</script>

<style lang="scss" scoped>
.logo {
    width: 7.02rem;
    height: 7.71rem;
    background: #8490fa;
    margin: 0.55rem auto;
}
.menu {
    .item {
        width: 2.28rem;
        height: 2.28rem;
        border-radius: 0.1rem;
        i {
            font-size: 0.6rem;
        }
    }
    .title {
        margin: 0.3rem;
    }
}
.html {
    height: 100%;
    background: #fff;
    min-height: calc(100vh - 0.75rem - 0.98rem);
}
</style>