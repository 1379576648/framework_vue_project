<!-- 招聘计划详情页面 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">
        <span></span>
        <div style="padding: 16px">
          <!-- 返回列表按钮 -->
          <div class="ant-row-flex ant-row-flex-space-between" style="margin-bottom: 16px;">
            <div class="ant-col">
              <el-button plain size="mini" @click="goback()">+ 返回列表</el-button>
            </div>
          </div>
          <!-- 个人消息列 -->
          <div class="ant-row-flex ant-row-flex-space-between" style="margin-bottom: -16px;">
            <div class="ant-col">
              <span style="font-size: 18px; font-weight: bold;">{{this.$route.query.name}}</span>
              &nbsp;&nbsp;
              <span>ID:31089 </span>
              &nbsp;&nbsp;
              <span><span>来源</span>：boss直聘</span>
              &nbsp;&nbsp;
              <span><span>已入职</span>&nbsp;|&nbsp;<span class="ant-tag"><a href="">人力资源专员</a></span></span>
            </div>
            <div class="ant-col">
              <el-button plain size="small">推进下一阶段 ^ </el-button>
            </div>
          </div>

        </div>


        <div class="myResumeDetail">
          <div class="ant-tabs ant-tabs-top ant-tabs-line">

            <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top: 10px;">

              <el-tab-pane name="one">
                <template #label>
                  <div style="width: 120px;text-align: center">简历消息</div>
                </template>

                <div  > <!---->
                  <div style="margin-left: 0%;" class="ant-tabs-content">
                    <div role="tabpanel" aria-hidden="false" class="ant-tabs-tabpane ant-tabs-tabpane-active">
                      <div>
                        <span></span>
                        <div style="margin-left: 40px;margin-right: 40px;">
                          <br/>
                          <!--
                          个人信息
                          -->
                          <div style="display: block;margin-top: 15px;" class="mt-15" >
                            <div class="ant-card">
                              <div style="padding: 0px;">
                                <!-- 个人消息标题 -->
                                <div class="ant-row">
                                  <!-- 标题 -->
                                  <div style="font-size: 18px; font-weight: bold;" class="ant-col ant-col-12 gutter-example">
                                    <span>个人信息</span>
                                  </div>
                                  <!-- 编辑按钮 -->
                                  <div style="text-align: right">
                                    <el-button plain style="width: 70px" @click="personal_details=true" size="mini">+ 编辑</el-button>
                                  </div>
                                </div>
                                <!-- 个人消息内容 -->
                                <div class="gutter-example mycard">

                                  <div style="margin-left: -8px; margin-right: -8px;" class="ant-row">
                                    <!-- 性别 -->
                                    <div style="padding-left: 8px; padding-right: 8px;" class="ant-col ant-col-7 gutter-row">
                                      <div style="float: left;">
                                        <span>性别</span>：
                                        男
                                      </div>
                                    </div>
                                    <!-- 邮箱 -->
                                    <div style="padding-left: 8px; padding-right: 8px;" class="ant-col ant-col-7 gutter-row">
                                      <div style="float: left;">
                                        <span>邮箱</span>：
                                        3210053361@qq.com
                                      </div>
                                    </div>
                                  </div>
                                  <div style="margin-left: -8px; margin-right: -8px;" class="ant-row">
                                    <div style="padding-left: 8px; padding-right: 8px;" class="ant-col ant-col-7 gutter-row">
                                      <div style="float: left;">
                                        <span>政治面貌</span>：
                                      </div>
                                    </div>
                                    <!-- 婚姻状况 -->
                                    <div style="padding-left: 8px; padding-right: 8px;" class="ant-col ant-col-7 gutter-row">
                                      <div style="float: left;">
                                        <span>婚姻状况</span>：
                                      </div>
                                    </div>
                                  </div>



                                </div>
                              </div>
                            </div>
                          </div>



                          <el-dialog
                              v-model="personal_details"
                              title="个人信息"
                              width="900px"
                              :before-close="handleClose"
                          >
                            <el-form :inline="true" v-model="affiche">
                              <el-form-item size="small" style="font-weight: bold;size: 14px;margin-left: 124px;width: 268px;"  label="邮箱：">
                                <el-input ></el-input>
                              </el-form-item>

                              <el-form-item style="font-weight: bold;size: 14px;margin-left: 120px;margin-top: -15px;"  label="性别：">
                                <div class="normal">
                                  <el-radio v-model="affiche.radio1" label="1">正常</el-radio>
                                </div>
                                <div class="shut">
                                  <el-radio v-model="affiche.radio1" label="2">关闭</el-radio>
                                </div>
                              </el-form-item>

                              <el-form-item style="font-weight: bold;margin-top: 20px;size: 14px;margin-left: 95px;" label="政治面貌：">
                                <el-select size="small" style="width: 215px" v-model="affiche.politics_status" >
                                  <el-option
                                      v-for="item in politics_status"
                                      :key="item.value1"
                                      :label="item.label"
                                      :value="item.value1"
                                  ></el-option>
                                </el-select>
                              </el-form-item>

                              <el-form-item style="font-weight: bold;margin-top: 20px;size: 14px;margin-left: 90px;" label="婚姻状况：">
                                <el-select size="small" style="width: 215px" v-model="affiche.marriage" >
                                  <el-option
                                      v-for="item in marriage"
                                      :key="item.value1"
                                      :label="item.label"
                                      :value="item.value1"
                                  ></el-option>
                                </el-select>
                              </el-form-item>

                              <el-form-item >
                                <div class="announcement-cz">
                                  <el-button size="small " style="width: 85px;" @click="personal_details=false">
                                    取消
                                  </el-button>
                                  <el-button size="small " style="width: 85px;" type="primary" >
                                    保存
                                  </el-button>
                                </div>
                              </el-form-item>

                            </el-form>
                          </el-dialog>



                          <div class="ant-divider ant-divider-horizontal" style="margin-top: 15px;" role="separator"></div>
                          <!--
                          求职意向信息
                           -->
                          <div style="display: block;margin-top: 15px;" class="mt-15" >
                            <div class="ant-card">
                              <div style="padding: 0px;">
                                <!-- 求职意向标题 -->
                                <div class="ant-row">
                                  <!-- 标题 -->
                                  <div style="font-size: 18px; font-weight: bold;" class="ant-col ant-col-12 gutter-example">
                                    <span>求职意向</span>
                                  </div>
                                  <!-- 编辑按钮 -->
                                  <div style="text-align: right">
                                    <el-button plain style="width: 70px" size="mini" @click="job_intention=true">+ 编辑</el-button>
                                  </div>
                                </div>
                                <!--求职意向内容 -->
                                <div class="gutter-example mycard">

                                  <div style="margin-left: -8px; margin-right: -8px;" class="ant-row">
                                    <div style="padding-left: 8px; padding-right: 8px;" class="ant-col ant-col-7 gutter-row">
                                      <div style="float: left;">
                                        <span>期望薪资</span>：3000-4000
                                        元
                                      </div>
                                    </div>

                                  </div>

                                  <div style="margin-left: -8px; margin-right: -8px;" class="ant-row">
                                    <div style="padding-left: 8px; padding-right: 8px;" class="ant-col ant-col-7 gutter-row">
                                      <div style="float: left;">
                                        <span>到岗时间</span>：2020-10-11
                                      </div>
                                    </div>

                                  </div>

                                  <div style="margin-left: -8px; margin-right: -8px;" class="ant-row">
                                    <div style="padding-left: 8px; padding-right: 8px;" class="ant-col ant-col-7 gutter-row">
                                      <div style="float: left;">
                                        <span>自我评价</span>：优秀、非常优秀、相对牛逼
                                      </div>
                                    </div>

                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>
                          <!--
                               求职意向信息对话框
                           -->
                          <el-dialog
                              v-model="job_intention"
                              title="求职意向"
                              width="900px"
                              :before-close="handleClose"
                          >
                            <el-form :inline="true" v-model="affiches">
                              <el-form-item size="small" style="font-weight: bold;size: 14px;margin-left: 124px;width: 268px;"  label="期望薪资：">
                                <el-input v-model="affiches.pay"></el-input>
                              </el-form-item>

                              <el-form-item style="font-weight: bold;size: 14px;margin-left: 53px;margin-top: -15px;"  label="到岗时间：">
                                <div class="block">
                                  <el-date-picker v-model="affiches.value1" type="date" placeholder="Pick a day">
                                  </el-date-picker>
                                </div>
                              </el-form-item>

                              <el-form-item style="font-weight: bold;margin-top: 20px;size: 14px;margin-left: 123px;" label="自我评价：">
                                <el-input
                                    v-model="affiches.content"
                                    style="
                                      width: 549px;
                                      font-weight: bold;
                                      margin-top: 9px;"
                                    type="textarea">
                                </el-input>
                              </el-form-item>

                              <el-form-item >
                                <div class="announcement-cz">
                                  <el-button size="small " style="width: 85px;" @click="job_intention=false">
                                    取消
                                  </el-button>
                                  <el-button size="small " style="width: 85px;" type="primary">
                                    保存
                                  </el-button>
                                </div>
                              </el-form-item>

                            </el-form>
                          </el-dialog>



                          <div class="ant-divider ant-divider-horizontal" style="margin-top: 15px;" role="separator"></div>

                          <!--
                           最近工作、最高学历
                            -->
                          <div class="ant-card">
                            <div class="ant-card-body" style="padding: 15px 0px 0px;">
                              <!--  最近工作、最高学历标题 -->
                              <div class="ant-row">
                                <!-- 标题 -->
                                <div style="font-size: 18px; font-weight: bold;" class="ant-col ant-col-12 gutter-example">
                                  <span>最高学历</span>
                                </div>
                                <div style="font-size: 18px; font-weight: bold; width: 30%;" class="ant-col ant-col-12 gutter-example">
                                  <span>最近工作</span>
                                </div>
                                <!-- 编辑按钮 -->
                                <div style="text-align: right">
                                  <el-button plain style="width: 70px" size="mini" @click="job_qualifications=true">+ 编辑</el-button>
                                </div>
                              </div>

                              <div class="gutter-example mycard">
                                <div style="margin-left: -8px; margin-right: -8px;" class="ant-row">

                                  <div style="padding-left: 8px; padding-right: 8px;" class="ant-col ant-col-7 gutter-row">
                                    <div style="float: left;">
                                      <span>专业</span>：java工程师
                                    </div>
                                  </div>

                                  <div style="padding-left: 8px; padding-right: 8px;" class="ant-col ant-col-7 gutter-row">
                                    <div style="float: left;">
                                      <span>职位</span>：老板
                                    </div>
                                  </div>

                                </div>

                                <div style="margin-left: -8px; margin-right: -8px;" class="ant-row">


                                  <div style="padding-left: 8px; padding-right: 8px;" class="ant-col ant-col-7 gutter-row">
                                    <div style="float: left;">
                                      <span>学校</span>：家里蹲大学
                                    </div>
                                  </div>

                                  <div style="padding-left: 8px; padding-right: 8px;" class="ant-col ant-col-7 gutter-row">
                                    <div style="float: left;">
                                      <span>公司</span>：王鑫科技集团
                                    </div>
                                  </div>

                                </div>

                                <div style="margin-left: -8px; margin-right: -8px;" class="ant-row">
                                  <div style="padding-left: 8px; padding-right: 8px;" class="ant-col ant-col-7 gutter-row">
                                    <div style="float: left;">
                                      <span>学历</span>：博士之上
                                    </div>
                                  </div>

                                </div>

                              </div>
                            </div>
                          </div>


                          <el-dialog
                              v-model="job_qualifications"
                              title="最近工作"
                              width="900px"
                              :before-close="handleClose"
                          >
                            <el-form :inline="true" v-model="qualifications">
                              <el-form-item size="small" style="font-weight: bold;size: 14px;margin-left: 124px;width: 268px;"  label="专业：">
                                <el-input v-model="qualifications.specialty"></el-input>
                              </el-form-item>

                              <el-form-item style="font-weight: bold;margin-top: -14px;size: 14px;margin-left: 61px;" label="职位 ：">
                                <el-select size="small" style="width: 215px" v-model="qualifications.position" >
                                  <el-option
                                      v-for="item in position"
                                      :key="item.value1"
                                      :label="item.label"
                                      :value="item.value1"
                                  ></el-option>
                                </el-select>
                              </el-form-item>

                              <el-form-item size="small" style="font-weight: bold;size: 14px;margin-left: 124px;margin-top: 20px;width: 268px;"  label="学校：">
                                <el-input v-model="qualifications.school"></el-input>
                              </el-form-item>

                              <el-form-item size="small" style="font-weight: bold;size: 14px;margin-left: 62px;margin-top: 20px;width: 268px;"  label="公司：">
                                <el-input v-model="qualifications.company"></el-input>
                              </el-form-item>

                              <el-form-item style="font-weight: bold;margin-top: 10px;size: 14px;margin-left: 122px;" label="学历：">
                                <el-select size="small" style="width: 215px" v-model="qualifications.education_background" >
                                  <el-option
                                      v-for="item in education_background"
                                      :key="item.value1"
                                      :label="item.label"
                                      :value="item.value1"
                                  ></el-option>
                                </el-select>
                              </el-form-item>

                              <el-form-item >
                                <div class="announcement-cz">
                                  <el-button size="small " style="width: 85px;" @click="job_qualifications=false">
                                    取消
                                  </el-button>
                                  <el-button size="small " style="width: 85px;" type="primary" >
                                    保存
                                  </el-button>
                                </div>
                              </el-form-item>

                            </el-form>
                          </el-dialog>

                          <div class="ant-divider ant-divider-horizontal" style="margin-top: 15px;" role="separator"></div>

                          <!--
                            工作经历
                             -->
                          <div style="display: block;margin-top: 15px;" class="mt-15" >
                            <div class="ant-card">
                              <div style="padding: 0px;">
                                <!-- 工作经历标题 -->
                                <div class="ant-row">
                                  <!-- 标题 -->
                                  <div style="font-size: 18px; font-weight: bold;" class="ant-col ant-col-12 gutter-example">
                                    <span>工作经历</span>
                                  </div>
                                  <!-- 编辑按钮 -->
                                  <div style="text-align: right">
                                    <el-button plain style="width: 70px" size="mini" @click="work_experience=true">+ 新增</el-button>
                                  </div>
                                </div>
                                <!--工作经历内容  循环 -->
                                <div class="mycard">
                                  <!-- 图标： 删除按钮 -->
                                  <div class="close">
                                    <i class="iconfont">&#xe603;</i>
                                  </div>
                                  <div class="title">
                                    <span>时间：2001-10-10~2010-11-12</span>
                                    <span>任职公司：王鑫科技集团</span>
                                    <span>所属行业：销售</span>
                                  </div>
                                  <div class="title">
                                    <span>职位：总管</span>
                                    <span>税前工资：20000  元/月</span>
                                  </div>
                                  <div class="desc">
                                    <div class="title">工作描述:</div>
                                    <div class="desc-pre">无</div>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>


                          <el-dialog
                              v-model="work_experience"
                              title="工作经历"
                              width="900px"
                              :before-close="handleClose"
                          >
                            <el-form :inline="true" v-model="experience">
                              <el-form-item size="small" style="font-weight: bold;size: 14px;margin-left: 124px;width: 268px;"  label="任职公司：">
                                <el-input v-model="experience.firm"></el-input>
                              </el-form-item>

                              <el-form-item style="font-weight: bold;margin-top: -14px;size: 14px;margin-left: 61px;" label="职位 ：">
                                <el-select size="small" style="width: 215px" v-model="experience.position" >
                                  <el-option
                                      v-for="item in position"
                                      :key="item.value1"
                                      :label="item.label"
                                      :value="item.value1"
                                  ></el-option>
                                </el-select>
                              </el-form-item>

                              <el-form-item size="small" style="font-weight: bold;margin-top: 20px;size: 14px;margin-left: 124px;width: 268px;"  label="所属行业：">
                                <el-input v-model="experience.industry"></el-input>
                              </el-form-item>

                              <el-form-item size="small" style="font-weight: bold;margin-top: 20px;size: 14px;margin-left: 37px;width: 295px;"  label="税前工资：">
                                <el-input v-model="experience.salary"></el-input>
                              </el-form-item>

                              <el-form-item size="small" style="font-weight: bold;margin-top: 20px;size: 14px;margin-left: 122px;width: 268px;"  label="工作时间：">
                                <el-date-picker
                                    size="small"
                                    v-model="experience.time"
                                    type="daterange"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]"
                                >
                                </el-date-picker>
                              </el-form-item>

                              <el-form-item style="font-weight: bold;margin-top: 20px;size: 14px;margin-left: 123px;" label="工作描述：">
                                <el-input
                                    v-model="experience.describe "
                                    style="
                                      width: 549px;
                                      font-weight: bold;
                                      margin-top: 9px;"
                                    type="textarea">
                                </el-input>
                              </el-form-item>

                              <el-form-item >
                                <div class="announcement-cz">
                                  <el-button size="small " style="width: 85px;" @click="work_experience=false">
                                    取消
                                  </el-button>
                                  <el-button size="small " style="width: 85px;" type="primary" >
                                    保存
                                  </el-button>
                                </div>
                              </el-form-item>

                            </el-form>
                          </el-dialog>


                          <div class="ant-divider ant-divider-horizontal" style="margin-top: 15px;" role="separator"></div>

                          <!--
                            教育经历
                             -->
                          <div style="display: block;margin-top: 15px;" class="mt-15" >
                            <div class="ant-card">
                              <div style="padding: 0px;">
                                <!-- 工作经历标题 -->
                                <div class="ant-row">
                                  <!-- 标题 -->
                                  <div style="font-size: 18px; font-weight: bold;" class="ant-col ant-col-12 gutter-example">
                                    <span>教育经历</span>
                                  </div>
                                  <!-- 编辑按钮 -->
                                  <div style="text-align: right">
                                    <el-button plain style="width: 70px" size="mini" @click="education_experience=true">+ 新增</el-button>
                                  </div>
                                </div>
                                <!--工作经历内容  循环 -->
                                <div class="mycard">
                                  <!-- 图标： 删除按钮 -->
                                  <div class="close">
                                    <i class="iconfont">&#xe603;</i>
                                  </div>
                                  <div class="title">
                                    <span>时间：2001-10-10~2010-11-12</span>
                                    <span>任职公司：王鑫科技集团</span>
                                    <span>所属行业：销售</span>
                                  </div>
                                  <div class="title">
                                    <span>职位：总管</span>
                                    <span>税前工资：20000  元/月</span>
                                  </div>
                                  <div class="desc">
                                    <div class="title">工作描述:</div>
                                    <div class="desc-pre">无</div>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>


                          <el-dialog
                              v-model="education_experience"
                              title="教育经历"
                              width="900px"
                              :before-close="handleClose"
                          >
                            <el-form :inline="true" v-model="education">
                              <el-form-item size="small" style="font-weight: bold;size: 14px;margin-left: 124px;width: 268px;"  label="学校名字：">
                                <el-input v-model="education.school_name"></el-input>
                              </el-form-item>

                              <el-form-item size="small" style="font-weight: bold;size: -14px;margin-left: 61px;width: 268px;"  label="所学专业：">
                                <el-input v-model="education.major"></el-input>
                              </el-form-item>

                              <el-form-item style="font-weight: bold;margin-top: 10px;size: 14px;margin-left: 150px;" label="学历：">
                                <el-select size="small" style="width: 187px" v-model="education.backgrounds" >
                                  <el-option
                                      v-for="item in backgrounds"
                                      :key="item.value1"
                                      :label="item.label"
                                      :value="item.value1"
                                  ></el-option>
                                </el-select>
                              </el-form-item>

                              <el-form-item style="font-weight: bold;size: 14px;margin-left: 48px;margin-top: 10px;"  label="是否全日制：">
                                <div class="normal">
                                  <el-radio v-model="experience.full_time" label="1">是</el-radio>
                                </div>
                                <div class="shut">
                                  <el-radio v-model="experience.full_time" label="2">否</el-radio>
                                </div>
                              </el-form-item>

                              <el-form-item size="small" style="font-weight: bold;margin-top: 30px;size: 14px;margin-left: 122px;width: 268px;"  label="受教时长：">
                                <el-date-picker
                                    size="small"
                                    v-model="experience.duration"
                                    type="daterange"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]"
                                >
                                </el-date-picker>
                              </el-form-item>

                              <el-form-item >
                                <div class="announcement-czs">
                                  <el-button size="small " style="width: 85px;" @click="work_experience=false">
                                    取消
                                  </el-button>
                                  <el-button size="small " style="width: 85px;" type="primary" >
                                    保存
                                  </el-button>
                                </div>
                              </el-form-item>

                            </el-form>
                          </el-dialog>

                          <!--备注-->
                          <div class="ant-divider ant-divider-horizontal" style="margin-top: 15px;" role="separator"></div>
                          <div style="display: block;margin-top: 15px;" class="mt-15" >
                            <div class="ant-card">
                              <div style="padding: 0px;">
                                <!-- 工作经历标题 -->
                                <div class="ant-row">
                                  <!-- 标题 -->
                                  <div style="font-size: 18px; font-weight: bold;" class="ant-col ant-col-12 gutter-example">
                                    <span>备注</span>
                                  </div>
                                  <!-- 编辑按钮 -->
                                  <div style="text-align: right">
                                    <el-button plain style="width: 70px" size="mini">+ 新增</el-button>
                                  </div>
                                </div>
                                <!--工作经历内容  循环 -->
                                <div class="mycard">
                                  <!-- 图标： 删除按钮 -->
                                  <div class="close">
                                    <i class="iconfont">&#xe603;</i>
                                  </div>
                                  <div class="title">
                                    <span>时间：2001-10-10~2010-11-12</span>
                                    <span>备注人：石毅</span>
                                  </div>
                                  <div class="title">
                                    <span>备注内容：你妈的</span>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </el-tab-pane>

              <el-tab-pane name="two">
                <template #label>
                  <div style="width: 120px;text-align: center">邀约消息</div>
                </template>

              </el-tab-pane>

              <el-tab-pane name="three">
                <template #label>
                  <div style="width: 120px;text-align: center">面试评价</div>
                </template>

              </el-tab-pane>

              <el-tab-pane name="fore">
                <template #label>
                  <div style="width: 120px;text-align: center">面试评价</div>
                </template>

              </el-tab-pane>

            </el-tabs>


          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>



import {  reactive, toRefs ,ref} from 'vue'

export default {
  data() {

    const time = ref('')
    const duration = ref('')

    const state = reactive({
      disabledDate(time) {
        return time.getTime() > Date.now()
      },
      value1:'',
    })

    return {
      //到岗时间
      ...toRefs(state),
      activeName: 'one',
      //个人信息弹出框
      personal_details:false,
      affiche:{
        //政治面貌
        politics_status:'',
        //单选框按钮
        radio1:'1',
        //婚姻状况
        marriage:'',
      },
      politics_status:ref([
        {
          value1: '村书记',
          label: '村书记',
        },
        {
          value1: '村干部',
          label: '村干部',
        }
      ]),
      //婚姻状况
      marriage:ref([
        {
          value1: '已婚',
          label: '已婚',
        },
        {
          value1: '未婚',
          label: '未婚',
        },
        {
          value1: '离婚',
          label: '离婚',
        }

      ]),

      //求职意向对话框
      job_intention:false,
      affiches:{
        //自我评价
        content:'',
        //期望薪资
        pay:'',
        //到岗时间
        value1:''
      },


      //最高学历最近工作
      job_qualifications:false,
      qualifications:{
        //专业
        specialty:'',
        //职位
        position:'',
        //学校
        school:'',
        //公司
        company:'',
        //学历
        education_background:'',
      },
      position:ref([
        {
          value1: '厨师',
          label: '厨师',
        },
        {
          value1: '部长',
          label: '部长',
        },
        {
          value1: '老板',
          label: '老板',
        }
      ]),
      education_background:ref([
        {
          value1: '小学',
          label: '小学',
        },
        {
          value1: '高中',
          label: '高中',
        },
        {
          value1: '大学',
          label: '大学',
        }
      ]),

      //工作经历
      work_experience:false,
      experience:{
        firm:'',
        position:'',
        industry:'',
        salary:'',
        time:'',
        describe:'',

      },
      //教育经历
      education_experience:false,
      education:{
        //学校名字
        school_name:'',
        //所学专业
        major:'',
        //学历
        backgrounds:'',
        //教育时长
        duration:'',
        //是否全日制
        full_time:'1'

      },
      backgrounds:ref([
        {
          value1: '小学',
          label: '小学',
        },
        {
          value1: '高中',
          label: '高中',
        },
        {
          value1: '大学',
          label: '大学',
        }
      ]),
    }

  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    goback(){
      this.$router.go('-1');
    }
  },
}


</script>


<style type="text/css" scoped>
@import url('../../css/navigation.css');

@font-face {
  font-family: 'iconfont';  /* Project id 2985811 */
  src: url('//at.alicdn.com/t/font_2985811_0z1f95yydth.woff2?t=1639493721834') format('woff2'),
  url('//at.alicdn.com/t/font_2985811_0z1f95yydth.woff?t=1639493721834') format('woff'),
  url('//at.alicdn.com/t/font_2985811_0z1f95yydth.ttf?t=1639493721834') format('truetype');
}
.announcement-czs{
  margin-top: 15px;
  margin-left: 345px;
}
.announcement-cz{
  margin-top: 35px;
  margin-left: 345px;
}
.normal{
  margin-top: 1px;
}
.shut{
  margin-top: -40px;
  margin-left: 73px;
}
.iconfont{
  font-family:"iconfont" !important;
  font-size:16px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  color: black;
}
.mycard i:hover{
  cursor:pointer;
}
.mycard .title {
  font-size: 14px;
  line-height: 1.75;
}
.title span{
  padding-right: 80px;
}
.mycard .desc{
  width: 1000px;
}
.mycard .desc-pre {
  line-height: 1.75;
  font-family: inherit;
  margin-left: 1em;
  white-space: pre-wrap;
}


.mycard .close {
  position: absolute;
  right: 8px;
  top: 8px;
}

.ant-divider {
  color: rgba(0, 0, 0, 0.65);
  background: #e8e8e8;
}
.ant-divider {
  margin: 0 2px;
  margin-top: 0px;
}
.ant-divider-horizontal {
  display: block;
  clear: both;
  width: 100%;
  min-width: 100%;
  height: 1px;
}
.ant-divider{
  position: relative;
  top: -0.06em;
}
.ant-divider {
  box-sizing: border-box;
  padding: 0;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: 'tnum';
}



.mycard:hover {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
  border-color: transparent;
}

.ant-tabs-content::before {
  display: block;
  overflow: hidden;
  content: '';
}
.ant-tabs .ant-tabs-top-content > .ant-tabs-tabpane, .ant-tabs .ant-tabs-bottom-content > .ant-tabs-tabpane {
  flex-shrink: 0;
  width: 100%;
  -webkit-backface-visibility: hidden;
  opacity: 1;
  transition: opacity 0.45s;
}
.myResumeDetail .ant-tabs-tabpane {
  max-height: 800px;
  overflow: auto;
  padding-bottom: 200px;
}
.mainContent .ant-card, .edit__forms .ant-card {
  width: 100%;
}
.ant-card {
  color: rgba(0, 0, 0, 0.65);
  background: #fff;
  border-radius: 2px;
}
.ant-card {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #333;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;
  background: #fff;
  border-radius: 2px;
  transition: all 0.3s;
}
.ant-row {
  position: relative;
  height: auto;
  margin-right: 0;
  margin-left: 0;
  zoom: 1;
  display: block;
  box-sizing: border-box;
}
.ant-col-12 {
  display: block;
  box-sizing: border-box;
  width: 30%;
}
.ant-col-12,ant-col-7 {
  flex: 0 0 auto;
  position: relative;
  padding-right: 0;
  padding-left: 0;
}
.ant-col{
  min-height: 1px;
}

.ant-col-7,ant-col-12{
  float: left;
}
/**
 消息内容面板样式
 */
.mycard {
  padding: 16px;
  margin-top: 16px;
  border: 1px solid #f0f3f6;
  position: relative;
  border-radius: 4px;
  background-color: rgba(33, 168, 223, 0.05);
  transition: all .3s;
}

.ant-col-7 {
  display: block;
  box-sizing: border-box;
  width: 29.16666667%;
}






.ant-row-flex-space-between {
  justify-content: space-between;
}
.ant-row-flex {
  display: flex;
  flex-flow: row wrap;
}
.ant-col {
  position: relative;
  min-height: 1px;
}

.ant-tabs {
  color: rgba(0, 0, 0, 0.65);
}
.ant-tabs {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #333;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;
  overflow: hidden;
  zoom: 1;
}
.ant-tabs::before, .ant-tabs::after {
  display: table;
  content: '';
}
*, ::before, ::after {
  box-sizing: border-box;
}


/deep/ .el-tabs__item {
  padding: 0px 10px;
  padding-left: 36px;
  height: 40px;
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-size: 14px;
  font-weight: 500;
  color: var(--el-text-color-primary);
  position: relative;
}
/deep/.el-tabs__nav {
  white-space: nowrap;
  position: relative;
  transition: transform var(--el-transition-duration);
  float: left;
  z-index: calc(var(--el-index-normal) + 1);
  margin-left: 0px;
}

a{
  font-size: 15px;
  color: black;
}



</style>

