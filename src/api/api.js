import { get, post, formData, del, put, } from '@/utils/config/axios'
import { BASEURL } from '@/utils/config/config'
// import { BASEURL } from '@/api/api'
// 店铺列表 
export const shop = function (param) {
	const url = BASEURL + 'GetWebsite'
	return get(url, param)
}