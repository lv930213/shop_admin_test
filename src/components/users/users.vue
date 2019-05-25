<template>
  <div>
    <!-- 添加面包屑导航  -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加输入框 -->
    <el-row>
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-button>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="姓名" width="200"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="200"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="user" prop="mg_state">
          <el-switch
            v-model="user.row.mg_state"
            active-color="#409EFF"
            inactive-color="#DCDFE6"
            @change="changeStatus(user.row.id,user.row.mg_state)"
          ></el-switch>
        </template>
      </el-table-column>
      <!-- 自定义的 -->
      <el-table-column label="操作" width="300">
        <el-button plain type="primary" icon="el-icon-edit" size="mini"></el-button>
        <el-button plain type="danger" icon="el-icon-delete" size="mini"></el-button>
        <el-button plain type="success" icon="el-icon-check" size="mini"></el-button>
      </el-table-column>
    </el-table>
    <!-- 分页  -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="2"
      @current-change="currentchange"
    ></el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      tableData: [],
      value3: true,
      total: 0,
      pagenum: 1,
      searchText: ''
    }
  },
  created () {
    this.getUsersData()
  },
  methods: {
    getUsersData (pagenum = 1, query = '') {
      // getUsersData (pagenum = 1, query = '') {
      // 使用axios 发送请求
      axios
        .get('http://localhost:8888/api/private/v1/users', {
          params: {
            query,
            pagenum,
            pagesize: 2
          },
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then(res => {
          console.log(res)
          this.tableData = res.data.data.users
          this.total = res.data.data.total
          this.pagenum = res.data.data.pagenum
        })
    },
    currentchange (num) {
      this.getUsersData(num, '')
    },
    search () {
      this.getUsersData(1, this.searchText)
    },
    changeStatus (id, state) {
      // 发送请求,改变后台接口对应的数据 怎样得到对应的index 的值
      console.log(id, state)
      // 给接口发送请求
    }
  }
}
</script >

<style scoped lang='less'>
.el-button {
  margin-left: 20px;
}
.el-breadcrumb {
  height: 50px;
  line-height: 50px;
  background-color: #d4dae0;
  padding-left: 20px;
}
</style>
