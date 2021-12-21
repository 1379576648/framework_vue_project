<!-- 招聘计划详情页面 -->
<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">
        <el-button style="float:left;margin-top: 25px;margin-left: 20px;" size="mini" @click="goblick()">返回</el-button>
        <div style="display: flex; justify-content: flex-end; padding: 20px 20px 0px;" class="resume-operation">


          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <el-select v-model="formInline.region" placeholder="学历">
                <el-option label="Zone one" value="shanghai"></el-option>
                <el-option label="Zone two" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-select v-model="formInline.region" placeholder="面试状态">
                <el-option label="Zone one" value="shanghai"></el-option>
                <el-option label="Zone two" value="beijing"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-input v-model="formInline.user" placeholder="如：名称、手机号"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button size="small" type="primary" @click="onSubmit" style="background-color: #085fc3;color: whitesmoke">搜索</el-button>
            </el-form-item>

          </el-form>


        </div>


        <div class="myplan-detail">
          <div class="ant-row-flex ant-row-flex-space-between">
            <div class="ant-col">
              <h3>
                {{this.$route.query.name}}
                <span class="small-title">人力资源撰专员202004</span>
              </h3>
            </div>
            <div class="ant-col">
              <el-button type="button" style="background-color: #085fc3;color: whitesmoke">新增候选人</el-button>
            </div>
          </div>

          <ul class="count" style="list-style: none">
            <li style="background-color: rgb(35, 102, 167);">
              <h3>0</h3>
              <span>候选人</span>
            </li>
            <li style="background-color: rgb(73, 167, 130);">
              <h3>0</h3>
              <span>候选人</span>
            </li>
            <li style="background-color: rgb(233, 143, 39);">
              <h3>0</h3>
              <span>候选人</span>
            </li>
            <li style="background-color: rgb(35, 102, 167);">
              <h3>0</h3>
              <span>候选人</span>
            </li>
            <li style="background-color: rgb(73, 167, 130);">
              <h3>0</h3>
              <span>候选人</span>
            </li>
          </ul>

        </div>

        <!-- 表格内容 -->
        <div class="sub-Content__primary">
          <el-table :data="tableData" style="width: 100%" size="mini">
            <el-table-column prop="ID" label="序号" width="150"/>
            <el-table-column prop="zpname" label="招聘计划名称" width="200" />
            <el-table-column prop="zpzw" label="招聘职位" width="200" />
            <el-table-column prop="zpdept" label="需求部门" width="200" />
            <el-table-column prop="zpnum" label="招聘人数" width="200" />
            <el-table-column prop="statetime" label="发布时间" width="200" />
            <el-table-column prop="zpzt" label="招聘状态" width="200" />
            <el-table-column fixed="right" label="操作" width="180">
              <template #default>
                <el-button type="text" size="small" @click="">Detail</el-button>
                <el-button type="text" size="small">Edit</el-button>
              </template>
            </el-table-column>
          </el-table>

        </div>


        <br/>
        <br/>
        <br/>
      </div>
    </div>
  </div>
</template>

<script>

export default{
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    goblick(){
      this.$router.go('-1');
    }
  }
}

</script>


<style type="text/css" scoped>
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

.ant-layout,
.ant-layout * {
  box-sizing: border-box;
}

.mainContent .sub-Content__primary {
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
}
.abt:hover{
  border: 1px solid #085FC3;
  color: #085FC3;
}
/deep/.el-table th.el-table__cell > .cell {
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  vertical-align: middle;
  width: 100%;
  font-weight: initial;
  color: black;
}


/deep/.el-input__inner{
  display: flex;
  width: 240px;
  height: 35px;
}

.myplan-detail {
  padding: 0 22px;
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


.myplan-detail .small-title {
  font-size: 14px;
  font-weight: normal;
}
.ant-btn-primary {
  color: #fff;
  background-color: #409eff;
  border-color:#409eff;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}

.count {
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: -10px;
}
.count li {
  flex: 1;
  padding: 8px;
  cursor: pointer;
  border: 2px solid #fff;
  border-radius: 2px;
  text-align: center;
  transition: all .3s;
  color: #fff;
}
.count li:hover,  .count li.actived {
  border: 2px solid #999999;
  color: #ffffff;
  cursor: pointer;
}


</style>

