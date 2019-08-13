<template>
  <div class="my-image">
    <!-- 图片按钮 -->
    <!-- 点击事件openDialog，点击打开对话框（选择图片的界面） -->
    <div class="img-btn" >
      <img :src="value||defaultImage" @click="openDialog()" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <!-- tabs组件 -->
      <!-- activeName控制选项卡显示谁 -->
      <el-tabs v-model="activeName">
        <el-tab-pane label="素材库" name="image">
          <!-- 单选框 -->
          <el-radio-group @change="changeCollect" v-model="reqParams.collect" size="mini">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 列表 -->
          <div class="img-list">
            <!--  @click="selectedImageUrl=item.url"记录当前点击的图片地址 -->
            <!-- 动态绑定，selected这个类名加不加，取决于你当前点击的图片 是否等于 获取数据里的图片地址？ -->
            <div
              class="img-item"
              :class="{selected:selectedImageUrl===item.url}"
              @click="selectedImageUrl=item.url"
              v-for="item in images"
              :key="item.id"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            v-if="total>reqParams.per_page"
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="changePager"
          ></el-pagination>
        </el-tab-pane>
        <!-- 上传图片内容 -->
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleSuccess"
            name="image"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store' // 用户信息模块
import defaultImage from '../assets/images/default.png' // 导入默认图片地址
// 有一个打包概念，只有网络路径url、src、href，和import会导入去打包
// （就是只有这样才有效，动态绑定本地路径无效会报错，要通过import打包一下（导入），在赋值）

export default {
  name: 'my-image',
  props: ['value'], // 接收value属性（图片地址），父组件传子组件
  // 这里下面的value会报错，因为一个组件不能同时声明两个同名数据
  data () {
    return {
      dialogVisible: false, // 控制对话框显示隐藏 自定义属性？让什么东西看不见 默认是看不见的（选择图片的对话框）
      activeName: 'image', // 控制tab选项卡到底激活谁
      reqParams: { // 获取素材列表请求参数
        collect: false,
        page: 1,
        per_page: 8
      },
      images: [], // 图片列表数据
      total: 0, // 总条数
      selectedImageUrl: null, // 记录你当前选中的图片地址
      headers: {
        // 上传头部
        Authorization: `Bearer ${store.getUser().token}`
      },
      // 记录上传成功的图片地址
      uploadImageUrl: null,
      // value: defaultImage // （按钮图片）封面默认图片地址
      defaultImage // 导入的默认图片地址，要定义一下，成为当前组件的属性或方法才能使用（否则报错）
      // 父组件没有数据的时候，defaultImage为子组件自己的默认图
    }
  },
  methods: {
    // 确认图片
    confirmImage () {
      if (this.activeName === 'image') { // 如果是在素材库页面
        // this.value = this.selectedImageUrl // 按钮图片的图片等于选中的图片
        this.$emit('input', this.selectedImageUrl) // 向父组件提交数据
      } else {
        // this.value = this.uploadImageUrl // 按钮图片显示的图片等于上传的图片
        this.$emit('input', this.uploadImageUrl)
      }
      this.dialogVisible = false // 确认图片最后关闭对话框
    },
    // 上传成功
    handleSuccess (res) {
      // 预览即可
      this.uploadImageUrl = res.data.url
    },
    // 分页函数
    changePager (newPage) {
      // 默认接收想要改变的页码
      this.reqParams.page = newPage // 页面重新赋值
      this.getImages()
    },
    changeCollect () {
      // 切换全部与收藏
      this.reqParams.page = 1 // 切换的逻辑不是很懂
      this.getImages()
    },
    openDialog () {
      this.dialogVisible = true // 对话框true（显示）

      this.activeName = 'image' // 下次打开默认切回素材库的页面
      this.selectedImageUrl = null // 清空之前选中或上传的图片地址
      this.uploadImageUrl = null

      this.getImages() // 获取素材列表数据
    },
    async getImages () {
      // 获取素材列表数据的方法
      const {
        // 解构赋值第一个data是自定义键名，第二个data是api文档查得代表后台 整个响应主体
        data: { data } // then接收对象res={data'所有的响应主体内容'：data'响应主体内有一个叫data的数据'};{data:data}==>{data:{data:data}}
      } = await this.$http.get('user/images', { params: this.reqParams }) // ？
      this.images = data.results // 拿到图片列表数据
      this.total = data.total_count // 获取总条数
    }
  }
}
</script>

 <style lang="less" scoped>
 .my-image{//封面选择，单双图样式
   display: inline-block;
   margin-right: 20px;
 }
.img-btn {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  text-align: center;
  width: 100%;
  display: block;
  //   样式都不知道了,让里面的东西居中(前提自己要是块元素),自宽100%,
}
.img-list {
  margin-top: 10px;
  .img-item {
    width: 160px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 15px;
    margin-bottom: 10px;

    position: relative;
    &.selected {
      &::after {
        //加一个伪元素是为了覆盖img样式？
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
          no-repeat center / 50px 50px;
      }
    }

    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: contain;
      // object-fit完全显示在当前容器内（等比缩放）
    }
  }
}
</style>
