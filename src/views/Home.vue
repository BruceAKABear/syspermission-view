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
            <el-aside :width="asideWidth">
                <div class="toggle-button-box" @click="toggleColl">
                    <i :class="menuCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></i>
                </div>
                <el-menu
                        :default-active="activePath"
                        class="el-menu-vertical-demo"
                        background-color="#eeeeee"
                        active-text-color="#409EFF"
                        :unique-opened="true"
                        :collapse="menuCollapse"
                        :collapse-transition="false"
                        :router="true"
                >
                    <!--一级菜单-->
                    <el-submenu :index="menu.code" v-for=" menu in menuList" :key="menu.id">
                        <!--一级菜单模板区-->
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{menu.name}}</span>
                        </template>
                        <!--二级菜单-->
                        <el-menu-item :index="submenu.code" v-for="submenu in menu.children" :key="submenu.id" @click="saveNav(submenu.code)">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>{{submenu.name}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>

            </el-aside>
            <!--main-->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      menuList: [],
      menuCollapse: false,
      asideWidth: '200px',
      activePath: ''

    }
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList () {
      const { data } = await this.$http.get('user/getMenus')
      if (!data.status) {
        return this.$message.error('服务器异常')
      } else {
        this.menuList = data.data
        console.log(this.menuList)
      }
    },
    saveNav (ac) {
      this.activePath = ac
      window.sessionStorage.setItem('activePath', ac)
    },
    toggleColl () {
      this.menuCollapse = !this.menuCollapse
      this.menuCollapse ? this.asideWidth = '64px' : this.asideWidth = '200px'
    }
  },
  created () {
    // 获取菜单
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  }
}
</script>

<style lang="scss" scoped>
    .el-container {
        height: 100%;
    }

    .el-header {
        background-color: #606266;
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
        background-color: #606266;

        .el-menu {
            border-right: none;
        }

        .toggle-button-box {
            background-color: #606266;
            color: white;
            text-align: center;
            font-size: 10px;
            line-height: 24px;
            cursor: pointer;
        }
    }

</style>
