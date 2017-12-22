import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Main from '@/components/main'

import Home from '@/components/home/index'
import Detail from '@/components/home/detail'
import Person from '@/components/person/index'
import My from '@/components/person/my'
import Chat from '@/components/chat/index'
import Doutu from '@/components/doutu/index'

// 登录页面
import Login from '@/components/common/login'
// 注册页面
import Register from '@/components/common/register'
//发布留言页面
import AddEssay from '@/components/home/addessay'
//个人中心—关于作者
import About from '@/components/person/about'



Router.prototype.back = function() {
    this.isBack = true
    this.go(-1)
}
Router.prototype.next = function(...arg) {
    this.isBack = false
    this.push(...arg)
}
Router.prototype.goto = function(rt, isBack = false) {
    this.isBack = isBack
    this.push(rt)
}

Vue.use(Router)

const router = new Router({
    history: true,
    saveScrollPosition: true,
    abstract: true,
    routes: [{
            path: '*',
            redirect: '/main'
        }, {
            path: '/',
            name: 'main',
            component: Main,
            meta: {
                keepAlive: true
            },
            children: [{
                    // 默认进入 主页
                    path: '/',
                    name: 'home',
                    component: Home,

                },
                {
                    // 主页
                    path: '/home',
                    name: 'home',
                    component: Home,

                }, //斗图
                {
                    path: '/doutu',
                    name: 'doutu',
                    component: Doutu
                }, {
                    // 个人中心 
                    path: '/person',
                    name: 'person',
                    component: Person,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    // 聊天 
                    path: '/chat',
                    name: 'chat',
                    component: Chat
                }
            ]
        },
        // 登录页面
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        // 注册页面
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            // 详情
            path: '/detail/:essayId/post/:username',
            name: 'detail',
            component: Detail,

        },
        // 个人中心 - 我的资料
        {
            path: '/my',
            name: 'my',
            component: My,
            meta: {
                requiresAuth: true
            }
        },
        // 个人中心 - 关于作者
        {
            path: '/about',
            name: 'about',
            component: About,
            meta: {

            }
        },
        // 发布留言
        {
            path: '/addessay',
            name: 'addessay',
            component: AddEssay,
            meta: {
                requiresAuth: true
            }
        },


    ]
})

//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
    //获取store里面的userinfo
    let token = store.getters.getUserInfo.userName
        //判断要去的路由有没有requiresAuth
    if (to.meta.requiresAuth) {
        console.log("判断要去的路由有没有requiresAuth: " + token)
        if (token) {
            next();
        } else {
            next({
                name: 'login',
                query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            });
        }
    } else {
        next(); //如果无需userinfo,那么随它去吧
    }
});

export default router