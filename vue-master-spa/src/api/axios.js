import axios from 'axios'
import qs from 'qs'
import store from '../store'
import router from '../router'
import config from './config'


const ERROR = config.ERROR,
    GOTOLOGIN = function() {
        store.dispatch('UserLogout') // 可能是token失效，清除它
        router.replace({ //跳转到登录页面
            path: 'login',
            query: {
                redirect: router.currentRoute.fullPath
            } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
    }



//设置全局axios默认值
axios.defaults.baseURL = config.baseURL
axios.defaults.timeout = 5000 //5000的超时验证
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

//创建一个axios实例
const instance = axios.create()
axios.interceptors.request.use = instance.interceptors.request.use

//request拦截器
instance.interceptors.request.use(
    config => {
        // 获取 用户讯息
        var usetPhone = store.getters.getUserInfo.usetPhone
        config.headers.token = usetPhone

        if (config.method === 'post') {
            config.data = qs.stringify(config.data);
        }
        // console.log('ajax参数 :' + config.headers.token)
        return config
    },
    err => {
        console.log("发送请求chucuo")
        return Promise.reject(err)
    }
)


//respone拦截器
instance.interceptors.response.use(
    response => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
        // 如果是未登录，则跳转登录页面
        if (response.data.errno === ERROR.TOKEN_INVALID[0] || response.data.errno === ERROR.NEED_LOGIN[0]) {
            console.log("response响应1")
            return GOTOLOGIN()
        }
        console.log("response响应3")
        return response.data
    },
    error => { //默认除了2XX之外的都是错误的，就会走这里
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    GOTOLOGIN()
            }
        }
        console.log("错误状态码： " + error)
        return Promise.reject(error.response.data)
    }
)

export default instance