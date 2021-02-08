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
        router
        class="el-menu-vertical-demo"
    >
      <el-menu-item index="/center/homePage">
        <i class="el-icon-s-home"/>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-reading"/>
        <span slot="title">课程</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-message-solid"/>
        <span slot="title">通知</span>
      </el-menu-item>
      <el-menu-item index="/center/notesPage">
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
      activeIndex: "/center/homePage"
    }
  },
  watch: {
    $route () {
      this.setCurrentRoute()
    }
  },
  methods: {
    setCurrentRoute () {
      this.activeIndex = this.$route.path
    },
  },
  created () {
    this.setCurrentRoute()
  },
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
  color: #97a8be;
  line-height: 28px;
}
</style>
