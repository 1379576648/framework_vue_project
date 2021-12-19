<!-- 员工编辑基本档案-->
<template>


  <div class="basicfile_big">
    <div class="basicfile_big_auto">
      <div style="border-left:3px solid blue;">
        <h3>
          <span style="margin-left:10px;">基本档案</span>
        </h3>
      </div>


      <div class="information">
        <h3 style="color: #085fc3;font-size: 14px;margin-left: 10px;display: inline-block;">基本信息</h3>
        <div
            style="width:860px;border-top:1px solid silver;display: inline-block;margin-left: 20px;margin-bottom: 5px;"></div>
        <h3 @click="informations_1=!informations_1,informations_edit_1=!informations_edit_1,informations_bj_1=!informations_bj_1"
            v-show="informations_bj_1" style="color: #085fc3;font-size: 14px;margin-left: 10px;display: inline-block;">
          <i class="iconfont">&#xe600;</i>编辑</h3>
      </div>


      <div style="width: 100%;margin-top: 20px;">
        <div class="information_text" v-show="informations_1">
          <ul style="list-style-type: none; ">
            <li>
              <label>员工编号</label>
              <p>23</p>
            </li>
            <li>
              <label>姓名</label>
              <p></p>
            </li>
            <li>
              <label>出生日期</label>
              <p></p>
            </li>
            <li>
              <label>年龄</label>
              <p></p>
            </li>
            <li>
              <label>婚姻状况</label>
              <p></p>
            </li>
            <li>
              <label>最高学历</label>
              <p></p>
            </li>
            <li>
              <label>身份证</label>
              <p></p>
            </li>
            <li>
              <label>性别</label>
              <p></p>
            </li>
            <li>
              <label>政治面貌</label>
              <p></p>
            </li>
            <li>
              <label>户口所在地</label>
              <p></p>
            </li>
            <li>
              <label>毕业学校</label>
              <p></p>
            </li>
            <li>
              <label>银行卡号</label>
              <p></p>
            </li>
            <li>
              <label>血型</label>
              <p></p>
            </li>
            <li>
              <label>星座</label>
              <p></p>
            </li>
            <li>
              <label>专业</label>
              <p></p>
            </li>


          </ul>
        </div>

        <div class="information_from" v-show="informations_edit_1">
          <el-form style="width: 90%;margin: auto; " :model="aa" :rules="rules">

            <br/>
            <div style="display: inline-block;margin:20px 0px 0px 50px;text-align: right">
              <el-form-item label="员工编号：" prop="id">
                <el-input v-model="aa.id" style="width:240px;"></el-input>
              </el-form-item>
              <br/>


              <el-form-item label="出生日期：">
                <el-col :span="11">
                  <el-form-item prop="date2" style="width:240px;position: absolute;left:10px">
                    <el-date-picker type="date" placeholder="选择日期" v-model="aa.date2"
                                    style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <br/>

              <el-form-item label="婚姻状态：" prop="state">
                <el-select style="width:240px;" v-model="aa.state">
                  <el-option label="已婚" value="yh"></el-option>
                  <el-option label="未婚" value="wh"></el-option>
                  <el-option label="离异" value="ly"></el-option>

                </el-select>
              </el-form-item>
              <br/>

              <el-form-item label="身份证：" prop="legalIdNumber">
                <el-input v-model="aa.sfz" style="width:240px"
                          onkeyup="this.value = this.value.replace(/[^\w\.\/]/ig,'');"
                ></el-input>
              </el-form-item>
              <br/>

              <el-form-item label="政治面貌：" prop="zzmm">
                <el-select style="width:240px;" v-model="aa.zzmm">
                  <el-option label="团员" value="ty"></el-option>
                  <el-option label="党员" value="dy"></el-option>
                  <el-option label="群众" value="qz"></el-option>
                </el-select>
              </el-form-item>
              <br/>

              <el-form-item label="毕业学校：" prop="school">
                <el-input v-model="aa.school" style="width:240px;"></el-input>
              </el-form-item>
              <br/>


              <el-form-item label="血型：" prop="xx">
                <el-select style="width:240px;" v-model="aa.xx">
                  <el-option label="A" value="A"></el-option>
                  <el-option label="B" value="B"></el-option>
                  <el-option label="AB" value="AB"></el-option>
                  <el-option label="O" value="O"></el-option>
                  <el-option label="RH" value="RH"></el-option>
                </el-select>
              </el-form-item>
              <br/>


              <el-form-item label="专业：" prop="zy">
                <el-input v-model="aa.zy" style="width:240px;"></el-input>
              </el-form-item>
            </div>


            <div style="display: inline-block;position: absolute;top:20px;right:150px;text-align: right">
              <br/>
              <el-form-item prop="name">
                <template #label>姓名：</template>
                <el-input v-model="aa.name" style="width:240px;" disabled></el-input>
              </el-form-item>
              <br/>


              <el-form-item label="年龄：" prop="age">
                <el-input v-model="aa.age" style="width:240px;"
                          onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                          @change="verification"></el-input>
              </el-form-item>
              <br/>


              <el-form-item label="最高学历：" prop="xl">
                <el-select v-model="aa.xl" placeholder="请选择活动区域" style="width:240px;">
                  <el-option label="硕士" value="ss"></el-option>
                  <el-option label="本科" value="bk"></el-option>
                  <el-option label="大专" value="dz"></el-option>
                  <el-option label="中专" value="zz"></el-option>
                  <el-option label="高中" value="gz"></el-option>
                  <el-option label="其他" value="qt"></el-option>
                </el-select>
              </el-form-item>
              <br/>


              <el-form-item label="性别：" prop="sex">
                <el-radio-group v-model="aa.sex" style="position: absolute;left:47px">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
              <br/>


              <el-form-item label="户口所在地：" prop="szd">
                <el-input v-model="aa.szd" style="width:240px;"></el-input>
              </el-form-item>
              <br/>


              <el-form-item label="银行卡号：" prop="yhk">
                <el-input v-model="aa.yhk" style="width:240px;"></el-input>
              </el-form-item>
              <br/>


              <el-form-item label="星座：" prop="xz">
                <el-select v-model="aa.xz" placeholder="请选择星座" style="width:240px;">
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
                <el-button
                    @click="informations_1=!informations_1,informations_edit_1=!informations_edit_1,informations_bj_1=!informations_bj_1">
                  取消
                </el-button>
                <el-button type="primary" @click="submitForm1">保存</el-button>
              </div>
            </div>
          </el-form>
        </div>
      </div>


      <div class="information">
        <h3 style="color: #085fc3;font-size: 14px;margin-left: 10px;display: inline-block;">联系方式</h3>
        <div
            style="width:860px;border-top:1px solid silver;display: inline-block;margin-left: 20px;margin-bottom: 5px;"></div>
        <h3 @click="informations_2=!informations_2,informations_edit_2=!informations_edit_2,informations_bj_2=!informations_bj_2"
            v-show="informations_bj_2" style="color: #085fc3;font-size: 14px;margin-left: 10px;display: inline-block;">
          <i class="iconfont">&#xe600;</i>编辑</h3>

      </div>


      <div style="width: 100%;margin-top: 20px;">
        <div class="information_text" v-show="informations_2">
          <ul style="list-style-type: none; ">
            <li>
              <label>手机号</label>
              <p>23</p>
            </li>
            <li>
              <label>个人邮箱</label>
              <p></p>
            </li>
            <li>
              <label>微信</label>
              <p></p>
            </li>
            <li>
              <label>QQ</label>
              <p></p>
            </li>
            <li>
              <label>现住地址</label>
              <p></p>
            </li>
            <li>
              <label>紧急联系人</label>
              <p></p>
            </li>

          </ul>
        </div>

        <div class="information_from" v-show="informations_edit_2">
          <el-form style="width: 90%;margin: auto; " :model="aa" :rules="rules">

            <br/>
            <div style="display: inline-block;margin:20px 0px 0px 50px;text-align: right">

              <el-form-item label="手机号" prop="phone">
                <el-input v-model="aa.phone" style="width:240px;"
                          onkeyup="this.value = this.value.replace(/^[1-9]\d{11}$/,'');"
                          @change="verification2"></el-input>
              </el-form-item>
              <br/>

              <el-form-item label="微信：" prop="wx">
                <el-input v-model="aa.wx" style="width:240px"></el-input>
              </el-form-item>
              <br/>


              <el-form-item label="现住地址：" prop="redss">
                <el-input v-model="aa.redss" style="width:240px;"></el-input>
              </el-form-item>
              <br/>

            </div>


            <div style="display: inline-block;position: absolute;top:20px;right:150px;text-align: right">
              <br/>
              <el-form-item prop="eamil">
                <template #label>个人邮箱：</template>
                <el-input v-model="aa.eamil" style="width:240px;"></el-input>
              </el-form-item>
              <br/>


              <el-form-item label="QQ：" prop="qq">
                <el-input v-model="aa.qq" style="width:240px;"></el-input>
              </el-form-item>
              <br/>


              <el-form-item label="紧急联系人：" prop="jjphone">
                <el-input v-model="aa.jjphone" style="width:240px;"
                          onkeyup="this.value = this.value.replace(/^[1-9]\d{11}$/,'');"
                          @change="verification3"></el-input>
              </el-form-item>
              <br/>


            </div>

            <div style="width:90%;height:60px;margin: auto;margin-top: 20px;padding: 0px 0px 30px 0px">
              <div style="width:20%;height:50px;margin:auto;">

                <el-button
                    @click="informations_2=!informations_2,informations_edit_2=!informations_edit_2,informations_bj_2=!informations_bj_2">
                  取消
                </el-button>
                <el-button type="primary" @click="submitForm2">保存</el-button>
              </div>
            </div>
          </el-form>
        </div>
      </div>


      <div class="information">
        <h3 style="color: #085fc3;font-size: 14px;margin-left: 10px;display: inline-block;">在职信息</h3>
        <div
            style="width:860px;border-top:1px solid silver;display: inline-block;margin-left: 20px;margin-bottom: 5px;"></div>
        <h3 @click="informations_3=!informations_3,informations_edit_3=!informations_edit_3,informations_bj_3=!informations_bj_3"
            v-show="informations_bj_3" style="color: #085fc3;font-size: 14px;margin-left: 10px;display: inline-block;">
          <i class="iconfont">&#xe600;</i>编辑</h3>

      </div>


      <div style="width: 100%;margin-top: 20px;">
        <div class="information_text" v-show="informations_3">
          <ul style="list-style-type: none; ">
            <li>
              <label>部门</label>
              <p>23</p>
            </li>
            <li>
              <label>职位</label>
              <p></p>
            </li>
            <li>
              <label>员工状态</label>
              <p></p>
            </li>
            <li>
              <label>入职日期</label>
              <p></p>
            </li>
            <li>
              <label>工龄</label>
              <p></p>
            </li>
            <li>
              <label>转正日期</label>
              <p></p>
            </li>

          </ul>
        </div>

        <div class="information_from" v-show="informations_edit_3">
          <el-form style="width: 90%;margin: auto;">

            <br/>
            <div style="display: inline-block;margin:20px 0px 0px 50px;text-align: right">

              <el-form-item label="部门：" prop="dept">
                <el-input v-model="aa.dept" style="width:240px;"></el-input>
              </el-form-item>
              <br/>

              <el-form-item label="职位：" prop="zw">
                <el-input v-model="aa.zw" style="width:240px;"></el-input>
              </el-form-item>
              <br/>


              <el-form-item label="工龄：" prop="gl">
                <el-input v-model="aa.gl" style="width:240px;"></el-input>
              </el-form-item>
              <br/>

            </div>


            <div style="display: inline-block;position: absolute;top:20px;right:150px;text-align: right">
              <br/>


              <el-form-item label="入职日期：" prop="">
                <el-date-picker
                    v-model="aa.rzdate"
                    type="date"
                    placeholder="选择日期" style="width: 240px"
                    @change="judgedate1">
                </el-date-picker>
              </el-form-item>
              <br/>

              <el-form-item label="员工状态：" prop="ygstate`1">
                <el-radio-group v-model="aa.ygstate" style="position: absolute;left:4px">
                  <el-radio label="实习"></el-radio>
                  <el-radio label="正式"></el-radio>
                </el-radio-group>
              </el-form-item>
              <br/>

              <el-form-item label="转正日期：">
                <el-date-picker
                    v-model="aa.zzdate"
                    type="date"
                    placeholder="选择日期" style="width: 240px"
                    @change="judgedate2">
                </el-date-picker>
              </el-form-item>
              <br/>


            </div>

            <div style="width:90%;height:60px;margin: auto;margin-top: 20px;padding: 0px 0px 30px 0px">
              <div style="width:20%;height:50px;margin:auto;">

                <el-button
                    @click="informations_3=!informations_3,informations_edit_3=!informations_edit_3,informations_bj_3=!informations_bj_3">
                  取消
                </el-button>
                <el-button type="primary" @click="submitForm3">保存</el-button>
              </div>
            </div>
          </el-form>
        </div>
      </div>

    </div>
  </div>


</template>

<script lang="ts">
import {defineComponent, reactive, toRefs} from 'vue'
import {defineComponent, ref} from 'vue'

import {ElMessage} from "element-plus/es";

export default defineComponent({
  setup() {
    const state = reactive({
      disabledDate(time) {
        return time.getTime() > Date.now()
      },
      shortcuts: [
        {
          text: 'Today',
          value: new Date(),
        },
        {
          text: 'Yesterday',
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
          },
        },
        {
          text: 'A week ago',
          value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            return date
          },
        },
      ],
      value1: '',
      value2: '',
    })

    return {
      input: ref(''),
      ...toRefs(state),
    }
  },
  data() {
    return {
      aa: [
        {
          id: '',
          name: '',
          date2: "",
          age: '',
          state: '',
          xl: '',
          sfz: '',
          sex: '',
          zzmm: '',
          szd: '',
          school: '',
          yhk: '',
          xx: '',
          xz: '',
          zy: '',
          ygstate: '',
          phone: '',
          eamil: '',
          wx: '',
          qq: '',
          redss: '',
          jjphone: '',
          dept: '',
          zw: '',
          gl: '',
          rzdate: '',
          zzdate: ''
        }

      ],
      rules: {
        id: {
          required: true,
          message: '编号不能为空',
          trigger: 'blur'
        },
        phone: [
          {
            required: true,
            message: '手机号码不能为空',
            trigger: 'blur'
          },
          {
            min:11,
            max: 11,
            message: '手机号码只能是11位',
            trigger: 'blur'
          }
        ]
      },

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


})
</script>

<style scoped>
/*@import url("../../css/EditingStaff.css");*/
.basicfile_big {
  width: 100%;
  /*border:1px solid red;*/
  margin-top: 20px;
}

.basicfile_big_auto {
  width: 80%;
  /*border:1px solid yellow;*/
  margin: auto;
}

.information {
  margin-top: 20px;
  width: 100%;
}

.information_text {
  width: 870px;

  margin: auto;
}

.information_text li {
  /*float: left;*/
  display: inline-block;
  width: 50%;
  padding: 4px 0px;

}

.information_text li label {
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

.information_text li p {
  display: inline-block;
}

.iconfont {
  color: #085fc3;
}

.information_from {
  width: 100%;
  background: #e8edf2;
  position: relative;

}

.information_ul li {
  display: inline-block;
  width: 50%;
  padding: 20px 64px 20px;
  text-align: right;

}

.information_ul li label {
  /*width:100px;*/
  text-align: right;
  vertical-align: middle;
  position: relative;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  /*padding: 0 24px 0 0;*/
  box-sizing: border-box;
}

.information_ul {
  list-style-type: none;
  position: relative;
}

.information_input {
  width: 240px;
  display: inline-block;
}

</style>