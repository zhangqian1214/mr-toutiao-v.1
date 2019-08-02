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
