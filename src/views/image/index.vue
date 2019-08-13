<template>
  <div>
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div class="btn-box">
        <el-radio-group v-model="reqParams.collect" @change="changeCollect" size="small">
          <!-- 注意查文档，按钮要单选，对应的是你当前数据reqParams的值false，属性是动态添加 -->
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button @click="openDialog()" type="success" style="float:right">添加素材</el-button>
      </div>
      <div class="img-list">
        <!-- 此时v-for="item in 10"是遍历10次的意思 -->
        <div class="img-item" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="footer" v-show="!reqParams.collect">
            <span @click="toggleCollect(item)" class="el-icon-star-off" :class={selected:item.is_collected}></span>
            <span @click="deleteimage(item.id)" class="el-icon-delete"></span>
          </div>
        </div>
      </div>
    </el-card>
    <!-- 分页数据条数total>reqParams.per_page一页的最大显示数，显示分页 -->
    <el-pagination
      v-if="total>reqParams.per_page"
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="reqParams.per_page"
      :current-page="reqParams.page"
      @current-change="changePager"
    ></el-pagination>
    <!--total总条数；page-size一页数量；current-page默认所在页数
    @current-change这个方法是查e-ui文档得来，用来实现翻页（点击页面获取页面值触发事件，有默认参数（当前选择页面），所以方法不带括号）-->

    <!-- 对话框组件 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <!-- name属性，提交给后台文件的字段名，默认值file,而后台要image -->
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        name='image'
        :headers="headers"
        :show-file-list="false"
        :on-success="handleSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      reqParams: {
        collect: false, // 收藏与否的状态
        page: 1,
        per_page: 10
      },
      images: [], // 声明空数组，存放获取的图片数据
      total: 0, // 总条数
      dialogVisible: false, // 声明一个数据，控制对话框显示隐藏，默认false隐藏
      imageUrl: null, // 上传成功后的图片地址
      headers: { // 组件初始化的时候生成了一个对象，里面包含了用户信息
        Authorization: `Bearer ${store.getUser().token}`// ？
      }
    }
  },
  created () {
    // 页面生成就执行（钩子函数）
    this.getImages() // 获取图片素材函数
  },
  methods: {
    // 删除
    async deleteimage (id) { // 因为要更新列表，请求数据，请求一定是异步async
      // 加个确认框
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete('user/images/' + id)
        this.$message.success('删除成功')
        this.getImages()
      }).catch(() => {})
    },
    //   切换收藏状态
    async toggleCollect (item) { // 切换是发请求，所以一定是异步，地址后面要id，修改的是那张图片
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`, {
        collect: !item.is_collected // collect是否收藏，值为取反
      })
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功') // 提示？
      item.is_collected = data.collect // is_collected是否收藏，更新当前图片状态
    },
    //  上传
    handleSuccess (res) {
      // 获取上传成功的图片地址
    //   console.log(res)//不知道地址是什么就log查看一下：res.data.url
      this.imageUrl = res.data.url // 图片预览
      this.$message.success('上传成功') // 提示
      window.setTimeout(() => {
        this.dialogVisible = false // 在2秒定时器内关闭对话框
        this.reqParams.page = 1 // 更新列表
        this.getImages()
      }, 2000)
    },
    //   打开上传图片对话框
    openDialog () {
      this.imageUrl = null// 当下次点开上传对话框时，清空预览信息
      this.dialogVisible = true
    },
    //   改变全部与收藏
    changeCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 分页函数
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    async getImages () {
      // 拿后台数据一定是异步方法，所以async
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams }) // get请求发送数据就要{params:数据}格式
      this.images = data.results // 赋值给素材列表
      this.total = data.total_count // 图片总数赋值
    }
  }
}
</script>

<style scoped lang="less">
.img-list {
  margin-top: 20px;
}
.img-item {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  position: relative;
  display: inline-block;
  margin-right: 50px;
  margin-bottom: 20px;

  img {
    width: 100%;
    height: 100%;
    display: block;
  }
  .footer {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 30px;
    line-height: 30px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    text-align: center;
    width: 100%;
    span {
     margin: 0 20px;
      &.selected {
        color: red;
      }
    }
  }
}
</style>
