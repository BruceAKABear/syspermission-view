<template>
    <div>
        <div class="list-header">
            <!--面包屑导航-->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>权限列表</el-breadcrumb-item>
            </el-breadcrumb>
            <el-button type="primary" @click="showAddMenu">添加一级菜单</el-button>
        </div>
        <el-card>
            <!--表格-->
            <el-table
                    :tree-props="{children: 'children', hasChildren: 'true'}"
                    :highlight-current-row="true"
                    @row-click="clickRow"
                    :data="permList"
                    row-key="id"
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
                        width="180"
                        label="权限类型">
                    <template slot-scope="scope">
                        <i :class="scope.row.type===1?'el-icon-folder-opened':scope.row.type===2?'el-icon-thumb':'el-icon-caret-right'"></i>
                        <el-tag style="margin-left: 10px" size="small">
                            {{scope.row.type===1?'菜单权限':scope.row.type===2?'按钮权限':'API权限'}}
                        </el-tag>
                    </template>
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
                        width="280"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" v-if="scope.row.type===1" type="primary">新增子权限</el-button>
                        <el-button size="small" type="danger" @click="handleDeletePerm(scope.row)">删除权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!--新增用户对话框-->
        <el-dialog
                title="新增一级菜单权限"
                :visible.sync="dialogVisible"
                width="40%"
                :before-close="closeDialog">
            <!--主体-->
            <el-form :model="permModel">
                <el-form-item label="菜单名称" :label-width="'100px'">
                    <el-input v-model="permModel.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜单路径" :label-width="'100px'">
                    <el-input v-model="permModel.code" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜单描述" :label-width="'100px'">
                    <el-input v-model="permModel.description" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜单图标" :label-width="'100px'">
                    <el-input v-model="permModel.menuIcon" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜单顺序" :label-width="'100px'">
                    <el-input v-model="permModel.menuOrder" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限类型" :label-width="'100px'">
                    <el-select v-model="permModel.type" placeholder="请选择类型" :disabled="true">
                        <el-option label="菜单权限" value="1"></el-option>
                        <el-option label="按钮权限" value="2"></el-option>
                        <el-option label="API权限" value="3"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="企业是否可见" :label-width="'100px'">
                    <el-select v-model="permModel.enVisible" placeholder="请选择类型">
                        <el-option label="可见" value="true"></el-option>
                        <el-option label="不可见" value="false"></el-option>
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
      permModel: {
        type: '1'
      },
      conditionModel: {
        pageNumber: 1,
        pageSize: 10
      },
      children: []
    }
  },
  methods: {
    showAddMenu () {
      this.dialogVisible = true
    },
    /**
       * 新增保存权限
       * @returns {Promise<void>}
       */
    async savePerm () {
      console.log(this.permModel)
      const { data } = await this.$http.post('/permission/addPermission', this.permModel)
      console.log(data)
      if (data.status) {
        this.$message.success('添加成功')
        this.permModel = {}
        this.dialogVisible = false
        // 调用回显
        await this.queryPermList()
      }
    },
    closeDialog () {
      this.permModel = {}
      this.dialogVisible = false
    },
    async queryPermList () {
      const { data } = await this.$http.get('/permission/pageQuery', this.conditionModel)
      console.log(data)
      if (data.status) {
        this.permList = data.data.records
      }
    },
    handleDeletePerm (model) {
      this.$confirm('确认删除权限？').then(async () => {
        const { data } = await this.$http.delete('/permission/deleteById/' + model.id)
        if (data.status) {
          this.$message.success('删除成功')
          // 然后请求数据刷新列表
          await this.queryPermList()
        } else {
          this.$message.error('权限被使用或有子权限')
        }
      })
    },
    async clickRow (row) {
      console.log(row)
      // 根据父ID查询下一级权限列表
      const { data: res } = await this.$http.get('permission/getChildrenListByPid/' + row.id)
      if (res.status) {
        if (res.data.length === 0) {
          this.$message.warning('不存在子权限')
        } else {
          this.children = res.data
          // console.log(res.data)
        }
      }
    }
  },
  created () {
    this.queryPermList()
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
