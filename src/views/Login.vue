<template>
  <div class="login-container">
    <!--中间登录框-->
    <el-card class="box-card">
      <el-row class="box-row">
        <!--登录框左侧图片-->
        <el-col :span="12">
          <el-image :src="imgSrc">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </el-col>
        <!--登录框右侧表单-->
        <el-col :span="12">
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
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      formModel: {},
      imgSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1595328899340&di=ff5b3393970fb86a8dcdff25eea1415c&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F76ae7bf8e2a4b3ecc6604dad120ee3b2bff8ef7ec46b-degviu_fw658'
    }
  },
  methods: {
    doLogin () {
      if (this.formModel.phone === '17317539623' && this.formModel.password === '123456') {
        this.$message.success('登录成功')
        this.$router.push('/')
      } else {
        this.$message.warning('用户名或密码错误')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  $bg: #2d3a4b;
  .login-container {
    background-color: $bg;
    background-image: url('https://img.zcool.cn/community/011a5c590ac31ea801214550538d15.jpg@1280w_1l_2o_100sh.jpg');
  }

  .box-card {
    width: 600px;
    height: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .box-row {
    height: 100%;
    width: 100%;
  }

</style>
