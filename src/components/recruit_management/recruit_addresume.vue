<!-- 新增简历-->

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
        <div style="padding: 25px; height: 1000px">
          <div>
            <!-- 用户照片 -->
            <div style="width: 170px;">
              <div class="upload-btn common mb_10" v-if="!isShow">
                <label>
                  <input type="file" @change="uploadImg"/>
                </label>
              </div>
              <div class="img-list-item common mb_10" v-if="isShow">
                <img :src="src" class="common">
                <i class="del-img" @click="forkImage">
                </i>
              </div>
            </div>

            <div>
            <!-- 用 户 基 本 消 息 -->
            <el-form :inline="true" :model="formInline" class="demo-form-inline"
                     style="width: 78%; margin-top: -225px; margin-left: 19%;">
              <h3 style="display: inline">基本信息</h3>
              <el-button style="margin-left: 904px;" @click="resetOne">重置</el-button>
              <br>
              <el-form-item label="姓 名：">
                <el-input v-model="formInline.xm"></el-input>
              </el-form-item>
              <el-form-item label="性 别：">
                <el-select v-model="formInline.xb" placeholder="请选择">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="出生日期：">
                <el-col :span="11">
                  <el-date-picker
                      v-model="formInline.birthdate"
                      type="date"
                      placeholder="请选择日期"
                      style="width: 200px"
                  ></el-date-picker>
                </el-col>
              </el-form-item>

              <div style="display: block;">
                <el-form-item label="手机号：">
                  <el-input v-model="formInline.sjh"></el-input>
                </el-form-item>
                <el-form-item label="邮 箱：">
                  <el-input v-model="formInline.yx"></el-input>
                </el-form-item>
                <el-form-item label="所在地：">
                  <el-input v-model="formInline.szd"></el-input>
                </el-form-item>
              </div>


              <div style="display: block;">


                <el-form-item label="学 历：">
                  <el-select v-model="formInline.xl" placeholder="请选择">
                    <el-option label="初中" value="初中"></el-option>
                    <el-option label="高中" value="高中"></el-option>
                    <el-option label="大专" value="大专"></el-option>
                    <el-option label="本科" value="本科"></el-option>
                    <el-option label="硕士" value="硕士"></el-option>
                    <el-option label="博士" value="博士"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="政治面貌：">
                  <el-select v-model="formInline.zzmm" placeholder="请选择">
                    <el-option label="群众" value="群众"></el-option>
                    <el-option label="共青团" value="共青团"></el-option>
                    <el-option label="党员" value="党员"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="招聘计划：">
                  <el-select v-model="formInline.zpjh" placeholder="请选择" @click="selectPlan">
                    <el-option label="Hr人力资源专员" value="Hr人力资源专员"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-form>
          </div>
          </div>
          <br>
          <div style="border: 1px solid #ebebeb; width: 100%; height: 0px ;"></div>
          <br>


          <div>
          <div>
            <span>
              <h3 style="display: inline">教育消息</h3>

            </span>
            <el-button style="margin-left: 1080px;margin-bottom: 20px" @click="resetTwo">重置</el-button>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">

              <el-form-item label="学校名称：">
                <el-input v-model="formInline.xxmc"></el-input>
              </el-form-item>

              <el-form-item label="所学专业：">
                <el-input v-model="formInline.sxzy"></el-input>
              </el-form-item>

              <el-form-item label="开始时间：">
                <el-col :span="11">
                  <el-date-picker
                      v-model="formInline.startdate1"
                      type="date"
                      placeholder="请选择日期"
                      style="width: 200px"
                  ></el-date-picker>
                </el-col>
              </el-form-item>

              <el-form-item label="结束时间：">
                <el-col :span="11">
                  <el-date-picker
                      v-model="formInline.enddate1"
                      type="date"
                      placeholder="请选择日期"
                      style="width: 200px"
                  ></el-date-picker>
                </el-col>
              </el-form-item>


            </el-form>
          </div>

          </div>
          <br>
          <div style="border: 1px solid #ebebeb; width: 100%; height: 0px ;"></div>
          <br>

          <div>
            <span>
              <h3 style="display: inline">工作经历</h3>
            </span>
            <el-button style="margin-left: 1080px;margin-bottom: 20px" @click="resetThree">重置</el-button>

            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="公司名称：">
                <el-input v-model="formInline.gsmc"></el-input>
              </el-form-item>

              <el-form-item label="职位名称：">
                <el-input v-model="formInline.zwmc"></el-input>
              </el-form-item>


              <el-form-item label="开始时间：">
                <el-col :span="11">
                  <el-date-picker
                      v-model="formInline.startdate2"
                      type="date"
                      placeholder="请选择日期"
                      style="width: 200px"
                  ></el-date-picker>
                </el-col>
              </el-form-item>

              <el-form-item label="结束时间：">
                <el-col :span="11">
                  <el-date-picker
                      v-model="formInline.enddate2"
                      type="date"
                      placeholder="请选择日期"
                      style="width: 200px"
                  ></el-date-picker>
                </el-col>
              </el-form-item>

              <el-form-item label="所属行业：">
                <el-input v-model="formInline.sshy"></el-input>
              </el-form-item>

              <el-form-item label="税前月薪：">
                <el-input v-model="formInline.sqyx"></el-input>
              </el-form-item>

              <el-form-item label="工作描述：" style="display: block">
              <el-input
                  v-model="formInline.textarea"
                  :rows="2"
                  type="textarea"
              />
              </el-form-item>



            </el-form>
            <el-button @click="this.$parent.$data.recruit_addresume=false">取消</el-button>

            <el-button type="primary" @click="addResume">提交</el-button>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";
import {ref} from 'vue'

export default {
  data() {
    return {
      src: '',
      isShow: false,
      formInline: {
        xm:'',
        xb:'',
        sjh:'',
        yx:'',
        szd:'',
        xl:'',
        zzmm:'',
        zpjh:'',
        xxmc:'',
        sxzy:'',
        gsmc:'',
        zwmc:'',
        sshy:'',
        sqyx:'',
        value1: '',
        user: '',
        region: '',
        birthdate: '',
        startdate1:'',
        enddate1:'',
        startdate2:'',
        enddate2:'',
        textarea: '',
      },
      //访问路径
      url: "http://localhost:80/",
    }
  },
  methods: {
    uploadImg(e) {
      let _this = this;
      let files = e.target.files[0];
      if (!e || !window.FileReader) return; // 看支持不支持FileReader
      let reader = new FileReader();
      reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
      reader.onloadend = function () {
        _this.src = this.result;
        _this.isShow = true;
      }
    },
    forkImage() {
      this.src = '';
      this.isShow = false;
    },
    resetOne(){
      this.formInline.xm='';
      this.formInline.xb='';
      this.formInline.birthdate='';
      this.formInline.sjh='';
      this.formInline.yx='';
      this.formInline.szd='';
      this.formInline.xl='';
      this.formInline.zzmm='';
      this.formInline.zpjh='';
    },
    resetTwo(){
      this.formInline.xxmc='';
      this.formInline.sxzy='';
      this.formInline.startdate1='';
      this.formInline.enddate1='';
    },
    resetThree(){
      this.formInline.gsmc='';
      this.formInline.zwmc='';
      this.formInline.startdate2='';
      this.formInline.enddate2='';
      this.formInline.sshy='';
      this.formInline.sqyx='';
      this.formInline.textarea='';
    },
    addResume(){
      this.axios({
        method:'post',
        url: this.url+ 'addResume',
        data:{
          "resumeName":this.formInline.xm,
          "resumeSex":this.formInline.xb,
          "resumeBirthday":this.formInline.birthdate,
          "resumePhone": this.formInline.sjh,
          "resumeMailbox":this.formInline.yx,
          "resumeResidence": this.formInline.szd,
          "resumeEducation":this.formInline.xl,
          "resumePoliticalOutlook":this.formInline.zzmm,
          "recruitmentPlanId":this.formInline.zpjh,
          'educationStudentname':this.formInline.xxmc,
          'educationMajor':this.formInline.sxzy,
          'educationStartTime1':this.formInline.startdate1,
          'educationEndTime1':this.formInline.enddate1,
          'companyName':this.formInline.gsmc,
          'positionName':this.formInline.zwmc,
          'educationStartTime2':this.formInline.startdate2,
          'educationEndTime2':this.formInline.enddate2,
          'positionIndustry':this.formInline.sshy,
          'positionSqmonthly':this.formInline.sqyx,
          'positionDescribe':this.formInline.textarea,
        },
        responseType:'json',
        responseEncoding:'utf-8',
      }).then((response)=>{
        if (response.data.code == 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              //如果是成功
              if (response.data.data.info == "成功") {
                ElMessage({
                  type: 'success',
                  message: '添加成功',
                })
                this.$store.commit("updateToken", response.data.data.token);
              } else {
                ElMessage({
                  type: 'warning',
                  message: response.data.data.info,
                })
              }
            }else {
              ElNotification.warning({
                title: '提示',
                message: response.data.data.info,
                offset: 100,
              })
            }
          }
        } else {
          ElNotification.error({
            title: '提示',
            message: response.data.message,
            offset: 100,
          })
        }
      })
    },
    // 查询招聘计划名称
    selectPlan() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectPlan',
      }).then((response) => {
        console.log("查询招聘计划名称")
        console.log(response);
        if (response.data.code === 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state === 200) {
              _this.president = response.data.data.info;
              this.$store.commit("updateToken", response.data.data.token);
              window.setTimeout(this.selectStaffNameAll, 500);
            } else {
              ElNotification.error({
                title: '提示',
                message: response.data.data.info,
                offset: 100,
              })
            }
          }
        } else {
          ElNotification.error({
            title: '提示',
            message: response.data.message,
            offset: 100,
          })
        }
      })
    },
  },mounted() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token;
    this.selectPlan()
  }
}

</script>


<style type="text/css" scoped>
/deep/ .el-form-item__content {
  padding: 0 35px 0 0;
}


.common {
  width: 170px;
  height: 170px;
  border: 1px solid #d8d8d9;
}

.img-list-item {
  position: relative;
}

.img-list-item img {
  box-sizing: border-box;
  vertical-align: middle;
  border: 0;
}

.img-list-item i.del-img {
  width: 15px;
  height: 15px;
  display: inline-block;
  background: rgba(0, 0, 0, .6);
  background-size: 10px;
  background-repeat: no-repeat;
  background-position: 50%;
  position: absolute;
  top: 0;
  right: 0;
}

input[type="file"] {
  color: transparent;
  opacity: 0;
  width: 100%;
  height: 100%;
}

#wrapper:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.mb_10 {
  margin-bottom: 10px;
  margin-top: 35px;
}

.j-card-head {
  height: 48px;
  line-height: 48px;
  background: #fff;
  border-bottom: 1px solid #e9e9e9;
  margin: 0 24px;
  overflow: hidden;
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

.saas-main-content {
  padding-top: 12px;
  min-height: 500px;
}

.j-card-bordered {
  border: 1px solid #e9e9e9;
}

.j-card {
  background: #fff;
  border-radius: 4px;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  margin-top: 8px;
  min-height: 100%;
}

.j-card:hover {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-color: transparent;
}

.j-card-bordered {
  border: 1px solid #e9e9e9;
  border-top-color: rgb(233, 233, 233);
  border-right-color: rgb(233, 233, 233);
  border-bottom-color: rgb(233, 233, 233);
  border-left-color: rgb(233, 233, 233);
}

.j-card {
  background: #fff;
  border-radius: 4px;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  margin-top: 8px;
  min-height: 100%;
}
</style>
