<template>
  <div class="m-editor">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <mavon-editor v-model="ruleForm.content" style="height: 500px"></mavon-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
        <el-button @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "EditBlog",
  data() {
    return {
      ruleForm: {
        id: this.$route.params.noteId,
        title: '',
        content: ''
      },
      rules: {
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'},
          {min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '请输入内容', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.put('/editNote', this.ruleForm).then((res) => {
            if (res.data.state === 1) {
              this.$message({
                showClose: true,
                message: res.data.message,
                type: 'error'
              });
            } else if (res.data.state === 0) {
              this.$message({
                showClose: true,
                message: res.data.message,
                type: 'success'
              });
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    back() {
      this.$router.push('/stuCenter/notesPage')
    }
  },
  created() {
    this.$http.get('/getNote/' + this.$route.params.noteId
    ).then(res => {
      this.ruleForm.title = res.data.data.title
      this.ruleForm.content = res.data.data.content
    })
  }
}
</script>

<style scoped>
.m-editor {
  text-align: center;
  max-width: 1070px;
  margin-top: 20px;
}
</style>
