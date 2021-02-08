<template>
  <div>
    <el-row>
      <el-col :span="2">
        <el-button type="primary" @click="toAddNote">添加笔记</el-button>
      </el-col>
    </el-row>
    <p></p>
    <div>
      <el-table
          :data="notes"
          style="width: 100%"
          @sort-change="changeTableSort">
        >
        <el-table-column
            label="创建时间"
            prop="createTime"
            sortable="custom"
            width="500">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="标题"
            width="590">
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
            <el-button type="danger" icon="el-icon-delete" circle
                       @click="handleDelete(scope.$index, scope.row)"></el-button>
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
      size: 7,
      notes: []
    }
  },
  methods: {
    handleBrowse(index, row) {
      this.$router.push('/center/notes/' + row.id)
    },
    handleEdit(index, row) {
      this.$router.push('/center/editNote/' + row.id)
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    getNotes(currentPage, size) {
      this.$http('/getNotes' + '?no=' + this.$store.state.no + '&currentPage=' + currentPage + '&size=' + size
          + '&prop=createTime&order=descending').then((res) => {
            this.total = res.data.data.total
            this.notes = res.data.data.list
          }
      )
    },
    toAddNote() {
      this.$router.push('/center/addNote')
    },
    changeTableSort(column) {
      this.$http('/getNotes' + '?no=' + this.$store.state.no + '&currentPage=' + this.currentPage + '&size=' + this.size
          + '&prop=' + column.prop + '&order=' + column.order).then((res) => {
            this.total = res.data.data.total
            this.notes = res.data.data.list
          }
      )
    }
  },
  created() {
    this.getNotes(this.currentPage, this.size);
  }
}
</script>

<style scoped>
</style>
