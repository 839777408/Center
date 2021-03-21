<template>
  <div>
    <EditCatalog ref="unit">
      <template v-slot:Button="slotProps">
        <el-button @click="handleExpand(slotProps.unit)" type="primary" plain>新增课时</el-button>
      </template>
    </EditCatalog>
    <el-drawer
        :title="unitName"
        :before-close="handleClose"
        :visible.sync="dialog"
        direction="ltr"
        custom-class="demo-drawer"
        ref="drawer"
        :destroy-on-close="true"
    >
      <div class="demo-drawer__content">
        <el-form :model="periodForm" ref="periodForm" label-width="100px" class="demo-dynamic">
          <el-form-item
              :prop="'period1.periodName'"
              label="第1课时"
              :rules="[{ required: true, message: '请输入课时名称', trigger: 'blur' },]">
            <el-input v-model="periodForm.period1.periodName" style="width: 200px"></el-input>
            <el-button style="margin-left: 20px" disabled>删除</el-button>
          </el-form-item>

          <el-form-item
              v-for="(period, index) in periodForm.periods"
              :label="'第' + (index+2) + '课时'"
              :key="index"
              :prop="`periods[${index}].periodName`"
              :rules="{required: true, message: '课时名称不能为空', trigger: 'blur'}">
            <el-input v-model="period.periodName" style="width: 200px"></el-input>
            <el-button @click.prevent="removePeriod(period)" style="margin-left: 20px">删除</el-button>
          </el-form-item>

          <el-form-item>
            <div class="demo-drawer__footer">
              <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">
                {{ loading ? '提交中 ...' : '确 定' }}
              </el-button>
              <el-button @click="addPeriod">新增课时</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import EditCatalog from "@/views/teacherCenter/EditViews/EditUnit";

export default {
  name: "EditPeriod",
  data() {
    return {
      unitName: '',
      unitId: 0,
      courseId: this.$route.params.courseId,
      dialog: false,
      loading: false,
      periodForm: {
        periods: [
          // {
          //   periodId: '2',
          //   periodName: ''
          // }
        ],
        period1: {
          periodId: '1',
          periodName: '第一课时'
        }
      },
      formLabelWidth: '80px',
      timer: null,
    }
  },
  computed: {
    formData() {
      const periodsList = []
      periodsList.push(this.periodForm.period1)
      for (let i = 0; i < this.periodForm.periods.length; i++) {
        periodsList.push(this.periodForm.periods[i])
      }
      return periodsList
    }
  },
  methods: {
    initFormData() {
      const length = this.periodForm.periods.length;
      for (let i = 0; i < length; i++) {
        this.periodForm.periods.pop()
      }
      // this.periodForm.periods[0].periodName = '';
      this.periodForm.period1.periodName = '第一课时';
    },
    handleExpand(unit) {
      this.dialog = true
      this.unitId = unit.unitId
      this.unitName = unit.unitName
      this.$http('/getPeriods?courseId=' + this.$route.params.courseId + '&unitId=' + this.unitId).then((res) => {
            for (let i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].periodId === 1) {
                this.periodForm.period1.periodName = res.data.data[i].periodName
              }
              // else if (res.data.data[i].periodId === 2) {
              //   this.periodForm.periods[0].periodId = res.data.data[i].periodId
              //   this.periodForm.periods[0].periodName = res.data.data[i].periodName
              // }
              else {
                this.periodForm.periods.push({
                  periodId: res.data.data[i].periodId,
                  periodName: res.data.data[i].periodName
                });
              }
            }
          }
      )
    },
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
          .then(_ => {
            this.submitForm(this.formData)
            this.loading = true;
            this.timer = setTimeout(() => {
              done();
              // 动画关闭需要一定的时间
              setTimeout(() => {
                this.loading = false;
                this.initFormData();
              }, 400);
            }, 2000);
          })
          .catch(_ => {
            this.loading = false;
            this.dialog = false;
            clearTimeout(this.timer);
            this.initFormData();
          });

    },
    submitForm(periodForm) {
      this.$refs.periodForm.validate((valid) => {
        if (valid) {
          this.$http.post('/addPeriods/' + this.$route.params.courseId,
              {
                periodsList: this.formData,
                unitId: this.unitId
              },
              {contentType: 'application/json;charset=utf-8'}
          ).then((res) => {
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
              });
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    removePeriod(item) {
      var index = this.periodForm.periods.indexOf(item)
      if (index !== -1) {
        if (index !== this.periodForm.periods.length - 1) {
          for (var i = index; i < this.periodForm.periods.length; i++) {
            this.periodForm.periods[i].periodId = this.periodForm.periods[i].periodId - 1
          }
        }
        this.periodForm.periods.splice(index, 1)
      }
    },
    addPeriod() {
      this.periodForm.periods.push({
        periodId: this.periodForm.periods.length + 2,
        periodName: ''
      });
    },
  },
  components: {
    EditCatalog
  },
}
</script>

<style scoped>
/deep/ :focus {
  outline: 0;
}
</style>
