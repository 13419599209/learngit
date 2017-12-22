import ajax from './axios'

export default new class Essay {
    constructor() {

        }
        /**
         * 获取说说列表
         * @param {Number} pageNo 页码 
         * @param {Number} pageSize 页量
         */
    list(pageNo = 1, pageSize = 10) {
            console.log(pageNo + '_' + pageSize)
                // var list = []
                // for (let i = 0; i < pageSize; i++) {
                //     list.push({
                //         username: ["紫枫", "Tom", 'Lucy'][i % 3],
                //         date: "2017-06-08",
                //         content: ["缘分写在三生石上面", "邀明月让回忆皎洁", "经典，好听", "所以的灯都熄灭了", "谁能够将电台情歌全都", "三生三世十里桃花"][i % 6]
                //     })
                // }

            return ajax.post('/essay/EssayListServlet', {
                pageNo,
                pageSize
            })
        }
        /**
         * 发布说说
         * @param {String} content 内容 
         *  @param {String} userName 用户名
         */
    addessay(content, userName) {
            return ajax.post('/essay/EssayAddServlet', {
                content,
                userName
            })
        }
        /**
         * 查询说说信息
         * @param {Number} essayId
         */
    essayInfo(essayId, userName) {
        return ajax.post('/essay/EssayInfoservlet', {
            essayId,
            userName
        })
    }
}()