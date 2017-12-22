<template>
    <div>
        <mu-appbar title="说说详情">
            <mu-icon-button icon="arrow_back" slot="left" @click='onBackClick' />
        </mu-appbar>

        <mu-card>
            <mu-card-header :title="essay.userName" subTitle="一周前">
                <mu-avatar :src="_getRandomImgSrc()" slot="avatar" />
            </mu-card-header>
            <mu-card-text>
                <div>
                    {{essay.content}}
                    <!-- 散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。 调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。 似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光， 找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！ -->
                </div>
            </mu-card-text>
            <mu-card-actions >
                <mu-flat-button class="zan-click"  :label="countZan" v-if="controlZan"  @click="changeZan"/>
                <mu-flat-button class="zan"  :label="countZan" v-else @click="changeZan"/>
                 <mu-text-field hintText="发表评论" class="demo-divider-form" v-model="commentContent"/>
                 <mu-flat-button class="pinglun" label="评论" @click="addComment"/>
            </mu-card-actions> 
             
        </mu-card>

        <mu-flat-button label="评论列表" disabled/>
        <mu-list>
            <mu-sub-header>今天</mu-sub-header>
            <template v-for="(o,index) in comments">
                <mu-list-item v-bind:title="o.commentName"> 
                    <mu-avatar :src="_getRandomImgSrc()" slot="leftAvatar" />
                    <span slot="describe">
                        <span style="color: rgba(0, 0, 0, .87)" >{{_timeAgo(o.commentDate)}}</span>
                        <br/> {{o.commentContent}}
                    </span>
                    <mu-icon-menu slot="right" icon="more_vert" tooltip="操作"  @open="handleOpen(index)" @close="handleClose" @itemClick="itemClick" :value="index" @change="changeVal">
                        <mu-menu-item title="回复" value="1" :index="index"/>
                        <mu-menu-item title="标记" value="2" :index="index"/>
                        <mu-menu-item title="删除" value="3" :index="index"/>
                    </mu-icon-menu>
                </mu-list-item>
            </template>
        </mu-list>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      username: "",
      essayId: 0,
      essayContent: "",
      commentContent: "",
      essay: {},
      comments: [],
      controlZan: false,
      value: 1,
      tempIndex: 0,
      zan:'赞',
      list: []
    };
  },
  created() {
    // this.getData()
  },
  computed: {
    ...mapGetters({
      userInfo: "getUserInfo"
    }),
    countZan(){
      return this.zan + (this.essay.count > 0 ? '('+this.essay.count+')' : '')
    }
  },
  methods: {
    getData() {
      // 组件创建完后获取数据，

      this.username = this.$route.params.username;
      this.essayId = this.$route.params.essayId;
      this.getResData();
    },
    async getResData() {
      try {
        let { zanFlag, essay, commentList } = await this.$api.essay.essayInfo(
          this.essayId,
          this.userInfo.userName
        );
        if (zanFlag) {
          this.controlZan = true;
        }
        this.essay = JSON.parse(essay);
        
        this.comments = JSON.parse(commentList);
      } catch (error) {
        console.log("出错：" + e);
      }
    },
    onBackClick() {
      //this.$route.params.username=''
      this.$router.back();
    },
    handleOpen(index) {
      this.tempIndex = index;
    },
    handleClose() {
      //this.tempIndex = 0
    },
    itemClick(e) {
      //this.comments.splice(e.value, 1)
      let index = parseInt(e.value);
      switch (index) {
        case 1:
          alert("暂不支持回复");
          break;
        case 2:
          alert("暂不支持标记");
          break;
        case 3:
          let comment = this.comments[this.tempIndex];
          let cName = comment.commentName;
          if (cName == this.username || cName == this.userInfo.userName) {
            this._removeComment(comment.id);
          } else {
            alert("不具备权限");
          }

          break;

        default:
          break;
      }
      // alert(this.tempIndex);
    },
    test(index) {
      console.log(index);
    },
    _getRandomImgSrc() {
      return this.$itool.getRandomImgSrc();
    },
    changeZan() {
      if(this.controlZan){
        this.concelZan()
      }else{
        this.getZan()
      }
    },
    async getZan(){
      try {
        let {state} = await this.$api.controlZan.getZan(this.essayId,this.userInfo.userName)
        if(state ==1){
           this.controlZan = true
           this.essay.count =  this.essay.count + 1
        }
      } catch (error) {
         console.log("点赞出错："+error)
      }
    },
    async concelZan(){
      try {
        let {state} = await this.$api.controlZan.cancelZan(this.essayId,this.userInfo.userName)
        if(state ==1) {
          this.controlZan = false
          this.essay.count =  this.essay.count-1
        }
      } catch (error) {
        console.log("取消赞出错："+error)
      }
    },
    async _removeComment(commentId) {
      try {
        let { state } = await this.$api.comment.removeComment(commentId);
      if (state === 1) {
        this.comments.splice(this.tempIndex, 1);
      } else {
        alert("删除出错");
      }
      } catch (error) {
        console.log("删除评论出错："+error)
      }
      
    },
    changeVal(val) {
      this.value = val;
    },
    async addComment() {
      if (this.commentContent.length === 0) {
        //var nowDate = new Date().Format("yyyy-MM-dd HH:mm:ss");
        alert("请输入评论内容!" );
        return;
      }
      try {
        let { errno, state } = await this.$api.comment.addComment(
          this.userInfo.userName,
          this.commentContent,
          this.essayId
        );
        console.log("state:=  " + state);
        if (state === 1) {
          alert("评论成功!");
          var nowDate = new Date().Format("yyyy-MM-dd HH:mm:ss");
          let comment = {
            commentContent: this.commentContent,
            commentName: this.userInfo.userName,
            essayId: this.essayId,
            commentDate: nowDate
          };
          this.comments.push(comment);
          this.commentContent = "";
        } else {
          alert("评论失败");
        }
      } catch (e) {
        console.log("评论出错：" + e);
      }
    },
    _timeAgo(date) {
      return new Date().ago(date);
    }
  },
  // 路由进入
  activated() {
    //
    this.controlZan = false;
    this.getData();
  }
};
</script>

<style scoped>
.zan {
  color: grey;
  /* float: right; */
}
.zan-click {
  color: gold;
  /* float: right; */
}
.pinglun {
  float: right;
  color: grey;
}
.demo-divider-form {
  width: 150px;
}
</style>
