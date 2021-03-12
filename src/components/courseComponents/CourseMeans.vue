<template>
  <div style="height: 600px">
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
          width="180">
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
              style="margin-left: 15px"
              @click="downLoad(scope.$index, scope.row)">下载
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CourseMeans",
  data() {
    return {
      tableData: [],
      downloadUrl: 'http://localhost:8181/download/' + this.$route.params.courseId + '/',
    }
  },
  methods: {
    downLoad(index, row) {
      window.location.href = this.downloadUrl + row.fileName
    },
  },
  created() {
    this.$http('/getMainsList/' + this.$route.params.courseId).then((res) => {
      this.tableData = res.data.data
    })
  }
}
</script>

<style scoped>

</style>
