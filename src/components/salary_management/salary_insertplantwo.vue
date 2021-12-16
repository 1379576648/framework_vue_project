<!--新增编辑考勤方案 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-head">
        <div class="j-card-head-title" style="margin-left:20px;">
          <span>考勤方案</span>
        </div>
      </div>
      <div class="j-card-body">
        <div class="sub-Content__primary edit__forms">
          <div class="ant-spin-nested-loading">
            <div class="ant-spin-container">
              <div style="margin-left: 150px">
                <el-form
                    ref="ruleForm"
                    :model="ruleForm"
                    :rules="rules"
                    label-width="150px"
                    class="demo-ruleForm"
                >
                  <el-form-item label="方案名称：" prop="name" style="width:370px" required>
                    <el-input v-model="ruleForm.name"></el-input>
                  </el-form-item>



                  <el-form-item label="迟到：" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="请选择">
                      <el-option label="按固定金额扣款" value="gdje" style="margin-left: 20px;"></el-option>
                      <el-option label="按迟到时长扣款" value="gdje2" style="margin-left: 20px;"></el-option>
                      <el-option label="按迟到次数扣款" value="gdje3" style="margin-left: 20px;"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="扣款："  style="width:500px"
                                v-if="ruleForm.region=='gdje'">
                    <el-input-number
                        v-model="num"
                        :min="0"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元/月</span>
                  </el-form-item>

                  <el-form-item label="扣款："  style="width:500px"
                                v-else-if="ruleForm.region=='gdje2'">
                    <el-input-number
                        v-model="num"
                        :min="0"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元x迟到的分钟数</span>
                  </el-form-item>

                  <el-form-item label="扣款："  style="width:500px"
                                v-else="ruleForm.region=='gdje3'">
                    <el-input-number
                        v-model="num"
                        :min="0"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元x迟到次数</span>
                  </el-form-item>



                  <el-form-item label="早退：" prop="region">
                    <el-select v-model="ruleForm.region2" placeholder="请选择">
                      <el-option label="按固定金额扣款" value="zt" style="margin-left: 20px;"></el-option>
                      <el-option label="按早退时长扣款" value="zt2" style="margin-left: 20px;"></el-option>
                      <el-option label="按早退次数扣款" value="zt3" style="margin-left: 20px;"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="扣款："  style="width:500px"
                                v-if="ruleForm.region2=='zt'">
                    <el-input-number
                        v-model="num"
                        :min="0"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元/月</span>
                  </el-form-item>

                  <el-form-item label="扣款："  style="width:500px"
                                v-else-if="ruleForm.region2=='zt2'">
                    <el-input-number
                        v-model="num"
                        :min="0"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元x早退的分钟数</span>
                  </el-form-item>

                  <el-form-item label="扣款："  style="width:500px"
                                v-else="ruleForm.region=='zt3'">
                    <el-input-number
                        v-model="num"
                        :min="0"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元x早退次数</span>
                  </el-form-item>




                  <el-form-item label="未签到：" prop="region">
                    <el-select v-model="ruleForm.region3" placeholder="请选择">
                      <el-option label="按固定金额扣款" value="wqd" style="margin-left: 20px;"></el-option>
                      <el-option label="按未签到时长扣款" value="wqd2" style="margin-left: 20px;"></el-option>
                      <el-option label="按未签到次数扣款" value="wqd3" style="margin-left: 20px;"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="扣款："  style="width:500px"
                                v-if="ruleForm.region3=='wqd'">
                    <el-input-number
                        v-model="num"
                        :min="0"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元/月</span>
                  </el-form-item>

                  <el-form-item label="扣款："  style="width:500px"
                                v-else-if="ruleForm.region3=='wqd2'">
                    <el-input-number
                        v-model="num"
                        :min="0"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元x未签到的分钟数</span>
                  </el-form-item>

                  <el-form-item label="扣款："  style="width:500px"
                                v-else="ruleForm.region3=='wqd3'">
                    <el-input-number
                        v-model="num"
                        :min="0"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元x未签到次数</span>
                  </el-form-item>



                  <el-form-item label="未签退：" prop="region">
                    <el-select v-model="ruleForm.region4" placeholder="请选择">
                      <el-option label="按固定金额扣款" value="wqt" style="margin-left: 20px;"></el-option>
                      <el-option label="按未签退时长扣款" value="wqt2" style="margin-left: 20px;"></el-option>
                      <el-option label="按未签退次数扣款" value="wqt3" style="margin-left: 20px;"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="扣款："  style="width:500px"
                                v-if="ruleForm.region4=='wqt'">
                    <el-input-number
                        v-model="num"
                        :min="0"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元/月</span>
                  </el-form-item>

                  <el-form-item label="扣款："  style="width:500px"
                                v-else-if="ruleForm.region4=='wqt2'">
                    <el-input-number
                        v-model="num"
                        :min="0"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元x未签退的分钟数</span>
                  </el-form-item>

                  <el-form-item label="扣款："  style="width:500px"
                                v-else="ruleForm.region4=='wqt3'">
                    <el-input-number
                        v-model="num"
                        :min="0"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元x未签退次数</span>
                  </el-form-item>




                  <el-form-item label="旷工：" prop="region2">
                    <el-select v-model="ruleForm.region5" placeholder="请选择">
                      <el-option label="按小时工资比例扣款" value="xiuxi" style="margin-left: 20px;"></el-option>
                      <el-option label="按月累计旷工时长扣款" value="xiuxigd" style="margin-left: 20px;"></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item label="扣款："  style="width:500px"
                                v-if="ruleForm.region5=='xiuxigd'">
                    <el-input-number
                        v-model="num2"
                        :min="1"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>元 × 旷工折算的小时数</span>
                  </el-form-item>

                  <el-form-item label="扣款：小时工资 X"  style="width:500px"
                                v-else="">
                    <el-input-number
                        v-model="num2"
                        :min="1"
                        :max="10000"
                        controls-position="right"
                        @change="handleChange"
                        size="small"
                    />
                    <span>% × 旷工折算的小时数</span>
                  </el-form-item>






                  <el-form-item label="适用对象" prop="region">
                    <el-select v-model="ruleForm.region6" placeholder="请选择">
                      <el-option label="1" value="sydx" style="margin-left: 20px;"></el-option>
                      <el-option label="111" value="sydx2" style="margin-left: 20px;"></el-option>
                    </el-select>
                  </el-form-item>


                  <el-form-item label="职位" prop="region">
                    <el-select v-model="ruleForm.zw" placeholder="请选择">
                      <el-option label="212" value="zw" style="margin-left: 20px;"></el-option>
                      <el-option label="22222" value="zw1" style="margin-left: 20px;"></el-option>
                    </el-select>
                  </el-form-item>














                  <el-form-item label="备注" prop="desc" style="width:500px">
                    <el-input v-model="ruleForm.desc" type="textarea"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" style="width: 60px;" @click="submitForm('ruleForm')"
                    >提交</el-button
                    >
                    <router-link to="/attendance">&nbsp;
                      <el-button @click="goblack()" style="width: 60px;">取消</el-button></router-link>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  &nbsp;
</template>




<script lang="ts">
export default {
  data() {

    return {
      ruleForm: {
        name: '',
        region: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur',
          },

        ],
      },
      num: '0',
      num2:300,
    }
  },
  methods:{
    goblack(){
      this.$router.go('-1');
    }
  }
}
</script>


<style scoped>
@import url("../../css/navigation.css");
@import url(../../css/dimission.css);

/deep/.el-form-item__label {
  flex: 0 0 auto;
  text-align: right;
  font-size: var(--el-form-label-font-size);
  color: var(--el-text-color-regular);
  line-height: 40px;
  padding: 0 12px 0 0;
  box-sizing: border-box;
  width: 240px;
}
</style>