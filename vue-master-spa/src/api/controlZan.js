import ajax from './axios'

export default new class ControlZan {
    constructor() {

    }

    /**
     * 点赞
     * @param {Number} essyId 内容 
     *  @param {String} userName 用户名
     */
    getZan(essayId, userName) {
        return ajax.post('/zan/EssayUserGetZan', {
            essayId,
            userName
        })
    }

    /**
     * 取消攒
     * @param {Number} essyId 内容 
     *  @param {String} userName 用户名
     */
    cancelZan(essayId, userName) {
        return ajax.post('/zan/EssayUserCancelZan', {
            essayId,
            userName
        })
    }

}()