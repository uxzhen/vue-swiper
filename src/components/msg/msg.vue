<template>
    <transition name="add_url">
        <div class="root" v-show="showok">
            <!-- 提示 -->

            <!-- <div class="flex_up"> -->
            <div v-if="$store.state.msg_type==2" class="tc">
                <img src="@/assets/1.gif" alt />
                <div class="showok">{{alertmsg}}</div>
            </div>

            <div class="big" v-else>
                <!-- <i class="iconclose iconfont" @click="big_show=!big_show"></i> -->
                <div class="url_top">
                    <p class="url_p">提示</p>
                    <div class="url_ip">
                        <p>{{alertmsg}}</p>
                    </div>
                    <div class="ok_" @click="cloes()">确认</div>
                </div>
            </div>
            <!-- </div> -->
        </div>
    </transition>
</template>

<script>
// 更新语句
// 弹窗
// this.$store.commit("tip/upmsg", {
//     t: "请输入正确的邮箱",
//     mk: 1
// });
// 等待
// this.$store.commit("tip/upmsg", {
//     t: "发送中",
//     mk: 2
// });
// 默认弹窗
// this.$store.commit("tip/upmsg", {
//     t: "发送成功"
// });
// 基础版
// this.$store.commit("tip/upmsg", this.auto_num + "秒后获取验证码");
export default {
    data() {
        return {
            // 显示弹窗提示
            showok: "",
            // 提示内容
            alertmsg: "徐大振提示系统",
            // 重置提示时间  计数器对象
            timer: "",
            // 持续时长对比数值
            value: 1,
            msg_type: 1, ////默认1 确认提示  2蒙版等待
        };
    },
    created() {},
    methods: {
        cloes() {
            clearInterval(this.timer);
            this.showok = false;
        },
        // 提示信息
        msg(msg) {
            this.type = this.$store.state.msg_type;
            this.showok = true;
            this.alertmsg = msg;
            // 不会自动取消的弹窗
            if (this.type == 1) return false;
            this.showok = false;
            let aa = this;
            clearInterval(this.timer);
            setTimeout(() => {
                aa.showok = true;
            }, 10);
            this.timer = setInterval(() => {
                if (aa.value >= parseFloat(aa.$store.state.msgn)) {
                    this.showok = false;
                    aa.value = 1;
                    clearInterval(aa.timer);
                } else {
                    aa.send(msg);
                }
            }, 1000);
        },
        send(smg) {
            this.value++;
            // console.log(this.value);
        },
    },
    computed: {
        // 计算里边的值，改变listen
        listen() {
            // return this.tip.msgup;

            return this.$store.state.msgup;
        },
    },
    watch: {
        // 监听listen触发内部函数
        listen: function (old, newd) {
            this.msg(this.$store.state.msg);
        },
    },
};
</script>

<style scoped>
.tc{
	text-align: center;
}
.url_top {
    background: #fff;
    width: 6rem;
    border-radius: 0.08rem;
    transition: opacity 0.2s;
}
.url_p {
    text-align: center;
    padding: 0.2rem;
    font-size: 0.32rem;
}
.url_ip {
    min-height: 1.5rem;
    padding: 0.2rem 0.3rem;
    text-align: center;
    color: #222;
    font-size: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.ok_ {
    border-top: 0.02rem solid #f8f8f8;
    line-height: 0.9rem;
    color: #1989fa;
    text-align: center;
    cursor: pointer;
    margin-top: 0.2rem;
}
.ok_:active {
    /* color: red; */
    background: #f8f8f8;
}

.root {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /* 父元素有溢出隐藏 */
    /* max-width: 500px; */
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    /* pointer-events: none; */
}
/* 提示 */
.showok {
    padding: 0.1rem;
    color: #fff;
    text-align: center;
    font-size: 0.18rem;
}
/* 各种动画 */
@keyframes identifier {
    from {
        transform: translate3d(-50%, 100%, 0);
        opacity: 0;
    }
    to {
        transform: translate3d(-50%, 0%, 0);
        opacity: 1;
    }
}
@keyframes against {
    from {
        transform: translate3d(-50%, 0%, 0);
        opacity: 1;
    }
    to {
        transform: translate3d(-50%, 100%, 0);
        opacity: 0;
    }
}
@keyframes action_skew {
    0% {
        transform: skew(-40deg);
        opacity: 0;
    }
    50% {
        transform: skew(40deg);
        opacity: 0.2;
    }
    100% {
        transform: skew(0deg);
        opacity: 1;
    }
}
@keyframes action_rotateY {
    0% {
        transform: rotateY(0deg);
        opacity: 0;
    }
    50% {
        transform: rotateY(180deg);
        opacity: 0.2;
    }
    100% {
        transform: rotateY(360deg);
        opacity: 1;
    }
}
@keyframes action_translateY {
    0% {
        transform: translateY(50px);
        opacity: 0;
    }
    100% {
        transform: translateY(0px);
        opacity: 1;
    }
}
@keyframes action_scale {
    0% {
        transform: scale(0.2);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}
/*---淡出----*/
@keyframes action_skewOut {
    0% {
        transform: skew(40deg);
        opacity: 1;
    }
    50% {
        transform: skew(-40deg);
        opacity: 0.2;
    }
    100% {
        transform: skew(0deg);
        opacity: 0;
    }
}
@keyframes action_rotateYOut {
    0% {
        transform: rotateY(360deg);
        opacity: 1;
    }
    50% {
        transform: rotateY(180deg);
        opacity: 0.2;
    }
    100% {
        transform: rotateY(0deg);
        opacity: 0;
    }
}
@keyframes action_translateYOut {
    0% {
        transform: translateY(0px);
        opacity: 1;
    }
    100% {
        transform: translateY(50px);
        opacity: 0;
    }
}
@keyframes action_scaleOut {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    100% {
        transform: scale(0.2);
        opacity: 0;
    }
}
.toTop-enter-active {
    animation: identifier 0.4s;
}
.toTop-leave-active {
    animation: against 0.4s;
}
.mode1-enter-active {
    animation: action_skewOut 0.4s;
}
.mode1-leave-active {
    animation: action_translateYOut 0.4s;
}
/* 第二钟 */
/* 过渡动画 */
.add_url-enter-active,
.add_url-leave-active {
    transition: opacity 0.2s;
}
.add_url-enter,
.add_url-leave-active {
    opacity: 0;
}
</style>