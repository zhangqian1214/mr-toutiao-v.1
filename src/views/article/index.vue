<template>
  <div>
    <!-- 筛选区域 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <!-- e-ui组件的属性设置查文档 -->
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <!-- v-model双向绑定， -->
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">

          <!-- 这里v-model内部会自动执行(这些是v-model的底层实现原理)
          :value="reqParams.channel_id"
          @input="reqParams.channel_id=数据（$event）"-->
          <my-channel v-model="reqParams.channel_id"></my-channel>

          <!-- 频道内容单独拆分包装一个组件 -->
          <!-- clearable用来清除选择器的选择条件 -->
          <!-- <el-select clearable v-model="reqParams.channel_id" placeholder="请选择">
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
              <-- :key作唯一标识；:label下拉框说明文字；:value文字对应的值（id）;它们的具体字段值后台给（查接口） --
            </el-option>
          </el-select>-->
        </el-form-item>
        <el-form-item label="日期：">
          <!-- 这里有个问题 v-model双向绑定的是两个数据（开始时间，结束时间），怎么同时绑定两个数据？ -->
          <!-- change查e-ui文档，这个事件是在获取到数据(监听值的变化)时自动触发 -->
          <!-- value-format转换值的格式 -->
          <el-date-picker
            @change="changeDate"
            value-format="yyyy-MM-dd"
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果区域 -->
    <el-card>
      <div slot="header">根据筛选条件共查询到{{total}}条结果：</div>
      <!-- 表格组件 -->
      <el-table :data="articles" style="width: 100%">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image
              :src="scope.row.cover.images[0]"
              fit="contain"
              style="width: 120px; height: 100px"
            >
              <div slot="error">
                <img src="../../assets/images/error.gif" alt style="width: 120px; height: 100px" />
              </div>
            </el-image>
            <!-- <img :src="scope.row.cover.images[0]" alt /> -->
            <!-- :src因为是动态绑定，（头像图片各不一样）所以是动态绑定属性；scopa是收集了插槽所有属性的对象数据；
            row是当前行（每次遍历）的对象数据；cover是当前行数据对象的某一项值，封面属性；images具体的那张图片，可能有多张，所以带索引-->
            <!-- slot-scope="scope"是获取el-table组件的内部数据的，数据在本组件内，但是传给了el-table（:data="articles"）处理... -->
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <!-- 这里的完成的思想的，后台给的是数字代表的文章状态码，有多少种状态，我们给几种对应显示的标签，然后用v-if（条件成立true，显示，否隐藏）来控制切换 -->
          <template slot-scope="scope">
            <!-- 注意要用作用域插槽，要写template标签 -->
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布日期" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <!-- 因为做删除操作要组件内部（拿数据）id，所以用插槽 -->
            <el-button type="primary" @click="eidt(scope.row.id)" icon="el-icon-edit" circle plain></el-button>
            <el-button type="danger" @click="del(scope.row.id)" icon="el-icon-delete" circle plain></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <div style="text-align: center; margin-top: 30px;">
        <el-pagination
          background
          layout="prev, pager, next,total"
          :total="total"
          :page-size="reqParams.per_page"
          @current-change="changePager"
          :current-page="reqParams.page"
        ></el-pagination>
        <!-- current-page这个属性主要解决一个问题，手动输入切换页码和底部点击分页切换页码对齐 -->
      </div>
    </el-card>
  </div>
</template>

<script>
// 因为把公共组件封装了全局vue插件中，所以不用在单独导入
// import MyTest from '@/components/my-test' // 导入插槽测试学习用公共组件
// import MyBread from '@/components/my-bread' // 导入插槽用公共组件
export default {
  // components: { MyTest, MyBread },
  data () {
    return {
      // 收集请求参数（表单数据）
      reqParams: {
        // v-model双向绑定收集到表单数据
        status: null, // status数据的名字是后台给的，看后台接口叫什么
        channel_id: null,
        begin_pubdate: null, // 时间数据是怎么给到这里？
        end_pubdate: null,
        page: 1, // 当前默认页数
        per_page: 20 // 一页多少条数据,组件内动态绑定，这里控制页数(这里说了算)
      },
      // // 频道下拉选项数据
      // channelOptions: [],
      // 日期数据（双向绑定的数据以数组形式获取）
      dateArr: [],
      // 文章列表数据，服务器拿的
      articles: [],
      total: 0 // 总条数,使用数据前先申明（一个空壳，获取的数据往这里赋值）
    }
  },
  // // 计算属性computed：当你需要依赖data中的数据得到一个新数据，当data中的数据改变，计算属性也会改变（数据改变，触发计算，重新算结构）
  // // 侦听器watch：当需要监听某个data数据改变，改变后做性能开销较大操作（异步操作），也可以做其它事情
  // watch: {
  //   // 为什么是字符串？
  //   'reqParams.channel_id': function (newVal, olVal) {
  //     // console.log(newVal)
  //     // 如果选择器没有选项数据，就为null（不然是空（字符串）会报错）
  //     if (newVal === '') this.reqParams.channel_id = null
  //   }
  // },
  created () {
    // 这个钩子函数在页面刚渲染的时候触发
    // 获取下拉频道选项数据
    // this.getChannelOptions()
    // 获取文章列表数据q
    this.getArticles()
  },
  methods: {
    // 编辑文章
    eidt (id) {
      // 发布文章和编辑文章使用的是同一个路由规则
      // 如果使用params 是路径传参 /publish   /publish/1000 是两个规则
      // 如果使用query 传参 /publish   /publish?id=10 是一个规则
      this.$router.push('/publish?id=' + id)
    },
    // 删除文章
    del (id) {
      // 一个弹框，确认删除文章
      this.$confirm('删除后将无法恢复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`articles/${id}`) // 发送ajax删除数据
          this.$message.success('删除文章成功') // 提示删除文章成功
          this.getArticles() // 执行获取数据函数（更新列表）
        })
        .catch(() => {})
    },
    // 选择日期后函数
    changeDate (dateArr) {
      // dataArr[起始日期，结束日期]
      // 时间有就取值，没有就为null
      if (dateArr) {
        this.reqParams.rbegin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.rbegin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选方法
    search () {
      this.reqParams.page = 1 // 筛选后都回到第一页
      this.getArticles() // 根据这个函数获取数据
    },
    // 在方法里定义一个获取数据的函数
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    // async getChannelOptions () {
    //   // ？async、await
    //   const {
    //     data: { data }
    //   } = await this.$http.get('channels')
    //   this.channelOptions = data.channels
    // },
    async getArticles () {
      const {
        data: { data }
        // 请求方式get，第二个参数是一个对象{params:指定参数对象}便利
      } = await this.$http.get('articles', { params: this.reqParams })
      // articles声明一个空数组壳子（准备放数据），等于后台获取的数据results
      this.articles = data.results // 文章列表
      this.total = data.total_count // 总条数
    }
  }
}
</script>

<style scoped lang="less">
.el-card {
  margin-bottom: 20px;
}
</style>
