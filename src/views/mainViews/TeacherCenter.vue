<template>
  <div>
    <el-container>
      <el-header>
        <TopBar>
          <template v-slot:teaButton>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
              <el-menu-item index="1" @click="toHomePage">首页</el-menu-item>
              <el-menu-item index="2" @click="toAddCourse">添加课程</el-menu-item>
              <el-menu-item index="3" @click="toManage">课程管理</el-menu-item>
            </el-menu>
          </template>
        </TopBar>
      </el-header>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";

export default {
  name: "TeacherCenter",
  data() {
    return {
      activeIndex: '1',
      path: ''
    }
  },
  methods: {
    setCurrentRoute() {
      this.path = this.$route.path
      if (this.path === '/teaCenter/homePage') {
        this.activeIndex = '1'
      } else if (this.path === '/teaCenter/addCourse') {
        this.activeIndex = '2'
      } else if (this.path === '/teaCenter/courseManage' || this.path.includes('edit')) {
        this.activeIndex = '3'
      }
    }, toHomePage() {
      this.$router.push('/teaCenter/homePage')
    },
    toAddCourse() {
      this.$router.push('/teaCenter/addCourse')
    },
    toManage() {
      this.$router.push('/teaCenter/courseManage')
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
  components: {TopBar},
}
</script>

<style scoped>

.el-header {
  margin: 0;
  padding: 0;
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  position: absolute;
  left: 100px;
  right: 100px;
  top: 60px;
  bottom: 0;
  /*overflow-y: scroll;*/
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  /*text-align: center;*/
  height: auto;
  padding: 0;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
