import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import cart from "@/store/cart/cart";
export default new Vuex.Store({
	modules: {
		cart,
	},
	state: {
		token: "",
		path: {
			url: "/",
			name: "加载中",
			title: false,
			foot: false
		},
		history: [],
		// 提示内容
		msg: "",
		// 监听提示变化           
		msgup: 0,
		// 提示时长 默认两秒
		msgn: 2,
		// 提示信息
		show_msg: true,
		msg_type: 1,//默认1 提示  2蒙版
	},
	mutations: {
		// 提示消息
		upmsg(state, aa) {
			// 加入可自定义时间
			// this.$store.commit("upmsg", '11111');
			// this.$store.commit("upmsg", {t:'设为默认成功',n:20} );

			if (typeof (aa) == 'object') {
				state.msg = aa.t || ""
				state.msgn = aa.n || ""
				state.msg_type = aa.mk || 1
				console.log(state.msg_type)
			} else {
				state.msg = aa
				state.msg_type = 1
			}
			state.msgup++
		},
		upToken(state, data) {
			state.token = data
		},
		upPath(state, data) {
			state.path = data
			// state.history.push(data.url)			
			// state.history.pop()
		},
		toPath(state, data) {
			console.log(state.history);
		},
		clearHistory(state, data) {
			state.path.history = []
		}
	},
	getters: {

	}
})