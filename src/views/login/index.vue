//这是主页面路由 登录页面，放在views文件夹内

<template>
  <div class="container">
    <el-card class="my-card">
      <!-- logo图片 -->
      <img src="../../assets/images/logo_index.png" alt="logo" />
      <!-- el表单 -->
      <!-- :model绑定整个表单数据对象，:rules校验格式用？；status-icon校验反馈 -->
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon>
        <!-- 表单项,像div包住表单元素；prop？ -->
        <el-form-item prop="mobile">
          <!-- 表单元素；v-model表单数据双向绑定 -->
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            placeholder="请输验证码"
            style="width:232px;margin-right:10px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <!-- :value="true"默认点中（定死了）？ -->
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="login()">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import store from '@/store' // 把封装的sessionStorage导入
export default {
  data () {
    // 自定义校验函数，要写在return之前;三个必写参数：rule校验规则对象，value字段值？，callback回调函数提示校验成功与否
    const checkMobile = (rule, value, callback) => {
      // 如果正则表达式校验test(value)？值不成功，return（作用是停止当前程序）返回错误提示函数
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机格式不正确'))
      } // 原来可以new错误对象
      callback() // 成功就跳过if，返回空函数，表示校验成功
    }
    return {
      loginForm: {
        // 数据函数返回一个表单数据对象,跟表单双向绑定，发回服务器
        mobile: '13911111111', // 字段参考接口文档（后端给的）
        code: '246810' // 实际开发中这些都是空的，提供双向绑定获取，现在图方便，先写死
      },
      // 具体校验规则查阅element-UI文档
      loginRules: {
        // 校验规则对象,对用户输入的信息进行校验，通过才发送服务器
        mobile: [
          // 校验规则可能有多套，所以用数组
          // required必填校验，message校验错误提示，trigger在失去焦点的时候触发校验
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' } // validator校验函数，在失去焦点时触发执行
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          // 对输入的东西校验要求：len长度6个字符
          { len: 6, message: '请输入6位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 对整个表单进行验证的函数
      // 要操作dom，记得给表单加ref属性；validate是校验方法，里面是一个回调函数，参数valid是判断校验是否成功，查E-ui文档来的
      this.$refs.loginForm.validate(async valid => {
        // 校验成功与否就看传回valid的值，不用管，是E-ui自动给的？
        if (valid) {
          // 如果校验成功,就发ajax，请求类型、地址、都查文档；$http是自定义属性名，是vue上挂载的axios方法
          // this.$http
          //   .post(
          //     'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
          //     this.loginForm
          //   ) // this.loginForm是要发给服务器的对象形式数据
          //   .then(res => {
          //     // res是响应对象，里面有响应行、响应头、响应体
          //     // console.log(res.data)// res.data是响应体（服务器返回的数据），验证成功测试
          //     // 存储用户信息：res.data是响应体所有；res.data.data是响应体中的用户信息
          //     store.setUser(res.data.data)
          //     this.$router.push('/') // 登录成功追加跳转到主页面
          //   })
          //   .catch(() => {
          //     // catch是什么？是axios提供的请求错误回调
          //     // 请求失败提示
          //     this.$message.error('手机或验证码错误') // e-ui提供的
          //   })

          // 这一段是校验成功发请求，跟上面注调的一样
          // 第一个data是res.data；后面的data是res.data.data是响应体中的用户信息
          // 是 对象的解构赋值 知识点
          try { // try试的意思，表示试试看这段可能出错的代码
            const { data: { data } } = await this.$http.post('authorizations', this.loginForm)
            store.setUser(data)
            this.$router.push('/')
          } catch (e) { // 如果有异常会被catch捕获，try试试代码有没有错，如果有catch处理
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
  }
}
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
    img {
      display: block;
      width: 200px;
      margin: 0 auto 30px;
    }
  }
}
</style>
