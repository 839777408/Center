<template>
  <div class="block">
    <el-timeline>
      <div v-if="activities.length === 0" style="text-align: center">
        <p>该课程未上传学习视频</p>
      </div>
      <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :icon="activity.icon"
          :type="activity.type"
          :color="activity.color"
          :size="activity.size"
          :timestamp="activity.uploadTime">
        <el-button type="text" @click="activity.dialogTableVisible = true">{{ activity.fileName }}</el-button>
        <el-dialog :title="activity.fileName"
                   :visible.sync="activity.dialogTableVisible"
                   :close-on-click-modal="false"
                   :close-on-press-escape="false"
                   :destroy-on-close="true"
                   :key="index">
          <video-component :key="index" :videoUrl="urlPrefix+activity.fileName"></video-component>
        </el-dialog>
        <slot name="del" :item="activity"></slot>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import VideoComponent from "@/components/VideoComponent";

export default {
  name: 'CourseVideo',
  data() {
    return {
      urlPrefix: 'http://localhost:8181/getVideo/' + this.$route.params.courseId + '/',
      activities: []
    };
  },
  components: {
    VideoComponent
  },
  created() {
    this.$http('/getVideoList/' + this.$route.params.courseId).then((res) => {
      for (let i = 0; i < res.data.data.length; i++) {
        const video = {
          fileName: res.data.data[i].fileName,
          uploadTime: res.data.data[i].uploadTime,
          color: '#0bbd87',
          size: 'large',
          dialogTableVisible: false
        }
        this.activities.push(video)
      }
    })
  }
};
</script>

<style scoped>

</style>
