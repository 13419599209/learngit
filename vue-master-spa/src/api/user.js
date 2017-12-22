import ajax from './axios'

export default new class User {
    constructor() {

        }
        /**
         * 注册
         * @param {Number} telphone 手机号码
         * @param {String} password 密码
         */
    register(userphone, password) {
        return ajax.post('/user/UserRegisterServlet', {
            userphone,
            password
        })
    }

    /**
     * 登录
     * @param {Number} telphone 手机号码
     * @param {String} password 密码
     */
    login(userphone, password) {
            return ajax.post('/user/UserServlet', {
                userphone,
                password
            })
        }
        /**
         * 更新用户资料
         * @param {Object} info 用户信息
         */
    update(userName, userPhone) {
        return ajax.post('/user/UserUpdateServlet', {
            userName,
            userPhone
        })
    }
}()