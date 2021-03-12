<template>
  <div>
    <el-row>
      <el-col :span="4"><img :src="imgUrl" style="height: 165px;width: 250px"></el-col>
      <el-col :span="12" style="padding-left:80px; line-height: 34px;">
        <strong>{{ courseName }}</strong><br>
        创建时间：{{ createTime }}<br>
        任课教师：{{ teacherName }}<br>
        教学对象：{{ squads }}<br>
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
          <p style="font-size: 16px;padding-top: 1px">{{ notice }}</p>
        </el-card>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <mavon-editor
        :value="intro"
        :subfield="prop.subfield"
        :defaultOpen="prop.defaultOpen"
        :toolbarsFlag="prop.toolbarsFlag"
        :editable="prop.editable"
        :scrollStyle="prop.scrollStyle"
    >
    </mavon-editor>
  </div>
</template>

<script>
export default {
  name: "CourseIntro",
  data() {
    return {
      courseName: '',
      teacherName: '',
      imgUrl: '',
      createTime: '',
      activity: '',
      squads: '',
      notice: '',
      intro: '',
    }
  },
  computed: {
    prop() {
      let data = {
        subfield: false,// 单双栏模式
        defaultOpen: 'preview',//edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true
      }
      return data
    }
  },
  created() {
    this.$http('/getCourseInfo/' + this.$route.params.courseId).then((res) => {
          if (res.data.state === 1) {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: 'error'
            });
          } else {
            this.courseName = res.data.data.course.courseName
            this.teacherName = res.data.data.course.teacher.name
            this.imgUrl = res.data.data.course.imgUrl
            this.createTime = res.data.data.course.createTime
            this.activity = res.data.data.course.activity
            this.squads = res.data.data.squad
            this.notice = res.data.data.course.notice
            this.intro = res.data.data.course.intro
          }
        }
    )
  }
}
</script>

<style scoped>
.box-card {
  height: 165px;
}
</style>
