// main.js 入口文件
// 作用1：需要的依赖模块都往这里引（js、包、css、各种资源）
// 作用2：创建一个根vue实例（其它文件用到的引入vue实例都是它）

import Vue from 'vue' // 导入的vue包
import App from './App.vue' // 导入的APP这个根组件

// 是否开启产品级别提示：开发阶段不开启 ，产品阶段开启，开启后控制台会产生开发日志，越详细越好？
Vue.config.productionTip = false

new Vue({
  render: h => h(App)// render渲染函数（把什么内容渲染到哪里），有个回调参数'h'是渲染的意思，渲染导入的APP这个根组件
}).$mount('#app') // $mount是挂载的意思，跟组件内容挂载到id是app的这个容器内显示页面中
