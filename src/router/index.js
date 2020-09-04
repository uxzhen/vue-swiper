import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return routerPush.call(this, location).catch(error => error)
}
Vue.use(Router)
console.log(
	`%c by %c a2dc.cn %c`,
	'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
	'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
	'background:transparent'
)
const router = new Router({
	routes: [
		{
			path: '/into',
			name: '首页',
			component: () => import('@/pages/into/into.vue'),
			meta: {
				title: true,
				foot: true
			}
		},
		{
			path: '*',
			name: '首页 ',
			component: () => import('@/pages/into/into.vue'), meta: {
				title: true,
				foot: true
			}
		},
		{
			path: '/index',
			name: '首页',
			component: () => import('@/pages/index/index.vue'),
		},
		{
			path: '/about',
			name: 'about',
			component: () => import('@/pages/about/about.vue'),
		},
		{
			path: '/share',
			name: '分享',
			component: () => import('@/pages/share/share.vue'),
		},
		{
			path: '/me',
			name: '个人中心',
			component: () => import('@/pages/me/me.vue'),
		},
	]
})
router.beforeEach((to, from, next) => {
	// if (to.query.token) {
	// 	window.localStorage.token = to.query.token
	// }
	// if (to.meta.requireAuth) {
	// 	//是否是需要权限的页面
	// 	if (token != '') {
	// 		next()
	// 	} else {
	// 		next({
	// 			path: '/'
	// 		})
	// 	}
	// } else {
	// 	//不需要权限的页面
	// 	next()
	// }
	// console.log(to.name, from.name);
	store.commit("upPath", {
		url: from.path,
		name: to.name,
		// 写的话就是隐藏栏目
		title: to.meta.title ? false : true,
		foot: to.meta.foot ? false : true,
	});
	next()
})
export default router