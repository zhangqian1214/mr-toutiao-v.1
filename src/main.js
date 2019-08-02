// main.js 入口文件
// 作用1：需要的依赖模块都往这里引（js、包、css、各种资源）
// 作用2：创建一个根vue实例（其它文件用到的引入vue实例都是它）

import Vue from 'vue' // 导入的vue包
import App from './App.vue' // 导入的APP这个根组件

// import router from './router/index'//这两条功能一样
import router from '@/router'// @是一个路径别名，是src路径（绝对路径），只对vue-cli项目内有效，？
// index名字的文件可以不写（index.js index.vue index.json），会默认找文件夹内index文件

// 导入公共样式
import '@/styles/index.less'// 样式和less没有返回值，直接写路径就可以

import ElementUI from 'element-ui' // 这两句是引入element-ui组件（注意样式文件另外引入）
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)// 调用element-ui组件
// 是否开启产品级别提示：开发阶段不开启 ，产品阶段开启，开启后控制台会产生开发日志，越详细越好？
Vue.config.productionTip = false

new Vue({
  router, // 如果页面url后面有‘#/’,说明加载成功
  // render相对el、template优先度最高
  render: h => h(App)// render渲染函数（把什么内容渲染到哪里），有个回调参数'h'是渲染的意思，渲染导入的APP这个根组件
}).$mount('#app') // $mount是挂载的意思，跟组件内容挂载到id是app的这个容器内显示页面中
