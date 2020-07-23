<template>
    <el-container>
        <!--页面头部-->
        <el-header>
            <div>
                <img src="../assets/logo.png" alt="标题">
                <span>权限控制后台</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!--主体-->
        <el-container>
            <!--侧边栏-->
            <el-aside>
                <el-menu
                        default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#eeeeee"
                >
                    <!--一级菜单-->
                    <el-submenu index="1">
                        <!--一级菜单模板区-->
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>导航一</span>
                        </template>
                        <!--二级菜单-->
                        <el-menu-item index="1-1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>二级菜单</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>

            </el-aside>
            <!--main-->
            <el-main>

            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {}
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenu () {
      const { data } = await this.$http.get('user/getMenus')
      if (!data.status) {
        return this.$message.error('服务器异常')
      }
    }
  },
  created () {
    // 获取菜单
    this.getMenu()
  }
}
</script>

<style lang="scss" scoped>
    .el-container {
        height: 100%;
    }

    .el-header {
        background-color: #eeeeee;
        display: flex;
        justify-content: space-between;
        color: #000000;
        font-size: 20px;
        padding-left: 0;

        > div {
            display: flex;
            align-items: center;

            > img {
                width: 40px;
            }
        }
    }

    .el-aside {
        background-color: #eeeeee;
    }

</style>
