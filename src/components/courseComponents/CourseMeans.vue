<template>
  <div style="height: 600px">
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          prop="fileName"
          label="文件名"
          width="476">
      </el-table-column>
      <el-table-column
          prop="author"
          label="上传者"
          width="180">
      </el-table-column>
      <el-table-column
          prop="size"
          label="大小"
          width="180">
      </el-table-column>
      <el-table-column
          prop="uploadTime"
          label="创建日期"
          width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="danger"
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
      tableData: [
        {
          fileName: '1',
          author: '邹莹',
          size: '1024G',
          uploadTime: '2021-2-14 15:46:25'
        }
      ]
    }
  },
  methods: {
    downLoad(index, row) {
      window.location.href = "http://localhost:8181/download/2/web安全.md"
    }
  },
  created() {

  }
}
</script>

<style scoped>

</style>
