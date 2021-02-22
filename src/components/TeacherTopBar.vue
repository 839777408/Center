<template>
  <div>
    <el-row type="flex" class="row-bg" justify="end">
      <el-col :span="1">
        <el-avatar shape="square" :size="55" :src="squareUrl" style="background-color: white"></el-avatar>
      </el-col>
      <el-col :span="2">
        <div style="font-size: 22px"><strong>课程中心</strong></div>
      </el-col>
      <el-col :span="20">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1" @click="toHomePage">首页</el-menu-item>
          <el-menu-item index="2" @click="toMyCourses">我的课程</el-menu-item>
          <el-menu-item index="3" @click="toAddCourse">添加课程</el-menu-item>
          <el-menu-item index="4" @click="toManage">课程管理</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="2">
        <el-dropdown>
          <el-button split-button type="primary">
            {{ this.$store.state.name }}<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "TeacherTopBar",
  data() {
    return {
      squareUrl: 'https://www.runoob.com/wp-content/uploads/2017/01/vue.png',
      logoutInfo: {
        name: '',
        squad: '',
        no: ''
      },
      activeIndex: '1',
      path: ''
    };
  },
  methods: {
    setCurrentRoute() {
      this.path = this.$route.path
      if (this.path === '/teacherCenter/homePage') {
        this.activeIndex = '1'
      } else if (this.path === '/teacherCenter/myCourses') {
        this.activeIndex = '2'
      }else if (this.path === '/teacherCenter/addCourse') {
        this.activeIndex = '3'
      }else if (this.path === '/teacherCenter/courseManage') {
        this.activeIndex = '4'
      }
    },
    logout() {
      sessionStorage.clear()
      this.$router.replace('/login')
    },
    toHomePage() {
      this.$router.push('/teacherCenter/homePage')
    },
    toMyCourses() {
      this.$router.push('/teacherCenter/myCourses')
    },
    toAddCourse(){
      this.$router.push('/teacherCenter/addCourse')
    },
    toManage(){
      this.$router.push('/teacherCenter/courseManage')
    }
  },
  watch: {
    $route() {
      this.setCurrentRoute()
    }
  },
  created() {
    this.setCurrentRoute()
  },
}
</script>

<style scoped>
.row-bg {
  background-color: white;
  height: 60px;
  border-bottom: 1px solid #E0E0E0;
}
</style>
