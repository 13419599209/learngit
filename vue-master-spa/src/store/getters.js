export default {

    getUserInfo: state => {
        let userinfo = state.userinfo
        console.log("getters11:" + userinfo)
        if (!userinfo) {
            userinfo = JSON.parse(window.localStorage.getItem('userinfo') || '{}')
            state.userinfo = userinfo
            console.log("getters22:" + userinfo)
        }
        return userinfo
    },
}