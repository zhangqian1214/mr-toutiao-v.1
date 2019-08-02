// 功能：初始化(new)路由对象，然后导出供main.js入口文件导入使用

import VueRouter from 'vue-router'// 引vue-router包
import Vue from 'vue' // 引vue包（这两个都是全局对象，不用写相对地址）

import Login from '@/views/login'

Vue.use(VueRouter) // 调用vue-router

const router = new VueRouter({ // new vuerouter实例
  routes: [// 里面的一个配置项，定义一个空数组，里面之后都是路由地址对象
    {
      // 跳转路由$router.push('/login')或$router.push({name: 'login'})
      path: '/login',
      name: 'login', // name的意思是路由路径别名，用name照样可以跳转路由路径
      component: Login// 注意登录页面是一级路由组件，渲染到 根组件文件 下
    }
  ]
})

export default router // 路由拆分，导出router对象，让其它文件可以导入使用
