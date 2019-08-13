<template>
  <div class="container">COM-A{{msg}}</div>
</template>

<script>
import eventBus from '@/components/eventBus'
export default {
  name: 'com-a',
  data () {
    return {
      msg: ''
    }
  },
  created () {
    // 事件绑定在‘事件总线eventBus上’，事件名'b2a'，回调函数接收数据
    eventBus.$on('b2a', (data) => {
      this.msg = data
    })
  }
}
</script>

<style>

</style>
