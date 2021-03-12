<template>
  <div>
    <el-container>
      <el-header>
        <TopBar></TopBar>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <SideBar></SideBar>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar";
import TopBar from "@/components/TopBar";

export default {
  name: "Center",
  components: {SideBar, TopBar},
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

.el-aside {
  display: block;
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
}

.el-aside {
  background-color: white;
  color: #333;
  text-align: center;
  height: 560px;
}

.el-main {
  position: absolute;
  left: 200px;
  right: 0;
  top: 60px;
  bottom: 0;
  overflow-y: scroll;
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
