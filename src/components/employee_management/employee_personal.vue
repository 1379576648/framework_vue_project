<!--员工编辑个人信息页面-->
<template>
  <div class="basicfile_big">
    <div class="basicfile_big_auto">

<!--      工作经验-->
      <div style="border-left:3px solid blue;">
        <h3>
          <span style="margin-left:10px;">工作经验</span>
        </h3>
      </div>

<!--      工作经历-->
      <div class="information">
        <h3 style="color: #085fc3;font-size: 14px;margin-left: 10px;display: inline-block;">工作经历<i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe604;</i></h3>
        <div style="width:840px;border-top:1px solid silver;display: inline-block;margin-left: 7px;margin-bottom: 5px;"></div>
        <h3 v-show="workerButton" style="color: #085fc3;font-size: 14px;position: relative;margin-left: 10px;display: inline-block;"><el-button type="text" @click="addButton()"><i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe613;</i>添加</el-button></h3>
      </div>

      <div style="width: 100%;margin-top: 20px;">

        <div style="width:98%;height:80px;border: 1px dotted silver;margin: auto" v-show="addWork">
          <div style="margin: auto;width:120px;height: 80px;line-height: 80px">
            <el-button type="text" @click="addWorks()"><i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe613;</i>添加&nbsp;&nbsp;工作经历</el-button>
          </div>
        </div>

        <div v-for="(obj,index) in workAll" style="width:100%;position: relative;margin-top: 20px;" v-show="workShow">
          <div class="information_text">
            <ul style="list-style-type: none; ">
              <li>
                <label>开始时间</label>
                <p>{{obj.start_time}}</p>
              </li>
              <li>
                <label>结束时间</label>
                <p>{{obj.end_time}}</p>
              </li>
              <li>
                <label>任职公司</label>
                <p>{{obj.company}}</p>
              </li>
              <li>
                <label>职位</label>
                <p>{{obj.position}}</p>
              </li>
              <li>
                <label>离职原因</label>
                <p>{{obj.reasons}}</p>
              </li>
            </ul>
          </div>
          <div style="position: absolute;right: 6px;top:-5px">
          <el-button type="text" style="color: #085fc3;" @click="workEditor(index)">编辑</el-button>
          <el-button type="text" style="color: red;" @click="workDelete(index)">删除</el-button>
          </div>
          <br/>
        </div>

        <div class="information_from" v-show="workInput">
          <el-form style="width: 90%;margin: auto; " :rules="rules" ref="workForm" :model="workForm">
             <br/>
              <div style="display: inline-block;margin:20px 0px 0px 50px">
                <el-form-item label="开始时间:" required >
                  <el-col :span="11" >
                    <el-form-item prop="start_time" style="width:240px;">
                      <el-date-picker type="date" placeholder="选择日期" v-model="workForm.start_time" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item><br>

                <el-form-item label="任职公司：" class="el-form-item" >
                  <el-col :span="11">
                    <el-form-item prop="company" style="width:240px;">
                      <el-input   v-model="workForm.company" style="width: 100%;"></el-input>
                    </el-form-item>
                  </el-col>
                </el-form-item><br>

                <el-form-item label="离职原因：" >
                  <el-col :span="11">
                    <el-form-item prop="reasons" style="width:240px;">
                      <el-input type="textarea" v-model="workForm.reasons" style="width: 100%;"></el-input>
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </div>

            <div style="display: inline-block;position: absolute;top:20px;right:150px">
              <br>
                <el-form-item label="结束时间:" required >
                  <el-col :span="11">
                    <el-form-item prop="end_time" style="width:240px;">
                      <el-date-picker type="date" placeholder="选择日期" v-model="workForm.end_time" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item><br>


                <div style="float: right">
                <el-form-item label="职位：" >

                    <el-form-item prop="position" style="width:240px;">
                      <el-input  v-model="workForm.position" style="width: 100%;"></el-input>
                    </el-form-item>

                </el-form-item>
                </div>
            </div>

            <div style="width:90%;height:60px;margin: auto;margin-top:30px;padding: 0px 0px 30px 0px">
              <div style="width:20%;height:50px;margin:auto;">
                <el-button @click="workCancel()">取消</el-button>
                <el-button type="primary" @click="workSave()">保存</el-button>
              </div>
            </div>
          </el-form>
        </div>

    </div>

<!--      奖罚记录-->
      <div style="border-left:3px solid blue;margin-top:20px;">
        <h3>
          <span style="margin-left:10px;">奖罚记录</span>
        </h3>
      </div>
      <div class="information">
        <h3 style="color: #085fc3;font-size: 14px;margin-left: 10px;display: inline-block;">荣誉与奖励<i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe604;</i></h3>
        <div style="width:830px;border-top:1px solid silver;display: inline-block;margin-left: 7px;margin-bottom: 5px;"></div>
        <h3 v-show="honorsButton" style="color: #085fc3;font-size: 14px;position: relative;margin-left: 5px;display: inline-block;"><el-button type="text" @click="addhonorsButton()"><i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe613;</i>添加</el-button></h3>
      </div>

      <div style="width: 100%;margin-top: 20px;">

        <div style="width:98%;height:80px;border: 1px dotted silver;margin: auto" v-show="addHonors">
          <div style="margin: auto;width:120px;height: 80px;line-height: 80px">
            <el-button type="text" @click="addHonorss()"><i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe613;</i>添加&nbsp;&nbsp; 荣誉与奖励</el-button>
          </div>
        </div>

        <div v-for="(obj,index) in honorsAll" style="width:100%;position: relative;margin-top: 20px;" v-show="honorsShow">
          <div class="information_text">
            <ul style="list-style-type: none; ">
              <li>
                <label>荣誉/奖项名称</label>
                <p>{{obj.honors_name}}</p>
              </li>
              <li>
                <label>奖励日期</label>
                <p>{{obj.honors_time}}</p>
              </li>
              <li>
                <label>颁发单位名称</label>
                <p>{{obj.issuing_name}}</p>
              </li>
              <li>
                <label>备注</label>
                <p>{{obj.remarks}}</p>
              </li>

            </ul>
          </div>
          <div style="position: absolute;right: 6px;top:-5px">
            <el-button type="text" style="color: #085fc3;" @click="honorsEditor(index)">编辑</el-button>
            <el-button type="text" style="color: red;" @click="honorsDelete(index)">删除</el-button>
          </div><br/>
        </div>

        <div class="information_from" v-show="honorsInput">
          <el-form style="width: 90%;margin: auto; " :rules="rules" ref="honorsForm" :model="honorsForm">
            <br/>
            <div style="display: inline-block;margin:20px 0px 0px 50px">
              <el-form-item label="荣誉/奖项名称:" prop="honors_name" >
              <el-input v-model="honorsForm.honors_name" style="width:240px;"></el-input>
            </el-form-item><br>

              <el-form-item label="颁发单位名称：" class="el-form-item" >
                <el-col :span="11">
                  <el-form-item prop="issuing_name" style="width:240px;">
                    <el-input   v-model="honorsForm.issuing_name" style="width: 100%;"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item><br>

            </div>

            <div style="display: inline-block;position: absolute;top:20px;right:150px">
              <br>
              <el-form-item label="奖励日期:" >
                <el-col :span="11">
                  <el-form-item prop="honors_time" style="width:240px;">
                    <el-date-picker type="date" placeholder="选择日期" v-model="honorsForm.honors_time" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item><br>


              <div style="float: right">
                <el-form-item label="备注：" >

                  <el-form-item prop="remarks" style="width:240px;">
                    <el-input type="textarea"  v-model="honorsForm.remarks" style="width: 100%;"></el-input>
                  </el-form-item>

                </el-form-item>
              </div>
            </div>


            <div style="width:90%;height:60px;margin: auto;margin-top:30px;padding: 0px 0px 30px 0px">
              <div style="width:20%;height:50px;margin:auto;">
                <el-button @click="honorsCancel()">取消</el-button>
                <el-button type="primary" @click="honorsSave()">保存</el-button>
              </div>
            </div>
          </el-form>
        </div>

      </div>

      <!--      惩罚-->
      <div class="information">
        <h3 style="color: #085fc3;font-size: 14px;margin-left: 10px;display: inline-block;">惩罚<i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe604;</i></h3>
        <div style="width:870px;border-top:1px solid silver;display: inline-block;margin-left: 7px;margin-bottom: 5px;"></div>
        <h3 v-show="punishmentButton" style="color: #085fc3;font-size: 14px;position: relative;margin-left: 5px;display: inline-block;"><el-button type="text" @click="addpunishmentButton()"><i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe613;</i>添加</el-button></h3>
      </div>

      <div style="width: 100%;margin-top: 20px;">

        <div  style="width:98%;height:80px;border: 1px dotted silver;margin: auto" v-show="addPunishment">
          <div style="margin: auto;width:120px;height: 80px;line-height: 80px">
            <el-button type="text" @click="addPunishments()"><i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe613;</i>添加&nbsp;&nbsp; 惩罚</el-button>
          </div>
        </div>

        <div v-for="(obj,index) in punishmentAll" style="width:100%;position: relative;margin-top: 20px;" v-show="punishmentShow">
          <div class="information_text">
            <ul style="list-style-type: none; ">
              <li>
                <label>惩罚类型</label>
                <p>{{obj.punishment_type}}</p>
              </li>
              <li>
                <label>惩罚原因</label>
                <p>{{obj.punishment_reason}}</p>
              </li>
              <li>
                <label>惩罚单位</label>
                <p>{{obj.punishment_unit}}</p>
              </li>
              <li>
                <label>是否撤销</label>
                <p>{{obj.is_whether}}</p>
              </li>
              <li>
                <label>备注</label>
                <p>{{obj.punishment_remarks}}</p>
              </li>
            </ul>
          </div>
          <div style="position: absolute;right: 6px;top:-5px">
            <el-button type="text" style="color: #085fc3;" @click="punishmentEditor(index)">编辑</el-button>
            <el-button type="text" style="color: red;" @click="punishmentDelete(index)">删除</el-button>
          </div><br/>
        </div>

        <div class="information_from" v-show="punishmentInput">
          <el-form style="width: 90%;margin: auto; " :rules="rules" ref="punishmentForm" :model="punishmentForm">
            <br/>
            <div style="display: inline-block;margin:20px 0px 0px 50px">
              <el-form-item label="惩罚类型:" prop="punishment_type">
                <el-select v-model="punishmentForm.punishment_type" placeholder="请选择惩罚类型" style="width: 240px;">
                  <el-option label="警告" value="警告"></el-option>
                  <el-option label="记过" value="记过"></el-option>
                  <el-option label="记大过" value="记大过"></el-option>
                  <el-option label="降职" value="降职"></el-option>
                  <el-option label="辞退" value="辞退"></el-option>
                </el-select>
              </el-form-item><br>

              <el-form-item label="惩罚单位：" class="el-form-item" >
                <el-col :span="11">
                  <el-form-item prop="punishment_unit" style="width:240px;">
                    <el-input   v-model="punishmentForm.punishment_unit" style="width: 100%;"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item><br>

              <el-form-item label="惩罚备注：" >
                <el-form-item prop="punishment_remarks" style="width:240px;">
                  <el-input type="textarea"  v-model="punishmentForm.punishment_remarks" style="width: 100%;"></el-input>
                </el-form-item>

              </el-form-item>

            </div>

            <div style="display: inline-block;position: absolute;top:20px;right:150px">
              <br>
              <div style="float: right">

                <el-form-item label="惩罚原因：" >
                  <el-form-item prop="punishment_reason" style="width:240px;">
                    <el-input   v-model="punishmentForm.punishment_reason" style="width: 100%;"></el-input>
                  </el-form-item>

                </el-form-item>

                <el-form-item label="是否撤销：" >
                  <el-radio-group v-model="punishmentForm.is_whether" style="position: absolute;left:2px;">
                    <el-radio label="是"></el-radio>
                    <el-radio label="否"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>


            <div style="width:90%;height:60px;margin: auto;margin-top:30px;padding: 0px 0px 30px 0px">
              <div style="width:20%;height:50px;margin:auto;">
                <el-button @click="punishmentCancel()">取消</el-button>
                <el-button type="primary" @click="punishmentSave()">保存</el-button>
              </div>
            </div>
          </el-form>
        </div>

      </div>


      <!--      教育经历-->
      <div style="border-left:3px solid blue;margin-top: 20px;">
        <h3>
          <span style="margin-left:10px;">教育经历</span>
        </h3>
      </div>

      <!--      教育经历-->
      <div class="information">
        <h3 style="color: #085fc3;font-size: 14px;margin-left: 10px;display: inline-block;">教育经历<i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe604;</i></h3>
        <div style="width:840px;border-top:1px solid silver;display: inline-block;margin-left: 7px;margin-bottom: 5px;"></div>
        <h3 v-show="educationalButton" style="color: #085fc3;font-size: 14px;position: relative;margin-left: 10px;display: inline-block;"><el-button type="text" @click="addeducationalButton()"><i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe613;</i>添加</el-button></h3>
      </div>

      <div style="width: 100%;margin-top: 20px;">

        <div style="width:98%;height:80px;border: 1px dotted silver;margin: auto" v-show="addEducational">
          <div style="margin: auto;width:120px;height: 80px;line-height: 80px">
            <el-button type="text" @click="addeducationals()"><i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe613;</i>添加&nbsp;&nbsp;教育经历</el-button>
          </div>
        </div>

        <div v-for="(obj,index) in educationalAll" style="width:100%;position: relative;margin-top: 20px;" v-show="educationalShow">
          <div class="information_text">
            <ul style="list-style-type: none; ">
              <li>
                <label>开始时间</label>
                <p>{{obj. start_time}}</p>
              </li>
              <li>
                <label>结束时间</label>
                <p>{{obj.end_time}}</p>
              </li>
              <li>
                <label>学校名称</label>
                <p>{{obj.school_name}}</p>
              </li>
              <li>
                <label>备注</label>
                <p>{{obj.educational_remarks}}</p>
              </li>
            </ul>
          </div>
          <div style="position: absolute;right: 6px;top:-5px">
            <el-button type="text" style="color: #085fc3;" @click="educationalEditor(index)">编辑</el-button>
            <el-button type="text" style="color: red;" @click="educationalDelete(index)">删除</el-button>
          </div>
        </div><br/>

        <div class="information_from" v-show="educationalInput">
          <el-form style="width: 90%;margin: auto; " :rules="rules" ref="educationalForm" :model="educationalForm">
            <br/>
            <div style="display: inline-block;margin:20px 0px 0px 50px">
              <el-form-item label="开始时间:" required >
                <el-col :span="11" >
                  <el-form-item prop="start_time" style="width:240px;">
                    <el-date-picker type="date" placeholder="选择日期" v-model="educationalForm.start_time" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item><br>

              <el-form-item label="学校名称：" class="el-form-item" >
                <el-col :span="11">
                  <el-form-item prop="school_name" style="width:240px;">
                    <el-input   v-model="educationalForm.school_name" style="width: 100%;"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item><br>


            </div>

            <div style="display: inline-block;position: absolute;top:20px;right:150px">
              <br>
              <el-form-item label="结束时间:" required >
                <el-col :span="11">
                  <el-form-item prop="end_time" style="width:240px;">
                    <el-date-picker type="date" placeholder="选择日期" v-model="educationalForm.end_time" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item><br>


              <div style="float: right">
                <el-form-item label="备注：" >
                  <el-col :span="11">
                    <el-form-item prop="educational_remarks" style="width:240px;">
                      <el-input type="textarea" v-model="educationalForm.educational_remarks" style="width: 100%;"></el-input>
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </div>
            </div>


            <div style="width:90%;height:60px;margin: auto;margin-top:30px;padding: 0px 0px 30px 0px">
              <div style="width:20%;height:50px;margin:auto;">
                <el-button @click="educationalCancel()">取消</el-button>
                <el-button type="primary" @click="educationalSave()">保存</el-button>
              </div>
            </div>
          </el-form>
        </div>

      </div>


      <!--      离职信息-->
      <div style="border-left:3px solid blue;margin-top: 20px; ">
        <h3>
          <span style="margin-left:10px;">离职信息</span>
        </h3>
      </div>

      <!--      离职信息-->
      <div class="information">
        <h3 style="color: #085fc3;font-size: 14px;margin-left: 10px;display: inline-block;">离职信息<i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe604;</i></h3>
        <div style="width:845px;border-top:1px solid silver;display: inline-block;margin-left: 7px;margin-bottom: 5px;"></div>
        <h3 v-show="departureButton" style="color: #085fc3;font-size: 14px;position: relative;margin-left: 5px;display: inline-block;"><el-button type="text" @click="lzbj=!lzbj,lzhs=!lzhs,lzwhite=!lzwhite"><i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe600;</i>编辑</el-button></h3>
      </div>

      <div style="width: 100%;margin-top: 20px;">


        <div style="width:100%;position: relative;margin-top: 20px;" v-show="departureShow">
          <div class="information_text">
            <ul style="list-style-type: none; ">
              <li>
                <label>员工状态</label>
                <p></p>
              </li>
              <li>
                <label>离职原因</label>
                <p>23</p>
              </li>
              <li>
                <label>离职时间</label>
                <p></p>
              </li>
              <li>
                <label>薪资结算日期</label>
                <p></p>
              </li>
              <li>
                <label>备注</label>
                <p></p>
              </li>

            </ul>
          </div>

        </div>

        <div class="information_from" v-show="lzhs">
          <el-form style="width: 90%;margin: auto; " :rules="rules" ref="departureForm" :model="departureForm">
            <br/>
            <div style="display: inline-block;margin:20px 0px 0px 50px">
              <el-form-item label="离职原因:" prop="reasons" >
                <el-select
                    v-model="departureForm.reasons"
                    placeholder="请选择" style="width:240px">
                  <el-option label="家庭原因" value="jtyy"></el-option>
                  <el-option label="实习生返校" value="sxsfx"></el-option>
                  <el-option label="回校深造" value="hxsz"></el-option>
                  <el-option label="交通不便" value="jtbb"></el-option>
                  <el-option label="身体健康因素" value="stjkys"></el-option>
                  <el-option label="薪资原因" value="xzyy"></el-option>
                  <el-option label="福利原因" value="flyy"></el-option>
                  <el-option label="个人发展原因" value="grfzyy"></el-option>
                  <el-option label="人际关系不融洽" value="rjgxyy"></el-option>
                  <el-option label="工作环境不适应" value="gzhjbsy"></el-option>
                  <el-option label="团队气氛不适应" value="tdqfbsy"></el-option>
                  <el-option label="企业文化不适应" value="qyehbsy"></el-option>
                  <el-option label="工作职责及目标不明确" value="gzzejmbbmq"></el-option>
                  <el-option label="未得到充分的支持和授权" value="wddcfdzchsq"></el-option>
                  <el-option label="其它" value="qt"></el-option>
                </el-select>
              </el-form-item>
              <br>

              <el-form-item label="薪酬结算日期:" required >
                <el-col :span="11">
                  <el-form-item prop="gotobi" style="width:240px;">
                    <el-date-picker type="date" placeholder="选择日期" v-model="departureForm.gotobi" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item><br>


            </div>

            <div style="display: inline-block;position: absolute;top:20px;right:150px">
              <br>
              <el-form-item label="离职时间:" required >
                <el-col :span="11">
                  <el-form-item prop="date2" style="width:240px;">
                    <el-date-picker type="date" placeholder="选择日期" v-model="departureForm.date2" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item><br>


              <el-form-item label="备注：" style="position: absolute;left:28px;">
                <el-col :span="11">
                  <el-form-item prop="departure_remarks" style="width:240px;">
                    <el-input type="textarea" v-model="departureForm.departure_remarks" style="width: 100%;"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </div>


            <div style="width:90%;height:60px;margin: auto;margin-top:30px;padding: 0px 0px 30px 0px">
              <div style="width:20%;height:50px;margin:auto;">
                <el-button @click="lzwhite=!lzwhite,lzhs=!lzhs,lzbj=!lzbj">取消</el-button>
                <el-button type="primary" @click="lzwhite=!lzwhite,lzhs=!lzhs,lzbj=!lzbj ">保存</el-button>
              </div>
            </div>
          </el-form>
        </div>

      </div>


    </div>
  </div>

<!--  //工作经历编辑弹框-->
  <div style="background: #99a9bf">
    <el-dialog
        v-model=" workbecome"
        title="编辑工作经历"
        width="50%"
        :close-on-click-modal="false"
    >
      <el-form style="width: 90%;margin: auto; " :rules="rules" ref="workForm" :model="workForm">
        <br/>
        <div style="display: inline-block;margin:0px 0px 0px -10px">
          <el-form-item label="开始时间:" required >
            <el-col :span="11" >
              <el-form-item prop="start_time" style="width:240px;">
                <el-date-picker type="date" placeholder="选择日期" v-model="workForm.start_time" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item><br>

          <el-form-item label="任职公司：" class="el-form-item" >
            <el-col :span="11">
              <el-form-item prop="company" style="width:240px;">
                <el-input   v-model="workForm.company" style="width: 100%;"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item><br>

          <el-form-item label="离职原因：" >
            <el-col :span="11">
              <el-form-item prop="reasons" style="width:240px;">
                <el-input type="textarea" v-model="workForm.reasons" style="width: 100%;"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </div>

        <div style="display: inline-block;position: absolute;top:82px;right:50px">
          <br>
          <el-form-item label="结束时间:" required >
            <el-col :span="11">
              <el-form-item prop="end_time" style="width:240px;">
                <el-date-picker type="date" placeholder="选择日期" v-model="workForm.end_time" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item><br>


          <div style="float: right">
            <el-form-item label="职位：" >

              <el-form-item prop="position" style="width:240px;">
                <el-input  v-model="workForm.position" style="width: 100%;"></el-input>
              </el-form-item>

            </el-form-item>
          </div>
        </div>

        <div style="width:90%;height:60px;margin: auto;margin-top:30px;padding: 0px 0px 30px 0px">
          <div style="width:30%;height:50px;margin:auto;">
            <el-button @click="workbecome=false">取消</el-button>
            <el-button type="primary" @click="workSave()">保存</el-button>
          </div>
        </div>
      </el-form>

    </el-dialog>


  </div>



<!--  //荣誉与奖励编辑弹框-->
  <div style="background: #99a9bf">
    <el-dialog
        v-model="honorsbecome"
        title="编辑荣誉与奖励"
        width="50%"
        :close-on-click-modal="false"
    >
      <el-form style="width: 90%;margin: auto; " :rules="rules" ref="honorsForm" :model="honorsForm">
        <br/>
        <div style="display: inline-block;margin:0px 0px 0px -10px">
          <el-form-item label="荣誉/奖项名称:" prop="honors_name" >
            <el-input v-model="honorsForm.honors_name" style="width:240px;"></el-input>
          </el-form-item><br>

          <el-form-item label="颁发单位名称：" class="el-form-item" >
            <el-col :span="11">
              <el-form-item prop="issuing_name" style="width:240px;">
                <el-input   v-model="honorsForm.issuing_name" style="width: 100%;"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item><br>

        </div>

        <div style="display: inline-block;position: absolute;top:82px;right:50px">
          <br>
          <el-form-item label="奖励日期:" >
            <el-col :span="11">
              <el-form-item prop="honors_time" style="width:240px;">
                <el-date-picker type="date" placeholder="选择日期" v-model="honorsForm.honors_time" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item><br>


          <div style="float: right">
            <el-form-item label="备注：" >

              <el-form-item prop="remarks" style="width:240px;">
                <el-input type="textarea"  v-model="honorsForm.remarks" style="width: 100%;"></el-input>
              </el-form-item>

            </el-form-item>
          </div>
        </div>


        <div style="width:90%;height:60px;margin: auto;margin-top:30px;padding: 0px 0px 30px 0px">
          <div style="width:30%;height:50px;margin:auto;">
            <el-button @click="honorsbecome=false">取消</el-button>
            <el-button type="primary" @click="honorsSave()">保存</el-button>
          </div>
        </div>
      </el-form>

    </el-dialog>


  </div>




  <!--  //惩罚编辑弹框-->
  <div style="background: #99a9bf">
    <el-dialog
        v-model="punishmentbecome"
        title="编辑惩罚"
        width="50%"
        :close-on-click-modal="false"
    >
      <el-form style="width: 90%;margin: auto; " :rules="rules" ref="punishmentForm" :model="punishmentForm">
        <br/>
        <div style="display: inline-block;margin:0px 0px 0px -10px">
          <el-form-item label="惩罚类型:" prop="punishment_type">
            <el-select v-model="punishmentForm.punishment_type" placeholder="请选择惩罚类型" style="width: 240px;">
              <el-option label="警告" value="警告"></el-option>
              <el-option label="记过" value="记过"></el-option>
              <el-option label="记大过" value="记大过"></el-option>
              <el-option label="降职" value="降职"></el-option>
              <el-option label="辞退" value="辞退"></el-option>
            </el-select>
          </el-form-item><br>

          <el-form-item label="惩罚单位：" class="el-form-item" >
            <el-col :span="11">
              <el-form-item prop="punishment_unit" style="width:240px;">
                <el-input   v-model="punishmentForm.punishment_unit" style="width: 100%;"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item><br>

          <el-form-item label="惩罚备注：" >
            <el-form-item prop="punishment_remarks" style="width:240px;">
              <el-input type="textarea"  v-model="punishmentForm.punishment_remarks" style="width: 100%;"></el-input>
            </el-form-item>

          </el-form-item>

        </div>

        <div style="display: inline-block;position: absolute;top:82px;right:50px">
          <br>
          <div style="float: right">

            <el-form-item label="惩罚原因：" >
              <el-form-item prop="punishment_reason" style="width:240px;">
                <el-input   v-model="punishmentForm.punishment_reason" style="width: 100%;"></el-input>
              </el-form-item>

            </el-form-item><br/>

            <el-form-item label="是否撤销：" >
              <el-radio-group v-model="punishmentForm.is_whether" style="position: absolute;left:2px;">
                <el-radio label="是"></el-radio>
                <el-radio label="否"></el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>


        <div style="width:90%;height:60px;margin: auto;margin-top:30px;padding: 0px 0px 30px 0px">
          <div style="width:30%;height:50px;margin:auto;">
            <el-button @click="punishmentCancel()">取消</el-button>
            <el-button type="primary" @click="punishmentSave()">保存</el-button>
          </div>
        </div>
      </el-form>

    </el-dialog>


  </div>



  <!--  //教育经历编辑弹框-->
  <div style="background: #99a9bf">
    <el-dialog
        v-model="educationalbecome"
        title="编辑教育经历"
        width="50%"
        :close-on-click-modal="false"
    >
      <el-form style="width: 90%;margin: auto; " :rules="rules" ref="educationalForm" :model="educationalForm">
        <br/>
        <div style="display: inline-block;margin:0px 0px 0px -10px">
          <el-form-item label="开始时间:" required >
            <el-col :span="11" >
              <el-form-item prop="start_time" style="width:240px;">
                <el-date-picker type="date" placeholder="选择日期" v-model="educationalForm.start_time" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item><br>

          <el-form-item label="学校名称：" class="el-form-item" >
            <el-col :span="11">
              <el-form-item prop="school_name" style="width:240px;">
                <el-input   v-model="educationalForm.school_name" style="width: 100%;"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item><br>


        </div>

        <div style="display: inline-block;position: absolute;top:82px;right:50px">
          <br>
          <el-form-item label="结束时间:" required >
            <el-col :span="11">
              <el-form-item prop="end_time" style="width:240px;">
                <el-date-picker type="date" placeholder="选择日期" v-model="educationalForm.end_time" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item><br>


          <div style="float: right">
            <el-form-item label="备注：" >
              <el-col :span="11">
                <el-form-item prop="educational_remarks" style="width:240px;">
                  <el-input type="textarea" v-model="educationalForm.educational_remarks" style="width: 100%;"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
          </div>
        </div>


        <div style="width:90%;height:60px;margin: auto;margin-top:30px;padding: 0px 0px 30px 0px">
          <div style="width:30%;height:50px;margin:auto;">
            <el-button @click="educationalbecome=false">取消</el-button>
            <el-button type="primary" @click="educationalSave()">保存</el-button>
          </div>
        </div>
      </el-form>

    </el-dialog>


  </div>


</template>

<script>
import { defineComponent, ref } from 'vue'

export default {
  data() {
    return {

      workbecome:false,
      honorsbecome:false,
      punishmentbecome:false,
      educationalbecome:false,

      // 工作经历 all
      workAll:[],
      // 荣誉与奖励 all
      honorsAll:[],
      //惩罚
      punishmentAll:[],
      //教育经历
      educationalAll:[],


     //工作经历
      workForm: {
        //开始时间
        start_time:'',
        //任职公司
        company:'',
        //离职原因
        reasons:'',
        //职位
        position:'',
        //结束时间
        end_time:'',

      },
      rules: {
        start_time: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        end_time: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
      },

      //工作经历右上角的添加按钮
      workerButton:false,
      //添加 工作经历
      addWork:true,
      //显示工作经历信息
      workShow:false,
      //显示编辑的input表单
      workInput:false,

      //荣誉与奖励
      honorsForm:{
        //荣誉与奖励名称
        honors_name:'',
        //颁发单位名称
        issuing_name:'',
        //奖励日期
        honors_time:'',
        //备注
        remarks:'',
      },

      //荣誉与奖励右上角的添加按钮
      honorsButton:false,
      //添加 荣誉与奖励
      addHonors:true,
      //显示荣誉与奖励信息
      honorsShow:false,
      //显示编辑的input表单
      honorsInput:false,

      //惩罚
      punishmentForm:{
        //惩罚类型
        punishment_type:'',
        //惩罚单位
        punishment_unit:'',
        //惩罚备注
        punishment_remarks:'',
        //惩罚原因
        punishment_reason:'',
        //是否撤销
        is_whether:'',
      },

      //惩罚右上角的添加按钮
      punishmentButton:false,
      //添加 惩罚
      addPunishment:true,
      //显示惩罚信息
      punishmentShow:false,
      //显示编辑的input表单
      punishmentInput:false,

      //教育经历
      educationalForm:{
        //开始时间
        start_time:'',
        //学校名称
        school_name:'',
        //结束时间
        end_time:'',
        //备注
        educational_remarks:'',
      },

      //教育经历右上角的添加按钮
      educationalButton:false,
      //添加 教育经历
      addEducational:true,
      //显示教育经历信息
      educationalShow:false,
      //显示编辑的input表单
      educationalInput:false,

      //离职信息
      departureForm:{
        //离职原因
        reasons:'',
        //薪酬结算日期
        gotobi:'',
        //离职时间
        resignation_time:'',
        //备注
        departure_remarks:'',
      },

      //右上角编辑按钮
      departureButton:true,
      //显示离职信息
      departureShow:true,
      //显示编辑的input表单
      departureInput:false,


    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 添加 工作经历
    addWorks(){
      this.workInput=true // 显示灰色 表单
      this.addWork=false // 隐藏 添加工作经历
    },

    // 工作经历表单取消按钮
    workCancel(){

      if(this.workAll.length==0){ // 没有工作经历信息时
        this.addWork=true // 显示 添加工作经历
      }

      this.workInput=false // 隐藏灰色 表单

      // 清空表单数据  this.xxx=null or =""
      this.workForm.start_time="";
      this.company="";
      this.reasons="";
      this.position="";
      this.end_time="";
    },

    // 工作经历表单保存按钮
    workSave(){
      // 取表单数据
      let form = {
        //获取开始时间
        start_time:this.workForm.start_time,
        //获取任职公司
        company:this.workForm.company,
        //获取离职原因
        reasons:this.workForm.reasons,
        //获取职位
        position:this.workForm.position,
        //获取结束时间
        end_time:this.workForm.end_time,
      }
      // 向数组里面添加 表单数据
      this.workAll.push(form)

      this.workInput=false // 隐藏灰色 表单
      this.workShow=true // 显示所有工作经历信息
      this.workerButton=true // 显示右上角添加按钮

      // 清空表单数据  this.xxx=null or =""
      //清空开始时间
      this.workForm.start_time="";
      //清空任职公司
      this.workForm.company="";
      //清空离职原因
      this.workForm.reasons="";
      //清空职位
      this.workForm.position="";
      //清空结束时间
      this.workForm.end_time="";
    },

    // 右上角的添加按钮
    addButton(){
      this.workInput=true // 显示灰色 表单
    },

    // 工作经历编辑按钮
    workEditor(i){
       this.workbecome=true,
           // alert(123)

      this.workForm.start_time=this.workAll[i].start_time
      this.workForm.company=this.workAll[i].company
      this.workForm.reasons=this.workAll[i].reasons
      this.workForm.position=this.workAll[i].position
      this.workForm.end_time=this.workAll[i].end_time

    },

    // 工作经历删除按钮
     workDelete(i){
      /*
       splice（i,n） : 按照下标删除数组里的元素 从i开始删除n个元素
       i: 下标
       n: 删除个数
       */

      this.workAll.splice(i,1)
       // 当工作经历信息删除为空时(数组长度为0时)
       if(this.workAll.length==0){
         this.addWork=true // 添加工作经历按钮显示
         this.workerButton=false // 右上角添加按钮隐藏
       }
     },






    // 添加 荣誉与奖励
    addHonorss(){
      this.honorsInput=true // 显示灰色 表单
      this.addHonors=false // 隐藏 添加工作经历
    },

    // 荣誉与奖励表单取消按钮
    honorsCancel(){

      if(this.honorsAll.length==0){ // 没有工作经历信息时
        this.addHonors=true // 显示 添加工作经历
      }

      this.honorsInput=false // 隐藏灰色 表单

      // 清空表单数据  this.xxx=null or =""
      //清空荣誉与奖励名称
      this.honorsForm.honors_name="";
      //清空颁发单位名称
      this.honorsForm.issuing_name="";
      //清空奖励日期
      this.honorsForm.honors_time="";
      //清空备注
      this.honorsForm.remarks="";

    },

    // 荣誉与奖励表单保存按钮
    honorsSave(){
      // 取表单数据
      let formhonor = {
        //获取荣誉与奖励名称
        honors_name:this.honorsForm.honors_name,
        //获取颁发单位名称
        issuing_name:this.honorsForm.issuing_name,
        //获取奖励日期
        honors_time:this.honorsForm.honors_time,
        //获取备注
        remarks: this.honorsForm.remarks,
      }
      // 向数组里面添加 表单数据
      this.honorsAll.push(formhonor)

      this.honorsInput=false // 隐藏灰色 表单
      this.honorsShow=true // 显示所有荣誉与奖励信息
      this.honorsButton=true // 显示右上角添加按钮

      // 清空表单数据  this.xxx=null or =""
      //清空荣誉与奖励名称
      this.honorsForm.honors_name="";
      //清空颁发单位名称
      this.honorsForm.issuing_name="";
      //清空奖励日期
      this.honorsForm.honors_time="";
      //清空备注
      this.honorsForm.remarks="";
    },

    // 右上角的添加按钮
    addhonorsButton(){
      this.honorsInput=true // 显示灰色 表单

    },

    // 荣誉与奖励编辑按钮
    honorsEditor(i){
      this.honorsbecome=true

      //编辑荣誉与奖励名称
      this.honorsForm.honors_name=this.honorsAll[i].honors_name;
      //编辑颁发单位名称
      this.honorsForm.issuing_name=this.honorsAll[i].issuing_name;
      //编辑奖励日期
      this.honorsForm.honors_time=this.honorsAll[i].honors_time;
      //编辑备注
      this.honorsForm.remarks=this.honorsAll[i].remarks;

    },

    // 工作经历删除按钮
    honorsDelete(i){
      /*
       splice（i,n） : 按照下标删除数组里的元素 从i开始删除n个元素
       i: 下标
       n: 删除个数
       */

      this.honorsAll.splice(i,1)
      // 当工作经历信息删除为空时(数组长度为0时)
      if(this.honorsAll.length==0){
        this.addHonors=true // 添加工作经历按钮显示
        this.honorsButton=false // 右上角添加按钮隐藏
      }
    },






    // 添加 惩罚
    addPunishments(){
      this.punishmentInput=true // 显示灰色 表单
      this.addPunishment=false // 隐藏 添加惩罚
    },

    // 惩罚表单取消按钮
    punishmentCancel(){

      if(this.punishmentAll.length==0){ // 没有惩罚信息时
        this.addPunishment=true // 显示 添加惩罚
      }

      this.punishmentInput=false // 隐藏灰色 表单

      // 清空表单数据  this.xxx=null or =""

      //清空惩罚类型
      this.punishmentForm.punishment_type="";
      //清空惩罚单位
      this.punishmentForm.punishment_unit="";
      //清空惩罚备注
      this.punishmentForm.punishment_remarks="";
      //清空惩罚原因
      this.punishmentForm.punishment_reason="";
      //清空是否撤销
      this.punishmentForm.is_whether="";

    },

    // 惩罚表单保存按钮
    punishmentSave(){
      // 取表单数据
      let formpunish = {
        //获取惩罚类型
        punishment_type:this.punishmentForm.punishment_type,
        //获取惩罚单位
        punishment_unit:this.punishmentForm.punishment_unit,
        //获取惩罚备注
        punishment_remarks:this.punishmentForm.punishment_remarks,
        //获取惩罚原因
        punishment_reason:this.punishmentForm.punishment_reason,
        //获取是否撤销
        is_whether:this.punishmentForm.is_whether,

      }
      // 向数组里面添加 表单数据
      this.punishmentAll.push(formpunish)

      this.punishmentInput=false // 隐藏灰色 表单
      this.punishmentShow=true // 显示所有荣誉与奖励信息
      this.punishmentButton=true // 显示右上角添加按钮

      // 清空表单数据  this.xxx=null or =""
      //清空惩罚类型
      this.punishmentForm.punishment_type="";
      //清空惩罚单位
      this.punishmentForm.punishment_unit="";
      //清空惩罚备注
      this.punishmentForm.punishment_remarks="";
      //清空惩罚原因
      this.punishmentForm.punishment_reason="";
      //清空是否撤销
      this.punishmentForm.is_whether="";
    },

    // 右上角的添加按钮
    addpunishmentButton(){
      this.punishmentInput=true // 显示灰色 表单
    },

    // 荣誉与奖励编辑按钮
    punishmentEditor(i){
      this.punishmentbecome=true,
      // alert( this.gzjlall[i] )
       // 编辑惩罚类型
       this.punishmentForm.punishment_type=this.punishmentAll[i].punishment_type;
      //编辑惩罚单位
      this.punishmentForm.punishment_unit=this.punishmentAll[i].punishment_unit;
      //编辑惩罚备注
      this.punishmentForm.punishment_remarks=this.punishmentAll[i].punishment_remarks;
      //编辑惩罚原因
      this.punishmentForm.punishment_reason=this.punishmentAll[i].punishment_reason;
      //编辑是否撤销
      this.punishmentForm.is_whether=this.punishmentAll[i].is_whether;
    },

    // 工作经历删除按钮
    punishmentDelete(i){
      /*
       splice（i,n） : 按照下标删除数组里的元素 从i开始删除n个元素
       i: 下标
       n: 删除个数
       */

      this.punishmentAll.splice(i,1)
      // 当工作经历信息删除为空时(数组长度为0时)
      if(this.punishmentAll.length==0){
        this.addPunishment=true // 添加工作经历按钮显示
        this.punishmentButton=false // 右上角添加按钮隐藏
      }
    },





    // 添加 教育经历
    addeducationals(){
      this.educationalInput=true // 显示灰色 表单
      this.addEducational=false // 隐藏 添加工作经历
    },

    // 教育经历表单取消按钮
    educationalCancel(){

      if(this.educationalAll.length==0){ // 没有教育经历信息时
        this.addEducational=true // 显示 添加教育经历
      }

      this.educationalInput=false // 隐藏灰色 表单

      // 清空表单数据  this.xxx=null or =""

      //清空开始时间
      this.educationalForm.start_time="";
      //清空学校名称
      this.educationalForm.school_name="";
      //清空结束时间
      this.educationalForm.end_time="";
      //清空备注
      this.educationalForm.educational_remarks="";


    },

    // 教育经历表单保存按钮
    educationalSave(){
      // 取表单数据
      let formeducat = {
        //获取开始时间
        start_time:this.educationalForm.start_time,
        //获取学校名称
        school_name:this.educationalForm.school_name,
        //获取结束时间
        end_time:this.educationalForm.end_time,
        //获取备注
        educational_remarks:this.educationalForm.educational_remarks,

      }
      // 向数组里面添加 表单数据
      this.educationalAll.push(formeducat)

      this.educationalInput=false // 隐藏灰色 表单
      this.educationalShow=true // 显示所有教育经历信息
      this.educationalButton=true // 显示右上角添加按钮

      // 清空表单数据  this.xxx=null or =""
      //清空开始时间
      this.educationalForm.start_time="";
      //清空学校名称
      this.educationalForm.school_name="";
      //清空结束时间
      this.educationalForm.end_time="";
      //清空备注
      this.educationalForm.educational_remarks="";

    },

    // 右上角的添加按钮
    addeducationalButton(){
      this.educationalInput=true // 显示灰色 表单
    },

    // 教育经历编辑按钮
    educationalEditor(i){
      this.educationalbecome=true,
      // alert( this.gzjlall[i] )

      //编辑开始时间
      this.educationalForm.start_time=this.educationalAll[i].start_time;
      //编辑学校名称
      this.educationalForm.school_name=this.educationalAll[i].school_name;
      //编辑结束时间
      this.educationalForm.end_time=this.educationalAll[i].end_time;
      //编辑备注
      this.educationalForm.educational_remarks=this.educationalAll[i].educational_remarks;

    },

    // 教育经历删除按钮
    educationalDelete(i){
      /*
       splice（i,n） : 按照下标删除数组里的元素 从i开始删除n个元素
       i: 下标
       n: 删除个数
       */

      this.educationalAll.splice(i,1)
      // 当教育经历信息删除为空时(数组长度为0时)
      if(this.educationalAll.length==0){
        this.addEducational=true // 添加工作经历按钮显示
        this.educationalButton=false // 右上角添加按钮隐藏
      }
    }



  },

}
</script>

<style scoped>
/*@import url("../../css/EditingStaff.css");*/
  .basicfile_big{
    width:100%;
    /*border:1px solid red;*/
    margin-top:20px;
    margin: auto;
  }
  .basicfile_big_auto{
    width:80%;
    /*border:1px solid yellow;*/
    margin: auto;
  }
  .information{
    position: relative;
    margin-top: 10px;
    width:100%;
    margin: auto;
  }
  .information_text{
    width:850px;
    margin: 0px auto;
    /*background: darkorange;*/
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
  }

  .information_from{
    width:100%;
    background: #e8edf2;
    position: relative;

  }

  .information_ul li{
    display: inline-block;
    width:50%;
    padding: 20px 65px 0px;
    text-align: right;

  }

  .information_ul li label{
    /*width:100px;*/
    text-align: right;
    vertical-align: middle;
    position: relative;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    /*padding: 0 24px 0 0;*/
    box-sizing: border-box;
  }

  .information_ul{
    list-style-type: none;
  }
  .information_input{
    width:240px;
    display: inline-block;
  }
  .el-form-item{
    text-align: right;
  }

</style>