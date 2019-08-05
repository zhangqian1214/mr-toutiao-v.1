// 对axios进行配置，然后将配置好的axios导出

import axios from 'axios' // 导入axios包
import store from '@/store' // 导入封装的获取用户信息的模块

// 进行ajax配置，基准路径
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 请求头字段
// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser().token}`
// }
axios.interceptors.request.use((config) => {
  // 每次请求前获取一次token，设置请求头
  // 好处：不会覆盖之前头部信息
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  return config
}, (err) => {
  return Promise.reject(err)
})

axios.interceptors.response.use((res) => {
  // 成功的返回值 默认包装成promise对象
  return res
}, (err) => {
  // 获取响应状态码
  // err 错误对象
  // err.response 响应对象
  // err.response.status 响应状态码
  if (err.response.status === 401) {
    // token失效  跳转登录页面
    // this.$router.push('/login')  本质  把hash改成了 #/login
    location.hash = '#/login'
  }
  return Promise.reject(err)
})

export default axios
