<template>
  <div class="tabTop">
    <el-tabs type="border-card">
      <el-tab-pane label="课程简介">
        <course-intro></course-intro>
      </el-tab-pane>
      <el-tab-pane label="教学目录">
        <course-catalog></course-catalog>
      </el-tab-pane>
      <el-tab-pane label="学习资料">
        <course-means></course-means>
      </el-tab-pane>
      <el-tab-pane label="学习视频">
        <course-video></course-video>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CourseIntro from "@/components/courseComponents/CourseIntro";
import CourseMeans from "@/components/courseComponents/CourseMeans";
import CourseCatalog from "@/components/courseComponents/CourseCatalog";
import CourseVideo from "@/components/courseComponents/CourseVideo";

export default {
  name: "CoursePage",
  data() {
    return {
      imgUrl: 'https://cdn.jsdelivr.net/gh/839777408/tupian/img/4%E5%88%86%E7%B1%BB.jpg'
    }
  },
  components: {
    CourseIntro,
    CourseMeans,
    CourseCatalog,
    CourseVideo,
  }
}
</script>

<style scoped>
.tabTop >>> .el-tabs__nav-scroll {
  background-color: lavender;
}
</style>
