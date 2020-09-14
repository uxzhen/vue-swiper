<template>
    <div>
        <div class="banner" :id="id">
            <div class="item">
                <div
                    class="imgs_container"
                    @touchstart="start"
                    @touchmove="move"
                    @touchend="end"
                    :style="boxStyle"
                    @mousedown="down"
                    @mousemove="pass"
                    @mouseup="up"
                    @mouseleave="up"
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
                <div>
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
    </div>
</template>
<script>
export default {
    props: {
        dataList: "",
        id: "",
    },
    watch: {},
    components: {},
    data() {
        return {
            currentIndex: 0, //默认显示图片
            timer: null, //定时器
            show_img: true,
            x_start: "",
            x_end: "",
            /* pc端是否按下 */
            if_down: false,
            boxStyle: {
                transitionDuration: "0s",
                transform: "translate(0,0)",
            },
            width: "",
            height: "",
        };
    },
    created() {
        this.runInv();
    },
    mounted() {
        /* 获取窗口大小 */
        this.get_window();
        /* 设置图片大小 */
        document.querySelector("#" + this.id + " .imgs_container").style.width =
            this.dataList.length * this.width + "px";
        for (let i = 0; i < this.dataList.length; i++) {
            document.querySelectorAll("#" + this.id + " img")[i].style.width =
                this.width + "px";
            document.querySelectorAll("#" + this.id + " img")[i].style.height =
                this.height + "px";
        }
    },
    methods: {
        start(e) {
            clearInterval(this.timer);
            this.boxStyle.transitionDuration = "0s";
            console.log(e.changedTouches[0].pageX);
            this.x_start = e.changedTouches[0].pageX;
        },
        end(e) {
            console.log(e.changedTouches[0].pageX);
            this.x_end = e.changedTouches[0].pageX;
            if (this.x_start == this.x_end) return false;
            this.tot(this.x_start, this.x_end);
        },
        tot(v1, v2) {
            if (v1 < v2) {
                console.log("左边");
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
            this.boxStyle.transform = `translate(${
                this.currentIndex * -this.width + "px"
            },0)`;
            this.runInv();
            console.log(this.currentIndex);
        },
        move(e) {
            this.boxStyle.transitionDuration = "0s";
            clearInterval(this.timer);
            this.x_end = e.changedTouches[0].pageX;
            this.boxStyle.transform = `translate(${
                this.x_end -
                this.x_start +
                this.currentIndex * -this.width +
                "px"
            },0)`;
        },
        down(e) {
            console.log(e);
            this.boxStyle.transitionDuration = "0s";
            clearInterval(this.timer);

            this.x_start = e.screenX;
            this.if_down = true;
        },
        up(e) {
            if (!this.if_down) return false;
            this.x_end = e.screenX;
            this.if_down = false;

            this.tot(this.x_start, this.x_end);
        },
        pass(e) {
            if (this.if_down) {
                this.boxStyle.transitionDuration = "0s";
                this.x_end = e.screenX;
                this.boxStyle.transform = `translate(${
                    this.x_end -
                    this.x_start +
                    this.currentIndex * -this.width +
                    "px"
                },0)`;
            }
        },
        gotoPage(index) {
            this.currentIndex = index;
            this.boxStyle.transitionDuration = ".5s";
            this.boxStyle.transform = `translate(${
                this.currentIndex * -this.width + "px"
            },0)`;
            // this.go();
        },
        //定时器
        runInv() {
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
        /*    获取窗口高度 */
        get_window() {
            this.width = document
                .querySelector("#" + this.id)
                .getBoundingClientRect().width;
            this.height = document
                .querySelector("#" + this.id)
                .getBoundingClientRect().height;
            console.log("轮播图窗口大小" + this.width + " x " + this.height);
        },
    },
    computed: {
        /* 计算超出是否超出下标 */
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
.banner {
    font-size: 0;
    width: 100%;
    height: 100%;
    position: relative;
}
.item {
    min-width: 100%;
    min-height: 100%;
    position: relative;
    // overflow: auto;
    // overflow-y: hidden;
    transition: 1.5s;
    overflow: hidden;
    cursor: grab;
    &:active {
        cursor: grabbing;
    }
    > .imgs_container {
        // display: inline-block;
        // width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        transition: 1s;
        img {
            // display: inline-block;
            // width: 100%;
            // height: 100%;
            object-fit: cover;
        }
    }
}
.item:active .swiper_button_top {
    pointer-events: none;
}
.swiper_button_top {
    display: inline-block;
    height: 20px;
    font-size: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 30px;
    left: 0%;
    width: 100%;
    > div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .swiper_button {
        width: 20px;
        height: 20px;
        display: inline-block;
        margin: 0 10px;
        background: #a0a0a0;
        border-radius: 50%;
        cursor: pointer;
    }
    .current {
        background: #fff;
    }
}
</style>
