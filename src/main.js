// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
// vuex状态管理
import store from '@/store/store'

// 另一种解决方案
// import "babel-polyfill";
// 解决ie和360打不开    可能要打包后生效
import promise from 'es6-promise'
promise.polyfill();
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
})
