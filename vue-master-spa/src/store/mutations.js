import types from './types.js'


const mutations = {

    [types.USERLOGOUT]: (state) => {
        //登出的时候要移出用户信息
        window.localStorage.removeItem('userinfo')
        state.userinfo = null
    },
    [types.USERLOGIN]: (state, data) => {
        //把用户数据存到本地
        window.localStorage.setItem('userinfo', JSON.stringify(data))
        state.userinfo = data
    },
    [types.UPDATEUSERINFO]: (state, data) => {
        let newData = Object.assign(state.userinfo, data)
        console.log("newData=: " + JSON.stringify(newData))
            //把新用户数据存到本地
        window.localStorage.setItem('userinfo', JSON.stringify(newData))
        state.userinfo = newData
    },

}

export default mutations