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
        <h3 v-show="jianjia" style="color: #085fc3;font-size: 14px;position: relative;margin-left: 10px;display: inline-block;"><el-button type="text" @click="gzjlhs=!gzjlhs"><i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe613;</i>添加</el-button></h3>
      </div>

      <div style="width: 100%;margin-top: 20px;">

        <div style="width:98%;height:80px;border: 1px dotted silver;margin: auto" v-show="tianjiagzjl">
          <div style="margin: auto;width:120px;height: 80px;line-height: 80px">
            <el-button type="text" @click="gzjlhs=!gzjlhs,tianjiagzjl=!tianjiagzjl"><i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe613;</i>添加&nbsp;&nbsp;工作经历</el-button>
          </div>
        </div>

        <div style="width:100%;position: relative;margin-top: 20px;" v-show="gzjlwhite">
          <div class="information_text">
            <ul style="list-style-type: none; ">
              <li>
                <label>开始时间</label>
                <p></p>
              </li>
              <li>
                <label>结束时间</label>
                <p></p>
              </li>
              <li>
                <label>任职公司</label>
                <p>23</p>
              </li>
              <li>
                <label>职位</label>
                <p></p>
              </li>
              <li>
                <label>离职原因</label>
                <p></p>
              </li>
            </ul>
          </div>
          <div style="position: absolute;right: 6px;top:-5px">
            <el-button type="text" style="color: #085fc3;" @click="gzjlhs=!gzjlhs,gzjlwhite=!gzjlwhite">编辑</el-button>
            <el-button type="text" style="color: red;">删除</el-button>
          </div>
        </div>

        <div class="information_from" v-show="gzjlhs">
          <el-form style="width: 90%;margin: auto; " :rules="rules" ref="ruleForm" :model="ruleForm">
            <br/>
            <div style="display: inline-block;margin:20px 0px 0px 50px">
              <el-form-item label="开始时间:" required >
                <el-col :span="11" >
                  <el-form-item prop="date1" style="width:240px;">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item><br>

              <el-form-item label="任职公司：" class="el-form-item" >
                <el-col :span="11">
                  <el-form-item prop="rzgs" style="width:240px;">
                    <el-input   v-model="ruleForm.rzgs" style="width: 100%;"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item><br>

              <el-form-item label="离职原因：" >
                <el-col :span="11">
                  <el-form-item prop="rzgs" style="width:240px;">
                    <el-input type="textarea" v-model="ruleForm.yy" style="width: 100%;"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
            </div>

            <div style="display: inline-block;position: absolute;top:20px;right:150px">
              <br>
              <el-form-item label="结束时间:" required >
                <el-col :span="11">
                  <el-form-item prop="date2" style="width:240px;">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item><br>


              <div style="float: right">
                <el-form-item label="职位：" >

                  <el-form-item prop="rzgs" style="width:240px;">
                    <el-input  v-model="ruleForm.zw" style="width: 100%;"></el-input>
                  </el-form-item>

                </el-form-item>
              </div>
            </div>


            <div style="width:90%;height:60px;margin: auto;margin-top:30px;padding: 0px 0px 30px 0px">
              <div style="width:20%;height:50px;margin:auto;">
                <el-button @click="gzjlhs=!gzjlhs,tianjiagzjl=!tianjiagzjl">取消</el-button>
                <el-button type="primary" @click="gzjlwhite=!gzjlwhite,gzjlhs=!gzjlhs,jianjia=!jianjia">保存</el-button>
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
        <h3 v-show="jljianjia" style="color: #085fc3;font-size: 14px;position: relative;margin-left: 5px;display: inline-block;"><el-button type="text" @click="gzjlhs=!gzjlhs"><i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe613;</i>添加</el-button></h3>
      </div>

      <div style="width: 100%;margin-top: 20px;">

        <div style="width:98%;height:80px;border: 1px dotted silver;margin: auto" v-show="tianjiajl">
          <div style="margin: auto;width:120px;height: 80px;line-height: 80px">
            <el-button type="text" @click="jlhs=!jlhs,tianjiajl=!tianjiajl"><i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe613;</i>添加&nbsp;&nbsp; 荣誉与奖励</el-button>
          </div>
        </div>

        <div style="width:100%;position: relative;margin-top: 20px;" v-show="jlwhite">
          <div class="information_text">
            <ul style="list-style-type: none; ">
              <li>
                <label>荣誉/奖项名称</label>
                <p></p>
              </li>
              <li>
                <label>奖励日期</label>
                <p></p>
              </li>
              <li>
                <label>颁发单位名称</label>
                <p>23</p>
              </li>
              <li>
                <label>备注</label>
                <p></p>
              </li>

            </ul>
          </div>
          <div style="position: absolute;right: 6px;top:-5px">
            <el-button type="text" style="color: #085fc3;" @click="jlhs=!jlhs,jlwhite=!jlwhite">编辑</el-button>
            <el-button type="text" style="color: red;">删除</el-button>
          </div>
        </div>

        <div class="information_from" v-show="jlhs">
          <el-form style="width: 90%;margin: auto; " :rules="rules" ref="ruleForm">
            <br/>
            <div style="display: inline-block;margin:20px 0px 0px 50px">
              <el-form-item label="荣誉/奖项名称:" prop="name" >
                <el-input v-model="ruleForm.name" style="width:240px;"></el-input>
              </el-form-item><br>

              <el-form-item label="颁发单位名称：" class="el-form-item" >
                <el-col :span="11">
                  <el-form-item prop="rzgs" style="width:240px;">
                    <el-input   v-model="ruleForm.rzgs" style="width: 100%;"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item><br>

            </div>

            <div style="display: inline-block;position: absolute;top:20px;right:150px">
              <br>
              <el-form-item label="奖励日期:" >
                <el-col :span="11">
                  <el-form-item prop="date2" style="width:240px;">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item><br>


              <div style="float: right">
                <el-form-item label="备注：" >

                  <el-form-item prop="rzgs" style="width:240px;">
                    <el-input type="textarea"  v-model="ruleForm.zw" style="width: 100%;"></el-input>
                  </el-form-item>

                </el-form-item>
              </div>
            </div>


            <div style="width:90%;height:60px;margin: auto;margin-top:30px;padding: 0px 0px 30px 0px">
              <div style="width:20%;height:50px;margin:auto;">
                <el-button @click="jlhs=!jlhs,tianjiajl=!tianjiajl">取消</el-button>
                <el-button type="primary" @click="jlwhite=!jlwhite,jlhs=!jlhs,jljianjia=!jljianjia">保存</el-button>
              </div>
            </div>
          </el-form>
        </div>

      </div>

      <!--      惩罚-->
      <div class="information">
        <h3 style="color: #085fc3;font-size: 14px;margin-left: 10px;display: inline-block;">惩罚<i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe604;</i></h3>
        <div style="width:870px;border-top:1px solid silver;display: inline-block;margin-left: 7px;margin-bottom: 5px;"></div>
        <h3 v-show="cfjianjia" style="color: #085fc3;font-size: 14px;position: relative;margin-left: 5px;display: inline-block;"><el-button type="text" @click="cfhs=!cfhs"><i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe613;</i>添加</el-button></h3>
      </div>

      <div style="width: 100%;margin-top: 20px;">

        <div style="width:98%;height:80px;border: 1px dotted silver;margin: auto" v-show="tianjiacf">
          <div style="margin: auto;width:120px;height: 80px;line-height: 80px">
            <el-button type="text" @click="cfhs=!cfhs,tianjiacf=!tianjiacf"><i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe613;</i>添加&nbsp;&nbsp; 惩罚</el-button>
          </div>
        </div>

        <div style="width:100%;position: relative;margin-top: 20px;" v-show="cfwhite">
          <div class="information_text">
            <ul style="list-style-type: none; ">
              <li>
                <label>惩罚类型</label>
                <p></p>
              </li>
              <li>
                <label>惩罚原因</label>
                <p></p>
              </li>
              <li>
                <label>惩罚单位</label>
                <p>23</p>
              </li>
              <li>
                <label>是否撤销</label>
                <p></p>
              </li>
              <li>
                <label>备注</label>
                <p></p>
              </li>
            </ul>
          </div>
          <div style="position: absolute;right: 6px;top:-5px">
            <el-button type="text" style="color: #085fc3;" @click="cfhs=!cfhs,cfwhite=!cfwhite">编辑</el-button>
            <el-button type="text" style="color: red;">删除</el-button>
          </div>
        </div>

        <div class="information_from" v-show="cfhs">
          <el-form style="width: 90%;margin: auto; " :rules="rules" ref="ruleForm">
            <br/>
            <div style="display: inline-block;margin:20px 0px 0px 50px">
              <el-form-item label="惩罚类型:" prop="region">
                <el-select v-model="ruleForm.region" placeholder="请选择惩罚类型" style="width: 240px;">
                  <el-option label="警告" value="shanghai"></el-option>
                  <el-option label="记过" value="beijing"></el-option>
                  <el-option label="记大过" value="beijing"></el-option>
                  <el-option label="降职" value="beijing"></el-option>
                  <el-option label="辞退" value="beijing"></el-option>
                </el-select>
              </el-form-item><br>

              <el-form-item label="惩罚单位：" class="el-form-item" >
                <el-col :span="11">
                  <el-form-item prop="rzgs" style="width:240px;">
                    <el-input   v-model="ruleForm.rzgs" style="width: 100%;"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item><br>

              <el-form-item label="惩罚备注：" >
                <el-form-item prop="rzgs" style="width:240px;">
                  <el-input type="textarea"  v-model="ruleForm.zw" style="width: 100%;"></el-input>
                </el-form-item>

              </el-form-item>

            </div>

            <div style="display: inline-block;position: absolute;top:20px;right:150px">
              <br>
              <div style="float: right">

                <el-form-item label="惩罚原因：" >
                  <el-form-item prop="rzgs" style="width:240px;">
                    <el-input   v-model="ruleForm.zw" style="width: 100%;"></el-input>
                  </el-form-item>

                </el-form-item>

                <el-form-item label="是否撤销：" >
                  <el-radio-group v-model="ruleForm.resource" style="position: absolute;left:2px;">
                    <el-radio label="是"></el-radio>
                    <el-radio label="否"></el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </div>


            <div style="width:90%;height:60px;margin: auto;margin-top:30px;padding: 0px 0px 30px 0px">
              <div style="width:20%;height:50px;margin:auto;">
                <el-button @click="cfhs=!cfhs,tianjiacf=!tianjiacf">取消</el-button>
                <el-button type="primary" @click="cfwhite=!cfwhite,cfhs=!cfhs,cfjianjia=!cfjianjia">保存</el-button>
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
        <h3 v-show="tianjiajy" style="color: #085fc3;font-size: 14px;position: relative;margin-left: 10px;display: inline-block;"><el-button type="text" @click="jyhs=!jyhs"><i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe613;</i>添加</el-button></h3>
      </div>

      <div style="width: 100%;margin-top: 20px;">

        <div style="width:98%;height:80px;border: 1px dotted silver;margin: auto" v-show="jytianjia">
          <div style="margin: auto;width:120px;height: 80px;line-height: 80px">
            <el-button type="text" @click="jyhs=!jyhs,jytianjia=!jytianjia"><i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe613;</i>添加&nbsp;&nbsp;教育经历</el-button>
          </div>
        </div>

        <div style="width:100%;position: relative;margin-top: 20px;" v-show="jywhite">
          <div class="information_text">
            <ul style="list-style-type: none; ">
              <li>
                <label>开始时间</label>
                <p></p>
              </li>
              <li>
                <label>结束时间</label>
                <p></p>
              </li>
              <li>
                <label>学校名称</label>
                <p>23</p>
              </li>
              <li>
                <label>备注</label>
                <p></p>
              </li>
            </ul>
          </div>
          <div style="position: absolute;right: 6px;top:-5px">
            <el-button type="text" style="color: #085fc3;" @click="jyhs=!jyhs,jywhite=!jywhite">编辑</el-button>
            <el-button type="text" style="color: red;">删除</el-button>
          </div>
        </div>

        <div class="information_from" v-show="jyhs">
          <el-form style="width: 90%;margin: auto; " :rules="rules" ref="ruleForm" :model="ruleForm">
            <br/>
            <div style="display: inline-block;margin:20px 0px 0px 50px">
              <el-form-item label="开始时间:" required >
                <el-col :span="11" >
                  <el-form-item prop="date1" style="width:240px;">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item><br>

              <el-form-item label="学校名称：" class="el-form-item" >
                <el-col :span="11">
                  <el-form-item prop="rzgs" style="width:240px;">
                    <el-input   v-model="ruleForm.rzgs" style="width: 100%;"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item><br>


            </div>

            <div style="display: inline-block;position: absolute;top:20px;right:150px">
              <br>
              <el-form-item label="结束时间:" required >
                <el-col :span="11">
                  <el-form-item prop="date2" style="width:240px;">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item><br>


              <div style="float: right">
                <el-form-item label="备注：" >
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
                <el-button @click="jyhs=!jyhs,jytianjia=!jytianjia">取消</el-button>
                <el-button type="primary" @click="jywhite=!jywhite,jyhs=!jyhs,tianjiajy=!tianjiajy">保存</el-button>
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
        <h3 v-show="lzbj" style="color: #085fc3;font-size: 14px;position: relative;margin-left: 5px;display: inline-block;"><el-button type="text" @click="lzbj=!lzbj,lzhs=!lzhs,lzwhite=!lzwhite"><i class="iconfont" style="color: #085fc3;margin-right:2px;">&#xe600;</i>编辑</el-button></h3>
      </div>

      <div style="width: 100%;margin-top: 20px;">


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
          <el-form style="width: 90%;margin: auto; " :rules="rules" ref="ruleForm" :model="ruleForm">
            <br/>
            <div style="display: inline-block;margin:20px 0px 0px 50px">
              <el-form-item label="离职原因:" prop="region" >
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

              <el-form-item label="薪酬结算日期:" required >
                <el-col :span="11">
                  <el-form-item prop="date2" style="width:240px;">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item><br>


            </div>

            <div style="display: inline-block;position: absolute;top:20px;right:150px">
              <br>
              <el-form-item label="离职时间:" required >
                <el-col :span="11">
                  <el-form-item prop="date2" style="width:240px;">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item><br>


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
                <el-button @click="lzwhite=!lzwhite,lzhs=!lzhs,lzbj=!lzbj">取消</el-button>
                <el-button type="primary" @click="lzwhite=!lzwhite,lzhs=!lzhs,lzbj=!lzbj ">保存</el-button>
              </div>
            </div>
          </el-form>
        </div>

      </div>


    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name:'',
        rzgs: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        zx:'',
        cftype:'',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      jianjia:false,
      tianjiagzjl:true,
      gzjlwhite:false,
      gzjlhs:false,

      jljianjia:false,
      tianjiajl:true,
      jlwhite:false,
      jlhs:false,

      cfjianjia:false,
      tianjiacf:true,
      cfwhite:false,
      cfhs:false,

      tianjiajy:false,
      jytianjia:true,
      jywhite:false,
      jyhs:false,

      lzwhite:true,
      lzhs:false,
      lzbj:true

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
    }
  }
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