// 封装一个vue插件
// 作用：注册components下的所有组件为全局组件

// vue插件定义的规则：暴露一个对象{}，在对象中选项install 对应一个函数 函数形参 vue对象

import MyBread from '@/components/my-bread'// 引入要注册成全局组件的组件
import MyTest from '@/components/my-test'
import MyChannel from '@/components/my-channel'
import MyImage from '@/components/my-image'

import COMA from '@/components/com-a' // 非父子组件 测试学习
import COMB from '@/components/com-b'

export default {
  install (Vue) {
    // 封装的插件会通过Vue.use(使用插件)，这里的参数Vue就是.use前的Vue
    // Vue全局注册组件即可
    Vue.component(MyBread.name, MyBread) // （用起来的组件名，组件）
    Vue.component(MyTest.name, MyTest)
    Vue.component(MyChannel.name, MyChannel)
    Vue.component(MyImage.name, MyImage)

    // 非父子 组件 测试学习
    Vue.component(COMA.name, COMA)
    Vue.component(COMB.name, COMB)
  }
}
