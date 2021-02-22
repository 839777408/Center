<template>
  <div style="padding-top: 20px; padding-left: 20px">
    <el-row>
      <el-col :span="8" v-for="(course, index) in courses" :key="course.id">
        <el-card :body-style="{ padding: '0px',width: '274px'}" style="width: 274px">
          <img :src=course.course.imgUrl
               class="image">
          <div style="padding: 10px;">
            <span>{{ course.course.courseName }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ course.course.teacher.department + '  ' + course.course.teacher.name }}</time>
              <br>
              <br>
              <el-button type="text" class="button" @click="toCourse(course.course.id)">进入课程</el-button>
            </div>
          </div>
        </el-card>
        <el-divider></el-divider>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "StuCourses",
  data() {
    return {
      courses: []
    };
  },
  created() {
    this.$http('/student/getCourses' + '?no=' + this.$store.state.no).then((res) => {
          this.courses = res.data.data
        }
    )
  }
}
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  height: 136px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
