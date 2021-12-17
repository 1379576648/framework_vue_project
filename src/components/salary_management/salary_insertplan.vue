<!--新增编辑加班方案 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-head">
        <div class="j-card-head-title" style="margin-left:20px;">
          <span>{{this.$route.query.name}}加班方案</span>
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
            <el-form-item label="方案名称" prop="name" style="width:370px">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="工作日加班工资" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择">
                <el-option label="按小时工资百分比计薪" style="margin-left: 20px;" value="shanghai"></el-option>
                <el-option label="按固定金额" value="beijing" style="margin-left: 20px;"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="发放："  style="width:500px"
             v-if="ruleForm.region=='beijing'">
                <el-input-number
                  v-model="num"
                  :min="1"
                  :max="10000"
                  controls-position="right"
                  @change="handleChange"
                  size="small"
              />
              <span>元 × 工作日加班折算的小时数</span>
            </el-form-item>

            <el-form-item label="发放：小时工资 X"  style="width:500px"
            v-else="">
              <el-input-number
                  v-model="num"
                  :min="1"
                  :max="10000"
                  controls-position="right"
                  @change="handleChange"
                  size="small"
              />
              <span>% × 工作日加班折算的小时数</span>
            </el-form-item>


            <el-form-item label="休息日加班工资" prop="region2">
              <el-select v-model="ruleForm.region2" placeholder="请选择">
                <el-option label="按小时工资百分比计薪" value="xiuxi" style="margin-left: 20px;"></el-option>
                <el-option label="按固定金额" value="xiuxigd" style="margin-left: 20px;"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="发放："  style="width:500px"
                          v-if="ruleForm.region2=='xiuxigd'">
              <el-input-number
                  v-model="num2"
                  :min="1"
                  :max="10000"
                  controls-position="right"
                  @change="handleChange"
                  size="small"
              />
              <span>元 × 休息日加班折算的小时数</span>
            </el-form-item>

            <el-form-item label="发放：小时工资 X"  style="width:500px"
                          v-else="">
              <el-input-number
                  v-model="num2"
                  :min="1"
                  :max="10000"
                  controls-position="right"
                  @change="handleChange"
                  size="small"
              />
              <span>% × 休息日加班折算的小时数</span>
            </el-form-item>


            <el-form-item label="节假日加班工资" prop="region2">
              <el-select v-model="ruleForm.region3" placeholder="请选择">
                <el-option label="按小时工资百分比计薪" value="jiejia" style="margin-left: 20px;"></el-option>
                <el-option label="按固定金额" value="jiejiagd" style="margin-left: 20px;"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="发放："  style="width:500px"
                          v-if="ruleForm.region3=='jiejiagd'">
              <el-input-number
                  v-model="num3"
                  :min="1"
                  :max="10000"
                  controls-position="right"
                  @change="handleChange"
                  size="small"
              />
              <span>元 × 节假日加班折算的小时数</span>
            </el-form-item>

            <el-form-item label="发放：小时工资 X"  style="width:500px"
                          v-else="">
              <el-input-number
                  v-model="num3"
                  :min="1"
                  :max="10000"
                  controls-position="right"
                  @change="handleChange"
                  size="small"
              />
              <span>% × 节假日加班折算的小时数</span>
            </el-form-item>


            <el-form-item label="适用对象" prop="region4">
              <el-select v-model="ruleForm.region4" placeholder="请选择">
                <el-option label="1" value="sydx" style="margin-left: 20px;"></el-option>
                <el-option label="111" value="sydx2" style="margin-left: 20px;"></el-option>
              </el-select>
            </el-form-item>


            <el-form-item label="职位" prop="zw">
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
              <el-button style="width: 60px;" @click="goblack()">取消</el-button>
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
import { ElMessage } from 'element-plus'
export default {
  data() {

    return {
      ruleForm: {
        name: '',
        region: '',
        region2: '',
        region3: '',
        region4: '',
        zw: '',
        desc: '',
      },
      num: '150',
      num2: '200',
      num3: '300',
    }
  },
  methods:{
    goblack(){
      this.$router.go('-1');
    },
    submitForm(){
      if(this.ruleForm.name.length==0){
        ElMessage({
          message: '请输入方案名称',
          type: 'warning',
        })
      }else if(this.ruleForm.region.length==0){
        ElMessage({
          message: '请选择工作日加班工资规则',
          type: 'warning',
        })
      }else if(this.ruleForm.region2.length==0){
        ElMessage({
          message: '请选择休息日加班工资规则',
          type: 'warning',
        })
      }else if(this.ruleForm.region3.length==0){
        ElMessage({
          message: '请选择节假日加班工资规则',
          type: 'warning',
        })
      }else if(this.ruleForm.region4.length==0){
        ElMessage({
          message: '请选择适用对象',
          type: 'warning',
        })
      }else if(this.ruleForm.zw.length==0){
        ElMessage({
          message: '请选择职位',
          type: 'warning',
        })
      }else{
        alert(1111)
      }
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