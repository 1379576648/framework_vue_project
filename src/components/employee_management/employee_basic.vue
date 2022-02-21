<!-- 员工编辑基本档案-->
<template>


  <div class="basicfile_big">
    <div class="basicfile_big_auto">
      <div >
        <h3>
          <span style="margin-left:10px;">基本档案</span>
        </h3>
      </div>


      <div class="information">
        <h3 style="color: #085fc3;font-size: 14px;margin-left: 10px;display: inline-block;">基本信息</h3>
        <div style="width:860px;border-top:1px solid silver;display: inline-block;margin-left: 20px;margin-bottom: 5px;"></div>
        <h3 @click="informations_1=!informations_1,informations_edit_1=!informations_edit_1,informations_bj_1=!informations_bj_1" v-show="informations_bj_1" style="color: #085fc3;font-size: 14px;margin-left: 10px;display: inline-block;"><i class="iconfont">&#xe600;</i>编辑</h3>
      </div>



      <div style="width: 100%;margin-top: 20px;">
        <div class="information_text" v-show="informations_1">
          <ul style="list-style-type: none;">
            <li>
              <label>员工编号</label>
              <p>{{tableData.staffId}}</p>
            </li>
            <li>
              <label>姓名</label>
              <p>{{tableData.staffName}}</p>
            </li>
            <li>
              <label>出生日期</label>
              <p>{{tableData.staffBirthday}}</p>
            </li>
            <li>
              <label>年龄</label>
              <p>{{tableData.staffAge}}</p>
            </li>
            <li>
              <label>婚姻状况</label>
              <p>{{tableData.staffMarital}}</p>
            </li>
            <li>
              <label>最高学历</label>
              <p>{{tableData.staffEducation}}</p>
            </li>
            <li>
              <label>身份证</label>
              <p>{{tableData.staffIdentity}}</p>
            </li>
            <li>
              <label>性别</label>
              <p>{{tableData.staffSex}}</p>
            </li>
            <li>
              <label>政治面貌</label>
              <p>{{tableData.staffOutlook}}</p>
            </li>
            <li>
              <label>户口所在地</label>
              <p>{{tableData.staffRegistered}}</p>
            </li>
            <li>
              <label>毕业学校</label>
              <p>{{tableData.staffSchool}}</p>
            </li>
            <li>
              <label>银行卡号</label>
              <p>{{tableData.staffCredit}}</p>
            </li>
            <li>
              <label>血型</label>
              <p>{{tableData.staffBlood}}</p>
            </li>
            <li>
              <label>星座</label>
              <p>{{tableData.staffSign}}</p>
            </li>


          </ul>
        </div>
        <div class="information_from" v-show="informations_edit_1">
          <el-form style="width: 90%;margin: auto; " :rules="rules" ref="essentialForm" :model="tableData">

            <br/>
            <div style="display: inline-block;margin:20px 0px 0px 50px;text-align: right">
              <el-form-item label="员工编号：" style="width:300px;margin-left: -220px;">
                <el-input v-model="tableData.staffId" disabled></el-input>
              </el-form-item><br/>


              <el-form-item label="出生日期：" style="width:600px;margin-left: -220px;">
                <el-col :span="11">
                  <el-form-item>
                    <el-date-picker type="date" placeholder="选择日期" v-model="tableData.staffBirthday" style="width: 100%;" @change="ages()"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item><br/>

              <el-form-item label="婚姻状态：" prop="marital" style="width:300px;margin-left: -220px;">
                <el-select v-model="tableData.staffMarital">
                  <el-option label="已婚" value="已婚"></el-option>
                  <el-option label="未婚" value="未婚"></el-option>
                  <el-option label="离异" value="离异"></el-option>
                </el-select>
              </el-form-item><br/>


              <el-form-item label="身份证：" prop="identity" style="width:280px;margin-left: -208px;">
                <el-input v-model="tableData.staffIdentity"></el-input>
              </el-form-item><br/>

              <el-form-item label="政治面貌：" prop="politics" style="width:300px;margin-left: -220px;">
                <el-select v-model="tableData.staffOutlook">
                  <el-option label="团员" value="团员"></el-option>
                  <el-option label="党员" value="党员"></el-option>
                  <el-option label="群众" value="群众"></el-option>
                </el-select>
              </el-form-item><br/>

              <el-form-item label="毕业学校：" prop="school" style="width:300px;margin-left: -220px;">
                <el-input v-model="tableData.staffSchool"></el-input>
              </el-form-item><br/>


              <el-form-item label="血型：" style="width:300px;margin-left: -220px;">
                <el-select v-model="tableData.staffBlood">
                  <el-option label="O型" value="O型"></el-option>
                  <el-option label="A型" value="A型"></el-option>
                  <el-option label="B型" value="B型"></el-option>
                  <el-option label="AB型" value="AB型"></el-option>
                  <el-option label="RH型" value="RH型"></el-option>
                </el-select>
              </el-form-item><br/>


            </div>



            <div style="display: inline-block;position: absolute;top:20px;right:150px;text-align: right">
              <br/>
              <el-form-item prop="emp_name">
                <template #label >姓名：</template>
                <el-input v-model="tableData.staffName" style="width:240px;" disabled></el-input>
              </el-form-item><br/>



              <el-form-item label="年龄：" prop="age">
                <el-input style="width:240px;" v-model="tableData.staffAge"></el-input>
              </el-form-item><br/>



              <el-form-item label="最高学历：" prop="official">
                <el-select v-model="tableData.staffEducation" placeholder="请选择" style="width:240px;">
                  <el-option label="硕士" value="硕士"></el-option>
                  <el-option label="本科" value="本科"></el-option>
                  <el-option label="大专" value="大专"></el-option>
                  <el-option label="中专" value="中专"></el-option>
                  <el-option label="高中" value="高中"></el-option>
                  <el-option label="其他" value="其他"></el-option>
                </el-select>
              </el-form-item><br/>


              <el-form-item label="性别：" prop="emp_sex">
                <el-radio-group  style="position: absolute;left:47px" v-model="tableData.staffSex">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item><br/>



              <el-form-item label="户口所在地：" prop="registered">
                <el-input v-model="tableData.staffRegistered" style="width:240px;"></el-input>
              </el-form-item><br/>


              <el-form-item label="银行卡号：" prop="credit">
                <el-input v-model="tableData.staffCredit" style="width:240px;"></el-input>
              </el-form-item><br/>


              <el-form-item label="星座：" prop="official">
                <el-select v-model="tableData.staffSign" placeholder="请选择" style="width:240px;">
                  <el-option label="白羊座" value="白羊座"></el-option>
                  <el-option label="金牛座" value="金牛座"></el-option>
                  <el-option label="双子座" value="双子座"></el-option>
                  <el-option label="巨蟹座" value="巨蟹座"></el-option>
                  <el-option label="狮子座" value="狮子座"></el-option>
                  <el-option label="处女座" value="处女座"></el-option>
                  <el-option label="天秤座" value="天秤座"></el-option>
                  <el-option label="天蝎座" value="天蝎座"></el-option>
                  <el-option label="射手座" value="射手座"></el-option>
                  <el-option label="摩羯座" value="摩羯座"></el-option>
                  <el-option label="水瓶座" value="水瓶座"></el-option>
                  <el-option label="双鱼座" value="双鱼座"></el-option>
                </el-select>
              </el-form-item>
            </div>



            <div style="width:90%;height:60px;margin: auto;margin-top: 20px;padding: 0px 0px 30px 0px">
              <div style="width:20%;height:50px;margin:auto;">
                <el-button @click="informations_1=!informations_1,informations_edit_1=!informations_edit_1,informations_bj_1=!informations_bj_1">取消</el-button>
                <el-button type="primary" @click="informations_1=!informations_1,informations_edit_1=!informations_edit_1,informations_bj_1=!informations_bj_1,updateStaff(this.tableData.staffId)">保存</el-button>
              </div>
            </div>
          </el-form>
        </div>
      </div>




      <div class="information">
        <h3 style="color: #085fc3;font-size: 14px;margin-left: 10px;display: inline-block;">联系方式</h3>
        <div style="width:860px;border-top:1px solid silver;display: inline-block;margin-left: 20px;margin-bottom: 5px;"></div>
        <h3 @click="informations_2=!informations_2,informations_edit_2=!informations_edit_2,informations_bj_2=!informations_bj_2" v-show="informations_bj_2" style="color: #085fc3;font-size: 14px;margin-left: 10px;display: inline-block;"><i class="iconfont">&#xe600;</i>编辑</h3>

      </div>



      <div style="width: 100%;margin-top: 20px;">
        <div class="information_text" v-show="informations_2">
          <ul style="list-style-type: none; ">
            <li>
              <label>手机号</label>
              <p>{{tableData.staffPhone}}</p>
            </li>
            <li>
              <label>个人邮箱</label>
              <p>{{tableData.staffEmail}}</p>
            </li>
            <li>
              <label>微信</label>
              <p>{{tableData.staffWechat}}</p>
            </li>
            <li>
              <label>QQ</label>
              <p>{{tableData.staffQq}}</p>
            </li>
            <li>
              <label>现住地址</label>
              <p>{{tableData.staffAddress}}</p>
            </li>
            <li>
              <label>紧急联系人</label>
              <p>{{tableData.staffEmergency}}</p>
            </li>

          </ul>
        </div>

        <div class="information_from" v-show="informations_edit_2">
          <el-form style="width: 90%;margin: auto; " :rules="rules" ref="contactForm" :model="contactForm">

            <br/>
            <div style="display: inline-block;margin:20px 0px 0px 50px;text-align: right">

              <el-form-item label="手机号" prop="phone" style="width:300px;margin-left: -320px;" >
                <el-input v-model="tableData.staffPhone"></el-input>
              </el-form-item><br/>

              <el-form-item label="微信：" prop="WeChat" style="width:300px;margin-left: -320px;">
                <el-input v-model="tableData.staffWechat"></el-input>
              </el-form-item><br/>


              <el-form-item label="现住地址：" prop="address" style="width:300px;margin-left: -320px;">
                <el-input v-model="tableData.staffAddress"></el-input>
              </el-form-item><br/>

            </div>



            <div style="display: inline-block;position: absolute;top:20px;right:150px;text-align: right">
              <br/>
              <el-form-item  prop="eamil">
                <template #label >个人邮箱：</template>
                <el-input v-model="tableData.staffEmail" style="width:240px;"></el-input>
              </el-form-item><br/>


              <el-form-item label="QQ：" prop="qq">
                <el-input v-model="tableData.staffQq" style="width:240px;"></el-input>
              </el-form-item><br/>


              <el-form-item label="紧急联系人：" prop="emergency">
                <el-input v-model="tableData.staffEmergency" style="width:240px;"></el-input>
              </el-form-item><br/>


            </div>

            <div style="width:90%;height:60px;margin: auto;margin-top: 20px;padding: 0px 0px 30px 0px">
              <div style="width:20%;height:50px;margin:auto;">

                <el-button @click="informations_2=!informations_2,informations_edit_2=!informations_edit_2,informations_bj_2=!informations_bj_2">取消</el-button>
                <el-button type="primary"  @click="informations_2=!informations_2,informations_edit_2=!informations_edit_2,informations_bj_2=!informations_bj_2,updateStaffTwo(this.tableData.staffId)">保存</el-button>
              </div>
            </div>
          </el-form>
        </div>
      </div>


      <div class="information">
        <h3 style="color: #085fc3;font-size: 14px;margin-left: 10px;display: inline-block;">在职信息</h3>
        <div style="width:860px;border-top:1px solid silver;display: inline-block;margin-left: 20px;margin-bottom: 5px;"></div>
<!--        <h3 @click="informations_3=!informations_3,informations_edit_3=!informations_edit_3,informations_bj_3=!informations_bj_3" v-show="informations_bj_3" style="color: #085fc3;font-size: 14px;margin-left: 10px;display: inline-block;"><i class="iconfont">&#xe600;</i>编辑</h3>-->

      </div>



      <div style="width: 100%;margin-top: 20px;">
        <div class="information_text" v-show="informations_3">
          <ul style="list-style-type: none; ">
            <li>
              <label>部门</label>
              <p>{{tableData.deptName}}</p>
            </li>
            <li>
              <label>职位</label>
              <p>{{tableData.postName}}</p>
            </li>
            <li>
              <label>员工状态</label>
              <p>{{tableData.staffState}}</p>
            </li>
            <li>
              <label>入职日期</label>
              <p>{{tableData.staffHiredate}}</p>
            </li>
            <li>
              <label>工龄</label>
              <p>{{tableData.workAge}}</p>
            </li>
            <li>
              <label>转正日期</label>
              <p>{{tableData.workerDate}}</p>
            </li>

          </ul>
        </div>

<!--        <div class="information_from" v-show="informations_edit_3">-->
<!--          <el-form style="width: 90%;margin: auto;" ref="informationForm">-->

<!--            <br/>-->
<!--            <div style="display: inline-block;margin:20px 0px 0px 50px;text-align: right">-->

<!--              <el-form-item label="部门：" prop="dept" style="width:300px;margin-left: -320px;">-->
<!--                <el-input v-model="tableData.deptName"></el-input>-->
<!--              </el-form-item><br/>-->

<!--              <el-form-item label="职位：" prop="position" style="width:300px;margin-left: -320px;">-->
<!--                <el-input v-model="tableData.postName"></el-input>-->
<!--              </el-form-item><br/>-->


<!--              <el-form-item label="工龄：" prop="service" style="width:300px;margin-left: -320px;">-->
<!--                <el-input v-model="tableData.workAge"></el-input>-->
<!--              </el-form-item><br/>-->

<!--            </div>-->



<!--            <div style="display: inline-block;position: absolute;top:20px;right:150px;text-align: right">-->
<!--              <br/>-->


<!--              <el-form-item label="入职日期：" prop="boardDate">-->
<!--                <el-date-picker-->
<!--                    v-model="tableData.staffHiredate"-->
<!--                    type="date"-->
<!--                    placeholder="选择日期" style="width: 240px">-->
<!--                </el-date-picker>-->
<!--              </el-form-item><br/>-->

<!--              <el-form-item label="员工状态：" prop="state">-->
<!--                <el-radio-group  style="position: absolute;left:4px" v-model="tableData.staffState">-->
<!--                  <el-radio label="实习"></el-radio>-->
<!--                  <el-radio label="正式"></el-radio>-->
<!--                </el-radio-group>-->
<!--              </el-form-item><br/>-->

<!--              <el-form-item label="转正日期：" prop="positive">-->
<!--                <el-date-picker-->
<!--                    v-model="tableData.workerDate"-->
<!--                    type="date"-->
<!--                    placeholder="选择日期" style="width: 240px">-->
<!--                </el-date-picker>-->
<!--              </el-form-item><br/>-->



<!--            </div>-->

<!--            <div style="width:90%;height:60px;margin: auto;margin-top: 20px;padding: 0px 0px 30px 0px">-->
<!--              <div style="width:20%;height:50px;margin:auto;">-->
<!--                <el-button @click="informations_3=!informations_3,informations_edit_3=!informations_edit_3,informations_bj_3=!informations_bj_3">取消</el-button>-->
<!--                <el-button type="primary">保存</el-button>-->
<!--              </div>-->
<!--            </div>-->
<!--          </el-form>-->
<!--        </div>-->
     </div>

    </div>
  </div>
</template>
<script>
import {ElMessage, ElNotification} from "element-plus";
export default {
  data() {
    return {
      url: "http://localhost:80/",
      tableData:{},
      informations_1: true,
      informations_edit_1: false,
      informations_bj_1: true,
      informations_2: true,
      informations_edit_2: false,
      informations_bj_2: true,
      informations_3: true,
      informations_edit_3: false,
      informations_bj_3: true
    }
  },
  methods: {
//根据id查询员工信息
    selectStaffAll(id) {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectStaffAll',
        data:{
            staffId:this.$parent.$parent.$parent.$parent.$data.one,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        //如果服务关闭
        if (response.data.data.data) {
          ElNotification.warning({
            title: '提示',
            message: "服务发生关闭",
            offset: 100,
          })
          //如果服务没有关闭
        } else if (response.data.data) {
          //如果服务是正常的
          if (response.data.data.state == 200) {
            _this.tableData = response.data.data.info[0];
            if(this.tableData.staffState==0){
              this.tableData.staffState="试用";
            }else if(this.tableData.staffState==1){
              this.tableData.staffState="正式";
            }else if(this.tableData.staffState==2){
              this.tableData.staffState="离职";
            }

          }
          //如果服务是雪崩的
          else {
            ElNotification.warning({
              title: '提示',
              message: "服务发生雪崩",
              offset: 100,
            })
          }
        }
      })
    },
    //修改员工信息
    updateStaff(id) {
      console.log(id)
      var _this = this
      this.axios({
        method: 'put',
        url: this.url + 'updateStaff',
        data: {
          //员工编号
          staffId:this.tableData.staffId,
          //出生日期
          staffBirthday: this.tableData.staffBirthday,
          //婚姻状态
          staffMarital:this.tableData.staffMarital,
          //学历
          staffEducation:this.tableData.staffEducation,
          //身份证
          staffIdentity:this.tableData.staffIdentity,
          //性别
          staffSex:this.tableData.staffSex,
          //政治面貌
          staffOutlook:this.tableData.staffOutlook,
          //户口所在地
          staffRegistered:this.tableData.staffRegistered,
          //毕业学校
          staffSchool:this.tableData.staffSchool,
          //银行卡号
          staffCredit:this.tableData.staffCredit,
          //血型
          staffBlood:this.tableData.staffBlood,
          //星座
          staffSign:this.tableData.staffSign,
          //年龄
          staffAge:this.tableData.staffAge,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("修改状态")
        console.log(response)
        if (response.data.code === 200 && response.data.data === 666) {
          ElMessage({
            showClose: true,
            message: '操作成功',
            type: 'success',
          })
          this.selectStaffAll();
        } else if (response.data.data === 100) {
          ElMessage({
            showClose: true,
            message: '操作失败',
            type: 'error',
          })
        } else {
          ElMessage({
            showClose: true,
            message: '操作失败',
            type: 'error',
          })
        }
      }).catch(function (error) {
        console.log("失败")
        console.log(error);
      });
    },
    //修改员工信息2
    updateStaffTwo(id) {
      var _this = this
      this.axios({
        method: 'put',
        url: this.url + 'updateStaffTwo',
        data: {
          //员工编号
          staffId:this.tableData.staffId,
          //手机号码
          staffPhone: this.tableData.staffPhone,
          //个人邮箱
          staffEmail:this.tableData.staffEmail,
          //微信
          staffWechat:this.tableData.staffWechat,
          //QQ
          staffQq:this.tableData.staffQq,
          //现住地址
          staffAddress:this.tableData.staffAddress,
          //紧急联系人
          staffEmergency:this.tableData.staffEmergency,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("修改状态")
        console.log(response)
        if (response.data.code === 200 && response.data.data === 666) {
          ElMessage({
            showClose: true,
            message: '操作成功',
            type: 'success',
          })
          this.selectStaffAll();
        } else if (response.data.data === 100) {
          ElMessage({
            showClose: true,
            message: '操作失败1',
            type: 'error',
          })
        } else {
          ElMessage({
            showClose: true,
            message: '操作失败2',
            type: 'error',
          })
        }
      }).catch(function (error) {
        console.log("失败")
        console.log(error);
      });
    },
    //计算年龄
    ages(){
      const birthdays = new Date(this.tableData.staffBirthday + "".replace(/-/g, "/"));
      const d = new Date();
      const age =
          d.getFullYear() -
          birthdays.getFullYear() -
          (d.getMonth() < birthdays.getMonth() ||
          (d.getMonth() == birthdays.getMonth() &&
              d.getDate() < birthdays.getDate())
              ? 1
              : 0);
      this.tableData.staffAge=age;

    }
  },mounted() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    this.selectStaffAll(this.$parent.$parent.$parent.$parent.$data.one)
  }
}
</script>

<style>
/*@import url("../../css/EditingStaff.css");*/
.basicfile_big{
  width:100%;
  /*border:1px solid red;*/
  margin-top:20px;
}
.basicfile_big_auto{
  width:80%;
  /*border:1px solid yellow;*/
  margin: auto;
}
.information{
  margin-top: 20px;
  width:100%;
}

.information_text{
  width:870px;
  margin: auto;
}
.information_text li{
  /*float: left;*/
  display: inline-block;
  width:50%;
  padding: 4px 0px;

}
.information_text li label{
  width: 200px;
  display: inline-block;
  text-align: right;
  vertical-align: middle;
  position: relative;
  color: #969799;
  font-size: 14px;
  padding: 0 24px 0 0;
  box-sizing: border-box;
}
.information_text li p{
  display: inline-block;
  text-align: right;
}
.iconfont{
  color: #085fc3;
}
.information_from{
  width:100%;
  background: #e8edf2;
  position: relative;

}
.information_ul li{
  display: inline-block;
  width:50%;
  padding: 20px 64px 20px;
  text-align: right;

}
.information_ul li label{
  /*width:100px;*/
  text-align: right;
  vertical-align: middle;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  /*padding: 0 24px 0 0;*/
  box-sizing: border-box;
}

.information_ul{
  list-style-type: none;
  position: relative;
}
.information_input{
  width:240px;
  display: inline-block;
}
</style>