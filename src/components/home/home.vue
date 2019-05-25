<template>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="8">
          <img src="../../assets/images/logo.png" alt>
        </el-col>

        <el-col :span="8">
          <h1>网易后台管理系统</h1>
        </el-col>
        <el-col :span="8">
          <div class="c-right">
            恭喜你成功加入网易
            <a href="javascript:void(0)" @click="logout">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-row>
          <el-col>
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              :router="b"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>
                <!-- <el-menu-item-group> -->

                <el-menu-item index="users">
                  <i class="el-icon-menu"></i>用户列表
                </el-menu-item>
                <!-- </el-menu-item-group> -->
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>权限管理</span>
                </template>
                <!-- <el-menu-item-group> -->

                <el-menu-item index="rules">
                  <i class="el-icon-menu"></i>角色列表
                </el-menu-item>

                <el-menu-item index="rights">
                  <i class="el-icon-menu"></i>权限列表
                </el-menu-item>
                <!-- </el-menu-item-group> -->
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      b: true
    }
  },

  methods: {
    logout () {
      this.$confirm('此操作将退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 点击确定后执行
          // 移除本地存储中的token
          localStorage.removeItem('token')
          // 提示退出登录成功
          this.$message({
            type: 'success',
            message: '退出成功!将跳转到登录页面',
            duration: 800
          })
          // 跳转
          setTimeout(() => {
            this.$router.push('/login')
          }, 800)
        })
        .catch(() => {
          // 点击取消后执行
          this.$message({
            type: 'info',
            message: '取消退出',
            duration: 800
          })
        })
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    }
  }
}
</script>

<style scoped lang='less'>
.el-container {
  height: 100%;
  min-width: 1000px;
}
.el-header {
  background-color: #b3c1cd;
  h1 {
    text-align: center;
    line-height: 60px;
    color: #fff;
  }
  .c-right {
    text-align: right;
    line-height: 60px;
    a {
      color: #daa520;
      text-decoration: none;
    }
  }
}
.el-aside {
  background-color: #545c64;
  .el-menu {
    width: 100%;
  }
}
.el-main {
  background: #eaeef1;
}
</style>
