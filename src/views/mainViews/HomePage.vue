<template>
  <div style="flex: auto">
    <el-row>
      <el-col :span="16">
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
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <i class="el-icon-s-data"></i>
            <span>点击量排行</span>
          </div>
          <div v-for="(course, index) in coursesRanking" :key="index" style="font-size: 16px">
            <el-row>
              <el-col :span="4"><div style="width: 20px;height: 20px;background-color: #B3C0D1">{{index+1}}</div></el-col>
              <el-col :span="16"><a href="/" style="text-decoration:none;color: #333333">{{ course.courseName}}</a></el-col>
              <el-col :span="4">{{course.activity}}</el-col>
            </el-row>
            ----------------------------------------
          </div>
        </el-card>
      </el-col>
    </el-row>


  </div>
</template>

<script>
import CourseCard from "@/components/CourseCard";

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
  margin-left: 60px;
  margin-top: 60px;
  width: 320px;
  padding-left: 1px;
}
</style>
