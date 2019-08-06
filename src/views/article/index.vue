<template>
  <div>article什么</div>
</template>

<script>
export default {
  created () {
    // 测试发请求
    this.$http
      // .get('http://ttapi.research.itcast.cn/mp/v1_0/articles')
      .get('/articles') // 配置基准路由（api里）可以简写
      .then(res => {
        console.log(res.data)
      })
  }
}
</script>

<style scoped lang="less">
</style>
