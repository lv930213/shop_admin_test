<template>
  <div>
    <!-- 面包屑导航  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table ref="rightsTable" :data=" rightsData" highlight-current-row style="width: 100%">
      <el-table-column type="index" :index="indexMethod" width="50"></el-table-column>
      <el-table-column property="authName" label="权限名称" width="200"></el-table-column>
      <el-table-column property="path" label="路径" width="200"></el-table-column>
      <el-table-column property="level" label="等级">
        <template slot-scope="scope">
          <span v-if="scope.row.level==0">一级</span>
          <span v-else-if="scope.row.level=='1'">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rightsData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      currentRow: null
    }
  },
  /* eslint-disable */
  created() {
    // 发送请求 获取后台接口权限列表的数据
    this.loadRightsData()
  },
  methods: {
    indexMethod(index) {
      return index
    },
    // 获取权限列表的数据
    async loadRightsData() {
      let res = await this.$axios.get('rights/list')
      console.log(res)
      this.rightsData = res.data.data
    }
  }
}
</script>

<style scoped lang='less'>
.el-breadcrumb {
  background-color: #d4dae0;
  padding: 10px;
  padding-left: 20px;
}
</style>
