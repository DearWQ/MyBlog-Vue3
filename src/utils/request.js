import axios from "axios";
import {ElMessage} from 'element-plus';
// 从本地缓存中获取token
let token = localStorage.getItem('token');
let instance = axios;
// 如果token存在，需要加上请求头
if (token) {
    instance = axios.create({
        timeout: 30000,
        headers: {
            'Authorization': 'bearer ' + token
        }
    })
}

const AllCode={
    401:"用户名不存在",
    402:"密码错误",
    undefined:"查询失败"

}
// 请求拦截
instance.interceptors.request.use((config) => {
    if (config.params) {
        config.params = filterParams(config.params)
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// 响应拦截
instance.interceptors.response.use((response) => {
    // 如果存在token, 把token, 存入缓存
    if (response.headers.authorization) {
        localStorage.setItem("token", response.headers.authorization);
    }
    const {code,msg,data}= response.data
    if (response.status === 200) {
        if(AllCode[code]){
            ElMessage.warning(msg)
            return Promise.reject(data)
        }
        return Promise.resolve(data)

    } else {
        return Promise.reject(response.data)
    }
},  (error)=> {
    // 如果响应没有权限，403，清除token
    if (error.response.status === 403) {
        localStorage.removeItem('token');
    }
    return Promise.reject(error);
});
/**
 * 处理对象如果对象值为空则删除属性
 * @param obj  传入对象
 * @returns {string}
 */
function filterParams(obj) {
    var _newPar = {}
    for (var key in obj) {
        if (
            (obj[key] === 0 || obj[key] === false || obj[key]) &&
            obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== ''
        ) {
            _newPar[key] = obj[key]
        }
    }
    return _newPar
}
export default instance;