<template>
  <div>
    <!-- 表格 -->
    <el-table :data="rulesData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 第一层 -->
          <el-row class="first" v-for="item1 in scope.row.children" :key="item1.id">
            <el-col :span="4">
              <el-tag closable>{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <!-- 第二层 -->
              <el-row class="second" v-for="item2 in item1.children" :key="item2.id">
                <el-col :span="4">
                  <el-tag type="success" closable>{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    closable
                    class="three"
                    type="warning"
                    v-for="item3 in item2.children"
                    :key="item3.id"
                  >{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" :index="indexMethod"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" icon="el-icon-edit"></el-button>
          <el-button type="danger" plain size="mini" icon="el-icon-delete"></el-button>
          <el-button
            type="success"
            plain
            size="mini"
            icon="el-icon-check"
            @click="showRolesTree(scope.row)"
          >分配权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 角色授权对话框 -->

    <el-dialog title="角色授权" width="30%" :visible.sync="dialogRulesAssignVisible">
      <!-- 树状结构 -->
      <el-tree
        :data="treeData"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        :default-checked-keys="keys"
        :default-expand-all="true"
        ref="tree"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRulesAssignVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
//  :default-checked-keys="keys"
export default {
  data() {
    return {
      rulesData: [
        {
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }
      ],
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      dialogRulesAssignVisible: false,
      keys: [],
      rulesId: 0
    }
  },
  created() {
    this.loadRulesData()
    this.loadRulesTreeData()
  },
  methods: {
    indexMethod(index) {
      return index
    },
    // 获取后台接口的角色数据
    async loadRulesData() {
      let res = await this.$axios.get('roles')
      console.log(res)
      this.rulesData = res.data.data
    },
    // 展示分配角色的树形结构
    showRolesTree(row) {
      this.dialogRulesAssignVisible = true
      // 给后台发送请求
      // console.log(this.keys)
      // 将id 存储到 data种
      this.rulesId = row.id
      // 获取当前的第三级
      let keys = []
      console.log(row)

      row.children.forEach(item1 => {
        item1.children.forEach(item2 => {
          item2.children.forEach(item3 => {
            keys.push(item3.id)
          })
        })
      })
      // this.keys = keys
      // console.log(this.keys)

      this.$nextTick(() => {
        // console.log(this.$refs.tree)
        // this.$refs.tree.setCheckedKeys([116])
        this.$refs.tree.setCheckedKeys(keys)
      })
    },
    // 分配权限
    async updateRights() {
      // 获取所有选中以及半选中的id
      let a1 = this.$refs.tree.getCheckedKeys()
      let a2 = this.$refs.tree.getHalfCheckedKeys()

      let rids = [...a1, ...a2].join(',')

      let res = await this.$axios.post(`roles/${this.rulesId}/rights`, {
        rids
      })
      console.log(res)

      if (res.data.meta.status === 200) {
        // 1提示 角色授权成功
        this.$message({
          message: '角色授权成功',
          type: 'success',
          duration: 800
        })
        //2.隐藏对话框
        this.dialogRulesAssignVisible = false
        // 3.重新刷新页面
        this.loadRulesData()
      }
    },

    //获取后台的树形结构的数据
    async loadRulesTreeData() {
      let res = await this.$axios.get('rights/tree')
      console.log(res)
      this.treeData = res.data.data
    }
  }
}
</script>

<style scope lang='less'>
.first {
  border-bottom: 1px dashed #ccc;
  margin-bottom: 10px;
  .second {
    margin: 10px;
    .three {
      margin-right: 10px;
    }
  }
  &:last-child {
    border: none;
  }
}
</style>
