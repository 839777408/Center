<template>
  <div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          prop="fileName"
          label="文件名"
          width="600">
      </el-table-column>
      <el-table-column
          prop="size"
          label="大小(MB)"
          width="160">
      </el-table-column>
      <el-table-column
          prop="uploadTime"
          label="创建日期"
          width="220">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="danger"
              @click="downLoad(scope.$index, scope.row)">下载
          </el-button>
          <el-popconfirm
              title="确定删除这个文件吗？"
              @confirm="handleDelete(scope.$index, scope.row)"
          >
            <el-button
                size="mini"
                slot="reference"
                type="warning"
                style="margin: 10px"
            >删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-upload
        class="upload-demo"
        drag
        action="uploadUrl"
        :http-request="upload"
        multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传单个文件，且不超过1GB</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "EditCourseMeans",
  data() {
    return {
      tableData: [],
      downloadUrl: 'http://localhost:8181/download/' + this.$route.params.courseId + '/',
    }
  },
  methods: {
    upload(param) {
      const isLt1G = param.file.size / 1024 / 1024 / 1024 < 1;

      if (!isLt1G) {
        this.$message.error("请上传1G以下的文件");
        return false;
      }

      var formData = new FormData();
      formData.append("file", param.file);
      formData.append("courseId", this.$route.params.courseId);
      this.$http.post('/teacher/uploadFile', formData).then((res) => {
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
          this.getMains()
        }
      })
    },
    downLoad(index, row) {
      window.location.href = this.downloadUrl + row.fileName
    },
    handleDelete(index, row) {
      this.$http.delete('/teacher/delMain/?courseId=' + this.$route.params.courseId + '&fileName=' + row.fileName).then((res) => {
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
          this.getMains()
        }
      })
    },
    updateList() {
      this.getMains()
    },
    getMains() {
      this.$http('/getMainsList/' + this.$route.params.courseId).then((res) => {
        this.tableData = res.data.data
      })
    }
  },
  created() {
    this.getMains()
  }
}
</script>

<style scoped>
.upload-demo {
  padding-top: 20px;
  text-align: center;
  padding-bottom: 5px;
}

.upload-demo >>> .el-upload-dragger {
  background-color: lavender;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  box-sizing: border-box;
  width: 360px;
  height: 180px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
</style>
