<!-- 登录日志页面 -->

<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">
        <div class="mt-20 ml-20 mr-20">
          <el-form :inline="true"	v-model="search">
            <!-- 系统模块搜索 -->
            <el-form-item label="系统模块">
              <el-input style="border: 1px;width: 243px;" size="small" v-model="search.system_module" placeholder="请输入系统模块"></el-input>
            </el-form-item>

            <!-- 操作人员搜索 -->
            <el-form-item class="form-staff" label="操作人员">
              <el-input size="small" v-model="search.username" placeholder="请输入操作人员"></el-input>
            </el-form-item>

            <!-- 操作类型搜索 -->
            <el-form-item class="form-type" label="操作类型">
              <el-select class="form-types" size="small" v-model="search.type" placeholder="操作类型">
                <el-option
                    v-for="item in type"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <!-- 登录状态搜索 -->
            <el-form-item class="form-state" label="登录状态">
              <el-select class="form-states" size="small" v-model="search.state" placeholder="登录状态">
                <el-option
                    v-for="item in state"
                    :key="item.value1"
                    :label="item.label"
                    :value="item.value1"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <!-- 操作时间搜索 -->
            <el-form-item class="form-time"  label="登录时间">
              <el-date-picker style="width: 242px;"
                              size="small"
                              margin-left: 0px;
                              v-model="search.value2"
                              type="daterange"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]"
              >
              </el-date-picker>
            </el-form-item>

            <!-- 操作按钮 -->
            <el-form-item class="search">
              <el-button size="mini" class="search-ss" type="primary">
                <i class="iconfont">
                  &#xe61b
                </i>
                搜索
              </el-button>
              <el-button size="mini" class="search-cz" type="primary" @click="reset()">
                <i class="iconfont">
                  &#xe6b8
                </i>
                重置
              </el-button>
            </el-form-item>
          </el-form>

          <!-- 对数据的增删改按钮 -->
          <div class="button">
            <el-button class="button-delete" size="mini"  v-bind:disabled="disableds" @click="remove">删除</el-button>
            <el-button class="button-empty" size="mini" @click="empty">清空</el-button>
          </div>

          <!-- 表格内容部分 -->
          <div class="sub-Content__primary">
            <el-table :data="tableData" style="width: 100%"
                      @selection-change="deletepl"
                      :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
                      :cell-style="{ textAlign: 'center' }"
                      :default-sort="{ prop: 'date', order: 'descending' }"
            >
              <!-- 全选操作按钮 -->
              <el-table-column type="selection" width="50" />
              <el-table-column prop="id" label="日志编号" width="105" />
              <el-table-column prop="module" label="系统模块" width="105" />
              <el-table-column prop="type" label="操作类型" width="105" />
              <el-table-column prop="name" label="员工名称" width="105" />
              <el-table-column prop="post" label="员工职位" width="105" />
              <el-table-column prop="beg_way" label="请求方式" width="110" />
              <el-table-column prop="state" label="操作状态" width="100" />
              <el-table-column prop="location" label="请求地址" width="125" />
              <el-table-column prop="ip"  label="IP地址" width="125" />
              <el-table-column prop="date" sortable label="操作日期" width="150" />
              <el-table-column align="center" label="操作" width="105">
                <template #default="scope">
                    <span style="color: deepskyblue; font-size: 14px" @click="aaaaaa(scope.row)">
                      <i class="iconfont" style="margin-left: 19px;margin-top: 2px;display: block;float:left">
                        &#xe681
                      </i>
                      详细
                    </span>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <el-dialog  width="750px" style="background-color: red" v-model="particular" title="操作日志详细">
            <el-form class="el-form" v-model="affiche">
              <!-- 操作日志详情 -->
              <el-form-item style="font-weight: bold;size: 14px;margin-left: 10px" label="系统模块：">
                <el-input size="small" :disabled="true" style=" width: 245px;" v-model="affiche.module"></el-input>
              </el-form-item>
              <!-- 请求地址详情 -->
              <el-form-item style="margin-left: 351px;margin-top: -60px;font-weight: bold;size: 14px" label="请求地址：">
                <el-input size="small" :disabled="true" style="width: 245px;font-weight: bold;size: 14px" v-model="affiche.location"></el-input>
              </el-form-item>
              <!-- 请求方式详情 -->
              <el-form-item class="zhiti"  label="请求方式：">
                <el-input size="small" :disabled="true" style="width: 583px;font-weight: bold;size: 14px" v-model="affiche.beg_way"></el-input>
              </el-form-item>
              <!-- 操作方法详情 -->
              <el-form-item class="zhiti"  label="操作方法：">
                <el-input size="small" :disabled="true" style="width: 583px;font-weight: bold;size: 14px" v-model="affiche.way"></el-input>
              </el-form-item>
              <!-- 请求参数详情 -->
              <el-form-item class="zhiti" label="请求参数：">
                <el-input :disabled="true" style="width: 583px;font-weight: bold;size: 14px" v-model="affiche.required_parameter" type="textarea"></el-input>
              </el-form-item>
              <!-- 返回参数详情-->
              <el-form-item class="zhiti" label="返回参数：">
                <el-input :disabled="true" style="width: 583px;font-weight: bold;size: 14px" v-model="affiche.return_parameters" type="textarea"></el-input>
              </el-form-item>
              <!-- 操作状态详情 -->
              <el-form-item class="zhiti" label="操作状态：">
                <el-input :disabled="true" size="small" style="width: 245px;font-weight: bold;size: 14px" v-model="affiche.state"></el-input>
              </el-form-item>
              <!-- 操作时间详情 -->
              <el-form-item style="font-weight: bold;size: 14px;margin-left: 351px;margin-top: -62px;" label="操作时间：">
                <el-input :disabled="true" size="small" style="width: 245px;font-weight: bold;size: 14px" v-model="affiche.date"></el-input>
              </el-form-item>
              <el-button  style="width: 70px;margin-left: 600px;background-color: rgb(255, 227, 232);" @click="particular=false" size="mini">关闭</el-button>
            </el-form>
          </el-dialog>

          <!-- 分页 -->
          <div class="demo-pagination-block">
            <!-- <span class="demonstration">All combined</span> -->
            <el-pagination
                v-model:currentPage="pageInfo.currenPage"
                :page-sizes="[3, 5, 10, 50]"
                v-model:page-size="pageInfo.pagesize"
                :default-page-size="pageInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pageInfo.total"
                :pager-count="5"
                background
                @size-change="sele"
                @current-change="sele"
            >
            </el-pagination>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'
import {ElMessage, ElMessageBox} from "element-plus";


export default {
  data() {


    //批量删除提示框
    const remove = () => {
      ElMessageBox.confirm(
          '是否确定删除！！！',
          '友情提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: '友情提示',
          }
      )
          .then(() => {
            ElMessage({
              type: 'success',
              message: '删除成功！！',
            })
          })
          .catch(() => {
            ElMessage({
              message: '感谢你的参与',
              type: 'warning',
            })
          })
    }

    //清空提示框
    const empty = () => {
      ElMessageBox.confirm(
          '是否确定清空所有数据！！！',
          '友情提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: '友情提示',
          }
      )
          .then(() => {
            ElMessage({
              type: 'success',
              message: '清空成功！！',
            })
          })
          .catch(() => {
            ElMessage({
              message: '感谢你的参与',
              type: 'warning',
            })
          })
    }
    //操作时间
    const value2 = ref('')
    return {
      //批量删除
      remove,

      //清空数据
      empty,

      // 分页
      pageInfo: {
        currenPage: 1,
        /* 当前的页 */
        pagesize: 3,
        total: 0,
      },


      //搜索重置form
      search:{
        //系统模块
        system_module:'',
        //操作人员
        username:'',
        //操作类型
        type:'',
        //登录状态
        state:'',
        //登录时间
        vlues2:'',
      },

      //操作日志详细对话框
      particular:false,


      // 搜索操作类型下拉框
      type: ([
        {
          value: '新增',
          label: '新增',
        },
        {
          value: '删除',
          label: '删除',
        },
        {
          value: '授权',
          label: '授权',
        },
        {
          value: '导出',
          label: '导出',
        },
        {
          value: '导入',
          label: '导入',
        },
        {
          value: '强退',
          label: '强退',
        },
        {
          value: '生成代码',
          label: '生成代码',
        },
        {
          value: '清空数据',
          label: '清空数据',
        },
      ]),

      // 搜索登录状态下拉框
      state: ([
        {
          value1: '成功',
          label: '成功',
        },
        {
          value1: '失败',
          label: '失败',
        }
      ]),

      //表格
      tableData: [{
        id: "1",
        module: "2",
        type: "3",
        name: "4",
        post: "5",
        beg_way: "6",
        state:"7",
        location:"8",
        ip:"i9",
        date:"2002-2-02 11:12:11",
        way:'fasdfasdfadfaasdfasdfa',
        required_parameter:'44555www44rw',
        return_parameters:'rwe1wwwwwwwww565rw',
      },
        {
          id: "2",
          module: "2",
          type: "3",
          name: "4",
          post: "5",
          beg_way: "6",
          state:"7",
          location:"8",
          ip:"i9",
          date:"2002-03-03 12:13:12",
          way:'fasdfasdfadfaasdfasdfa',
          required_parameter:'44555144rw',
          return_parameters:'rwe16541565rw',
        },
        {
          id: "3",
          module: "2",
          type: "3",
          name: "4",
          post: "5",
          beg_way: "6",
          state:"7",
          location:"8",
          ip:"i9",
          date:"2002-2-02 11:12:11",
          way:'fasdfasdfadfaasdfasdfa',
          required_parameter:'ewrw',
          return_parameters:'rwerw',
        },
      ],


      //删除按钮是否禁用
      disableds:true,
      //接收表格里的数据
      table:[],
      //查看详情赋值
      affiche:{
        module: '',
        type: '',
        name:'',
        post:'',
        beg_way:'',
        state:'',
        location:'',
        ip:'',
        date:'',
        way:"",
        required_parameter:'',
        return_parameters:'',
      },
    }
  },
  methods:{
    //点击详情获取表单里的值
    aaaaaa(row){
      this.affiche=row;
      console.log(this.affiche)
      this.particular=true
    },

    //判断删除按钮是否可用
    deletepl(val){
      this.table=val
      if(this.table != ''){
        this.disableds = false
      }else {
        this.disableds = true
      }
    },
    //重置方法
    reset(){
      this.search={
        //系统模块
        system_module:'',
            //操作人员
            username:'',
            //操作类型
            type:'',
            //登录状态
            state:'',
            //登录时间
            vlues2:'',
      }
    }
  }
}
</script>

<style type="text/css" scoped>

@import url("../../css/zpdaohang.css");

/deep/.el-dialog__body{
  background-color: #f5f7fa;
}

.zhiti{
  font-weight: bold;
  size: 14px;
  margin-left: 10px;
  margin-top: 10px;
}

/deep/.el-dialog__body .el-input--small .el-input__inner {
  height: 32px;
  line-height: 32px;
  border: none;
}
/deep/.el-textarea__inner{
  min-height: 32.6px;
  border: none;
  resize: none;
}



@font-face {
  font-family: 'iconfont';  /* Project id 2994452 */
  src: url('//at.alicdn.com/t/font_2994452_unxan6g2m8r.woff2?t=1639051095780') format('woff2'),
  url('//at.alicdn.com/t/font_2994452_unxan6g2m8r.woff?t=1639051095780') format('woff'),
  url('//at.alicdn.com/t/font_2994452_unxan6g2m8r.ttf?t=1639051095780') format('truetype');
}


/* 分页 */
.demo-pagination-block{
  margin-left: 854px;
  margin-bottom: 20px;
}

/*表格样式*/
.sub-Content__primary{
  margin-bottom: 10px;
}
.button{
  margin-top: -6px;
  margin-bottom: 8px;

}
/* 删除表格数据按钮 */
.button-delete{
  width: 90px;
}

/* 清空表格数据按钮 */
.button-empty{
  width: 90px;
  color: #13ce66;
  background: #e7faf0;
  border-color: #a1ebc2;
  border: none;
}
.button-empty:hover{
  width: 90px;
  background: #13ce66;
  border-color: #13ce66;
  color: #fff;
  border: none;
}


/* 搜索按钮 */
.search{
  margin-top: -27px;
  margin-left: 10px;
}
.search-ss {
  background-color: #085FC3;
  color: white;
  margin: 29px 0px 0px 5px;
  width: 90px;
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
}
.search-ss:hover {
  background-color: #085FC3;
  color: white;
  margin: 29px 0px 0px 5px;
  width: 90px;
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
}
/* 重置按钮 */
.search-cz {
  color: black;
  margin: 29px 0px 0px 10px;
  width: 90px;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-top-color: rgb(220, 223, 230);
  border-right-color: rgb(220, 223, 230);
  border-bottom-color: rgb(220, 223, 230);
  border-left-color: rgb(220, 223, 230);
  border-color: #dcdfe6;
  color: #606266;
}
.search-cz:hover {
  color: black;
  margin: 29px 0px 0px 10px;
  width: 90px;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
}
/* 操作日期 */
.form-time{
  margin-bottom: 20px;
}
/* 登录状态 */
.form-state{
  margin-left: 10px;
}
.form-states{
  width: 230px;
}
/* 登录类型 */
.form-type{
  margin-left: 10px;

}
.form-types{
  width: 225px;
}

/* 操作人员搜索样式 */
.form-staff{
  margin-left: 15px;
  width: 300px;
}
/* 系统模块搜索样式 */
.form-module{
  margin-left: 10px;
  width: 300px;

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


.mr-20 {
  margin-right: 20px;
}

.ml-20 {
  margin-left: 20px;
}

.mt-20 {
  margin-top: 20px;
}

a {
  color: #085fc3;
  background-color: transparent;
}

a, area, button, [role="button"], input:not([type="range"]), label, select, summary, textarea {
  touch-action: manipulation;
}

a {
  color: #366cb3;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
  -webkit-text-decoration-skip: objects;
}

button::-moz-focus-inner, [type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner {
  border-style: none;
}

button::-moz-focus-inner, [type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner {
  padding: 0;
  border-style: none;
}

.ant-btn::before {
  background: #fff;
  border-radius: inherit;
}

.ant-btn::before {
  position: absolute;
  top: -1px;
  right: -1px;
  bottom: -1px;
  left: -1px;
  z-index: 1;
  display: none;
  background: #fff;
  border-radius: inherit;
  opacity: 0.35;
  transition: opacity 0.2s;
  content: '';
  pointer-events: none;
}

button, html [type="button"], [type="reset"], [type="submit"] {
  -webkit-appearance: button;
}

.ant-btn-primary {
  color: #fff;
  background-color: #085fc3;
  border-color: #085fc3;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}

.ant-btn-primary {
  color: #fff;
  background-color: #366cb3;
  border-color: #366cb3;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}

.ant-btn, .ant-btn:active, .ant-btn:focus {
  outline: 0;
}

.ant-btn {
  line-height: 1.499;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  border: 1px solid transparent;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 3px;
  color: #606c82;
  background-color: #fff;
  border-color: #d3dae2;
}

.ant-btn-primary {
  color: #fff;
  background-color: #085fc3;
  border-color: #085fc3;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
}




</style>
