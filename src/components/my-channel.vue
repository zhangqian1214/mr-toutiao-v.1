// 这里是频道下拉功能组件

<template>
<!-- :value='value'到父组件获取的数据是只读，要自定义属性赋值才能修改使用数据 -->
  <el-select :value='value' clearable  placeholder="请选择" @change="fn">
    <!-- clearable用来清除选择器的选择条件 -->
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id">
      <!-- :key作唯一标识；:label下拉框说明文字；:value文字对应的值（id）;它们的具体字段值后台给（查接口） -->
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'MyChannel', // 这个组件的名字
  props: ['value'], // 接收的父组件数据；props父传子数据（注意获取的数据只读）
  data () {
    return {
      channelOptions: []
    }
  },
  created () {
    // 这个钩子函数在页面刚渲染的时候触发
    // 获取下拉频道选项数据
    this.getChannelOptions()
  },
  methods: {
    async getChannelOptions () {
      // ？async、await
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    },
    fn (val) {
      // 这个if代替了watch功能
      if (val === '') val = null // 在传给父组件数据前，保证不会传空字符串引发报错（处理后端不支持空字符串）
      this.$emit('input', val) // 子组件向父组件传数据：$emit功能是抛出一个叫input的事件，上面绑定了要传给父组件的数据
    }
  }
//   // 计算属性computed：当你需要依赖data中的数据得到一个新数据，当data中的数据改变，计算属性也会改变（数据改变，触发计算，重新算结构）
//   // 侦听器watch：当需要监听某个data数据改变，改变后做性能开销较大操作（异步操作），也可以做其它事情
//   watch: {
//     // 为什么是字符串？
//     'myValue': function (newVal, olVal) {
//       // console.log(newVal)
//       // 如果选择器没有选项数据，就为null（不然是空（字符串）会报错）
//       if (newVal === '') this.myValue = null
//     }
//   }
}
</script>

<style>
</style>
