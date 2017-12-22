<template>
    <div>
        <mu-appbar title="注册">
            <mu-icon-button icon="arrow_back" slot="left" @click='onBackClick' />
        </mu-appbar>
        <div class="form">

            <mu-text-field label="手机号" labelFloat fullWidth hintText="请输入手机号" v-model="telphone" />

            <mu-text-field label="密码" labelFloat fullWidth hintText="请输入密码" type="password" v-model="password" />
            </br>
            </br>
            </br>
            <mu-raised-button label="注册" class="demo-raised-button" fullWidth primary @click='onClick' />
        </div>
        <mu-divider/>
        </br>
        <mu-flexbox class="footer">
            <mu-flexbox-item>
                <mu-flat-button label="已有帐号 ？ 点击登录" class="demo-flat-button" primary @click='gotoLogin' />
            </mu-flexbox-item>
        </mu-flexbox>
        
        <div class="demo-toast">
      <mu-toast class="toast" v-if="toast" message="用户名已存在" @close="hideToast"/>
    </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            telphone: '',
            password: '',
            toast:false,
            message:'mima'
        }
    },
    methods: {
        onClick() {
            this.register()
        },
        onBackClick() {
            this.$router.back()
        },
        gotoLogin() {
            this.$router.next('login')
        },
        hideToast(){

        },
        async register() {
            try {
                let data = await this.$api.user.register(this.telphone, this.password)
                console.log('注册嘻嘻：' + data.state)
                let state = data.state
                if (state == 1) {
                    this.$router.back()
                } else if (state == 0) {
                    
                } else {

                }

            } catch (e) {
                alert(e.errmsg)
            }

        }
    }
}

</script>

<style scoped>
.form {
    width: 88%;
    margin: 2rem auto;
    
}

.footer {

    text-align: center;
}

.demo-toast{
    
   width: 100%;
  text-align: center
    
}
.toast{
    width: auto;
    margin-left: 40%
}
</style>
