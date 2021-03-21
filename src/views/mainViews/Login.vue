<template>
  <div class="login">
    <el-card class="box-card1" style="border-radius: 18px">
      <div class="l-title">
        <img src="../../assets/logo.png" style="width: 20px;height: 20px">
        <strong> 课程中心</strong>
      </div>
      <el-card class="box-card2" style="border-radius: 18px">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="类型" prop="type">
            <el-select v-model="ruleForm.type">
              <el-option label="学生" value="student"></el-option>
              <el-option label="老师" value="teacher"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input prefix-icon="el-icon-user" v-model="ruleForm.username" class="l-input"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" @keyup.enter.native="submitForm('ruleForm')">
            <el-input prefix-icon="el-icon-lock" type="password" v-model="ruleForm.password" show-password
                      class="l-input"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :plain="true" @click="submitForm('ruleForm')">登录</el-button>
            <el-button plain @click="forget">忘记密码</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      ruleForm: {
        type: 'student',
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入学号/工号', trigger: 'blur'},
          {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/login',
              this.ruleForm).then((res) => {
            if (res.data.state === 1) {
              this.$message({
                showClose: true,
                message: res.data.message,
                type: 'error'
              });
            } else {
              this.$message({
                showClose: true,
                message: res.data.message,
                type: 'success'
              });
              if (this.ruleForm.type === 'student') {
                this.$router.replace('/stuCenter')
              } else if (this.ruleForm.type === 'teacher') {
                this.$router.replace('/teaCenter')
              }
              this.$store.commit('setInfo', res.data.data)
              this.$store.commit('setType', this.ruleForm.type)
              window.sessionStorage.setItem('store', JSON.stringify(res.data.data))
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    forget() {
      this.$notify({
        title: '通知',
        message: '各位老师、同学：\n' +
            '请携带学生证或职工证到南区F1-118进行密码重置。网络与现代教育技术中心工作人员在两个工作日内完成密码重置。',
      });
    }
  }
}
</script>

<style scoped>
.login {
  height: 100%;
  width: 100%;
  position: fixed;
  background-image: url("https://cdn.jsdelivr.net/gh/839777408/tupian/img/3标签.jpg");
}

.l-title {
  font-size: 18px;
  margin-bottom: 8px;
  margin-left: 16px;
}

.l-input {
  max-width: 300px;
}

.box-card1 {
  width: 520px;
  margin-left: 420px;
  margin-top: 160px;
}

.box-card2 {
  max-width: 480px;
}
</style>
