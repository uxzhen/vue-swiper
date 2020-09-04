<template>
    <div>
        <div class="banner">
            <div class="item">
                <div
                    class="imgs_c"
                    @touchstart="a"
                    @touchmove="c"
                    @touchend="b"
                    :style="boxStyle"
                    @mousedown="e"
                    draggable="false"
                >
                    <img
                        draggable="false"
                        v-for="(item,index) in dataList"
                        :key="index"
                        class="imgs"
                        :src="item.img"
                        alt
                    />
                </div>
            </div>

            <div class="swiper_button_top">
                <li
                    v-for="(item,index) in dataList"
                    @click="gotoPage(index)"
                    @mouseenter="enter(index)"
                    @mouseleave="leave()"
                    class="swiper_button"
                    :class="{'current':currentIndex == index}"
                    :key="index"
                ></li>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        dataList: "",
    },
    watch: {},
    components: {},
    data() {
        return {
            currentIndex: 0, //默认显示图片
            timer: null, //定时器
            show_img: true,
            t1: "",
            t2: "",
            t3: "",
            boxStyle: {
                transitionDuration: "0s",
                transform: "translate(0,0)",
            },
        };
    },
    created() {
        this.runInv();
    },
    mounted() {
        let img = document.querySelector(".imgs_c");
        img.style.width = this.dataList.length * 7.02 + "rem";
        console.log(img.style.width);
    },
    methods: {
        a(e) {
            this.boxStyle.transitionDuration = "0s";
            console.log(e.changedTouches[0].pageX);
            this.t1 = e.changedTouches[0].pageX;
            // console.log(e.changedTouches[0].screenY);
        },
        b(e) {
            console.log(e.changedTouches[0].pageX);
            this.t2 = e.changedTouches[0].pageX;
            // console.log(e.changedTouches[0].pageX - this.t1);
            // console.log(e.changedTouches[0].screenY);
            this.tot(this.t1, this.t2);
        },
        tot(v1, v2) {
            if (v1 < v2) {
                console.log("左边");
                // let img = document.querySelector(".imgs_c");
                if (this.currentIndex != 0) {
                    this.currentIndex--;
                }
            } else {
                console.log("右边");
                if (this.currentIndex != this.dataList.length - 1) {
                    this.currentIndex++;
                }
            }
            this.go();
        },
        go(val) {
            this.boxStyle.transitionDuration = ".5s";
            // console.log(this.t1 - this.t2);
            this.boxStyle.transform = `translate(${
                this.currentIndex * -7.02 + "rem"
            },0)`;
            this.runInv();
        },
        c(e) {
            this.boxStyle.transitionDuration = "0s";
            clearInterval(this.timer);
            // console.log(e.changedTouches[0].pageX);
            this.t2 = e.changedTouches[0].pageX;
            this.boxStyle.transform = `translate(${
                (this.t2 - this.t1) / 100 + this.currentIndex * -7.02 + "rem"
            },0)`;
        },
        d(e) {},
        e(e) {
            console.log(e);
        },
        gotoPage(index) {
            this.currentIndex = index;
            this.boxStyle.transitionDuration = ".5s";
            // console.log(this.t1 - this.t2);
            this.boxStyle.transform = `translate(${
                this.currentIndex * -7.02 + "rem"
            },0)`;
            // this.go();
        },
        //定时器
        runInv() {
            // clearInterval(this.timer)
            this.timer = setInterval(() => {
                this.gotoPage(this.nextIndex);
            }, 2500);
        },
        // 鼠标移入
        enter(index) {
            this.currentIndex = index;
            clearInterval(this.timer);
        },
        // 鼠标挪出
        leave() {
            this.runInv();
        },
    },
    computed: {
        //上一张
        prevIndex() {
            if (this.currentIndex == 0) {
                return this.dataList.length - 1;
            } else {
                return this.currentIndex - 1;
            }
        },
        //下一张
        nextIndex() {
            if (this.currentIndex == this.dataList.length - 1) {
                return 0;
            } else {
                return this.currentIndex + 1;
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.page-enter-active,
.page-leave-active {
    // opacity: 1;
    transition: 2s;
}

.page-enter,
.page-leave-active {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 1s ease;
}

.fade-enter-active {
    opacity: 1;
}

.fade-leave-active {
    opacity: 1;
}

/* .fade-enter需要放在.fade-enter-active的后面 */
.fade-enter {
    opacity: 0;
}

.aadd-enter-active {
    animation: identifier 2s;
}

.aadd-leave-active {
    animation: against 2s;
}

@keyframes identifier {
    from {
        // transform : translateY(0%);
        opacity: 100%;
    }

    to {
        // transform : translateY(-100%);
        opacity: 0%;
    }
}

@keyframes against {
    from {
        // transform : translateY(-100%);
        opacity: 0%;
    }

    to {
        // transform : translateY(0%);
        opacity: 100%;
    }
}

.banner {
    font-size: 0;
}

.item {
    width: 7.02rem;
    height: 7.71rem;
    position: relative;
    // overflow: auto;
    // overflow-y: hidden;
    transition: 1.5s;
    overflow: hidden;
    > .imgs_c {
        width: 7.02rem;
        height: 7.71rem;

        position: absolute;
        left: 0;
        transition: 1s;
        img {
            width: 7.02rem;
            height: 7.71rem;
        }
    }
}

.swiper_button_top {
    display: inline-block;
    height: 0.5rem;
    font-size: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .swiper_button {
        width: 0.26rem;
        height: 0.06rem;
        display: inline-block;
        margin: 0.1rem 0.03rem;
        background: #d2d2d2;
        border-radius: 0.03rem;
        cursor: pointer;
    }

    .current {
        background: #000;
    }
}
</style>