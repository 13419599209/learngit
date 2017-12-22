import ajax from './axios'

export default new class Comment {
    constructor() {

    }

    /**
     * 发表评论
     * @param {String} commentName 内容
     * @param {String} commentContent 内容
     * @param {Number} essayId 内容
     */
    addComment(commentName, commentContent, essayId) {
        return ajax.post('/comment/CommentAddServlet', {
            commentName,
            commentContent,
            essayId
        })
    }

    /**
     * 删除评论
     * @param {Number} commentId 评论Id
     */
    removeComment(commentId) {
        return ajax.post('/comment/CommentRemoveServlet', {
            commentId
        })
    }


}()