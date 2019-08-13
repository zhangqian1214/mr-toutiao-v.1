// 封装操作sessionStorage的函数  提供给其它模块使用
// 约定key的名字，value的格式（json字符串格式）

const KEY = 'mr-toutiao-v.1'

export default { // 方法要导出，因为要给别人给
  // 设置用户信息
  setUser (user) { // 参数是user对象数据，存储键值对形式，；为什么不是key:json？
    // 存储 user 对象数据
    // 现在：给什么存什么  完整替换之前的信息。
    // 预期：给一个字段，就局部修改这个字段即可。 {name:''}
    // 做法：获取本地的存储的对象，把传入的对象，合并覆盖到当前存储对象中。
    const localUser = this.getUser()
    const newUser = { ...localUser, ...user } // 合并，结构赋值的写法；前后两个对象分别展开，不相同的属性后面会前面的对象会继承，相同的属性后面会覆盖前面
    window.sessionStorage.setItem(KEY, JSON.stringify(newUser))
  },

  //   获取用户信息
  getUser () {
    //   值要么是对象字符串的用户信息，要么是空对象（作为假设没有用户信息的默认值），反正都有对象，防止报错
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  },
  // 移除用户信息
  clearUser () { // 删除本地存储sessionStorage中的KEY（用户信息）
    window.sessionStorage.removeItem(KEY)
  }
}
