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
        <el-dropdown class="my-dropdown">
          <span class="el-dropdown-link">
            <img src="../../assets/images/avatar.jpg" alt />
            小甜甜
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-s-tools">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">退出登录</el-dropdown-item>
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
export default {
  data () {
    return {
      hide: false // 这个数据的值是侧边栏收起与否的状态控制
    }
  },
  methods: {
    toggleMenu () {
      // 这个函数实现切换侧边栏的收起和展开
      this.hide = !this.hide // 这句写的妙，像一个开关，触发一次值就取反一次
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
