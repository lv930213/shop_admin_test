<template>
  <el-row type="flex" justify="center" align="middle">
    <el-col :span="8">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" @click="submitForm()">登录</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
// 引入 axios
import axios from 'axios'
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 说明校验成功
          // 使用axios 给接口发送请求  判断用户名和密码是否成功
          axios
            .post('http://localhost:8888/api/private/v1/login', this.loginForm)
            .then(res => {
              console.log(res)
              if (res.data.meta.status === 200) {
                // 将数据中的token 存储到本地中
                localStorage.setItem('token', res.data.data.token)
                // 然后提示登录成功
                this.$message({
                  message: '登录成功',
                  type: 'success',
                  duration: 1000
                })
                // 跳转到home  使用编程式导航
                this.$router.push('/home')
              } else {
                // 登录失败
                this.$message({
                  message: '用户名和密码不正确',
                  type: 'warning',
                  duration: 1000
                })
                return false
              }
            })
        } else {
          this.$message({
            message: '格式不正确',
            type: 'warning',
            duration: 1000
          })
          return false
        }
      })
    },
    resetForm () {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style scoped lang='less'>
.el-row {
  height: 100%;
  background-color: #2d434c;
}
.el-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
}
</style>
