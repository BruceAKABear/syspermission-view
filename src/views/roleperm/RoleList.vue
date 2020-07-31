<template>
    <div>
        <div class="list-header">
            <!--面包屑导航-->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>角色列表</el-breadcrumb-item>
            </el-breadcrumb>
            <el-button type="primary" @click="showAddRole">新增角色</el-button>
        </div>
        <el-card>
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
                        <el-button v-if="scope.row" type="primary" @click="showAssignPerm(scope.row)">分配权限</el-button>
                        <el-button v-if="scope.row" type="danger" @click="deleteRole(scope.row.id)">删除角色</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
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
        <el-dialog
                title="分配权限"
                :visible.sync="permDialogVisible"
                width="30%"
                :before-close="closePermDialog">
            <!--主体-->
            <el-tree
                    :data="permTree"
                    show-checkbox
                    default-expand-all
                    node-key="id"
                    ref="tree"
                    highlight-current
                    :props="defaultProps">
            </el-tree>
            <!--底部按钮-->
            <span slot="footer" class="dialog-footer">
                <el-button @click="closePermDialog">取 消</el-button>
                <el-button type="primary" @click="savePerms">确 定</el-button>
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
      permDialogVisible: false,
      roleModel: {},
      permTree: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      selectedRoleId: ''
    }
  },
  methods: {
    showAddRole () {
      this.dialogVisible = true
    },
    /**
       * 查询所有角色
       * @returns {Promise<void>}
       */
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
    },
    deleteRole (id) {
      this.$confirm('是否确认删除').then(async () => {
        const { data } = await this.$http.delete('role/deleteById/' + id)
        if (data.status) {
          this.$message.success('删除成功')
          // 重启请求列表
          await this.queryRoleList()
        } else {
          this.$message.error('角色被使用不能删除')
        }
      })
    },
    async showAssignPerm (model) {
      this.selectedRoleId = model.id
      // 请求完整权限树
      const { data } = await this.$http.get('permission/getPermTree')
      if (data.status) {
        this.permTree = data.data
        // 显示对话框
        this.permDialogVisible = true
        // 查询权限已经绑定的权限
        const { data: res } = await this.$http.get('permission/getRolePermIds/' + model.id)
        console.log(res)
        if (res.status) {
          this.$refs.tree.setCheckedKeys(res.data)
        }
      }
    },
    closePermDialog () {
      this.permDialogVisible = false
      console.log('hello')
    },
    async savePerms () {
      const permSaveModel = {}
      permSaveModel.roleId = this.selectedRoleId
      permSaveModel.permIds = this.$refs.tree.getCheckedKeys()
      const { data } = await this.$http.post('/role/assignPerms', permSaveModel)
      if (data.status) {
        this.permDialogVisible = false
        this.selectedRoleId = ''
        this.$message.success('分配权限成功')
      }
    }
  },
  created () {
    this.queryRoleList()
  }
}
</script>

<style lang="scss" scoped>
    .list-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 10px;
    }
</style>
