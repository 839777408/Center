<template>
  <div style="padding-top: 20px;">
    <el-card style="border-radius: 30px; padding-top: 20px">
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
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "AddCourse",
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
        no: this.$store.state.no
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/teacher/createCourse', this.formData).then((res) => {
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
  }
}
</script>

<style scoped>

</style>
