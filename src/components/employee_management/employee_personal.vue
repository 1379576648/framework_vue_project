<template>
  <div class="basicfile_big">
    <div class="basicfile_big_auto">

      <!--      工作经验-->
      <div>
        <h3>
          <span style="margin-left:10px;">工作经验</span>
        </h3>
      </div>

      <!--      工作经历-->
      <div class="information">
        <h3 style="color: #085fc3;font-size: 14px;margin-left: 10px;display: inline-block;">工作经历<i class="iconfont"
                                                                                                   style="color: #085fc3;margin-right:2px;">&#xe604;</i>
        </h3>
        <div
            style="width:840px;border-top:1px solid silver;display: inline-block;margin-left: 7px;margin-bottom: 5px;"></div>
        <h3 v-show="jianjia"
            style="color: #085fc3;font-size: 14px;position: relative;margin-left: 10px;display: inline-block;">
          <el-button type="text" @click="addwork2(),this.workupdateinsert='新增'"><i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe613;</i>添加</el-button>
        </h3>
      </div>

      <div style="width: 100%;margin-top: 20px;">
        <!--  添加按钮   -->
        <div style="width:98%;height:80px;border: 1px dotted silver;margin: auto" v-show="tianjiagzjl">
          <div style="margin: auto;width:120px;height: 80px;line-height: 80px">
            <el-button type="text" @click="clickwork()"><i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe613;</i>添加&nbsp;&nbsp;工作经历
            </el-button>
          </div>
        </div>
        <!--  添加的工作经历  -->
        <div v-for="(obj,index) in tableData"  style="width:100%;position: relative;margin-top: 20px;"  v-show="gzjlwhite">
          <div
               class="information_text">
            <ul style="list-style-type: none; ">
              <li>
                <label>开始时间</label>
                <p>{{obj.workStareTime}}</p>
              </li>
              <li>
                <label>结束时间</label>
                <p>{{obj.workEndTime}}</p>
              </li>
              <li>
                <label>任职公司</label>
                <p>{{ obj.companyName }}</p>
              </li>
              <li>
                <label>职位</label>
                <p>{{obj.positionName}}</p>
              </li>
              <li>
                <label style="margin-left: -438px;">离职原因</label>
                <p>{{obj.positionDescribe}}</p>
              </li>
            </ul>
          </div>
          <div style="position: absolute;right: 6px;top:-5px">
            <el-button type="text" style="color: #085fc3;" @click="redactwork(),selectWorkOne(workExperienceId=this.tableData[index].workExperienceId),this.workupdateinsert='编辑'">编辑</el-button>
            <el-button type="text" style="color: red;" @click="deleteWork(this.tableData[index].workExperienceId)">删除</el-button>
          </div>
        </div>
        <!--  工作经历表单 -->
        <div class="information_from" v-show="gzjlhs">
          <el-form style="width: 90%;margin: auto; " :rules="rules" ref="tableDate" :model="tableDate">
            <br/>
            <div style="display: inline-block;margin:20px 0px 0px 50px">
              <el-form-item label="开始时间:" required style="width:600px;margin-left: -212px;">
                <el-col :span="11">
                  <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="tableDataFive.workStareTime"
                                    style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <br>

              <el-form-item label="任职公司：" class="el-form-item" style="width:240px;margin-left: -212px;">
                <el-col :span="11">
                  <el-form-item prop="rzgs" style="width:240px;">
                    <el-input v-model="tableDataFive.companyName" style="width: 100%;"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <br>

              <el-form-item label="离职原因：" style="width:240px;margin-left: -212px;">
                <el-col :span="11">
                  <el-form-item prop="rzgs" style="width:240px;">
                    <el-input type="textarea" v-model="tableDataFive.positionDescribe" style="width: 100%;"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </div>

            <div style="display: inline-block;position: absolute;top:20px;right:150px">
              <br>
              <el-form-item label="结束时间:" required>
                <el-col :span="11">
                  <el-form-item prop="date2" style="width:240px;">
                    <el-date-picker type="date" placeholder="选择日期" v-model="tableDataFive.workEndTime"
                                    style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <br>

              <div style="float: right">
                <el-form-item label="职位：">

                  <el-form-item prop="rzgs" style="width:240px;">
                    <el-input v-model="tableDataFive.positionName" style="width: 100%;"></el-input>
                  </el-form-item>

                </el-form-item>
              </div>
            </div>

            <div style="width:90%;height:60px;margin: auto;margin-top:30px;padding: 0px 0px 30px 0px">
              <div style="width:20%;height:50px;margin:auto;">
                <el-button @click="callwork(),restWork()">取消</el-button>
                <el-button type="primary" @click="addwork(),updateinsertWork(),restWork()">保存</el-button>
              </div>
            </div>
          </el-form>
        </div>

      </div>

      <!--      奖罚记录-->
      <div style="margin-top:20px;">
        <h3>
          <span style="margin-left:10px;">奖罚记录</span>
        </h3>
      </div>
      <div class="information">
        <h3 style="color: #085fc3;font-size: 14px;margin-left: 10px;display: inline-block;">荣誉与奖励<i class="iconfont"
                                                                                                    style="color: #085fc3;margin-right:2px;">&#xe604;</i>
        </h3>

        <div
            style="width:830px;border-top:1px solid silver;display: inline-block;margin-left: 7px;margin-bottom: 5px;"></div>
        <h3 v-show="jljianjia"
            style="color: #085fc3;font-size: 14px;position: relative;margin-left: 5px;display: inline-block;">
          <!--     小添加按钮-->
          <el-button type="text" @click="addglory2(),this.gloryupdateinsert='新增'"><i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe613;</i>添加</el-button>
        </h3>
      </div>

      <div style="width: 100%;margin-top: 20px;">

        <div style="width:98%;height:80px;border: 1px dotted silver;margin: auto" v-show="tianjiajl">
          <div style="margin: auto;width:120px;height: 80px;line-height: 80px">
            <!-- 大添加荣誉-->
            <el-button type="text" @click="clickglory()"><i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe613;</i>添加&nbsp;&nbsp;
              荣誉与奖励
            </el-button>
          </div>
        </div>
        <!--  添加的荣誉表单 -->
        <div v-for="(obj2,index) in tableDatatwo" style="width:100%;position: relative;margin-top: 20px;" v-show="jlwhite">
          <div class="information_text">
            <ul style="list-style-type: none; ">
              <li>
                <label>荣誉/奖项名称</label>
                <p>{{obj2.gloryName}}</p>
              </li>
              <li>
                <label>奖励日期</label>
                <p>{{obj2.createdTime}}</p>
              </li>
              <li>
                <label>颁发单位名称</label>
                <p>{{ obj2.gloryUnitname }}</p>
              </li>
              <li>
                <label>备注</label>
                <p>{{obj2.gloryRemark}}</p>
              </li>

            </ul>
          </div>
          <div style="position: absolute;right: 6px;top:-5px">
            <el-button type="text" style="color: #085fc3;" @click="redactglory(),selectGloryOne(gloryId=this.tableDatatwo[index].gloryId),this.gloryupdateinsert='编辑'">编辑</el-button>
            <el-button type="text" style="color: red;" @click="deleteGlory(this.tableDatatwo[index].gloryId)">删除</el-button>
          </div>
        </div>

        <!--   荣誉表单     -->
        <div class="information_from" v-show="jlhs">
          <el-form style="width: 90%;margin: auto; " :rules="rules" ref="tableDataSix" :model="tableDataSix">
            <br/>
            <div style="display: inline-block;margin:20px 0px 0px 50px">
              <el-form-item label="荣誉/奖项名称:" prop="name" style="width:240px;margin-left: -400px;">
                <el-input v-model="tableDataSix.gloryName" style="width:240px;"></el-input>
              </el-form-item>
              <br>

              <el-form-item label="颁发单位名称：" class="el-form-item" style="width:240px;margin-left: -400px;">
                <el-col :span="11">
                  <el-form-item prop="rzgs" style="width:240px;">
                    <el-input v-model="tableDataSix.gloryUnitname" style="width: 100%;"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <br>

            </div>

            <div style="display: inline-block;position: absolute;top:20px;right:150px">
              <br>
              <el-form-item label="奖励日期:">
                <el-col :span="11">
                  <el-form-item prop="date2" style="width:240px;">
                    <el-date-picker type="date" placeholder="选择日期" v-model="tableDataSix.createdTime"
                                    style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <br>


              <div style="float: right">
                <el-form-item label="备注：">

                  <el-form-item prop="rzgs" style="width:240px;">
                    <el-input type="textarea" v-model="tableDataSix.gloryRemark" style="width: 100%;"></el-input>
                  </el-form-item>

                </el-form-item>
              </div>
            </div>

            <div style="width:90%;height:60px;margin: auto;margin-top:30px;padding: 0px 0px 30px 0px">
              <div style="width:20%;height:50px;margin:auto;">
                <el-button @click="callglory(),restGlory()">取消</el-button>
                <el-button type="primary" @click="addglory(),updateinsertGlory(),restGlory()">保存</el-button>
              </div>
            </div>
          </el-form>
        </div>

      </div>

      <!--      惩罚-->
      <div class="information">
        <h3 style="color: #085fc3;font-size: 14px;margin-left: 10px;display: inline-block;">惩罚<i class="iconfont"
                                                                                                 style="color: #085fc3;margin-right:2px;">&#xe604;</i>
        </h3>
        <!--小添加惩罚-->
        <div
            style="width:870px;border-top:1px solid silver;display: inline-block;margin-left: 7px;margin-bottom: 5px;"></div>
        <h3 v-show="cfjianjia"
            style="color: #085fc3;font-size: 14px;position: relative;margin-left: 5px;display: inline-block;">
          <el-button type="text" @click="addpunish2(),this.punishupdateinsert='新增'"><i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe613;</i>添加
          </el-button>
        </h3>
      </div>

      <div style="width: 100%;margin-top: 20px;">
        <!--大添加惩罚-->
        <div style="width:98%;height:80px;border: 1px dotted silver;margin: auto" v-show="tianjiacf">
          <div style="margin: auto;width:120px;height: 80px;line-height: 80px">
            <el-button type="text" @click="clcikpunish()"><i class="iconfont"
                                                                               style="color: #085fc3;margin-right:2px;">&#xe613;</i>添加&nbsp;&nbsp;
              惩罚
            </el-button>
          </div>
        </div>
        <!--惩罚表单-->
        <div v-for="(obj3,index) in tableDatathree" style="width:100%;position: relative;margin-top: 20px;" v-show="cfwhite">
          <div class="information_text">
            <ul style="list-style-type: none; ">
              <li>
                <label>惩罚类型</label>
                <p>{{obj3.punishType}}</p>
              </li>
              <li>
                <label>惩罚原因</label>
                <p>{{obj3.punishCause}}</p>
              </li>
              <li>
                <label>惩罚单位</label>
                <p>{{ obj3.punishUnit }}</p>
              </li>
              <li>
                <label>是否撤销</label>
                <p>{{obj3.isRevocation==0?'否':'是'}}</p>
              </li>
              <li>
                <label style="margin-left: -438px;">备注</label>
                <p>{{obj3.punishRemark}}</p>
              </li>
            </ul>
          </div>
          <div style="position: absolute;right: 6px;top:-5px">
            <el-button type="text" style="color: #085fc3;" @click="redactpunish(),selectPunishOne(punishId=this.tableDatathree[index].punishId),this.punishupdateinsert='编辑'">编辑</el-button>
            <el-button type="text" style="color: red;" @click="deletePunish(this.tableDatathree[index].punishId)">删除</el-button>
          </div>
        </div>

        <div class="information_from" v-show="cfhs">
          <el-form style="width: 90%;margin: auto; " :rules="rules" ref="ruleForm">
            <br/>
            <div style="display: inline-block;margin:20px 0px 0px 50px">
              <el-form-item label="惩罚类型:" prop="region" style="width:240px;margin-left: -400px;">
                <el-select v-model="tableDataSeven.punishType" placeholder="请选择惩罚类型" style="width: 240px;">
                  <el-option label="警告" value="警告"></el-option>
                  <el-option label="记过" value="记过"></el-option>
                  <el-option label="记大过" value="记大过"></el-option>
                  <el-option label="降职" value="降职"></el-option>
                  <el-option label="辞退" value="辞退"></el-option>
                </el-select>
              </el-form-item>
              <br>

              <el-form-item label="惩罚单位：" class="el-form-item" style="width:240px;margin-left: -400px;">
                <el-col :span="11">
                  <el-form-item prop="rzgs" style="width:240px;">
                    <el-input v-model="tableDataSeven.punishUnit" style="width: 100%;"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <br>

              <el-form-item label="惩罚备注：" style="width:240px;margin-left: -400px;">
                <el-form-item prop="rzgs" style="width:240px;">
                  <el-input type="textarea" v-model="tableDataSeven.punishRemark" style="width: 100%;"></el-input>
                </el-form-item>

              </el-form-item>

            </div>

            <div style="display: inline-block;position: absolute;top:20px;right:150px">
              <br>
              <div style="float: right">

                <el-form-item label="惩罚原因：">
                  <el-form-item prop="rzgs" style="width:240px;">
                    <el-input v-model="tableDataSeven.punishCause" style="width: 100%;"></el-input>
                  </el-form-item>

                </el-form-item>

                <el-form-item label="是否撤销：">
                  <el-radio-group v-model="tableDataSeven.isRevocation" style="position: absolute;left:2px;">
                    <el-radio label="是" value="是"></el-radio>
                    <el-radio label="否" value="否"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>


            <div style="width:90%;height:60px;margin: auto;margin-top:30px;padding: 0px 0px 30px 0px">
              <div style="width:20%;height:50px;margin:auto;">
                <el-button @click="callpunish(),restPunish()">取消</el-button>
                <el-button type="primary" @click="addpunish(),updateinsertPunish(),restPunish()">保存</el-button>
              </div>
            </div>
          </el-form>
        </div>

      </div>


      <!--      教育经历-->
      <div style="margin-top: 20px;">
        <h3>
          <span style="margin-left:10px;">教育经历</span>
        </h3>
      </div>

      <!--      教育经历-->
      <div class="information">
        <h3 style="color: #085fc3;font-size: 14px;margin-left: 10px;display: inline-block;">教育经历<i class="iconfont"
                                                                                                   style="color: #085fc3;margin-right:2px;">&#xe604;</i>
        </h3>
        <!--小添加教育经历-->
        <div
            style="width:840px;border-top:1px solid silver;display: inline-block;margin-left: 7px;margin-bottom: 5px;"></div>
        <h3 v-show="tianjiajy"
            style="color: #085fc3;font-size: 14px;position: relative;margin-left: 10px;display: inline-block;">
          <el-button type="text" @click="addexperien2()"><i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe613;</i>添加
          </el-button>
        </h3>
      </div>

      <div style="width: 100%;margin-top: 20px;">
      <!--大添加教育经历-->
        <div style="width:98%;height:80px;border: 1px dotted silver;margin: auto" v-show="jytianjia">
          <div style="margin: auto;width:120px;height: 80px;line-height: 80px">
            <el-button type="text" @click="clickexperien()"><i class="iconfont"
                                                                               style="color: #085fc3;margin-right:2px;">&#xe613;</i>添加&nbsp;&nbsp;教育经历
            </el-button>
          </div>
        </div>

        <!--教育经历表单-->
        <div v-for="(obj4,index) in tableDataFour" style="width:100%;position: relative;margin-top: 20px;" v-show="jywhite">
          <div class="information_text">
            <ul style="list-style-type: none; ">
              <li>
                <label>开始时间</label>
                <p>{{obj4.educationStartTime}}</p>
              </li>
              <li>
                <label>结束时间</label>
                <p>{{obj4.educationEndTime}}</p>
              </li>
              <li>
                <label>学校名称</label>
                <p>{{ obj4.educationStudentname }}</p>
              </li>
              <li>
                <label>所属专业</label>
                <p>{{obj4.educationMajor}}</p>
              </li>
            </ul>
          </div>
          <div style="position: absolute;right: 6px;top:-5px">
            <el-button type="text" style="color: #085fc3;" @click="redactexperien()">编辑</el-button>
            <el-button type="text" style="color: red;">删除</el-button>
          </div>
        </div>

        <div class="information_from" v-show="jyhs">
          <el-form style="width: 90%;margin: auto; " :rules="rules" ref="ruleForm" :model="ruleForm">
            <br/>
            <div style="display: inline-block;margin:20px 0px 0px 50px">
              <el-form-item label="开始时间:" required style="width:240px;margin-left: -400px;">
                <el-col :span="11">
                  <el-form-item prop="date1" style="width:240px;">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"
                                    style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <br>

              <el-form-item label="学校名称：" class="el-form-item" style="width:240px;margin-left: -400px;">
                <el-col :span="11">
                  <el-form-item prop="rzgs" style="width:240px;">
                    <el-input v-model="ruleForm.rzgs" style="width: 100%;"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <br>
            </div>

            <div style="display: inline-block;position: absolute;top:20px;right:150px">
              <br>
              <el-form-item label="结束时间:" required>
                <el-col :span="11">
                  <el-form-item prop="date2" style="width:240px;">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date2"
                                    style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <br>


              <div style="float: right">
                <el-form-item label="备注：">
                  <el-col :span="11">
                    <el-form-item prop="rzgs" style="width:240px;">
                      <el-input type="textarea" v-model="ruleForm.yy" style="width: 100%;"></el-input>
                    </el-form-item>
                  </el-col>
                </el-form-item>
              </div>
            </div>


            <div style="width:90%;height:60px;margin: auto;margin-top:30px;padding: 0px 0px 30px 0px">
              <div style="width:20%;height:50px;margin:auto;">
                <el-button @click="callexperien()">取消</el-button>
                <el-button type="primary" @click="addexperien()">保存</el-button>
              </div>
            </div>
          </el-form>
        </div>

      </div>


      <!--      离职信息-->
      <div style="margin-top: 20px; ">
        <h3>
          <span style="margin-left:10px;">离职信息</span>
        </h3>
      </div>

      <!--      离职信息-->
      <div class="information">
        <h3 style="color: #085fc3;font-size: 14px;margin-left: 10px;display: inline-block;">离职信息<i class="iconfont"
                                                                                                   style="color: #085fc3;margin-right:2px;">&#xe604;</i>
        </h3>
        <div
            style="width:845px;border-top:1px solid silver;display: inline-block;margin-left: 7px;margin-bottom: 5px;"></div>
        <h3 v-show="lzbj"
            style="color: #085fc3;font-size: 14px;position: relative;margin-left: 5px;display: inline-block;">
          <el-button type="text" @click="redactleave()"><i class="iconfont"
                                                                                    style="color: #085fc3;margin-right:2px;">&#xe600;</i>编辑
          </el-button>
        </h3>
      </div>

      <div style="width: 100%;margin-top: 20px;">

        <!--离职表单-->
        <div style="width:100%;position: relative;margin-top: 20px;" v-show="lzwhite">
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
                <label style="margin-left: -15px;">备注</label>
                <p></p>
              </li>

            </ul>
          </div>

        </div>

        <div class="information_from" v-show="lzhs">
          <el-form style="width: 90%;margin: auto; " :rules="rules" ref="ruleForm" :model="ruleForm">
            <br/>
            <div style="display: inline-block;margin:20px 0px 0px 50px">
              <el-form-item label="离职原因:" prop="region" style="width:240px;margin-left: -400px;">
                <el-select
                    v-model="ruleForm.region"
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

              <el-form-item label="最后工作时间:" required style="width:240px;margin-left: -400px;">
                <el-col :span="11">
                  <el-form-item prop="date2" style="width:240px;">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date2"
                                    style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <br>


            </div>

            <div style="display: inline-block;position: absolute;top:20px;right:150px">
              <br>
              <el-form-item label="离职时间:" required>
                <el-col :span="11">
                  <el-form-item prop="date2" style="width:240px;">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date2"
                                    style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <br>


              <el-form-item label="备注：" style="position: absolute;left:28px;">
                <el-col :span="11">
                  <el-form-item prop="rzgs" style="width:240px;">
                    <el-input type="textarea" v-model="ruleForm.yy" style="width: 100%;"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </div>


            <div style="width:90%;height:60px;margin: auto;margin-top:30px;padding: 0px 0px 30px 0px">
              <div style="width:20%;height:50px;margin:auto;">
                <el-button @click="callleave()">取消</el-button>
                <el-button type="primary" @click="addleave()">保存</el-button>
              </div>
            </div>
          </el-form>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";

export default {
  data() {
    return {
      //判断工作经历添加还是修改
      workupdateinsert:'',
      //判断奖励添加还是修改
      gloryupdateinsert:'',
      //判断惩罚添加还是修改
      punishupdateinsert:'',
      url: "http://localhost:80/",
      //工作经历表单
      tableData:{},
      //奖励表单
      tableDatatwo:{},
      //惩罚表单
      tableDatathree:{},
      //教育经历表单
      tableDataFour:{},
      //工作经历表单2
      tableDataFive:[],
      //奖励表单2
      tableDataSix:[],
      //惩罚表单2
      tableDataSeven:[],
      ruleForm: {
        name: '',
        rzgs: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        zw: '',
        cftype: '',
        desc: ''
      },
      // rules: {
      //   name: [
      //     {required: true, message: '请输入活动名称', trigger: 'blur'},
      //     {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
      //   ],
      //   region: [
      //     {required: true, message: '请选择活动区域', trigger: 'change'}
      //   ],
      //   date1: [
      //     {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
      //   ],
      //   date2: [
      //     {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
      //   ],
      //   type: [
      //     {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
      //   ],
      //   resource: [
      //     {required: true, message: '请选择活动资源', trigger: 'change'}
      //   ],
      //   desc: [
      //     {required: true, message: '请填写活动形式', trigger: 'blur'}
      //   ]
      // },
      // 小添加按钮
      jianjia: false,
      // 大添加按钮
      tianjiagzjl: true,
      // 添加的工作经历
      gzjlwhite: false,
      // 工作经历表单
      gzjlhs: false,

      //小添加按钮
      jljianjia: false,
      //大添加按钮
      tianjiajl: true,
      //添加的荣誉奖励
      jlwhite: false,
      //荣誉奖励表单
      jlhs: false,

      //小添加按钮
      cfjianjia: false,
      //大添加按钮
      tianjiacf: true,
      //添加的惩罚
      cfwhite: false,
      //惩罚表单
      cfhs: false,

      //小添加按钮
      tianjiajy: false,
      //大添加按钮
      jytianjia: true,
      //添加的教育经历
      jywhite: false,
      //教育经历表单
      jyhs: false,

      //添加的离职
      lzwhite: true,
      //离职表单
      lzhs: false,
      //离职编辑
      lzbj: true

    };
  },
  methods: {
    //点击工作经历编辑判断是否有数据
    workBJ(){
      if(this.tableData.length>0){
      //判断工作经历是否有数据，有则循环显示
        this.gzjlwhite=true;
        this.tianjiagzjl=false;
        this.jianjia=true;
      }
    },
    //判断奖励是否有数据
    gloryBJ(){
      if(this.tableDatatwo.length>0){
        //判断荣誉奖励是否有数据，有则循环显示
        this.jlwhite=true;
        this.tianjiajl=false;
        this.jljianjia=true;
      }
    },
    //判断惩罚是否有数据
    punishBJ(){
      if(this.tableDatathree.length>0){
        //判断惩罚是否有数据，有则循环显示
        this.cfwhite=true;
        this.tianjiacf=false;
        this.cfjianjia=true;
      }
    },

    //判断教育经历是否有数据
    educationBJ(){
      if(this.tableDataFour.length>0){
        //判断教育经历是否有数据，有则循环显示
        this.jywhite=true;
        this.jytianjia=false;
        this.tianjiajy=true;
      }
    },
    //工作经历清空
    restWork(){
      this.tableDataFive={}
    },

    //奖励清空
    restGlory(){
      this.tableDataSix={}
    },

    //惩罚清空
    restPunish(){
      this.tableDataSeven={}
    },

    // 点击添加工作经历按钮
    clickwork(){
      this.gzjlhs=true;
      this.tianjiagzjl=false;
    },
    // 点击取消添加工作记录按钮
    callwork(){
      this.gzjlhs=false;
      this.tianjiagzjl=false;
      this.gzjlwhite=true;
    },
    // 点击确定添加工作记录按钮
    addwork(){
      this.gzjlhs=false;
      this.jianjia= true,
      this.gzjlwhite=true;
    },
    addwork2(){
      this.gzjlhs=true;
      this.tianjiagzjl=false;
      this.gzjlwhite=true;
    },
    // 点击编辑添加的工作经历表单按钮
    redactwork(){
      this.gzjlhs=true;
      this.gzjlwhite=false;

    },
    //点击添加荣誉奖励按钮
    clickglory(){
      this.jlhs=true;
      this.tianjiajl=false;
    },
    //点击取消荣誉奖励记录按钮
    callglory(){
      this.jlhs=false;
      this.tianjiajl=false;
      this.jlwhite=true;
    },
    //点击确定荣誉奖励按钮
    addglory(){
      this.jlhs=false;
      this.jljianjia=true;
      this.jlwhite=true;
    },
    addglory2(){
      this.jlhs=true;
      this.tianjiajl=false;
      this.jlwhite=true;
    },
    //点击编辑添加荣誉奖励的按钮
    redactglory(){
      this.jlhs=true;
      this.jlwhite=false;
    },
    //点击添加惩罚按钮
    clcikpunish(){
      this.cfhs=true;
      this.tianjiacf=false;
    },
    //点击取消惩罚记录按钮
    callpunish(){
      this.cfhs=false;
      this.tianjiacf=false;
      this.cfwhite=true;
    },
    //点击确定惩罚按钮
    addpunish(){
      this.cfhs=false;
      this.cfjianjia=true;
      this.cfwhite=true;
    },
    addpunish2(){
      this.cfhs=true;
      this.tianjiacf=false;
      this.cfwhite=true;
    },
    //点击编辑添加惩罚的按钮
    redactpunish(){
      this.cfhs=true;
      this.cfwhite=false;
    },
    //点击添加教育经历按钮
    clickexperien(){
      this.jyhs=true;
      this.jytianjia=false;
    },
    //点击取消教育经历按钮
    callexperien(){
      this.jyhs=false;
      this.jytianjia=true;
    },
    //点击确定教育经历按钮
    addexperien(){
      this.jyhs=false;
      this.tianjiajy=true;
      this.jywhite=true;
    },
    addexperien2(){
      this.jyhs=true;
      this.tianjiajy=false;
      this.jywhite=true;
    },
    //点击编辑教育经历按钮
    redactexperien(){
      this.jyhs=true;
      this.jywhite=false;
    },
    //根据id查询工作经历
    selectWorkAll(id) {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectWorkAll',
        data:{
          staffId:this.$parent.$parent.$parent.$parent.$data.one,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log(response)
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
            _this.tableData = response.data.data.info,
                this.workBJ();
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
    //根据id查询奖励
    selectGloryAll(id) {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectGloryAll',
        data:{
          staffId:this.$parent.$parent.$parent.$parent.$data.one,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log(response)
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
            _this.tableDatatwo = response.data.data.info,
                this.gloryBJ();
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
    //根据id查询惩罚
    selectPunishAll(id) {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectPunishAll',
        data:{
          staffId:this.$parent.$parent.$parent.$parent.$data.one,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log(response)
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
            _this.tableDatathree = response.data.data.info,
                this.punishBJ();
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
    //根据id查询教育经历
    selectEducationAll(id) {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectEducationAll',
        data:{
          staffId:this.$parent.$parent.$parent.$parent.$data.one,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log(response)
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
            _this.tableDataFour = response.data.data.info,
                this.educationBJ();
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
    //根据工作经历id查询工作经历
    selectWorkOne(workExperienceId) {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectWorkOne',
        data:{
          workExperienceId:this.workExperienceId,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log(response)
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
            _this.tableDataFive = response.data.data.info[0]
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
    //修改工作经历
    updateWork(id) {
      var _this = this
      this.axios({
        method: 'put',
        url: this.url + 'updateWork',
        data: {
          //工作经历编号
          workExperienceId:this.tableDataFive.workExperienceId,
          //开始时间
          workStareTime:this.tableDataFive.workStareTime,
          //结束时间
          workEndTime: this.tableDataFive.workEndTime,
          //公司名称
          companyName:this.tableDataFive.companyName,
          //职位名称
          positionName:this.tableDataFive.positionName,
          //工作描述
          positionDescribe:this.tableDataFive.positionDescribe,
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
          this.selectWorkAll();
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
    //添加工作经历
    insertWorkExperience() {
      this.axios({
        method: 'post',
        url: this.url + 'insertWorkExperience',
        data: {
          //开始时间
          workStareTime:this.tableDataFive.workStareTime,
          //结束时间
          workEndTime:this.tableDataFive.workEndTime,
          //员工编号
          staffId:this.$parent.$parent.$parent.$parent.$data.one,
          //任职公司
          companyName:this.tableDataFive.companyName,
          //职位
          positionName:this.tableDataFive.positionName,
          //离职原因
          positionDescribe:this.tableDataFive.positionDescribe,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("添加成功")
        console.log(response)
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
          if (response.data.code == 200) {
            //如果是成功
            if (response.data.data == 1) {
              this.selectWorkAll();
              ElNotification({
                title: '提示',
                message: '添加成功',
                type: 'success',
              })
              this.selectWorkAll()
            } else {
              ElMessage({
                type: 'warning',
                message: '添加失败',
              })
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
    //添加和修改工作经历调用
    updateinsertWork(){
      if(this.workupdateinsert=='编辑'){
        //修改工作经历
        this.updateWork(this.tableDataFive.workExperienceId)
      }else {
        //添加工作经历
        this.insertWorkExperience();
      }
    },
    //删除工作经历
    deleteWork(id) {
      ElMessageBox.confirm(
          '是否确认删除所选数据项?',
          '系统提示',
          {
            cancelButtonText: '取消',
            confirmButtonText: '确认',
            type: 'warning',
          }
      ).then(() => {
        this.axios({
          method: 'delete',
          url: this.url + 'deleteWork',
          data:[id],
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
          //如果服务关闭
          if (response.data.data.data) {
            ElNotification.error({
              title: '提示',
              message: "服务发生关闭",
              offset: 100,
            })
            //如果服务没有关闭
          } else if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              //如果是成功
              if (response.data.data.info == "成功") {
                ElMessage({
                  type: 'success',
                  message: '删除成功',
                })
                this.selectWorkAll();
              } else {
                ElMessage({
                  type: 'warning',
                  message: response.data.data.info,
                })
              }
            }
            //如果服务是雪崩的
            else {
              ElNotification.error({
                title: '提示',
                message: "服务发生雪崩",
                offset: 100,
              })
            }
          }
        })
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消成功',
        })
      })
    },
    //根据奖励id查询奖励
    selectGloryOne(gloryId) {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectGloryOne',
        data:{
          gloryId:this.gloryId,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log(response)
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
            _this.tableDataSix = response.data.data.info[0]
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
    //添加奖励
    insertGlory() {
      this.axios({
        method: 'post',
        url: this.url + 'insertGlory',
        data: {
          //奖励名称
          gloryName:this.tableDataSix.gloryName,
          //员工编号
          staffId:this.$parent.$parent.$parent.$parent.$data.one,
          //颁发单位
          gloryUnitname:this.tableDataSix.gloryUnitname,
          //备注
          gloryRemark:this.tableDataSix.gloryRemark,
          //奖励日期
          createdTime:this.tableDataSix.createdTime,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("添加成功")
        console.log(response)
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
          if (response.data.code == 200) {
            //如果是成功
            if (response.data.data == 1) {
              ElNotification({
                title: '提示',
                message: '添加成功',
                type: 'success',
              })
              this.selectGloryAll();
            } else {
              ElMessage({
                type: 'warning',
                message: '添加失败',
              })
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
    //修改奖励
    updateGlory(id) {
      var _this = this
      this.axios({
        method: 'put',
        url: this.url + 'updateGlory',
        data: {
          //奖励编号
          gloryId:this.tableDataSix.gloryId,
          //奖励名称
          gloryName:this.tableDataSix.gloryName,
          //颁发单位
          gloryUnitname: this.tableDataSix.gloryUnitname,
          //奖励日期
          createdTime:this.tableDataSix.createdTime,
          //备注
          gloryRemark: this.tableDataSix.gloryRemark,
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
          this.selectGloryAll();
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
    //添加和修改奖励调用
    updateinsertGlory(){
      if(this.gloryupdateinsert=='编辑'){
        //修改奖励
        this.updateGlory(this.tableDataSix.gloryId)
      }else {
        //添加奖励
        this.insertGlory();
      }
    },
    //删除奖励
    deleteGlory(id) {
      ElMessageBox.confirm(
          '是否确认删除所选数据项?',
          '系统提示',
          {
            cancelButtonText: '取消',
            confirmButtonText: '确认',
            type: 'warning',
          }
      ).then(() => {
        this.axios({
          method: 'delete',
          url: this.url + 'deleteGlory',
          data:[id],
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
          //如果服务关闭
          if (response.data.data.data) {
            ElNotification.error({
              title: '提示',
              message: "服务发生关闭",
              offset: 100,
            })
            //如果服务没有关闭
          } else if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              //如果是成功
              if (response.data.data.info == "成功") {
                ElMessage({
                  type: 'success',
                  message: '删除成功',
                })
                this.selectGloryAll();
              } else {
                ElMessage({
                  type: 'warning',
                  message: response.data.data.info,
                })
              }
            }
            //如果服务是雪崩的
            else {
              ElNotification.error({
                title: '提示',
                message: "服务发生雪崩",
                offset: 100,
              })
            }
          }
        })
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消成功',
        })
      })
    },
    //根据惩罚id查询惩罚
    selectPunishOne(punishId) {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectPunishOne',
        data:{
          punishId:this.punishId,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log(response)
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
            _this.tableDataSeven = response.data.data.info[0]
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
    //添加惩罚
    insertPunish() {
      this.axios({
        method: 'post',
        url: this.url + 'insertPunish',
        data: {
          //惩罚类型
          punishType:this.tableDataSeven.punishType,
          //员工编号
          staffId:this.$parent.$parent.$parent.$parent.$data.one,
          //惩罚原因
          punishCause:this.tableDataSeven.punishCause,
          //惩罚单位
          punishUnit:this.tableDataSeven.punishUnit,
          //是否撤销
          isRevocaTion:this.tableDataSeven.isRevocaTion,
          //备注
          punishRemark:this.tableDataSeven.punishRemark,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        console.log("添加成功")
        console.log(response)
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
          if (response.data.code == 200) {
            //如果是成功
            if (response.data.data == 1) {
              ElNotification({
                title: '提示',
                message: '添加成功',
                type: 'success',
              })
              this.selectPunishAll();
            } else {
              ElMessage({
                type: 'warning',
                message: '添加失败',
              })
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
    //修改惩罚
    updatePunish(id) {
      var _this = this
      this.axios({
        method: 'put',
        url: this.url + 'updatePunish',
        data: {
          //惩罚编号
          punishId:this.tableDataSeven.punishId,
          //惩罚类型
          punishType:this.tableDataSeven.punishType,
          //员工编号
          staffId:this.$parent.$parent.$parent.$parent.$data.one,
          //惩罚原因
          punishCause:this.tableDataSeven.punishCause,
          //惩罚单位
          punishUnit:this.tableDataSeven.punishUnit,
          //是否撤销
          isRevocaTion:this.tableDataSeven.isRevocaTion,
          //备注
          punishRemark:this.tableDataSeven.punishRemark,
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
          this.selectPunishAll();
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
    //添加和修改惩罚调用
    updateinsertPunish(){
      if(this.punishupdateinsert=='编辑'){
        //修改惩罚
        this.updatePunish(this.tableDataSeven.punishId)
      }else {
        //添加惩罚
        this.insertPunish();
      }
    },
    //删除惩罚
    deletePunish(id) {
      ElMessageBox.confirm(
          '是否确认删除所选数据项?',
          '系统提示',
          {
            cancelButtonText: '取消',
            confirmButtonText: '确认',
            type: 'warning',
          }
      ).then(() => {
        this.axios({
          method: 'delete',
          url: this.url + 'deletePunish',
          data:[id],
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
          //如果服务关闭
          if (response.data.data.data) {
            ElNotification.error({
              title: '提示',
              message: "服务发生关闭",
              offset: 100,
            })
            //如果服务没有关闭
          } else if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              //如果是成功
              if (response.data.data.info == "成功") {
                ElMessage({
                  type: 'success',
                  message: '删除成功',
                })
                this.selectPunishAll();
              } else {
                ElMessage({
                  type: 'warning',
                  message: response.data.data.info,
                })
              }
            }
            //如果服务是雪崩的
            else {
              ElNotification.error({
                title: '提示',
                message: "服务发生雪崩",
                offset: 100,
              })
            }
          }
        })
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消成功',
        })
      })
    },

  },
  mounted() {
    //根据id查询工作经历
    this.selectWorkAll(this.$parent.$parent.$parent.$parent.$data.one)
    //根据id查询奖励
    this.selectGloryAll(this.$parent.$parent.$parent.$parent.$data.one)
    //根据id查询惩罚
    this.selectPunishAll(this.$parent.$parent.$parent.$parent.$data.one)
    //根据id查询教育经历
    this.selectEducationAll(this.$parent.$parent.$parent.$parent.$data.one)
  }
}
</script>

<style scoped>
/*@import url("../../css/EditingStaff.css");*/
.basicfile_big {
  width: 100%;
  /*border:1px solid red;*/
  margin-top: 20px;
  margin: auto;
}

.basicfile_big_auto {
  width: 80%;
  /*border:1px solid yellow;*/
  margin: auto;
}

.information {
  position: relative;
  margin-top: 10px;
  width: 100%;
  margin: auto;
}

.information_text {
  width: 850px;
  margin: 0px auto;
  /*background: darkorange;*/
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

.information_from {
  width: 100%;
  background: #e8edf2;
  position: relative;

}

.information_ul li {
  display: inline-block;
  width: 50%;
  padding: 20px 65px 0px;
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
}

.information_input {
  width: 240px;
  display: inline-block;
}

.el-form-item {
  text-align: right;
}

</style>