// 功能：初始化(new)路由对象，然后导出供main.js入口文件导入使用

import VueRouter from 'vue-router'// 引vue-router包
import Vue from 'vue' // 引vue包（这两个都是全局对象，不用写相对地址）

Vue.use(VueRouter) // 调用vue-router

const router = new VueRouter({ // new vuerouter实例
  routes: [// 里面的一个配置项，定义一个空数组，里面之后都是路由地址对象
    {
      path: ''
    }
  ]
})

export default router // 路由拆分，导出router对象，让其它文件可以导入使用
