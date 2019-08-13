<template>
  <div class="article-container">
    <!-- ？？组件绑定的视图显示<div>里有一个类名<div class="container">，这个类名绑定的样式是写在那里的？跟着老师写了这个类名，然后样式冲突，想改不知道在那里改？ -->
    <el-card>
      <div slot="header">
        <my-bread>{{articleId?'修改':'发布'}}文章</my-bread>
      </div>
      <el-form label-width="100px">
        <el-form-item label="标题：">
          <!-- v-model="articleForm.title"接收子组件传来的数据 -->
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <el-radio-group v-model="articleForm.cover.type" @change="changeType">
            <!-- @change="changeType"在切换选图时清空数据 -->
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>

          <!-- 素材选择（图片）组件 -->
          <!-- <my-image v-model="articleForm.cover.images[0]"></my-image> -->
          <div v-if="articleForm.cover.type === 1">
            <!-- 选择 单图 按钮绑定一张图片；选择 三图 按钮绑定三张图片 -->
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type === 3">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image v-model="articleForm.cover.images[1]"></my-image>
            <my-image v-model="articleForm.cover.images[2]"></my-image>
          </div>

        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="!articleId">
          <!-- v-if要么用发表 -->
          <!-- @click="submit"根据布尔值判断发表还是草稿  -->
          <el-button type="primary" @click="submit(false)">发表</el-button>
          <el-button @click="submit(true)">存入草稿</el-button>
        </el-form-item>
         <el-form-item v-else>
           <!-- v-else要么用修改 -->
          <!-- @click="submit"根据布尔值判断发表还是草稿  -->
          <el-button type="success" @click="update(false)">修改</el-button>
          <el-button @click="update(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css' // 导入富文本组件的样式
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor' // 导入富文本组件 { quillEditor }固定格式，导入指定成员，不写就是导入默认成员

export default {
  components: {
    // 注册富文本组件
    quillEditor
  },
  data () {
    return {
      articleForm: {
        // 文章数据
        title: null,
        content: null, // 富文本内的数据
        cover: {
          type: 1,
          images: [] // 子传父，这里怎么接收的？
        },
        channel_id: null
      },
      editorOption: {
        // 富文本配置
        placeholder: '', // 富文本占位符设置
        modules: {
          toolbar: [
            // 富文本配置项
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      },
      articleId: null // 地址栏的文章id
    }
  },
  watch: { // 以下是为了解决一个bug：当用户在修改文章页面下操作，突然回到发布文章页面时，因为是同一套路由规则，所以不切换路径
    // 注意：watch除了监听data中的数据变化，this.$route（没有在watch中声明）也属于响应式数据
    $route () { // 当$route改变时
      if (!this.$route.query.id) { // 判断$route.query下是否有id
        this.articleId = null // 如果没有id,重置数据（地址栏没有id）
        this.articleForm = { // 且articleForm重置默认值
          title: null,
          content: null,
          cover: {
            type: 1,
            images: []
          },
          channel_id: null
        }
      }
    }
  },
  created () {
    this.articleId = this.$route.query.id // 获取id，为了加在地址后面，做修改页面的路由
    // 如果ID在地址栏存储  代表是修改逻辑  才有必要去获取文章数据
    if (this.articleId) {
      this.getArticle()
    }
    // console.log(this.$route) //$route是路由数据；$router是路由方法
  },
  methods: {
    async getArticle () { // 通过id获取文章数据
      const { data: { data } } = await this.$http.get('articles/' + this.articleId)
      this.articleForm = data
    },
    changeType () { // 切换封面类型 重置图片数据
      this.articleForm.cover.images = []
    },
    // 发表或存入草稿
    async submit (draft) {
      // query传参是url后面的'？'后传参，所以`articles?draft=${draft}`写；Body传参是写在地址后面的对象
      await this.$http.post(`articles?draft=${draft}`, this.articleForm)// draft布尔值，表示发表或草稿
      // 提示（如果到了这一步，表示请求成功了）
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      // 跳转内容管理
      this.$router.push('/article')
    },
    // 修改或者存入草稿
    async update (draft) {
      // 发请求
      await this.$http.put(`articles/${this.articleId}?draft=${draft}`, this.articleForm)
      // 提示
      this.$message.success(draft ? '修改，存入草稿成功' : '修改成功')
      // 跳转内容管理
      this.$router.push('/article')
    }
  }
}
</script>

<style scoped lang='less'>
</style>
