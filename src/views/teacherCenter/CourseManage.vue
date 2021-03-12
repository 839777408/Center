<template>
  <div style="padding-top: 20px">
    <el-table
        :data="data"
        stripe
        :default-sort="{prop: 'date', order: 'descending'}"
        style="width: 100%">
      <el-table-column
          label="创建日期"
          prop="date"
          sortable
          width="220">
        <template slot-scope="scope">
          <svg class="icon" aria-hidden="true" style="font-size: 20px;margin-top: 1px">
            <use xlink:href="#icon-quanwensousuo-buxianshijian"></use>
          </svg>
          <span style="margin-left: 10px">{{ scope.row.course.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="课程名称"
          width="230">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.course.courseName }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
          label="教学对象"
          width="300">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.squad }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="活跃度"
          width="180">
        <template slot-scope="scope">
          <svg class="icon" aria-hidden="true" style="font-size: 20px;margin-top: 1px">
            <use xlink:href="#icon-tongji_shiyonghuoyuedu"></use>
          </svg>
          <span style="margin-left: 10px">{{ scope.row.course.activity }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="success"
              @click="handleBrowse(scope.$index, scope.row)">查看
          </el-button>
          <el-button
              size="mini"
              type="warning"
              @click="handleEdit(scope.$index, scope.row)"
          >编辑
          </el-button>
          <el-popconfirm
              title="确定删除这门课程吗？"
              @confirm="handleDelete(scope.$index, scope.row)"
          >
            <el-button
                size="mini"
                slot="reference"
                type="danger"
                style="margin: 10px">删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CourseManage",
  data() {
    return {
      data: []
    }
  },
  methods: {
    handleBrowse(index, row) {
      this.$router.push('/teaCenter/course/' + row.course.id)
    },
    handleEdit(index, row) {
      this.$router.push('/teaCenter/editCourse/' + row.course.id)
    },
    handleDelete(index, row) {
      this.$http.delete('/teacher/delCourse/' + row.course.id
      ).then(res => {
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
          location.reload()
        }
      })
    },
  },
  created() {
    this.$http('/teacher/getCourses' + '?no=' + this.$store.state.no).then((res) => {
          this.data = res.data.data
        }
    )
  }
}
</script>

<style scoped>

</style>
