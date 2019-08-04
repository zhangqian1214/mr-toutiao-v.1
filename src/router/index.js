// 功能：初始化(new)路由对象，然后导出供main.js入口文件导入使用

import Vue from 'vue' // 引vue包（这两个都是全局对象，不用写相对地址）
import VueRouter from 'vue-router'// 引vue-router包

import Login from '@/views/login'// 导入登录页面 单页面组件
import Home from '@/views/home'// 导入主页面 单页面组件
import Welcome from '@/views/welcome'// 导入主页面的主板块 单页面组件（二级路由）
import Article from '@/views/article'// 内容管理二级组件
import NotFound from '@/views/404'// 404组件,在没有路由的时候显示

Vue.use(VueRouter) // 调用vue-router？

const router = new VueRouter({ // new vuerouter实例
  routes: [// 里面的一个配置项，定义一个空数组，里面之后都是路由地址对象
    {
      // 跳转路由$router.push('/login')或$router.push({name: 'login'})
      path: '/login',
      name: 'login', // name的意思是路由路径别名，用name照样可以跳转路由路径
      component: Login// 注意登录页面是一级路由组件，渲染到 根组件文件 下
    },
    // {  //二级路由落伍写法
    //   path: '/', // 路由的地址
    //   name: 'home', // 路地址的别名
    //   component: Home, // 根据路由地址渲染这个组件（页面内容）
    //   redirect: '/welcome', // 重定向：改变路由页面（让主页面默认显示welcome二级路由）
    //   children: [ // children：（孩子们）二级路由
    //     { path: '/welcome', name: 'welcome', component: Welcome }
    //   ]
    // }
    { // 跟上面一样效果的写法
      path: '/', // 路由的地址
      // name: 'home', // 路地址的别名，也可以不用写了，跟二级路由同路径不同名，有冲突警报
      component: Home, // 根据路由地址渲染这个组件（页面内容）
      children: [ // children：（孩子们）二级路由
        // 不用写重定向，默认路径是主页面路由时，默认显示二级路由组件
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article }
      ]
    },
    {
      path: '*', // 路径通配符，任何找不到的路径都是它这个路径，组件显示内容404
      name: '404',
      component: NotFound
    }
  ]
})

export default router // 路由拆分，导出router对象，让其它文件可以导入使用
