<template>
  <div style="flex: auto;padding: 20px;text-align: center">
    <el-row>
      <el-col :span="18">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="推荐课程" name="recommend">
            <CourseCard :courseType="activeTab" :key="activeTab"></CourseCard>
          </el-tab-pane>
          <el-tab-pane label="热门课程" name="hot">
            <CourseCard :courseType="activeTab" :key="activeTab"></CourseCard>
          </el-tab-pane>
          <el-tab-pane label="最新课程" name="new">
            <CourseCard :courseType="activeTab" :key="activeTab"></CourseCard>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <svg class="icon" aria-hidden="true" style="font-size: 20px;float: left">
              <use xlink:href="#icon-paihangbang"></use>
            </svg>
            <span>点击量排行</span>
          </div>
          <div v-for="(course, index) in coursesRanking" :key="index" style="font-size: 12px">
            <el-row>
              <el-col :span="4">
                <div style="width: 20px;height: 20px;background-color: #DCDFE6">{{ index + 1 }}</div>
              </el-col>
              <el-col :span="16"><a :href="routePath+course.id" style="text-decoration:none;color: #333333">{{
                  course.courseName
                }}</a>
              </el-col>
              <el-col :span="4">{{ course.activity }}</el-col>
            </el-row>
            ----------------------------------------------
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CourseCard from "@/components/courseComponents/CourseCard";

export default {
  name: "HomePage",
  data() {
    return {
      activeTab: 'recommend',
      coursesRanking: []
    };
  },
  components: {
    CourseCard,
  },
  computed: {
    routePath() {
      if (this.$store.state.type === 'student') {
        return '/stuCenter/course/'
      } else if (this.$store.state.type === 'teacher') {
        return '/teaCenter/course/'
      }
    }
  },
  created() {
    const _this = this;
    this.$http('/rankCourse').then((res) => {
          if (res.data.state === 1) {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: 'error'
            });
          } else {
            _this.coursesRanking = res.data.data
          }
        }
    )
  }
}
</script>

<style scoped>
.box-card {
  margin-left: 10px;
  margin-top: 52px;
  height: 464px;
  width: 280px;
  padding-left: 1px;
}
</style>
