<template>
    <div>
        <div class="banner">
            <div class="item">
                <div v-for="(item,index) in dataList" :key="index">
                    <transition name="page">
                        <a :href="item.jump_href" v-show="currentIndex==index">
                            <img class="imgs" :src="item.img" alt />
                        </a>
                    </transition>
                </div>
            </div>
            <!-- <div class="fade" v-if="this.dataList.length > 1">
                <ul>
                    <li @click="gotoPage(prevIndex)">&lt;</li>

                    <li
                        v-for="(item,index) in dataList"
                        @click="gotoPage(index)"
                        :class="{'current':currentIndex == index}"
                        :key="index"
                    >{{index+1}}</li>
                    <li @click="gotoPage(nextIndex)">&gt;</li>
                </ul>
            </div>-->
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
        };
    },
    created() {
        this.runInv();
    },
    methods: {
        gotoPage(index) {
            this.currentIndex = index;
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
    mounted() {},
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
    width: 100%;
    height: 7rem;
    position: relative;

    .imgs {
        position: absolute;
        width: 100%;
        height: 7rem;
        left: 0;
        top: 0;
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