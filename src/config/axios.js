// ajax请求
import axios from 'axios'
// 格式请求
import QS from 'qs';
// 引入路由跳转用
import router from "@/router";
// import store from '@/utils/store'

// 封装post请求
export function get(url, params) {
	return new Promise((resolve, reject) => {
		// 传入 	param.loading  会有覆盖层
		if (params) {
			if (params.loading != undefined) {
				startLoading(params.loading)
				delete params.loading
			}
		}

		axios.get(url, {
			params: params
		}).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err.data)
		})
	});
}
export function post(url, params) {
	return new Promise((resolve, reject) => {
		if (params) {
			if (params.loading != undefined) {
				startLoading(params.loading)
				delete params.loading
			}
		}
		axios.post(url, QS.stringify(params))
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data)
			})
	});
}

export function del(url, params) {
	return new Promise((resolve, reject) => {
		if (params) {
			if (params.loading != undefined) {
				startLoading(params.loading)
				delete params.loading
			}
		}
		axios.delete(url, QS.stringify(params))
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data)
			})
	});
}

export function put(url, params) {
	return new Promise((resolve, reject) => {
		if (params) {
			if (params.loading != undefined) {
				startLoading(params.loading)
				delete params.loading
			}
		}
		axios.put(url, QS.stringify(params))
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data)
			})
	});
}


export function formData(url, params) {
	return new Promise((resolve, reject) => {
		let config = {
			headers: { "Content-Type": "multipart/form-data" }
			// onUploadProgress: function(progressEvent) {
			//     // Do whatever you want with the native progress event
			// }
		}; //添加请求头
		axios.post(url, params, config)
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data)
			})
	});
}


// 配置头
axios.interceptors.request.use(
	config => {
		if (window.localStorage.token) {
			config.headers['token'] = window.localStorage.token //访问全局变量下的token值
		}
		return config
	}, error => {
		//// console.log(error)
		Promise.reject(error)
	}
)

//相应回调
axios.interceptors.response.use(
	response => {
		// console.log(response.data)
		// config.url config.data 
		// 验签超时代码
		if (response.data.code == STATUS_CODE) {
			// console.log(esponse.data.code);
			router.push('/?login=out')
			// if (window.localStorage.token == '') {
			// 	window.localStorage.if_login = false

			// }
			// if (window.localStorage.if_login==true) {
			// 	console.log(window.localStorage.if_login);
			// 	// console.log('已登录');
			// 	// 开关函数  login会打开 避免重复跳转


			// } else {
			// 	window.localStorage.if_login = false
			// 	window.localStorage.token = ''

			// 	Message.error("登录过期！");
			// }


		} else {

		}
		// 隐藏覆盖层
		try {
			endLoading()
		} catch (error) {
			// 隐藏promise
		}

		return response;
	},
	error => {
		return Promise.reject(error);
	}
);