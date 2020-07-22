<template>
  <div class="login-container">
    <!--中间登录框-->

    <div class="box-card">
      <div class="img-box">

      </div>
      <div class="login-box">
        <el-form label-width="80px" :model="formModel" class="login-form">
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
      imgSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595328899340&di=ff5b3393970fb86a8dcdff25eea1415c&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F76ae7bf8e2a4b3ecc6604dad120ee3b2bff8ef7ec46b-degviu_fw658'
    }
  },
  methods: {
    async doLogin () {
      const { data } = await this.$http.post('user/login', this.formModel)
      console.log(data)
      if (data.status) {
        this.$message.success('登录成功')
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

    .box-card {
      width: 700px;
      height: 300px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #ffffff;
      display: flex;

      .img-box {
        width: 40%;
        height: 100%;
        border-right: solid 1px #dddddd;
      }

      .login-box {
        width: 60%;
        height: 100%;

        .login-form {
        }
      }
    }
  }

</style>
