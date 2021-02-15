<template>
  <div>
    <el-row>
      <el-col :span="8" v-for="(course, index) in courses" :key="course.id" :offset="index > 0 ? 0 : 0">
        <el-card :body-style="{ padding: '0px',width: '280px'}">
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "CourseCard",
  data() {
    return {
      courses: []
    };
  },
  props: {
    courseType: {
      type: String,
      default: 'recommend',
      required: true
    },
  },
  methods: {
    toCourse(id){
      this.$router.push("/center/course/"+id)
    }
  },
  created() {
    const _this = this;
    this.$http('/showCourse' + '?type=' + this.courseType).then((res) => {
          if (res.data.state === 1) {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: 'error'
            });
          } else {
            _this.courses = res.data.data
          }
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
