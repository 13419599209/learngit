// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


//引入 Muse-UI
import MuseUI from 'muse-ui'
//引入muse-ui的样式文件
import 'muse-ui/dist/muse-ui.css'
//import 'muse-ui/dist/theme-carbon.css'
Vue.use(MuseUI)
    //加载主题
import theme from '@/assets/js/common/theme'
theme.loadTheme()

// 引用图片预览插件
import vuePicturePreview from 'vue-picture-preview'
Vue.use(vuePicturePreview)

// 引入store
import store from './store'
// 引入一些工具
import api from './api'
import appItool from '@/assets/js/common/app.js'
Vue.prototype.$itool = appItool
    //引入时间格式转换
require('@/assets/js/extends')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})