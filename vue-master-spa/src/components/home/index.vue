<template>
  <div class="infinite-container" ref='room'>
    <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh" />
    <template v-for='(o,index) in list'>
      <mu-list-item :title="o.userName" :id="index" @click="onTap(o,index)">
        <mu-avatar :src="_getRandomImgSrc()" slot="leftAvatar" />
        <span slot="describe">
          <span>{{_timeAgo(o.publishDate)}}</span>
        </span>
        <div style="margin-top:5px;">{{o.content}}</div>

      </mu-list-item>
    </template>
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" loadingText='加载更多...' />
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'

export default {
  data() {
    return {
      scrollTop: 0,
      loading: false,
      scroller: null,
      refreshing: false,
      trigger: null,
      page: {
        no: 1,
        size: 10
      },
      list: [],
      loadMoreFlag: true
    }
  },
  mounted() {
    this.scroller = this.$el
    this.trigger = this.$el
    //this.loadMore()
  },
  computed: {
    // ...mapGetters({
    //   userToken: 'getUserToken',
    // })
  },
  methods: {
    async getEssayList(isDown = false) {
      let method = 'loading'
      if (isDown) {
        method = 'refreshing'
      }
      if (!this.loadMoreFlag) {
        return
      }
      this[method] = true
      try {
        this[method] = false
        let {errno,essayList} =  await this.$api.essay.list(this.page.no, this.page.size)
        let list = JSON.parse(essayList)
        console.log("list:" + list)
        if (list.length < this.page.size) {
          this.page.no--
          this.loadMoreFlag = false

        } else {
          //this.loadMoreFlag = true
          isDown && (this.list = [])
          this.list.push(...list)
        }
      } catch (e) {
        this[method] = false
        console.log("出错：" + e)
      }
    },
    itemClick(e) {
      //alert(e.value);
      this.list.splice(e.value, 1);
    },
    onTap(o, i) {
      this.$router.push({ name: 'detail', params: { essayId: o.id ,username:o.userName} })
    },
    changeLoading(isShow = false) {
      this.loading = isShow
      this.refreshing = isShow
    },
    loadMore() {
      //console.log("加载更多")
      this.page.no++
      this.getEssayList()
    },
    refresh() {
      this.page.no = 1
      this.loadMoreFlag = true
      console.log("获取最新数据")
      this.getEssayList(true)
    },
    _saveScrollTop() {
      this.scrollTop = this.$refs.room.scrollTop
    },
    _resetScrollTop() {
      this.$refs.room.scrollTop = this.scrollTop
    },
    _getRandomImgSrc() {
      return this.$itool.getRandomImgSrc()
    },
    _timeAgo(date) {
      return new Date().ago(date)
    }
  },
  watch: {
    // 监控 页码 变化
    // 'page.no': function(){
    //   this.getEssayList()
    // }
  },
  // 路由进入
  activated() {
    // 重置滚动条高度
    this._resetScrollTop()
    this.refresh()
  },
  // 路由离开
  deactivated() {
    // 记录当前滚动条高度
    this._saveScrollTop()
  }
}
</script>

<style scoped>
.infinite-container {

  width: 100%;

  height: calc(100% - 56px);

  overflow-y: auto;

  overflow-x: hidden;

  -webkit-overflow-scrolling: touch;

  position: relative;

  user-select: none;
}
</style>