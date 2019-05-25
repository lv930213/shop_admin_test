// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 引入路由
import router from './router/router.js'
// 引入 element
import ElementUi from 'element-ui'
// 引入 element 的css 样式
import '../node_modules/element-ui/lib/theme-chalk/index.css'
// 引入公共样式
import './assets/common.css'
// 需要处理axios
// 引入 axios
import axios from 'axios'
// 1.处理基准地址 设置全局的默认值
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 2每次都要引入 axios
Vue.prototype.$axios = axios

// 3添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

Vue.use(ElementUi)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router, // 挂载路由
  el: '#app',
  components: { App },
  template: '<App/>'
})
