<template>
  <div style="padding-top: 20px">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="课程简介" name="1" class="col-head">
        <EditCourseIntro></EditCourseIntro>
      </el-collapse-item>
      <el-collapse-item title="教学目录" name="2" class="col-head">
        <EditPeriod></EditPeriod>
      </el-collapse-item>
      <el-collapse-item title="学习资料" name="3" class="col-head">
        <EditCourseMeans></EditCourseMeans>
      </el-collapse-item>
      <el-collapse-item title="学习视频" name="4" class="col-head">
        <EditVideo></EditVideo>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import EditCourseIntro from "@/views/teacherCenter/EditViews/EditCourseIntro";
import EditCourseMeans from "@/views/teacherCenter/EditViews/EditCourseMeans";
import EditPeriod from "@/views/teacherCenter/EditViews/EditPeriod";
import EditVideo from "@/views/teacherCenter/EditViews/EditVideo";

export default {
  name: "AddCourse",
  data() {
    return {
      activeNames: [],
    };
  },
  components: {
    EditCourseIntro, EditCourseMeans, EditPeriod,EditVideo
  }
}
</script>

<style scoped>
.col-head >>> .el-collapse-item__header {
  background-color: yellowgreen;
  font-size: 14px;
  color: white;
  padding-left: 14px;
}

.col-head >>> .el-collapse-item__content {
  padding-bottom: 0;
  font-size: 13px;
  color: #303133;
  line-height: 1.769230769230769;
}
</style>
