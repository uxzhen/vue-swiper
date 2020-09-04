/* 
简易表单验签
import { check } from "@/plug/check";
传值格式：
form: {
	// 每个键先后顺序从上往下验签
	gift_id: {
		value: "1",
		msg: "错误",
		name:"",
		// 下边可以不传值
		type:"arr",
		tmsg:"不是数组",
		max:"",
		min:""
	}
}
*/

export const check = function (param) {
	let new_data = {}
	try {
		// 循环每一个键值
		Object.keys(param).forEach(function (key) {
			// console.log(key);
			// console.log(param[key]);
			if_null(param[key]);
			if_type(param[key]);
			param[key].writable = true
			// 不写枚举就无法取值
			param[key].enumerable = true
			param[key].configurable = true
			// 如果键值没错就把对象重新组装value的心对象反回
			Object.defineProperty(new_data, key, param[key]);
		});
	} catch (e) {
		console.error(e);
		return false;
	}
	// 验签成功反回新对象
	return new_data;
}

// 更新数据
/* 
   let data = {
                reward_type: 1,
                gift_id: 2,
                invitation_type: 3,
                a: 3,
            };
            console.log(set_data(data, this.form));
*/
export const set_data = function (ned, old) {
	Object.keys(old).forEach(function (key) {
		// null会有bug，避开null
		if (ned[key] == 0 || ned[key]) {
			old[key].value = ned[key]
		} else {
			old[key].value = ''
		}

	});
	return old;
}

// 判断空值
function if_null(param) {
	// 不写 msg 将不会验签
	if (!param.value && param.msg) {
		showToast(param.msg);
		throw "【表单错误】：" + param.msg;
	}
}

// 判断字段类型
function if_type(key) {
	if (key.type) {
		if (key.type == "num") {
		} else if (key.type == "str") {
		} else if (key.type == "phone") {
			if (!/^1[3456789]\d{9}$/.test(key.value)) {
				showToast(key.tmsg || "手机号码有误！");
				throw "【表单错误】：" + (key.tmsg || "手机号码有误！");
			}
		}
	}

}

// 长度检测
function if_length() {
	if (param.max) {
	} else if (param.min) {
	}
}

function showToast(msg) {
	uni.showToast({
		title: msg,
		duration: 1500,
		icon: "none",
	});
}