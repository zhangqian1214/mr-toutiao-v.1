<template>
  <div>
    <div>header</div>
    <div>
      <!-- :msg="msg"自定义属性接收组件私有数据 -->
      <slot name="z" :msg="msg" a="11"></slot>
      <!-- 插槽标签 -->
    </div>
    <div>
      <slot name="x"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-test', // 给组件记录一个名字，用它才是名字（跟取一个名字有差别）
  data () {
    return {
      msg: '组件内部数据'
    }
  }
}
</script>

<style scoped land="less">
</style>
