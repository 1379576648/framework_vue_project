<!-- 登录日志页面 -->

<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">
        <div class="mt-20 ml-20 mr-20">
          <!-- 搜索登录数据部分 -->
          <el-form :inline="true" v-model="search">
            <!-- 登录地址搜索 -->
            <el-form-item class="form-dizhi" label="登录地址">
              <el-input  size="small" v-model="search.site" placeholder="请输入登录地址"></el-input>
            </el-form-item>

            <!-- 用户名称搜索 -->
            <el-form-item class="form-name" label="用户名称">
              <el-input size="small" v-model="search.username" placeholder="请输入用户名称"></el-input>
            </el-form-item>

            <!-- 登录状态搜索 -->
            <el-form-item class="form-state" label="状态">
              <el-select style="width: 190px" size="small" v-model="search.options" placeholder="请选择登录状态">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <!-- 登录时间搜索 -->
            <el-form-item class="form-time" label="登录时间">
              <el-date-picker
                  size="small"
                  v-model="search.value1"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]"
              >
              </el-date-picker>
            </el-form-item>
            <!-- 操作按钮 -->
            <el-form-item style="margin-left: 1071px;margin-top: -30px">
              <el-button size="mini" class="search-ss" type="primary" @click="onSubmit">
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
            <el-button size="mini" style="width: 90px;" v-bind:disabled="disabled" @click="remove">删除</el-button>
            <el-button class="button-empty" size="mini" @click="empty">清空</el-button>
          </div>
        </div>

        <!-- 表格内容部分 -->
        <div class="sub-Content__primary">
          <el-table :data="tableData" style="width: 100% ;"
                      @selection-change="deletewx"
                    :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
                    :cell-style="{ textAlign: 'center' }"
                    :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <!-- 全选操作按钮 -->
            <el-table-column  type="selection" width="50" />
            <el-table-column prop="id" label="访问编号" width="132" />
            <el-table-column prop="name" label="员工名称" width="132" />
            <el-table-column prop="phone" label="手机号码" width="135" />
            <el-table-column prop="IP" label="IP地址" width="150" />
            <el-table-column prop="device_type" label="设备类型" width="140" />
            <el-table-column prop="state" label="状态" width="135" />
            <el-table-column prop="browser" label="浏览器" width="132" />
            <el-table-column prop="type" label="登录类型" width="135" />
            <el-table-column prop="date" sortable label="登录日期" width="170" />
          </el-table>
        </div>
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
</template>

<script>
import {ref} from 'vue'
import {ElMessage, ElMessageBox} from "element-plus";

export default {

  data() {
    //时间
    const value1 = ref('')

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
    return {
      //批量删除
      remove,

      //清空数据
      empty,

      //搜索重置form
      search:{
       //登录地址
        site:'',
        //用户名称
        username:'',
        //状态
        options:'',
        //用户登录时间
        value1:'',
      },
      // 分页
      pageInfo: {
        currenPage: 1,
        /* 当前的页 */
        pagesize: 3,
        total: 0,
      },

      // 搜索登录状态下拉框
      options: ref([
        {
          value: '成功',
          label: '成功',
        },
        {
          value: '失败',
          label: '失败',
        },
      ]),
      value: ref(''),


      //表格
      tableData: [{
        id: "1",
        name: "2",
        phone: "3",
        IP: "4",
        device_type: "5",
        state: "6",
        browser:"7",
        type:"8",
        date:"2002-2-02 11:12:11"
      },
        {
          id: "1",
          name: "2",
          phone: "3",
          IP: "4",
          device_type: "5",
          state: "6",
          browser:"7",
          type:"8",
          date:"2002-3-03 12:13:12"
        },
        {
          id: "1",
          name: "2",
          phone: "3",
          IP: "4",
          device_type: "5",
          state: "6",
          browser:"7",
          type:"8",
          date:"2002-4-04 13:16:41"
        },
      ],
      kkk:[],
      disabled:true

    }
  },
  methods:{
    //重置
    reset(){
      this.search={
        //登录地址
        site:'',
        //用户名称
        username:'',
        //状态
        options:'',
        //用户登录时间
        value1:'',
      }
    },
    deletewx(val){
      this.kkk=val;
      if (this.kkk != ''){
        this.disabled =false;
      }
      if(this.kkk == ''){
        this.disabled = true;
      }
    }
  },


}
</script>

<style type="text/css" scoped>
@import url("../../css/zpdaohang.css");
/* 图标 */
@font-face {
  font-family: 'iconfont';
  /* Project id 2994452 */
  src: url('//at.alicdn.com/t/font_2994452_60uvtx3m6is.woff2?t=1638864192788') format('woff2'),
  url('//at.alicdn.com/t/font_2994452_60uvtx3m6is.woff?t=1638864192788') format('woff'),
  url('//at.alicdn.com/t/font_2994452_60uvtx3m6is.ttf?t=1638864192788') format('truetype');
}
/*表格样式*/
.sub-Content__primary{
  margin-bottom: 10px;
  margin-left: 10px;
}

/* 分页 */
.demo-pagination-block{
  margin-left: 874px;
  margin-bottom: 20px;
}

.button{
  margin-bottom: 17px;
  margin-top: -55px;

}
/* 删除表格数据按钮 */
.button-delete{
  color: #ff4949;
  background: #ffeded;
  border-color: #ffb6b6;
  border: none;
  width: 90px;
}
.button-delete:hover{
  background: #ff4949;
  border-color: #ff4949;
  color: #fff;
  border: none;
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
/* 登录时间搜索按钮 */
.form-time{
  width: 270px;
  margin-left: -20px;
}

.form-state{
  width: 270px;
  margin-left: 20px;
}
/* 登录地址搜索样式 */
.form-name{
  width: 270px;
  margin-left: 20px;
}
/* 登录地址搜索样式 */
.form-dizhi{
  width: 270px;
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
