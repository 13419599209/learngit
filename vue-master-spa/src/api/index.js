import Vue from 'vue'
//用户相关
import user from './user'
//动态相关
import essay from './essay'
//评论相关
import comment from './comment'
//
import controlZan from './controlZan'


const api = function(Vue, options) {
    Vue.prototype.$api = Object.create({
        user,
        essay,
        comment,
        controlZan
    })
}

Vue.use(api)

export default api