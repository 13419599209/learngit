import types from './types.js'

//actions其实就是在操作mutations
export default {
    UserLogin({ commit }, data) {
        console.log(types)
        console.log("执行用户登录，记录用户信息")
        commit(types.USERLOGIN, data)
    },
    UserLogout({ commit }) {
        commit(types.USERLOGOUT)
    },
    updateUserInfo({ commit }, data) {
        commit(types.UPDATEUSERINFO, data)
    }
}