<template>
    <div class="login-container">
        <!--中间登录框-->

        <div class="login-card">
            <div class="img-box">
            </div>
            <div class="login-box">
                <!--登录方式-->
                <div class="login-header">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="密码登录" name="first">
                            <el-form label-width="80px" :model="formModel">
                                <el-form-item label="用户名">
                                    <el-input v-model="formModel.phone"></el-input>
                                </el-form-item>
                                <el-form-item label="密码">
                                    <el-input v-model="formModel.password"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="doLogin">登录</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                        <el-tab-pane label="验证码登录" name="second">
                            <el-form label-width="80px" :model="formModel">
                                <el-form-item label="用户名">
                                    <el-input v-model="formModel.phone"></el-input>
                                </el-form-item>
                                <el-form-item label="密码">
                                    <el-input v-model="formModel.password"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="doLogin">登录</el-button>
                                </el-form-item>
                            </el-form>
                        </el-tab-pane>
                    </el-tabs>
                </div>
                <div class="login-foot"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      formModel: {
        phone: '17317539623',
        password: '123456'
      },
      imgSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595328899340&di=ff5b3393970fb86a8dcdff25eea1415c&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F76ae7bf8e2a4b3ecc6604dad120ee3b2bff8ef7ec46b-degviu_fw658',
      activeName: 'first'
    }
  },
  methods: {
    async doLogin () {
      const { data } = await this.$http.post('user/login', this.formModel)
      console.log(data)
      if (data.status) {
        this.$message.success('登录成功')
        window.sessionStorage.setItem('token', data.data)
        this.$router.push('/home')
      } else {
        this.$message.error('用户名密码错误')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    $bg: #2d3a4b;
    .login-container {
        background-size: 100% 100%;
        height: 100%;
        position: fixed;
        width: 100%;
        background-color: $bg;
        background-image: url("../assets/bg.jpg");

        .login-card {
            width: 700px;
            height: 300px;
            background-color: #ffffff;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: row;

            .img-box {
                width: 200px;
            }

            .login-box {
                width: 500px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                .login-header {
                }

                .login-header {
                }

                .login-header {
                }

            }
        }
    }

</style>
