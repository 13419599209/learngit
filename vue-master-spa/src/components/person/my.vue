<template>
    <div>
        <mu-appbar title="个人资料">
            <mu-icon-button icon="arrow_back" slot="left" @click='onBackClick' />
            <mu-flat-button color="white" label="保存" slot="right" @click='onSaveClick' />
        </mu-appbar>
        <div class="form">
            <mu-text-field v-model='info.userName' hintText="新的昵称" icon="color_lens" /><br/>

        </div>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            info: {
                userName: ''
            }
        }
    },
    computed: {
        ...mapGetters({
            userInfo: 'getUserInfo',
        }),
    },
    methods: {
        ...mapActions([
            'updateUserInfo'
        ]),
        onBackClick() {
            this.$router.back()
        },
        // 保存修改
        async onSaveClick() {
            try {
                console.log("this.info.userName: " + this.info.userName + this.userInfo.usetPhone)
                let data = await this.$api.user.update(this.info.userName, this.userInfo.usetPhone)
                if (data.state == 1) {
                    this.updateUserInfo(this.info)
                    this.info.userName = ''
                    this.$router.back()
                } else {

                }
            } catch (e) {
                console.log("修改用户信息出错："+e)
            }
        },
    }
}
</script>

<style scoped>
.form {
    padding-top: 20px;
}
</style>