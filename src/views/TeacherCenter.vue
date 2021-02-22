<template>
  <div>
    <el-container>
      <el-header>
        <TeacherTopBar></TeacherTopBar>
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
import SideBar from "@/components/SideBar";
import TeacherTopBar from "@/components/TeacherTopBar";

export default {
  name: "TeacherCenter",
  components: {SideBar, TeacherTopBar},
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
