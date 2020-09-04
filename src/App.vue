<template>
    <div id="app">
        <nav-mod class="m0"></nav-mod>
        <div id="root">
            <router-view />
        </div>

        <foot-mod class="m0"></foot-mod>
        <msgbox></msgbox>
    </div>
</template>

<script>
import nav from "@/components/nav/nav.vue";
import foot from "@/components/foot/foot.vue";
import { icon } from "@/config/config";
import msgbox from "@/components/msg/msg.vue";
export default {
    name: "App",
    components: {
        "nav-mod": nav,
        "foot-mod": foot,
        msgbox: msgbox,
    },
    created() {
        // 插入图标库
        // this.set();
    },
    methods: {
        set() {
            var script = document.createElement("link");
            script.rel = "stylesheet";
            script.type = "text/css";
            script.href = "https://at.alicdn.com/t/" + icon + ".css";
            document.head.appendChild(script);
        },
    },
};
</script>
<style lang="scss" >
/* 全局scss */
@charset "utf-8";
@import "./scss/style.scss";
* {
    margin: 0;
    padding: 0;
    font-size: 0.3rem;
    outline: none;
    text-decoration: none;
    list-style: none;
    box-sizing: border-box;
}
html {
    font-size: 0;
    /* 750px设计稿下 1rem = 100px */
    font-size: 13.333vw;
}
@media (min-width: 751px) {
    /* 此项目超过500无需适配 */
    html {
        /* 500为 */
        /* font-size: 106.666px; */
        /* 500 */
        font-size: 66.66px;
        /* font-size: 50px; */
        /* font-size: 16px; */
        /* font-size: 1rem; */
    }
}
#app {
    /* 336 366 633 */
    background: #366;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
#root {
    overflow: hidden;
    width: 7.5rem;
    margin: 0 auto;
    background: #fff;
    // min-height: calc(100vh);
    flex: 1;
    // overflow: auto;
    position: relative;
    background: #1e3070;
    // padding-bottom: 0.75rem;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}
::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.1);
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(0, 0, 0, 0.1);
    /* background-color: #941100  */
}
// @font-face {
// 	font-family: "NotoSansSC";
// 	src        : url('./static/NotoSansSC-Regular.otf');
// }

// body {
// 	font-family: "NotoSansSC";
// }
</style>
