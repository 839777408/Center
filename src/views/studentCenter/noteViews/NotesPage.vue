<template>
  <div style="flex: auto;padding: 20px;text-align: center">
    <el-row>
      <el-col :span="2">
        <el-button type="primary" @click="toAddNote">添加笔记</el-button>
      </el-col>
    </el-row>
    <p></p>
    <div>
      <el-table
          :data="notes"
          style="width: 100%">
        >
        <el-table-column
            label="修改时间"
            width="450">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="标题"
            width="480">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.title }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button icon="el-icon-search" circle
                       @click="handleBrowse(scope.$index, scope.row)"></el-button>
            <el-button type="primary" icon="el-icon-edit" circle
                       @click="handleEdit(scope.$index, scope.row)"></el-button>
            <el-popconfirm
                title="确定删除这篇笔记吗？"
                @confirm="handleDelete(scope.$index, scope.row)"
            >
              <el-button type="danger" icon="el-icon-delete" slot="reference" circle style="margin: 10px"></el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <p></p>
    <el-pagination class="m-page"
                   background
                   layout="prev, pager, next"
                   :page-size="size"
                   :pager-count="5"
                   :current-page.sync="currentPage"
                   :total="total"
                   @current-change="getNotes(currentPage,size)">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "NotesPage",
  data() {
    return {
      total: 0,
      currentPage: 1,
      size: 5,
      notes: []
    }
  },
  methods: {
    handleBrowse(index, row) {
      this.$router.push('/stuCenter/notes/' + row.id)
    },
    handleEdit(index, row) {
      this.$router.push('/stuCenter/editNote/' + row.id)
    },
    handleDelete(index, row) {
      this.$http.delete('/delNote/' + row.id
      ).then(res => {
        if (res.data.state === 1) {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: 'error'
          });
        } else if (res.data.state === 0) {
          this.getNotes(this.currentPage, this.size)
          this.$message({
            showClose: true,
            message: res.data.message,
            type: 'success'
          })
        }
      })
    },
    getNotes(currentPage, size) {
      this.$http('/getNotes' + '?no=' + this.$store.state.no + '&currentPage=' + currentPage + '&size=' + size).then((res) => {
            this.total = res.data.data.total
            this.notes = res.data.data.list
          }
      )
    },
    toAddNote() {
      this.$router.push('/stuCenter/addNote')
    },
  },
  created() {
    this.getNotes(this.currentPage, this.size);
  }
}
</script>

<style scoped>
</style>
