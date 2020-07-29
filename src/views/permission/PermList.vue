<template>
    <div>
        <!--面包屑导航-->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button @click="showAddMenu">添加一级菜单</el-button>
        <!--表格-->
        <el-table
                :data="permList"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="主键"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="权限名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="权限类型"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="code"
                    label="权限编码"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="权限描述"
                    width="180">
            </el-table-column>

            <el-table-column
                    width="180"
                    label="企业管理员">
                <template slot-scope="scope">
                    <el-tag :type="scope.row?'success':'info'">管理员</el-tag>
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
            <el-form :model="permModel">
                <el-form-item label="用户手机号" :label-width="'100px'">
                    <el-input v-model="permModel.phoneNumber" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" :label-width="'100px'">
                    <el-input v-model="permModel.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="昵称" :label-width="'100px'">
                    <el-input v-model="permModel.nickName" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="是否是超级管理员" :label-width="'100px'">
                    <el-select v-model="permModel.isSassAdmin" placeholder="请选择类型">
                        <el-option label="是" value="true"></el-option>
                        <el-option label="否" value="false"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="是否是企业管理员" :label-width="'100px'">
                    <el-select v-model="permModel.isCoAdmin" placeholder="请选择类型">
                        <el-option label="是" value="true"></el-option>
                        <el-option label="否" value="false"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <!--底部按钮-->
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="savePerm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'PermList',
  data () {
    return {
      permList: [],
      dialogVisible: false,
      permModel: {},
      conditionModel: {
        pageNumber: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    showAddMenu () {

    },
    async savePerm () {
      const { data } = await this.$http.post('', this.permModel)
      if (data.stauts) {
        this.$message.success('添加成功')
        this.permModel = {}
        this.dialogVisible = false
      }
    },
    closeDialog () {
      this.permModel = {}
      this.dialogVisible = false
    },
    async queryPermList () {
      const { data } = await this.$http.get('/permission/pageQuery', this.conditionModel)
      if (data.status) {
        this.permList = data.data.records
      }
    }
  },
  created () {
    this.queryPermList()
  }
}
</script>

<style scoped>

</style>
