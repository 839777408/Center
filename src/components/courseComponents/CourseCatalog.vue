<template>
  <div>
    <el-card shadow="always" style="width: 360px">
      <div class="head">
        <svg class="icon" aria-hidden="true" style="font-size: 20px;float: left">
          <use xlink:href="#icon-mulu"></use>
        </svg>
        <span style="margin-left: 10px">目录</span>
      </div>
      <el-divider></el-divider>
      <el-tree :data="data"
               empty-text="该课程未设置教学目录"
               :highlight-current="true"
               :props="defaultProps"
               :default-expand-all="true"
               @node-click="handleNodeClick">
      </el-tree>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "CourseCatalog",
  data() {
    return {
      data: [

      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  },
  created() {
    this.$http('/getDirectory/' + this.$route.params.courseId).then((res) => {
          this.data = res.data.data
        }
    )
  }
}
</script>

<style scoped>
.head {
  margin-bottom: 10px;
}

.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 2px 0;
}
</style>
