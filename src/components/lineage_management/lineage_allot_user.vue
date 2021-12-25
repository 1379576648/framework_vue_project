<!-- 登录日志页面 -->

<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">
        <div class="mt-20 ml-20 mr-20">
          <!-- 搜索导航部分-->
          <el-form :inline="true" v-model="search">
            <el-form-item class="user-name" label="用户名称">
              <el-input size="small" v-model="search.username" placeholder="请输入用户名称"></el-input>
            </el-form-item>

            <el-form-item class="phone" label="手机号码">
              <el-input size="small" v-model="search.number" placeholder="请输入手机号码"></el-input>
            </el-form-item>

            <el-form-item class="search">
              <el-button size="mini" class="search-ss" type="primary">
                <i class="iconfont" style="font-size: 13.5px;" >
                  &#xe61b
                </i>
                搜索
              </el-button>
              <el-button size="mini" class="search-cz" type="primary">
                <i class="iconfont" style="font-size: 13.5px;">
                  &#xe6b8
                </i>
                重置
              </el-button>
            </el-form-item>
          </el-form>

          <!-- 对数据的增删改按钮 -->
          <div class="button">
            <el-button class="button-new" size="mini"  @click="outerVisible = true">+ 添加用户</el-button>
            <el-button class="button-amend" size="mini" v-bind:disabled="disableds" @click="open">-  批量取消授权</el-button>
            <router-link :to="{path:this.two,query:{path: this.$route.query.path}}">
              <el-button class="button-delete" size="mini">X 关闭</el-button>
            </router-link>
          </div>


          <!--添加用户对话框-->
          <el-dialog width="800px" title="选择用户" v-model="outerVisible" destroy-on-close="false">
            <!-- form表单 -->
            <el-form class="announcement" :inline="true" style="margin-top: 20px;" v-model="searchss">

              <el-form-item class="username"  label="用户名称">
                <el-input size="mini" v-model="searchss.username" placeholder="请输入用户名称"></el-input>
              </el-form-item>

              <el-form-item class="phones"  label="手机号码">
                <el-input size="mini" v-model="searchss.number" placeholder="请输入手机号码"></el-input>
              </el-form-item>

              <el-form-item  style="margin-top: -32px;">
                <el-button size="mini" class="dialog-box-ss" type="primary" @click="onSubmit">
                  <i class="iconfont" style="font-size: 13px;" >
                    &#xe600
                  </i>
                  &nbsp;搜索
                </el-button>
                <el-button size="mini" class="dialog-box-cz" type="primary" @click="resetss()">
                  <i class="iconfont"  style="font-size: 13px;">
                    &#xe6b8
                  </i>
                  &nbsp;重置
                </el-button>
              </el-form-item>

              <!--添加用户表格-->
              <el-form-item>
                <!-- 表格内容部分 -->
                <div class="el-form-table">
                  <el-table :data="tableDatas" style="width: 100%;margin-left: 24px;margin-bottom: 20px;"
                            :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
                            :cell-style="{ textAlign: 'center' }"
                            ref="xuanzhong"
                            @selection-change="TheSelectedValue">
                    <!-- 全选操作按钮 -->
                    <el-table-column type="selection" width="50" />
                    <el-table-column prop="name" label="用户名称" width="100" />
                    <el-table-column prop="mailbox" label="邮箱" width="180" />
                    <el-table-column prop="phone" label="手机号码" width="140" />
                    <el-table-column prop="state" label="状态" width="100" />
                    <el-table-column prop="creation_time" label="创建时间" width="185" />
                  </el-table>
                </div>
              </el-form-item>

              <!-- 分页 -->
              <div class="paging">
                <el-pagination
                    v-model:currentPage="pageInfos.currenPage"
                    :page-sizes="[3, 5, 10, 50]"
                    v-model:page-size="pageInfos.pagesize"
                    :default-page-size="pageInfos.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageInfos.total"
                    :pager-count="5"
                    background
                    @size-change="sele"
                    @current-change="sele"
                >
                </el-pagination>
              </div>

              <el-form-item >
                <template #default="scope">
                  <div style="margin-left: 611px;margin-top: 10px;">
                    <el-button size="small" style="width: 60px;" type="primary" v-bind:disabled="disabledss" @click="confirm(tableDatas)">
                      确定
                    </el-button>
                    <el-button size="small" style="width: 60px;" @click="outerVisible = false">
                      取消
                    </el-button>
                  </div>
                </template>
              </el-form-item>

            </el-form>
          </el-dialog>

          <!-- 表格内容部分 -->
          <div class="sub-Content__primary">
            <el-table :data="tableData" style="width: 100%;margin-left: 24px;margin-bottom: 20px;"
                      :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
                      :cell-style="{ textAlign: 'center' }"
                      @selection-change="deletepl"
                      >
              <!-- 全选操作按钮 -->
              <el-table-column type="selection" width="70" />
              <el-table-column prop="name" label="用户名称" width="200" />
              <el-table-column prop="mailbox" label="邮箱" width="202" />
              <el-table-column prop="phone" label="手机号码" width="206" />
              <el-table-column prop="state" label="状态" width="200" />
              <el-table-column prop="creation_time" label="创建时间" width="210" />
              <el-table-column align="center" label="操作" width="210">
                <template #default="scope">
                  <span class="cancel" @click="remove">
                    <i class="iconfont" style="position: absolute;top: 23px;left: 58px;">
                      &#xe631
                    </i>
                    取消权限
                  </span>
                </template>
              </el-table-column>
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
  </div>
</template>

<script>


import {ref} from 'vue'
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  data() {



    //批量取消权限提示框
    const open = () => {
      ElMessageBox.confirm(
          '是否取消一坨权限！！！',
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
              message: '取消权限成功！！',
            })
          })
          .catch(() => {
            ElMessage({
              message: '感谢你的参与',
              type: 'warning',
            })
          })
    }

    //取消权限提示框
    const remove = () => {
      ElMessageBox.confirm(
          '是否取消权限！！！',
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
              message: '取消权限成功！！',
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
      two:'/system/authority_management/role',

      // 分页
      pageInfo: {
        currenPage: 1,
        /* 当前的页 */
        pagesize: 3,
        total: 0,
      },

      // 分页
      pageInfos: {
        currenPage: 1,
        /* 当前的页 */
        pagesize: 3,
        total: 0,
      },

      //批量取消权限弹出框
      open,

      //表格批量取消权限
      remove,

      //搜索重置form
      search:{
        //用户名称
        username:'',
        //手机号
        number:'',
      },

      //搜索重置form
      searchss:{
        //用户名称
        username:'',
        //手机号
        number:'',
      },



      //表格
      tableData: [{
        name: "牛子琪·",
        mailbox:"qq.com123456789",
        phone: "1552233445",
        state:"正常",
        creation_time:"2002-2-02 11:12:11"
      },
        {
          name: "官迷率·",
          mailbox:"qq.com145656789",
          phone: "15789233445",
          state:"正常",
          creation_time:"2002-3-03 12:13:12"
        },
        {
          name: "川井毛毛",
          mailbox:"qq.com785656789",
          phone: "157892223145",
          state:"正常",
          creation_time:"2002-4-04 10:43:42"
        },
      ],


      tableDatas: [{
        name: "牛子琪·",
        mailbox:"qq.com123456789",
        phone: "1552233445",
        state:"正常",
        creation_time:"2002-2-02 11:12:11"
      },
        {
          name: "官迷率·",
          mailbox:"qq.com145656789",
          phone: "15789233445",
          state:"正常",
          creation_time:"2002-3-03 12:13:12"
        },
        {
          name: "川井毛毛",
          mailbox:"qq.com785656789",
          phone: "157892223145",
          state:"正常",
          creation_time:"2002-4-04 10:43:42"
        },
      ],
      outerVisible:false,

      //对话框确定按钮是否被禁用
      disabledss:true,
      //数组存取选中值
      xuanzhong:[],

      //按钮是否被禁用
      disableds:true,
      //接收表格数据
      table:[],
    }
  },
  methods:{

    //判断删除按钮是否可用
    deletepl(val){
      this.table=val
      if(this.table != ''){
        this.disableds=false
      }else{
        this.disableds=true
      }
    },
    //选中值
    TheSelectedValue(val){
      this.xuanzhong=val;
      if(this.xuanzhong !=''){
        this.disabledss = false
      }else {
        this.disabledss = true
      }
      console.log(val)
    },
    //对话框循环输出选中的内容
    confirm(){
      for (var i=0;i<this.xuanzhong.length;i++){
          var halo=this.xuanzhong[i]
        console.log(halo)
      }
      ElMessage({
        type: 'success',
        message: '添加成功！！',

      })

      this.outerVisible=false
    },

    //对话框搜索重置方法
    reset(){
      this.search={
        //用户名称
        username :'',
        //手机号
        number:'',
      }
    },
    //搜索重置方法
    resetss(){
      this.searchss={
        //用户名称
        username :'',
        //手机号
        number:'',
      }
    }
  }

}
</script>

<style type="text/css" scoped>

@import url("../../css/zpdaohang.css");
@font-face {
  font-family: 'iconfont';  /* Project id 2994452 */
  src: url('//at.alicdn.com/t/font_2994452_zc48m96iud.woff2?t=1639381525619') format('woff2'),
  url('//at.alicdn.com/t/font_2994452_zc48m96iud.woff?t=1639381525619') format('woff'),
  url('//at.alicdn.com/t/font_2994452_zc48m96iud.ttf?t=1639381525619') format('truetype');
}

.el-form-item{
  margin-bottom: 10px;
}
/*分页*/
.paging{
  margin-top: -20px;
  margin-left: 302px;
}

/*对话框表格*/
.el-form-table{
  margin-left: -24px;
}



/*添加用户权限对话框*/
.search{
  margin-top: -22px;
  margin-left: 10px;
}
/*对话框搜索按钮样式*/
.dialog-box-ss {
  background-color: #085FC3;
  color: white;
  margin: 29px 0px 0px 5px;
  width: 90px;
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;

}
.dialog-box-ss:hover {
  background-color: #085FC3;
  color: white;
  margin: 29px 0px 0px 5px;
  width: 90px;
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
}
/* 对话框重置按钮样式 */
.dialog-box-cz {
  color: black;
  margin: 29px 0px 0px 5px;
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
.dialog-box-cz:hover {
  color: black;
  margin: 29px 0px 0px 5px;
  width: 90px;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
}
.phones{
  width: 250px;
  margin-top: -10px;
  margin-left: 10px;
}
/**/
.username{
  width: 250px;
  margin-top: -10px;
  margin-left: 10px;
}


/* 分页 */
.demo-pagination-block{
  margin-left: 800px;
  margin-bottom: 20px;
}

.cancel{
  color: #5aaaff;
}
.sub-Content__primary{
  margin-left: -27px;
}

.button{

  margin-bottom: 15px;

}
/*新增按钮样式*/
.button-new{
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
  border: none;
  width: 110px;
}
.button-new:hover{
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
  border: none;
  width: 110px;
}
/* 返回角色表格数据按钮 */
.button-delete{
  color: #ffba00;
  background: #fff8e6;
  border-color: #ffe399;
  border: none;
  width: 90px;
  margin-left: 10px;
}
.button-delete:hover{
  color: #fff;
  background-color: #ffba00;
  border-color: #ffba00;
  border: none;
  width: 90px;
  margin-left: 10px;
}
/* 修改表格数据按钮 */
.button-amend{
  width: 140px;
  border: none;
}


/* 搜索按钮 */
.search{

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
  margin: 29px 0px 0px 5px;
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
  margin: 29px 0px 0px 5px;
  width: 90px;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
}
/*手机号码搜索样式*/
.phone{
  width: 300px;
}
/*用户名称搜索样式*/
.user-name{
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
