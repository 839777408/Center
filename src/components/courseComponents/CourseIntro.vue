<template>
  <div>
    <el-row>
      <el-col :span="4"><img :src="imgUrl" style="height: 165px;width: 250px"></el-col>
      <el-col :span="12" style="padding-left:80px; line-height: 34px;">
        <strong>{{ courseName }}</strong><br>
        创建时间：{{ createTime }}<br>
        任课教师：{{ teacherName }}<br>
        教学对象：{{ objectUser }}<br>
        <svg class="icon" aria-hidden="true" style="font-size: 28px;">
          <use xlink:href="#icon-huoyuedu"></use>
        </svg>
        {{ activity }}
      </el-col>
      <el-col :span="8" style="font-size: 18px;">
        <el-card class="box-card">
          <svg class="icon" aria-hidden="true" style="font-size: 20px;margin-top: 1px">
            <use xlink:href="#icon-gonggao1"></use>
          </svg>
          公告<br>
          <p style="font-size: 16px;padding-top: 1px"></p>
        </el-card>
      </el-col>
    </el-row>
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  name: "CourseIntro",
  data() {
    return {
      courseName: '计算机网络',
      teacherName: '邹莹',
      imgUrl: 'https://cdn.jsdelivr.net/gh/839777408/tupian/img/2%E6%97%B6%E9%97%B4%E8%BD%B4.jpg',
      createTime: '2019-06-04',
      activity: '1564',
      objectUser: '网络171-173',
    }
  }
}
</script>

<style scoped>
.box-card {
  height: 165px;
}
</style>
