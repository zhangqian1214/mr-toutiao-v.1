<template>
<!-- 传数据的组件有一个点击事件@click="fn" -->
  <div class="container">COM-B <button @click="fn">给A组件传值</button></div>
</template>

<script>
import eventBus from '@/components/eventBus'// 事件总线eventBus,作为第三方组件，作为其它组件之间传值的媒介
export default {
  name: 'com-b',
  data () {
    return {
      msg: '这是b传的数据:事件总线eventBus学习，此技术用于修改个人设置后，传数据更新右上角头像数据'
    }
  },
  methods: {
    fn () {
      // 触发事件绑定在‘事件总线eventBus上’，事件名'b2a'，传递的数据this.msg
      eventBus.$emit('b2a', this.msg)
    }
  }
}
</script>

<style>

</style>
