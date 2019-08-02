//这是主页面路由 登录页面，放在views文件夹内

<template>
  <div class="container">
    <el-card class="my-card">
      <p>kkk</p>
    </el-card>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
// style属性scoped，表示里面样式仅仅在当前组件有效(原理是会给当前组件的标签加一个唯一标识data-v-37dfd6fc)
//如果想全局样式，就写styles文件夹下的index.less里
.container {
  //登录页背景样式
  width: 100%;
  height: 100%;
  position: absolute;
  /* center/cover 是 背景图定位居中/背景图铺满 */
  background: url(../../assets/images/login_bg.jpg) no-repeat center/cover;
  .my-card {
    //登录页登录项卡片窗口样式
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
  }
}
</style>
