<!--班次添加-->
<template>
<!--  新增班次页面-->
  <div class="w">
    <el-form
        ref="ruleForm"
        label-position="top"
        :model="fo"
        :rules="rules"
        label-width="100px"
    >
      <el-form-item prop="name" label="班次名称：" style="margin-left: 20px">
        <el-input
            v-model="fo.name"
            placeholder="例如：日常班"
            style="width: 250px"
        ></el-input>
      </el-form-item>
      <el-form-item prop="value1" label="工作时间：" style="margin-left: 20px">
        <el-time-picker
            v-model="fo.value1"
            :disabled-hours="disabledHours"
            :disabled-minutes="disabledMinutes"
            :disabled-seconds="disabledSeconds"
            placeholder="上班时间："
            style="width: 150px"
        >
        </el-time-picker>
        <span>&nbsp;&nbsp;到&nbsp;&nbsp;</span>
        <el-time-picker
            v-model="fo.value2"
            :disabled-hours="disabledHours"
            :disabled-minutes="disabledMinutes"
            :disabled-seconds="disabledSeconds"
            placeholder="下班时间："
            style="width: 150px"
        >
        </el-time-picker>
      </el-form-item>
      <el-form-item>
        <div class="u">
          <router-link to="/attendance/check">
            <el-button>
              <el-icon>
                <i-circle-close/>
              </el-icon>
              <span>取消</span>
            </el-button>
          </router-link>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <el-button type="primary" @click="submitForm('ruleForm')">
            <el-icon>
              <i-copy-document/>
            </el-icon>
            <span>提交</span>
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
  <router-view/>
</template>

<script lang="ts">
export default {
  data() {
    return {
      fo: {
        name: "",
        value1: "",
        value2: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请填写班次名字",
            trigger: "blur",
          },
        ],
        value1: [
          {
            required: true,
            message: "请选择工作时间",
            trigger: "blur",
          }
        ]
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  }
};
</script>

<style scoped>
.w {
  margin-top: 20px;
  border: 1px solid #e9e9e9;
}

.w:hover {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  border-color: transparent;
}

/* 调整输入框的高度 */
::v-deep .el-input__inner {
  height: 32px;
}

.u {
  margin-left: 40%;
}
</style>
