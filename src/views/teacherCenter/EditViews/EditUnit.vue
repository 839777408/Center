<template>
  <div style="padding-top: 20px">
    <el-form :model="unitForm" ref="unitForm" label-width="100px" class="demo-dynamic">
      <el-form-item
          :prop="'unit1.unitName'"
          label="第1章"
          :rules="[{ required: true, message: '请输入章节名称', trigger: 'blur' },]">
        <el-input v-model="unitForm.unit1.unitName" style="width: 270px"></el-input>
        <el-button style="margin-left: 20px" disabled>删除</el-button>
        <slot name="Button" :unit="unitForm.unit1"></slot>
      </el-form-item>

      <el-form-item
          v-for="(unit, index) in unitForm.units"
          :label="'第' + (index+2) + '章'"
          :key="index"
          :prop="`units[${index}].unitName`"
          :rules="{required: true, message: '章节名称不能为空', trigger: 'blur'}">
        <el-input v-model="unit.unitName" style="width: 270px"></el-input>
        <el-button @click.prevent="removeUnit(unit)" style="margin-left: 20px">删除</el-button>
        <slot name="Button" :unit="unit"></slot>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(unitForm)">保存</el-button>
        <el-button @click="addUnit">新增章节</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      unitForm: {
        units: [{
          unitId: '2',
          unitName: ''
        }
        ],
        unit1: {
          unitId: '1',
          unitName: '第一单元'
        }
      }
    };
  },
  computed: {
    formData() {
      const unitsList = []
      unitsList.push(this.unitForm.unit1)
      for (let i = 0; i < this.unitForm.units.length; i++) {
        unitsList.push(this.unitForm.units[i])
      }
      return unitsList
    }
  },
  methods: {
    submitForm(unitForm) {
      this.$refs.unitForm.validate((valid) => {
        if (valid) {
          this.$http.post('/addUnits/' + this.$route.params.courseId,
              {unitsList: this.formData},
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
    removeUnit(item) {
      var index = this.unitForm.units.indexOf(item)
      if (index !== -1) {
        if (index !== this.unitForm.units.length - 1) {
          for (var i = index; i < this.unitForm.units.length; i++) {
            this.unitForm.units[i].unitId = this.unitForm.units[i].unitId - 1
          }
        }
        this.unitForm.units.splice(index, 1)
      }
    },
    addUnit() {
      this.unitForm.units.push({
        unitId: this.unitForm.units.length + 2,
        unitName: ''
      });
    },
  },
  created() {
    this.$http('/getUnits?courseId=' + this.$route.params.courseId).then((res) => {
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].unitId === 1) {
              this.unitForm.unit1.unitName = res.data.data[i].unitName
            } else if (res.data.data[i].unitId === 2) {
              this.unitForm.units[0].unitId = res.data.data[i].unitId
              this.unitForm.units[0].unitName = res.data.data[i].unitName
            } else {
              this.unitForm.units.push({
                unitId: res.data.data[i].unitId,
                unitName: res.data.data[i].unitName
              });
            }
          }
        }
    )
  }
}

</script>

<style scoped>

</style>
