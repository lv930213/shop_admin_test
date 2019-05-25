/* eslint-disable */
// 引入 vue
import Vue from 'vue'

// 引入 vue-router
import VueRouter from 'vue-router'
// 引入组件
import Login from '../components/login/login'
// 引入home 组件
import Home from '../components/home/home'
import Users from '../components/users/users'
import Rules from '../components/rules/rules'
import Rights from '../components/rights/rights'
// 安装vue-router
Vue.use(VueRouter)
// 实例化路由
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: Login },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        { path: '/users', name: 'users', component: Users },
        { path: '/rules', name: 'rules', component: Rules },
        { path: '/rights', name: 'rights', component: Rights }
      ]
    }
  ]
})
// 导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    let res = localStorage.getItem('token')
    res ? next() : next({ name: 'login' })
  }
})

// 设置规则
// 创建组件
// 找出口
// 找入口
// 导出 router
export default router
