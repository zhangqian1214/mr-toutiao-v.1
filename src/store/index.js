// 封装操作sessionStorage的函数  提供给其它模块使用
// 约定key的名字，value的格式（json字符串格式）

const KEY = 'mr-toutiao-v.1'

export default { // 方法要导出，因为要给别人给
  // 设置用户信息
  setUser (user) { // 参数是user对象数据，存储键值对形式，；为什么不是key:json？
    window.sessionStorage.setItem(KEY, JSON.stringify(user))
  },
  //   获取用户信息
  getUser () {
    //   值要么是对象字符串的用户信息，要么是空对象（作为假设没有用户信息的默认值），反正都有对象，防止报错
    return JSON.parse(window.sessionStorage.getItem(KEY) || '{}')
  }
}
