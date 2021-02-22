<template>
  <div>
    <el-row type="flex" class="row-bg" justify="end">
      <el-col :span="1">
        <el-avatar shape="square" :size="55" :src="squareUrl" style="background-color: white"></el-avatar>
      </el-col>
      <el-col :span="2">
        <div style="font-size: 22px"><strong>课程中心</strong></div>
      </el-col>
      <el-col :span="20"></el-col>
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
  name: "TopBar",
  data() {
    return {
      squareUrl: 'https://www.runoob.com/wp-content/uploads/2017/01/vue.png',
      logoutInfo: {
        name: '',
        squad: '',
        no: ''
      }
    };
  },
  methods: {
    logout() {
      sessionStorage.clear()
      this.$router.replace('/login')
    }
  }
}
</script>

<style scoped>
.row-bg {
  background-color: white;
  height: 60px;
  border-bottom: 1px solid #E0E0E0;
}
</style>
