<template>
  <div style="margin-top: 20px">
    <div style="margin-left: 20px;margin-bottom: 20px">
      <el-upload
          class="upload-demo"
          ref="upload"
          action="uploadUrl"
          :before-upload="beforeVideoUpload"
          :http-request="upload"
          :file-list="file"
          :limit=1
          :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 25px;" size="small" type="warning" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传MP4视频文件，且不超过1GB</div>
      </el-upload>
    </div>
    <el-divider></el-divider>
    <CourseVideo :key="timer">
      <template v-slot:del="videoItem">
        <el-popconfirm
            title="确定删除这个文件吗？"
            @confirm="handleDelete(videoItem.item.fileName)">
          <el-button
              size="mini"
              slot="reference"
              type="danger"
              style="margin: 10px">
            删除
          </el-button>
        </el-popconfirm>
      </template>
    </CourseVideo>
  </div>
</template>

<script>
import CourseVideo from "@/components/courseComponents/CourseVideo";

export default {
  name: "EditVideo",
  data() {
    return {
      file: [],
      timer: ''
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    reload() {
      this.timer = new Date().getTime()
    },
    upload(param) {
      var formData = new FormData();
      formData.append("file", param.file);
      formData.append("courseId", this.$route.params.courseId);
      this.$http.post('/teacher/uploadVideo', formData).then((res) => {
        if (res.data.state === 1) {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          });
        } else if (res.data.state === 0) {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: 'success'
          })
          this.reload()
        }
      })
    },
    beforeVideoUpload(file) {
      const isMp4 = file.type === 'video/mp4';
      const isLt1G = file.size / 1024 / 1024 / 1024 < 1;

      if (!isMp4) {
        this.$message.error('上传视频文件只能是 MP4 格式!');
      }
      if (!isLt1G) {
        this.$message.error('上传的视频大小不能超过 1GB!');
      }
      return isMp4 && isLt1G;
    },
    handleDelete(fileName) {
      this.$http.delete('/teacher/delVideo/?courseId=' + this.$route.params.courseId + '&fileName=' + fileName).then((res) => {
        if (res.data.state === 1) {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          });
        } else if (res.data.state === 0) {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: 'success'
          })
          this.reload()
        }
      })
    }
  },
  components: {
    CourseVideo
  }
}
</script>

<style scoped>

</style>
