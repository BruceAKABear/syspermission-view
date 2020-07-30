<template>
    <div>
        <!--面包屑导航-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button @click="showdia">新增用户</el-button>
        <!--表格-->
        <el-table
                :data="userList"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="主键"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="nickName"
                    label="用户名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="phoneNumber"
                    label="手机号"
                    width="180">
            </el-table-column>
            <el-table-column
                    width="180"
                    label="SASS管理员">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.isSassAdmin?'success':'info'">管理员</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    width="180"
                    label="企业管理员">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.isCoAdmin?'success':'info'">管理员</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    label="权限分配">
                <template>
                    <el-button type="primary">分配权限</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--新增用户对话框-->
        <el-dialog
                title="新增用户"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="closeDialog">
            <!--主体-->
            <el-form :model="userModel">
                <el-form-item label="用户手机号" :label-width="'100px'">
                    <el-input v-model="userModel.phoneNumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" :label-width="'100px'">
                    <el-input v-model="userModel.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="昵称" :label-width="'100px'">
                    <el-input v-model="userModel.nickName" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="是否是超级管理员" :label-width="'100px'">
                    <el-select v-model="userModel.isSassAdmin" placeholder="请选择类型">
                        <el-option label="是" value="true"></el-option>
                        <el-option label="否" value="false"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="是否是企业管理员" :label-width="'100px'">
                    <el-select v-model="userModel.isCoAdmin" placeholder="请选择类型">
                        <el-option label="是" value="true"></el-option>
                        <el-option label="否" value="false"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <!--底部按钮-->
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="saveUser">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'UserList',
  data () {
    return {
      userList: [],
      dialogVisible: false,
      userModel: {}
    }
  },
  methods: {
    async getUserList () {
      const { data } = await this.$http.get('user/userPage/1/10')
      if (data.status) {
        this.userList = data.data.records
        console.log(data)
      }
    },
    showdia () {
      this.dialogVisible = true
    },
    async saveUser () {
      const { data } = await this.$http.post('user/addUser', this.userModel)
      if (data.status) {
        this.$message.success('新增成功')
        this.dialogVisible = false
        await this.getUserList()
        this.userModel = {}
      }
    },
    closeDialog () {
      this.dialogVisible = false
      this.userModel = {}
    }
  },
  created () {
    this.getUserList()
  }
}
</script>

<style lang="scss" scoped>

</style>
