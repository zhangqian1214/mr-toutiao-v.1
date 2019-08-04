//  单页面根组件 文件

<template>
  <div id="app">
    <!-- 一级路由的出口，一级路由对应组件渲染的位置，一级路由渲染到根页面 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
</style>

// 核心的4块拆分开的文件
// App.vue 根组件   一级路由出口，其实所有拆分的路由组件都在这个文件的‘<router-view>’容器标签里渲染显现
// index.js 根路由  有一个路由实例，所有路由地址都统一写在这里面
// main.js 入口文件  vue实例在这里，核心对象，各种包、模块、工具都往这里导
// index.vue 单页面组件   一个个具体的要表现的页面内容,会被导入到index.js文件，写出路由
