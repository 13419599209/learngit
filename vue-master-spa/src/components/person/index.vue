<template>
  <div>
    <mu-card>
  
      <mu-card-media :title="userInfo.userName" :subTitle="telPhone">
        <img :src="bgSrc" @click='onAvatarClick' style="maxHeight: 250px;filter: blur(4px);" />
      </mu-card-media>
  
    </mu-card>
    <br/>
    <mu-list>
      <mu-list-item title="修改资料" @click='onInfoClick'>
        <mu-icon slot="left" value="grade" />
      </mu-list-item>
      <mu-list-item title="换肤" @click='onThemeClick'>
        <mu-icon slot="left" value="remove_red_eye" />
      </mu-list-item>
      <mu-list-item title="代码地址" @click='onCodeAddressClick'>
        <mu-icon slot="left" value="code" />
      </mu-list-item>
      <mu-list-item title="关于作者" @click='onAbmeClick'>
        <mu-icon slot="left" value="send" />
      </mu-list-item>
    </mu-list>
    <br/>
    <div class="logout">
      <mu-raised-button label="注销" fullWidth secondary @click='onLogout' />
    </div>
  
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

import theme from '@/assets/js/common/theme'

// 主题皮肤名称数组
const themes = [
  'light',
  'dark',
  'carbon',
  'teal'
]

export default {
  data() {
    return {
      // 用户信息
      // userInfo: {
      //   userName: 'Allen',
      //   telphone: 13419599209
      // },
      // 主题皮肤下标
      themeIndex: -1,
      bgSrc: null,
    }
  },
  mounted() {
    this.changeBgSrc()
  },
  computed: {
    ...mapGetters({
      userInfo: 'getUserInfo',
    }),

    // 隐藏真实手机号
    telPhone() {
      if (!this.userInfo.usetPhone) { return '' }
      let tel = this.userInfo.usetPhone.toString().split('')
      tel.splice(3, 4, '*', '*', '*', '*')
      return tel.join('')
    },

  },
  methods: {
    ...mapActions([
      'UserLogout'
    ]),
    changeBgSrc() {
      this.bgSrc = this._getRandomImgSrc()
    },
    // 注销
    onLogout() {
      this.UserLogout()
      //this.$router.replace('login')
      this.$router.replace({ //跳转到登录页面
            path: 'login',
            query: {
                redirect: this.$router.currentRoute.fullPath
            } // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
    },
    // 换肤按钮
    onThemeClick() {
      this.themeIndex++
    },
    // 修改资料
    onInfoClick() {
      this.$router.next('my')
    },
    onCodeAddressClick(){
      //window.location.href = ''
    },
    // 头像点击
    onAvatarClick() {
      this.changeBgSrc()
    },
    // 关于作者
    onAbmeClick() {
      this.$router.next('about')
    },
    _getRandomImgSrc() {
      return this.$itool.getRandomImgSrc()
    },
  },
  watch: {
    // 监听主题皮肤
    themeIndex(n, o) {
      if (n >= themes.length) {
        this.themeIndex = 0
      }

      theme.loadTheme(themes[this.themeIndex])
    }
  }


}

</script>

<style scoped>
.logout {
  width: 60%;
  margin: 0 auto;
}
</style>
