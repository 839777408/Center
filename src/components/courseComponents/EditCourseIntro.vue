<template>
  <div style="padding-top: 20px;padding-right: 60px">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="课程名称" prop="courseName">
        <el-input v-model="ruleForm.courseName"></el-input>
      </el-form-item>
      <el-form-item label="封面Url" prop="imgUrl">
        <el-input v-model="ruleForm.imgUrl"></el-input>
      </el-form-item>
      <el-form-item label="教学对象" prop="classes">
        <el-select
            v-model="ruleForm.classes"
            multiple
            filterable
            default-first-option
            placeholder="请选择班级">
          <el-option
              v-for="item in object"
              :key="item"
              :label="item"
              :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="公告" prop="notice">
        <el-input type="textarea" v-model="ruleForm.notice"></el-input>
      </el-form-item>
      <el-form-item label="课程介绍" prop="intro">
        <mavon-editor v-model="ruleForm.intro" style="height: 500px"></mavon-editor>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "EditCourseIntro",
  data() {
    return {
      object: [],
      ruleForm: {
        courseName: '',
        imgUrl: '',
        classes: [],
        notice: '',
        intro: '',
      },
      rules: {
        courseName: [
          {required: true, message: '请输入课程名称', trigger: 'blur'},
        ],
        imgUrl: [
          {required: true, message: '请输入封面图片地址', trigger: 'change'}
        ],
        classes: [
          {required: true, message: '请选择班级', trigger: 'change'}
        ],
        notice: [
          {min: 3, max: 60, message: '长度在 3 到 60 个字符', trigger: 'blur'}
        ]
      },
    };
  },
  computed: {
    formData() {
      return {
        courseName: this.ruleForm.courseName,
        imgUrl: this.ruleForm.imgUrl,
        classes: this.ruleForm.classes.join(','),
        notice: this.ruleForm.notice,
        intro: this.ruleForm.intro,
        courseId: this.$route.params.courseId
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/teacher/updateCourse', this.formData).then((res) => {
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
              this.$router.push("/teaCenter/courseManage")
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
    this.$http('/teacher/getAllClasses').then((res) => {
          this.object = res.data.data
        }
    )
    this.$http('/getCourseInfo/' + this.$route.params.courseId).then((res) => {
          this.ruleForm.courseName = res.data.data.course.courseName
          this.ruleForm.imgUrl = res.data.data.course.imgUrl
          for (const str of res.data.data.squad.split('，')) {
            this.ruleForm.classes.push(str)
          }
          this.ruleForm.notice = res.data.data.course.notice
          this.ruleForm.intro = res.data.data.course.intro
        }
    )
  }
}
</script>

<style scoped>

</style>
