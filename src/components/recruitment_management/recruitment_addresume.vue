<!-- 新增简历 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <!--标题-->
      <div class="j-card-head">
        <div class="j-card-head-title">
          <span>新增简历</span>
        </div>
      </div>
      <!--内容-->
      <div class="j-card-body ">

        <el-container>

          <el-main>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
              <div style="float: left">
                <div>
                  <el-upload
                      class="avatar-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="true"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                  >
                    122323
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
                  </el-upload>
                </div>

                <el-form-item label="姓名：" prop="name">
                  <el-input
                      v-model="form.name"
                      style="width: 225px"
                      clearable
                  ></el-input>
                </el-form-item>

                <el-form-item label="性别：" prop="sex">
                  <el-radio-group v-model="form.sex">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="电话：" prop="phone">
                  <el-input
                      v-model="form.phone"
                      placeholder="请输入手机号"
                      maxlength="11"
                      style="width: 225px"
                      clearable
                  ></el-input>
                </el-form-item>

                <el-form-item label="学历：">
                  <el-select v-model="form.region" placeholder="请选择你的学历">
                    <el-option label="家里蹲" value="shanghai"></el-option>
                    <el-option label="茅斯坑" value="beijing"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="邮箱：" prop="email">
                  <el-input
                      v-model="form.email"
                      style="width: 225px"
                      placeholder="请输入Email"
                  >
                  </el-input>
                </el-form-item>


                <div style="display: inline-block">
                  <el-form-item label="出生日期：" prop="birthday">
                    <el-date-picker
                        v-model="form.birthday"
                        type="date"
                        placeholder="请选择您的出生日期"
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>
              </div>
              <div>
                <div style="display: inline-block">
                  <el-form-item label="专业：" prop="quit">
                    <el-input
                        v-model="form.zhuanye"
                        style="width: 225px"
                        clearable
                    ></el-input>
                  </el-form-item>
                </div>
                <div style="display: inline-block">
                  <el-form-item label="户口所在地:" prop="address">
                    <el-cascader
                        placeholder="请选择您的地址"
                        size="large"
                        :options="options"
                        v-model="form.address"
                        @change="handleChange"
                    >
                    </el-cascader>
                  </el-form-item>
                </div>
              </div>
              <div style="margin-top: -72px">
                <div style="display: inline-block">
                  <el-form-item label="政治面貌：" prop="face">
                    <el-select
                        v-model="form.face"
                        placeholder="请选择你的政治面貌"
                    >
                      <el-option label="群众" value="shanghai"></el-option>
                      <el-option label="团员" value="beijing"></el-option>
                      <el-option label="党员" value="xiboliya"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div style="display: inline-block">
                  <el-form-item label="婚姻状况：">
                    <el-radio-group v-model="form.resource">
                      <el-radio label="未婚"></el-radio>
                      <el-radio label="已婚"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </div>
              </div>
              <el-form-item label="受教育经历：">
                <el-date-picker
                    v-model="form.education"
                    type="monthrange"
                    range-separator="To"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                >
                </el-date-picker>
                <el-divider direction="vertical"></el-divider>
                <el-input
                    v-model="form.school"
                    style="width: 225px"
                    placeholder="学校名称"
                    clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="工作经历：">
                <el-date-picker
                    v-model="form.value1"
                    type="monthrange"
                    range-separator="To"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                >
                </el-date-picker>
                <el-divider direction="vertical"></el-divider>
                <el-input
                    v-model="form.company"
                    style="width: 225px"
                    placeholder="公司名称"
                    clearable
                ></el-input>
                &nbsp;&nbsp;
                <el-input
                    v-model="form.position"
                    style="width: 225px"
                    placeholder="职位名称"
                    clearable
                ></el-input>
                &nbsp;&nbsp;

                <el-input
                    v-model="form.quit"
                    maxlength="200"
                    :autosize="{ minRows: 5, maxRows: 10 }"
                    show-word-limit
                    type="textarea"
                    placeholder="离职原因"
                    clearable
                ></el-input>
              </el-form-item>

              <el-form-item label="自我介绍：">
                <el-input
                    v-model="form.textarea"
                    maxlength="2000"
                    :autosize="{ minRows: 10, maxRows: 20 }"
                    placeholder="请输入内容"
                    show-word-limit
                    type="textarea"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form></el-main
          >
        </el-container>





      </div>

    </div>
  </div>
</template>

<script>
import { Plus } from '@element-plus/icons'
import { regionData, CodeToText } from "element-china-area-data";
import { defineComponent, reactive, toRefs } from "vue";
export default {
  components: {
    Plus,
  },
  data() {

    return {
      imageUrl: '',
      options: regionData,
      selectedOptions: [],
      form: {

        name: "",
        sex: "",
        phone: "",
        region: "",
        email: "",
        major: "",
        birthday: "",
        address: "",
        face: "",
        company: "",
        quit: "",
        position: "",
        value1: "",
        resource: "",
        desc: "",
        textarea: "",
        education: "",
        school: "",
      },

      rules: {
        hone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            pattern: /^1(3|4|5|7|8|9)\d{9}$/,
            message: "手机号格式错误",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "请输入Email",
            trigger: "blur",
          },
          {
            pattern:
                /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "邮箱格式错误",
            trigger: "blur",
          },
        ],
        name: {
          required: true,
          message: "姓名不为空",
          trigger: "blur",
        },
        quit: {
          required: true,
          message: "专业不为空",
          trigger: "blur",
        },
        birthday: {
          required: true,
          message: "生日不为空",
          trigger: "blur",
        },
        address: {
          required: true,
          message: "地址不为空",
          trigger: "blur",
        },
        sex: {
          required: true,
          message: "请选择你的性别",
          trigger: "blur",
        },
      },
    }
  },
  methods: {

    onSubmit() {
      this.$refs["form"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
      });
    },
    handleChange() {
      for (let i = 0; i < this.selectedOptions.length; i++) {
        let CodeToText;
        this.form.address += CodeToText[this.selectedOptions[i]];
      }
      // alert(this.form.address);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('Avatar picture must be JPG format!')
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!')
      }
      return isJPG && isLt2M
    },
  },

}
</script>



<style type="text/css" scoped>
@import url("../../css/navigation.css");
@import url("../../css/zpdaohang.css");

.el-aside {
  background-color: #bcdcf7;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
}
.el-main {
  background-color: #ebedf0;
  color: var(--el-text-color-primary);

  line-height: 160px;
}
body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

/deep/.el-form-item {
  display: flex;
  margin-bottom: 35px;
}
.j-card-head-title {
  float: left;
  font-size: 18px;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  letter-spacing: 0.3px;
}

.mainContent .sub-Content__primary {
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar-uploader-icon svg {
  margin-top: 74px; /* (178px - 28px) / 2 - 1px */
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
