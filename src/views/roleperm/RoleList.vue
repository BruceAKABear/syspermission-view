<template>
  <div>
    <!--面包屑导航-->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button @click="showAddRole">新增角色</el-button>
    <!--表格-->
    <el-table
      :data="roleList"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="主键"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="description"
        label="角色描述">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row" @click="showAssignPerm(scope.row)">分配权限</el-button>
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
      <el-form :model="roleModel">
        <el-form-item label="角色名称" :label-width="'100px'">
          <el-input v-model="roleModel.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色描述" :label-width="'100px'">
          <el-input v-model="roleModel.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <!--底部按钮-->
      <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="saveRole">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'RoleList',
  data () {
    return {
      roleList: [],
      dialogVisible: false,
      roleModel: {}
    }
  },
  methods: {
    showAddRole () {
      this.dialogVisible = true
    },
    async queryRoleList () {
      const { data } = await this.$http.get('role/queryAll')
      console.log(data)
      if (data.status) {
        this.roleList = data.data
      }
    },
    async saveRole () {
      const { data } = await this.$http.post('role/addRole', this.roleModel)
      if (data.status) {
        this.$message.success('新增成功')
        this.dialogVisible = false
        await this.queryRoleList()
        this.roleModel = {}
      }
    },
    closeDialog () {
      this.dialogVisible = false
      this.roleModel = {}
    }
  },
  created () {
    this.queryRoleList()
  }
}
</script>

<style scoped>

</style>
