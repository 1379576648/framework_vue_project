<!-- 角色设置页面 -->

<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">
        <div class="mt-20 ml-20 mr-20">
          <!-- 搜索角色数据部分 -->
          <el-form style="margin-top: 20px;" :inline="true" v-model="search">
            <!-- 角色名册搜索 -->
            <el-form-item class="form-name" label="角色名称">
              <el-input  size="small" v-model="search.role_name" placeholder="请输入角色名称"></el-input>
            </el-form-item>

            <!-- 权限字符搜索 -->
            <el-form-item class="form-jurisdiction" label="权限字符">
              <el-input size="small" v-model="search.character" placeholder="请输入权限字符"></el-input>
            </el-form-item>

            <!-- 角色状态搜索 -->
            <el-form-item class="form-state" label="角色状态">
              <el-select style="width: 190px" size="small" v-model="search.state" placeholder="请选择角色状态">
                <el-option
                    v-for="item in state"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <!-- 创建 时间搜索 -->
            <el-form-item class="form-time" label="创建时间">
              <el-date-picker
                  style="width: 325px"
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
            <el-form-item  style="margin-left: 1066px;margin-top: -43px;margin-bottom: -24px;">
              <el-button size="mini" class="search-ss" type="primary" >
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
            <el-button class="button-new" size="mini"  @click="outerVisible = true,judge='新增'">+ 新增</el-button>
            <el-button class="button-delete" size="mini" v-bind:disabled="disableds" @click="remove">删除</el-button>
          </div>




          <!-- 角色新增修改对话框-->
          <el-dialog width="500px" v-model="outerVisible" >
            <span class="headline"> {{judge}}角色</span>
            <!-- form表单 -->
            <el-form class="announcement">

              <el-form-item class="name"  label="角色名称" >
                <el-input size="small" style=" width: 357px;" placeholder="请输入角色名称" ></el-input>
              </el-form-item>

              <el-form-item class="character" label="权限字符">
                <el-input  size="small" style="width: 357px;" placeholder="请输入权限字符"></el-input>
              </el-form-item>

              <el-form-item class="announcement-zt" label="权限状态·">
                <div class="normal">
                  <el-radio v-model="radio1" label="1">正常</el-radio>
                </div>
                <div class="shut">
                  <el-radio v-model="radio1" label="2">关闭</el-radio>
                </div>
              </el-form-item>

              <el-form-item class="menu" label="菜单权限">
                <div class="menus">
                  <div class="a">
                  <el-checkbox  v-model="checked1" label="展开/折叠" >展开/折叠</el-checkbox>
                  </div>
                  <div class="b">
                  <el-checkbox  v-model="checked2" label="全选/不全选" ></el-checkbox>
                  </div>
                  <div class="menuss">
                    <el-tree
                        ref="tree"
                        :data="menuList"
                        show-checkbox
                        default-expand-all
                        highlight-current
                        :props="props"
                    />
                  </div>
                </div>
              </el-form-item>

              <el-form-item class="remark" label="备注">
                <el-input type="textarea">
                </el-input>
              </el-form-item>

              <el-form-item style="margin-bottom: 7px;margin-left: 312px;margin-top: 15px">
                <div class="announcement-cz">
                  <el-button size="mini" style=" width: 60px;" @click="outerVisible = false">
                    取消
                  </el-button>
                  <!-- 修改按钮 -->
                  <el-button size="mini" style=" width: 60px;" type="primary" @click="innerVisible = true">
                    {{judge}}
                  </el-button>
                </div>
              </el-form-item>
            </el-form>
          </el-dialog>

          <!-- 表格内容部分 -->
          <div class="sub-Content__primary">
            <el-table :data="tableData" style="width: 100%"
                      :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
                      :cell-style="{ textAlign: 'center' }"
                      :default-sort="{ prop: 'date', order: 'descending' }"
                      @selection-change="deletepl"
            >
              <!-- 全选操作按钮 -->
              <el-table-column type="selection" width="50" />
              <el-table-column prop="id" label="角色编号" width="160" />
              <el-table-column prop="name" label="角色名称" width="160" />
              <el-table-column prop="role" label="权限字符" width="160" />
              <el-table-column prop="describe" label="角色描述" width="160" />
              <el-table-column prop="state" label="状态" width="160" />
              <el-table-column prop="date" sortable label="创建日期" width="190" />
              <el-table-column align="center" label="操作" width="250">
                <template #default="scope">
                  <span style="font-size: 13px;color: #5aaaff"  @click="outerVisible = true,judge='修改'">
                    <i class="iconfont" style="font-size: 13px;color: #5aaaff">&#xe606</i>
                    修改&nbsp;&nbsp;&nbsp;
                  </span>
                  <span style="font-size: 13px;color: #5aaaff" @click="open">
                    <i class="iconfont"  style="font-size: 13px;color: #5aaaff">&#xe61c</i>
                    删除&nbsp;&nbsp;&nbsp;
                  </span>
                  <!-- 更多-->
                  <el-dropdown>
                  <span style="font-size: 13px;color: #5aaaff" class="el-dropdown-link">
                    >>更多
                    <el-icon class="el-icon--right">
                    </el-icon>
                  </span>
                    <template #dropdown>
                      <el-dropdown-menu style="width: 96px;text-align: center">
                        <el-dropdown-item @click="data_permission=true">数据权限</el-dropdown-item>
                        <router-link :to="{path:this.two,query:{path: this.$route.query.path}}">
                          <el-dropdown-item >分配用户</el-dropdown-item>
                        </router-link>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>

            <!-- 数据权限对话框 -->
            <el-dialog width="500px" v-model="data_permission" title="分配数据权限" >
              <!-- form表单 -->
              <el-form class="from-data">
                <el-form-item class="role-name" label="角色名称">
                  <el-input size="small" style=" width: 357px;" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item class="role-character" label="权限字符">
                  <el-input size="small" style=" width: 357px;" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item class="menu" label="菜单权限">
                  <div class="menus">
                    <el-checkbox v-model="checked1" label="展开/折叠"></el-checkbox>
                    <el-checkbox v-model="checked2" label="全选/不全选"></el-checkbox>
                    <div class="menuss">
                      <el-tree
                          ref="tree"
                          :data="menuList"
                          show-checkbox
                          default-expand-all
                          highlight-current
                          :props="props"
                      />
                    </div>
                  </div>
                </el-form-item>

                <el-form-item style="margin-bottom: 7px;margin-left: 306px;">
                  <div class="from-data-cz">
                    <!-- 修改按钮 -->
                    <el-button size="mini" style="width: 60px;" type="primary">
                      确定
                    </el-button>
                    <el-button size="mini" style="width: 60px;" @click="data_permission = false">
                      取消
                    </el-button>
                  </div>
                </el-form-item>
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
  </div>
</template>

<script>
import {defineComponent,ref} from 'vue'
import {ElMessage, ElMessageBox} from "element-plus";
export default {

  data() {

    //时间
    const value1 = ref('')


    //删除提示框
    const open = () => {
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

    return {
      //跳转界面
      two:'/system/authority_management/allot_user',

      // 分页
      pageInfo: {
        currenPage: 1,
        /* 当前的页 */
        pagesize: 3,
        total: 0,
      },

      //批量删除
      remove,

      //弹出框删除
      open,

      //搜索重置form
      search:{
        //角色名称
        role_name :'',
        //权限字符
        character:'',
        //角色状态
        type:'',
        //登录状态
        state:'',
        //登录时间
        value1:'',
      },
      // 搜索登录状态下拉框
      state: ref([
        {
          value: '正常',
          label: '正常',
        },
        {
          value: '停用',
          label: '停用',
        },
      ]),

      //表格数据
      tableData: [{
        id: "1",
        name: "2",
        role: "3",
        describe: "4",
        state: "5",
        date:"2002-2-02 11:12:11"
      },
        {
          id: "1",
          name: "2",
          role: "3",
          describe: "4",
          state: "5",
          date:"2002-3-03 12:13:12"
        },
        {
          id: "1",
          name: "2",
          role: "3",
          describe: "4",
          state: "5",
          date:"2002-4-04 13:16:41"
        },
      ],

      //显示添加还是有修改的状态
      outerVisible: ref(false),
      //按钮字体
      judge: "添加",
      //单选框按钮
      radio1: ref('1'),


      props: {
        label: 'MENU_NAME',
        children: 'son',
        isLeaf: 'MENU_ORDER',
      },  menuList: [
        {
          MENU_NAME: '权限管理',
          MENU_ROUTE: '/1',
          MENU_MODULE: '&#xe62c;',
          MENU_state: 0,
          MENU_TYPE: 0,
          MENU_LEAF: 1,
          MENU_ORDER: false
          ,
          son: [
            {
              MENU_NAME: '权限设置',
              MENU_ROUTE: '/permission_set',
              MENU_MODULE: '',
              MENU_state: 0,
              MENU_TYPE: 0,
              MENU_LEAF: 1,
              MENU_ORDER: true
            },
            {
              MENU_NAME: '角色设置',
              MENU_ROUTE: '/notice',
              MENU_MODULE: '&#xe62c;',
              MENU_state: 0,
              MENU_TYPE: 0,
              MENU_LEAF: 1,
              MENU_ORDER: false,
              son: [
                {
                  MENU_NAME: '权限设置',
                  MENU_ROUTE: '/permission_set',
                  MENU_MODULE: '&#xe62c;',
                  MENU_state: 0,
                  MENU_TYPE: 0,
                  MENU_LEAF: 1,
                  MENU_ORDER: false,
                  son:[
                    {
                      MENU_NAME: '权限设置',
                      MENU_ROUTE: '/permission_set',
                      MENU_MODULE: '&#xe62c;',
                      MENU_state: 0,
                      MENU_TYPE: 0,
                      MENU_LEAF: 1,
                      MENU_ORDER: true}
                  ]
                }
              ]
            }]
        }, {
          MENU_NAME: '角色管理',
          MENU_ROUTE: '/2',
          MENU_MODULE: '&#xe62c;',
          MENU_state: 0,
          MENU_TYPE: 0,
          MENU_LEAF: 1,
          MENU_ORDER: false
          ,
          son: [
            {
              MENU_NAME: '角色设置',
              MENU_ROUTE: '/role',
              MENU_MODULE: '',
              MENU_state: 0,
              MENU_TYPE: 0,
              MENU_LEAF: 1,
              MENU_ORDER: true
            }]
        },
        {
          MENU_NAME: '公告管理',
          MENU_ROUTE: '/2',
          MENU_MODULE: '&#xe62c;',
          MENU_state: 0,
          MENU_TYPE: 0,
          MENU_LEAF: 1,
          MENU_ORDER: false
          ,
          son: [
            {
              MENU_NAME: '公告设置',
              MENU_ROUTE: '/notice',
              MENU_MODULE: '',
              MENU_state: 0,
              MENU_TYPE: 0,
              MENU_LEAF: 1,
              MENU_ORDER: true
            }]
        }, {
          MENU_NAME: '日志管理',
          MENU_ROUTE: '/3',
          MENU_MODULE: '&#xe62c;',
          MENU_state: 0,
          MENU_TYPE: 0,
          MENU_LEAF: 1,
          MENU_ORDER: false
          ,
          son: [
            {
              MENU_NAME: '登录日志',
              MENU_ROUTE: '/login_log',
              MENU_MODULE: '',
              MENU_state: 0,
              MENU_TYPE: 0,
              MENU_LEAF: 1,
              MENU_ORDER: true
            },
            {
              MENU_NAME: '操作日志',
              MENU_ROUTE: '/operate_log',
              MENU_MODULE: '',
              MENU_state: 0,
              MENU_TYPE: 0,
              MENU_LEAF: 1,
              MENU_ORDER: true
            }]
        }, {
          MENU_NAME: '权限管理',
          MENU_ROUTE: '/1',
          MENU_MODULE: '&#xe62c;',
          MENU_state: 0,
          MENU_TYPE: 0,
          MENU_LEAF: 1,
          MENU_ORDER: true
        }],

      /*数据权限*/
      data_permission:false,


      //按钮是否被禁用
      disableds:true,
      //接收表格数据
      table:[],
    }
  },
  methods: {
    loadNode(node, resolve) {
      resolve(this.menuList)
    },
    deletepl(val){
      this.table = val
      if(this.table != ''){
        this.disableds=false
      }else {
        this.disableds=true
      }
    },
    reset(){
      this.search={
        //角色名称
        role_name :'',
            //权限字符
            character:'',
            //角色状态
            type:'',
            //登录状态
            state:'',
            //登录时间
            value1:'',
      }
    }
  },
}
</script>

<style type="text/css" scoped>
@import url("../../css/zpdaohang.css");
@font-face {
  font-family: 'iconfont';
  /* Project id 2994452 */
  src: url('//at.alicdn.com/t/font_2994452_60uvtx3m6is.woff2?t=1638864192788') format('woff2'),
  url('//at.alicdn.com/t/font_2994452_60uvtx3m6is.woff?t=1638864192788') format('woff'),
  url('//at.alicdn.com/t/font_2994452_60uvtx3m6is.ttf?t=1638864192788') format('truetype');
}
.normal{

}
.shut{
  margin-top: -40px;
  margin-left: 84px;
}
.a{
  width: 130px;
  margin-left: -20px;
}
.b{
  width: 130px;
  margin-top: -40px;
  margin-left: 114px;
}
.el-form-item__content .menus .el-checkbox {
  margin-left: 20px;
}
/*数据权限样式*/
.role-character{
  font-weight:bold;
  size:14px;
  margin-left:15px;
  margin-top: -15px;
}
.role-name{
  font-weight:bold;
  size:14px;
  margin-left:15px;
  margin-top: -20px;
}
.from-data-cz{
  margin-bottom:-7px;
}
.from-data{
  margin-top: 15px;
}
/*添加角色*/
.announcement-cz{
  margin-bottom:-10px;
}
.remark{
  font-weight: bold;
  size: 14px;
  margin-left: 38px;
  margin-top: 7px;
  width: 400px;
}
.menuss{
  border: 1px solid #E0E0E0;
  width: 353px;

}
.menus{
  width: 353px;

}
.menu{
  font-weight:bold;
  size:14px;
  margin-left:15px;
  margin-top: -21px;
}
.announcement-zt {
  margin-left: 15px;
  font-weight:bold;
  margin-top: -17px;
  size:14px;
}
.name{
  font-weight:bold;
  size:14px;
  margin-left:15px;
}

.character{
  font-weight:bold;
  size:14px;
  margin-left:15px;
  margin-top: -15px;
}
.headline{
  font-size: 18px;
  font-weight:bold;
  position: absolute;
  top: 16px;
}
.announcement{
  margin-top: 15px;
}

.el-form--inline .el-form-item {
  display: inline-flex;
  vertical-align: middle;
  margin-right: 10px;
  margin-left: 8px;
}


/* 分页 */
.demo-pagination-block{
  margin-left: 810px;
  margin-bottom: 20px;
  margin-top: 15px;
}
.button{
  margin-top: -21px;
  margin-bottom: 14px;
  margin-left: 7px;
}
/*新增按钮样式*/
.button-new{
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
  border: none;
  width: 90px;
}
.button-new:hover{
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
  border: none;
  width: 90px;
}
/* 删除表格数据按钮 */
.button-delete{

  border: none;
  width: 90px;
}



/* 搜索按钮 */
.search{


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
/* 创建时间搜索按钮 */
.form-time{
  width: 270px;
  margin-left: -20px;
  margin-top: 5px;

}
/*角色状态搜索样式*/
.form-state{
  width: 270px;
  margin-left: 20px;
}
/* 权限字符搜索样式 */
.form-jurisdiction{
  width: 270px;
  margin-left: 20px;
}
/* 角色名称搜索样式 */
.form-name{
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
  margin-top: 0px;
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
