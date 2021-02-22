<template>
  <div>
    <el-card class="box-card">
      <el-avatar shape="square" :size="78"
                 src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"></el-avatar>
      <div class="i-info">
        {{ this.$store.state.name }}
        <br>{{ this.$store.state.squad }}
        <br>{{ this.$store.state.no }}
      </div>
    </el-card>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical-demo">
      <el-menu-item index="1" @click="toHomePage">
        <i class="el-icon-s-home"/>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="2" @click="toCoursePage">
        <i class="el-icon-reading"/>
        <span slot="title">课程</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-message-solid"/>
        <span slot="title">通知</span>
      </el-menu-item>
      <el-menu-item index="4" @click="toNotesPage">
        <i class="el-icon-notebook-2"/>
        <span slot="title">笔记</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-chat-dot-square"/>
        <span slot="title">讨论</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      activeIndex: '1',
      path: ''
    }
  },
  methods: {
    setCurrentRoute() {
      this.path = this.$route.path
      if (this.path === '/center/homePage') {
        this.activeIndex = '1'
      } else if (this.path === '/center/myCourses') {
        this.activeIndex = '2'
      } else if (this.path.includes('ote')) {
        this.activeIndex = '4'
      }
    },
    toHomePage() {
      this.$router.push('/center/homePage')
    },
    toCoursePage() {
      this.$router.push('/center/myCourses')
    },
    toNotesPage() {
      this.$router.push('/center/notesPage')
    },
  },
  watch: {
    $route() {
      this.setCurrentRoute()
    }
  },
  created() {
    this.setCurrentRoute()
  }
}
</script>

<style scoped>
.el-menu-vertical-demo {
  margin: 0;
  padding: 0;
  height: 100%;
}

.i-info {
  font-size: 16px;
  color: #606266;
  line-height: 28px;
}
</style>
