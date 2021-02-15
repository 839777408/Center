<template>
  <div style="flex: auto;padding: 20px;text-align: center">
    <el-col :span="24">
      <el-card shadow="always">
        <h2>标题：{{ this.note.title }}</h2>
        <p>修改时间：{{ this.note.createTime }}</p>
        <el-divider></el-divider>
        <mavon-editor
            :value="this.note.content"
            :subfield="prop.subfield"
            :defaultOpen="prop.defaultOpen"
            :toolbarsFlag="prop.toolbarsFlag"
            :editable="prop.editable"
            :scrollStyle="prop.scrollStyle"
        >
        </mavon-editor>
      </el-card>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "NoteDetail",
  data() {
    return {
      note: {
        title: '',
        content: '',
        createTime: ''
      }
    }
  },
  computed: {
    prop() {
      let data = {
        subfield: false,// 单双栏模式
        defaultOpen: 'preview',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true
      }
      return data
    }
  },
  created() {
    this.$http.get('/getNote/' + this.$route.params.noteId
    ).then(res => {
      this.note.title = res.data.data.title
      this.note.content = res.data.data.content
      this.note.createTime = res.data.data.createTime
    })
  }
}
</script>

<style scoped>

</style>
