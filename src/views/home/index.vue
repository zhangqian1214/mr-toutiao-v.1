//这也是主页面路由 登录成功后的主页面，放在views文件夹内

<template>
  <!-- 页面模板是element-UI查来的 -->
  <el-container class="wrapper">
    <!-- :width自定义属性，一个三元表达式，hide是布尔值，true64px/false200px -->
    <el-aside :width="hide?'64px':'200px'">
      <!-- logo -->
      <!-- v-bind:class对象语法，通过布尔值决定显示类名miniLogo -->
      <h1 class="logo" :class="{miniLogo:hide}"></h1>

      <!-- E-ui相关内容就查文档 -->
      <!-- el-menu侧边导航菜单容器,有了这个容器，可以比较方便的统一管理里面内容样式 -->
      <!-- :collapse这是一个缩小折叠菜单的属性，都是查E-ui得来的，但是为什么前面要加‘：’？因为动态绑定的类名都要加“：” -->
      <!-- :default-active动态绑定切换的加‘：’，$route是路由对象存放数据，path是数据中的路由地址的值 -->
      <!-- router属性，默认为false,表示激活导航时以 index 作为 path 进行路由跳转 -->
      <el-menu
        :collapse="hide"
        :collapse-transition="false"
        :default-active="$route.path"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <!-- 字体图标和使用在e-ui找 -->
        <!-- 这里给它一个点击事件，实现侧边栏的收起功能 -->
        <span class="el-icon-s-fold" @click="toggleMenu"></span>
        <span class="text">不一定每日头条传媒有限公司</span>

        <!-- el-dropdown下拉菜单 -->
        <el-dropdown class="my-dropdown" @command="clickMenu">
          <!-- clickMenu方法不带括号的意思是，要使用command事件的默认参数，让事情默认去调方法，给方法传参 -->
          <span class="el-dropdown-link">
            <!-- 头像图片信息要动态绑定 -->
            <img :src="photo" alt />
            {{name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- native绑定原生事件 -->
            <!-- <el-dropdown-item icon="el-icon-s-tools" v-on:click.native="setting()">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" v-on:click.native="logout()">退出登录</el-dropdown-item> -->
            <!-- 这是实现个人设置和登录功能的第二种方法，查E-ui文档，并不好理解 -->
            <el-dropdown-item icon="el-icon-s-tools" command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <!-- 二级路由显示口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import store from '@/store' // 引入获取用户信息的模块
import eventBus from '@/components/eventBus'

export default {
  data () {
    return {
      hide: false, // 这个数据的值是侧边栏收起与否的状态控制
      name: '', // 设一个空值（用来赋值）
      photo: ''
    }
  },
  created () { // 钩子函数，页面创建时触发，获取用户信息
    // 绑定事件
    eventBus.$on('updatePhoto', (data) => {
      this.photo = data
    })
    const user = store.getUser()// 调用模块中的方法获取用户信息
    this.name = user.name // 获取用户名字（赋值）
    this.photo = user.photo // 用户头像
  },
  methods: {
    toggleMenu () {
      // 这个函数实现切换侧边栏的收起和展开
      this.hide = !this.hide // 这句写的妙，像一个开关，触发一次值就取反一次
    },
    // 解决方法：事件绑定在组件解析后的DOM上，使用事件修饰符prevent阻止默认行为 native绑定原生事件
    setting () { // 这么写有问题（无效），click是原生dom的事件，绑定在组件‘<el-dropdown-item>’上不会起效
      this.$router.push('/setting')
    },
    logout () {
      store.clearUser()// 调用store模块里的方法删除用户信息
      // this.$router.push('/login')
      this.$router.push({ name: 'login' })// 删除后跳转登录页面，路由有名字，可以用名字代替路径跳转，try try see
    },
    // 如果这个事件有默认传参，且想接收默认参数，调用的时候就不加括号
    clickMenu (menuType) {
      // 如果menuType值是===setting  就调用this.setting()
      // 如果menuType值是===login  就调用this.login()
      this[menuType]()// ？
    }
  }
}
</script>

// scoped局部样式，类型是less
<style scoped lang="less">
/* 自定义的e-ui标签名称,就是解析后标签元素的类名 */
.wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  .el-aside {
    //左侧边栏
    background: #002033;
  }
  .el-header {
    //头部
    border-bottom: 1px solid #ddd;
    line-height: 60px;

    .el-icon-s-fold {
      font-size: 30px;
      vertical-align: middle;
    }
    .text {
      font-weight: 600;
      font-size: 19px;
      vertical-align: middle;
      margin-left: 10px;
    }
    .my-dropdown {
      float: right;
      .el-dropdown-link {
        font-weight: 700;
      }
      img {
        width: 40px;
        vertical-align: middle;
      }
    }
  }
  .logo {
    margin: 0;
    width: 100%;
    height: 60px;
    background: #024 url(../../assets/images/logo_admin.png) no-repeat
      center/140px;
  }
  .miniLogo {
    //这个是小图标，在侧边栏缩小的时候显示，所以书写顺序在“.logo”下面（要样式覆盖）
    background-image: url(../../assets/images/logo_admin_01.png);
    background-size: 36px;
  }
  .el-menu {
    border-right: none;
  }
}
</style>
