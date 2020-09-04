<template>
    <div class="root flex f0 f1">
        <video autoplay="autoplay" @click="play">
            <source src="http://img.a2dc.cn/1.mp4" type="video/mp4" />
        </video>
        <img class="play" src="@/assets/18.png" alt @click="play" v-if="!auto" />
        <div class="next" @click="next()">
            <img src="@/assets/29.png" alt />
            <div>点此进入</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            auto: false,
        };
    },
    created() {},
    methods: {
        play() {
            this.auto = !this.auto;
            var video_change = document.querySelector("video");

            if (this.auto) {
                video_change.play();
            } else {
                video_change.pause();
            }
        },
        next() {
            if (window.localStorage.token) {
                this.$router.push("/index?id=0");
            } else {
				// this.$router.push("/register");
				this.$router.push("/index?id=0");
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.root {
    height: 100vh;
}
video {
    height: 100vh;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
}
.play {
    z-index: 2;
    width: 0.56rem;
    height: 0.56rem;
    /* transform: 0.52s;/ */
    transition: all 0.2s;
}
.next {
    img {
        width: 0.64rem;
        height: 0.64rem;
        margin-bottom: 0.1rem;
    }
    text-align: center;
    position: absolute;
    bottom: 20%;
    font-size: 0.28rem;
    color: #a6a6a6;
    z-index: 999;
}
</style>