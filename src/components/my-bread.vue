<template>
<el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><slot></slot></el-breadcrumb-item>
        </el-breadcrumb>
</template>

<script>
export default {
  name: 'my-bread'// 给组件记录一个名字，用它才是名字（跟取一个名字有差别）
}
</script>

<style>

</style>
