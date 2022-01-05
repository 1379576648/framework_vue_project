<!-- 角色设置页面 -->

<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">
        <div class="mt-20 ml-20 mr-20">
          <!-- 搜索角色数据部分 -->
          <el-form style="margin-top: 20px;" :inline="true">
            <!-- 角色名册搜索 -->
            <el-form-item class="form-name" label="角色名称">
              <el-input size="small" v-model="roleName" placeholder="请输入角色名称关键字" clearable
                        style="width: 150px"></el-input>
            </el-form-item>

            <!-- 权限字符搜索 -->
            <el-form-item class="form-jurisdiction" label="角色描述">
              <el-input size="small" v-model="roleDescribe" placeholder="请输入角色描述关键字" clearable
                        style="width: 150px"></el-input>
            </el-form-item>

            <!-- 角色状态搜索 -->
            <el-form-item class="form-state" label="角色状态">
              <el-select style="width: 190px" size="small" v-model="roleState" clearable placeholder="请选择角色状态">
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
                  v-model="selectTime"
                  type="datetimerange"
                  :shortcuts="shortcuts"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
              ></el-date-picker>
            </el-form-item>
          </el-form>

          <!-- 对数据的增删改按钮 -->
          <div class="button">
            <el-button class="button-new" size="mini" @click="outerVisible = true,judge='新增'"
                       style="margin-left: 5px;height: 33px">+
              新增
            </el-button>
            <el-button class="button-delete" size="mini" type="danger"
                       v-bind:disabled="checkDeleteList.length==0?true:false" @click="remove"
                       style="height: 33px;margin-right: 875px">删除
            </el-button>
            <el-button size="mini" class="search-ss" type="primary" @click="next">
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
          </div>


          <!-- 角色新增修改对话框-->
          <el-dialog width="500px" v-model="outerVisible">
            <span class="headline"> {{ judge }}角色</span>
            <!-- form表单 -->
            <el-form class="announcement" :rules="fromVerify" :model="fromValue">

              <el-form-item prop="roleName" class="name" label="角色名称">
                <el-input size="small" v-model="fromValue.roleName" style=" width: 345px;" clearable
                          placeholder="请输入角色名称"></el-input>
              </el-form-item>

              <el-form-item prop="roleState" class="announcement-zt" label="权限状态" style="margin-left: 24px">
                <div class="normal">
                  <el-radio v-model="fromValue.roleState" label="0">正常</el-radio>
                </div>
                <div class="shut">
                  <el-radio v-model="fromValue.roleState" label="1">关闭</el-radio>
                </div>
              </el-form-item>
              <el-form-item style="margin-left: 24px" class="menu" label="菜单权限" :key="refreshTable">
                <div class="menus">
                  <div class="a">
                    <el-checkbox v-model="checked1" @click="handle1($event)" label="展开/折叠">展开/折叠</el-checkbox>
                  </div>
                  <div class="b">
                    <el-checkbox v-model="checked2" @click="checkedAll1" label="全选/不全选"></el-checkbox>
                  </div>
                  <div class="menuss">
                    <el-tree
                        ref="tree1"
                        :data="menuList"
                        show-checkbox
                        node-key="MENU_ID"
                        :default-expand-all="expands"
                        highlight-current
                        :props="props"
                    />
                  </div>
                </div>
              </el-form-item>

              <el-form-item style="margin-left: 40px" prop="roleDescribe" class="remark" label="描述">
                <el-input type="textarea" v-model="fromValue.roleDescribe" clearable>
                </el-input>
              </el-form-item>

              <el-form-item style="margin-bottom: 7px;margin-left: 312px;margin-top: 15px">
                <div class="announcement-cz">
                  <el-button size="mini" style=" width: 60px;" @click="outerVisible = false">
                    取消
                  </el-button>
                  <!-- 修改按钮 -->
                  <el-button size="mini" style=" width: 60px;" type="primary" @click="innerVisible = true,one()">
                    {{ judge }}
                  </el-button>
                </div>
              </el-form-item>
            </el-form>
          </el-dialog>

          <!-- 表格内容部分 -->
          <div class="sub-Content__primary">
            <el-table :data="tableData" style="width: 100% ;"
                      border
                      stripe
                      :header-cell-style="{textAlign: 'center',background:'rgba(213,213,218,0.63)',color:'#6C6C6C'}"
                      @selection-change="checkDelete"
            >
              <!-- 全选操作按钮 -->
              <el-table-column fixed align="center" type="selection" width="50"/>
              <el-table-column fixed :index="indexMethod" align="center" label="序号" type="index" width="100"/>
              <el-table-column prop="roleName" align="center" sortable label="角色名称" min-width="160"/>
              <el-table-column prop="roleDescribe" align="center" sortable label="角色描述" min-width="400"/>
              <el-table-column prop="roleState" align="center" sortable label="状态" min-width="160">
                <template #default="scope">
                  <span class="button-enable" v-if="scope.row.roleState==0">启用</span>
                  <span class="button-forbidden" v-if="scope.row.roleState==1">禁用</span>
                </template>
              </el-table-column>
              <el-table-column prop="createdTime" align="center" sortable label="创建时间" width="200"/>
              <el-table-column align="center" fixed="right" label="操作" min-width="280">
                <template #default="scope">
                  <span style="font-size: 13px;color: #5aaaff;cursor: pointer;" @click="outerVisible = true,judge='修改'">
                    <i class="iconfont" style="font-size: 13px;color: #5aaaff">&#xe606</i>
                    修改&nbsp;&nbsp;&nbsp;
                  </span>
                  <span style="font-size: 13px;color: #5aaaff;cursor: pointer;"
                        @click="radioRemove(scope.row.roleId)">
                    <i class="iconfont" style="font-size: 13px;color: #5aaaff">&#xe61c</i>
                    删除&nbsp;&nbsp;&nbsp;
                  </span>
                  <!-- 更多-->
                  <el-dropdown>
                  <span style="font-size: 13px;color: #5aaaff;cursor: pointer;" class="el-dropdown-link">
                    >>更多
                    <el-icon class="el-icon--right">
                    </el-icon>
                  </span>
                    <template #dropdown>
                      <el-dropdown-menu style="width: 96px;text-align: center">
                        <el-dropdown-item @click="data_permission=true">数据权限</el-dropdown-item>
                        <router-link :to="{path:this.route.grant,query:{path: this.$route.query.path}}">
                          <el-dropdown-item>分配用户</el-dropdown-item>
                        </router-link>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>

            <!-- 数据权限对话框 -->
            <el-dialog width="500px" v-model="data_permission" title="分配数据权限">
              <!-- form表单 -->
              <el-form class="from-data"  :model="fromValue">
                <el-form-item class="role-name" label="角色名称">
                  <el-input size="small" v-model="fromValue.roleName" style=" width: 348px;" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item class="menu" label="菜单权限" :key="refreshTable">
                  <div class="menus">
                    <div class="a">
                      <el-checkbox v-model="checked3" @click="handle2($event)" label="展开/折叠">展开/折叠</el-checkbox>
                    </div>
                    <div class="b">
                      <el-checkbox v-model="checked4" @click="checkedAll2" label="全选/不全选"></el-checkbox>
                    </div>
                    <div class="menuss">
                      <el-tree
                          ref="tree2"
                          :data="menuList"
                          show-checkbox
                          node-key="MENU_ID"
                          :default-expand-all="expands"
                          highlight-current
                          :props="props"
                      />
                    </div>
                  </div>
                </el-form-item>

                <el-form-item style="margin-bottom: 7px;margin-left: 300px;">
                  <div class="from-data-cz">
                    <el-button size="mini" style="width: 60px;" @click="data_permission = false">
                      取消
                    </el-button>
                    <!-- 修改按钮 -->
                    <el-button size="mini" style="width: 60px;" type="primary">
                      确定
                    </el-button>
                  </div>
                </el-form-item>
              </el-form>
            </el-dialog>

            <!-- 分页 -->
            <div class="demo-pagination-block">
              <el-pagination v-model:current-page="pageInfo.currenPage"
                             v-model:page-size="pageInfo.pageSize"
                             :default-page-size="pageInfo.pageSize"
                             :page-sizes="[5, 10,15,20]"
                             :pager-count="5"
                             :total="pageInfo.total"
                             background
                             layout="	total ,sizes, prev, pager, next, jumper"
                             next-text="下一页"
                             prev-text="上一页"
                             @size-change="next()"
                             @current-change="next()"
                             @prev-click="next()"
                             @next-click="next()">
              </el-pagination>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import {ElMessage, ElMessageBox, ElNotification} from "element-plus";

export default {

  data() {
    return {
      //访问路径
      url: "http://localhost:80/role/",
      //跳转界面
      route: {
        grant: '/lineage/authority_management/allot_user',
      },
      //角色名称
      roleName: '',
      //角色描述
      roleDescribe: '',
      //角色状态
      roleState: '',
      //选择时间
      selectTime: [],
      //日期选择组件
      shortcuts: [
        {
          text: '过去一周',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
          },
        },
        {
          text: '过去一个月',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
          },
        },
        {
          text: '过去三个月',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
          },
        },
      ],
      // 分页
      pageInfo: {
        /* 当前的页 */
        currenPage: 1,
        //页大小
        pageSize: 5,
        //总条数
        total: 0,
      },
      // 搜索角色状态下拉框
      state: ref([
        {
          value: 0,
          label: '启用',
        },
        {
          value: 1,
          label: '禁用',
        },
      ]),
      //一键展开收缩菜单
      expands: false,
      //渲染展开菜单
      refreshTable: 0,
      //表格数据
      tableData: [],
      //显示添加还是有修改的状态
      outerVisible: false,
      //按钮字体
      judge: "添加",
      //展开/折叠复选框按钮
      checked1: false,
      //全部选/全不选按钮
      checked2: false,
      //展开/折叠复选框按钮
      checked3: false,
      //全部选/全不选按钮
      checked4: false,
      //被选择的列表
      checkDeleteList: [],
      props: {
        label: 'MENU_NAME',
        children: 'son',
        isLeaf: 'MENU_ORDER',
      },
      menuList: [
        {
          MENU_ID: 1,
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
              MENU_ID: 2,
              MENU_NAME: '权限设置',
              MENU_ROUTE: '/permission_set',
              MENU_MODULE: '',
              MENU_state: 0,
              MENU_TYPE: 0,
              MENU_LEAF: 1,
              MENU_ORDER: true
            },
            {
              MENU_ID: 3,
              MENU_NAME: '角色设置',
              MENU_ROUTE: '/notice',
              MENU_MODULE: '&#xe62c;',
              MENU_state: 0,
              MENU_TYPE: 0,
              MENU_LEAF: 1,
              MENU_ORDER: false,
              son: [
                {
                  MENU_ID: 4,
                  MENU_NAME: '权限设置',
                  MENU_ROUTE: '/permission_set',
                  MENU_MODULE: '&#xe62c;',
                  MENU_state: 0,
                  MENU_TYPE: 0,
                  MENU_LEAF: 1,
                  MENU_ORDER: false,
                  son: [
                    {
                      MENU_ID: 5,
                      MENU_NAME: '权限设置',
                      MENU_ROUTE: '/permission_set',
                      MENU_MODULE: '&#xe62c;',
                      MENU_state: 0,
                      MENU_TYPE: 0,
                      MENU_LEAF: 1,
                      MENU_ORDER: true
                    }
                  ]
                }
              ]
            }]
        }, {
          MENU_ID: 7,
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
              MENU_ID: 8,
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
          MENU_ID: 9,
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
              MENU_ID: 10,
              MENU_NAME: '公告设置',
              MENU_ROUTE: '/notice',
              MENU_MODULE: '',
              MENU_state: 0,
              MENU_TYPE: 0,
              MENU_LEAF: 1,
              MENU_ORDER: true
            }]
        }, {
          MENU_ID: 11,
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
              MENU_ID: 12,
              MENU_NAME: '登录日志',
              MENU_ROUTE: '/login_log',
              MENU_MODULE: '',
              MENU_state: 0,
              MENU_TYPE: 0,
              MENU_LEAF: 1,
              MENU_ORDER: true
            },
            {
              MENU_ID: 13,
              MENU_NAME: '操作日志',
              MENU_ROUTE: '/operate_log',
              MENU_MODULE: '',
              MENU_state: 0,
              MENU_TYPE: 0,
              MENU_LEAF: 1,
              MENU_ORDER: true
            }]
        }, {
          MENU_ID: 14,
          MENU_NAME: '权限管理',
          MENU_ROUTE: '/1',
          MENU_MODULE: '&#xe62c;',
          MENU_state: 0,
          MENU_TYPE: 0,
          MENU_LEAF: 1,
          MENU_ORDER: true
        }],
      //表单值
      fromValue: {
        //角色名称
        roleName: '',
        //角色状态
        roleState: '0',
        //角色描述
        roleDescribe: '',
        //权限菜单
        muenuList: [],
      },
      //表单验证
      fromVerify: {
        //角色名称
        roleName: [
          {
            required: true,
            message: '名称不为空',
            trigger: 'blur',
          },
          {
            min: 0,
            max: 10,
            message: '名称不能超过20个字符',
            trigger: 'blur',
          },
        ],
        //角色描述
        roleDescribe: [
          {
            required: true,
            message: '描述不为空',
            trigger: 'blur',
          },  {
            min: 0,
            max: 100,
            message: '描述不能超过100个字符',
            trigger: 'blur',
          },
        ],
      },
      /*数据权限*/
      data_permission: false,
      //复选框角色编号列表
      listId: [],
    }
  },
  methods: {
    one() {
      console.log(this.$refs.tree1.getCheckedNodes());
    },
    /*分页查询*/
    next() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectRoleAll',
        data: {
          //当前页
          'currenPage': this.pageInfo.currenPage,
          //页大小
          "pageSize": this.pageInfo.pageSize,
          //角色名称
          "roleName": this.roleName,
          //角色描述
          "roleDescribe": this.roleDescribe,
          //起始时间
          "startTime": this.selectTime == null ? null : this.selectTime[0],
          //结束时间
          "endTime": this.selectTime == null ? null : this.selectTime[1],
          //角色状态
          "roleState": this.roleState,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
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
            _this.tableData = response.data.data.info.records
            _this.pageInfo.total = response.data.data.info.total
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
    //批量删除提示框
    remove() {
      ElMessageBox.confirm(
          '是否确认删除所选数据项?',
          '系统提示',
          {
            cancelButtonText: '取消',
            confirmButtonText: '确认',
            type: 'warning',
          }
      ).then(() => {
        /*清空*/
        this.listId = [];
        for (let i = 0; i < this.checkDeleteList.length; i++) {
          this.listId.push(this.checkDeleteList[i].roleId)
        }
        this.axios({
          method: 'delete',
          url: this.url + 'checkRoleDelete',
          data: this.listId,
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
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
              //如果是成功
              if (response.data.data.info == "成功") {
                this.next();
                ElMessage({
                  type: 'success',
                  message: '删除成功',
                })
              } else {
                ElMessage({
                  type: 'warning',
                  message: response.data.data.info,
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
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消成功',
        })
      })
    },
    //单选删除
    radioRemove(id) {
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
          url: this.url + 'checkRoleDelete',
          data: [id],
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
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
              //如果是成功
              if (response.data.data.info == "成功") {
                this.next();
                ElMessage({
                  type: 'success',
                  message: '删除成功',
                })
              } else {
                ElMessage({
                  type: 'warning',
                  message: response.data.data.info,
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
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消成功',
        })
      })
    },
    //展开操作/收起操作
    handle1(e) {
      //如果是点击事件
      if (e.target.tagName == 'INPUT') {
        this.refreshTable = this.refreshTable + 1;
        if (this.expands == true) {
          this.expands = false;
        } else {
          this.expands = true;
        }
      }
    },
    //树形控件全选或全不选
    checkedAll1() {
      this.$nextTick(() => {
        if (this.checked2) {
          //取消选中
          this.$refs.tree1.setCheckedKeys([]);
        } else {
          //全选
          this.$refs.tree1.setCheckedNodes(this.menuList);
        }
      });
    },
    //展开操作/收起操作
    handle2(e) {
      //如果是点击事件
      if (e.target.tagName == 'INPUT') {
        this.refreshTable = this.refreshTable + 1;
        if (this.expands == true) {
          this.expands = false;
        } else {
          this.expands = true;
        }
      }
    },
    //树形控件全选或全不选
    checkedAll2() {
      this.$nextTick(() => {
        if (this.checked4) {
          //取消选中
          this.$refs.tree2.setCheckedKeys([]);
        } else {
          //全选
          this.$refs.tree2.setCheckedNodes(this.menuList);
        }
      });
    },
    /*序号*/
    indexMethod(index) {
      let curpage = this.pageInfo.currenPage; //单前页码，具体看组件取值
      let limitpage = this.pageInfo.pageSize; //每页条数，具体是组件取值
      return index + 1 + (curpage - 1) * limitpage;
    },
    //复选框选择事件
    checkDelete(val) {
      this.checkDeleteList = val;
    },
    //重置搜索条件
    reset() {
      //角色名称
      this.roleName = '',
          //角色描述
          this.roleDescribe = '',
          //角色状态
          this.roleState = '',
          //创建时间
          this.selectTime = []
    }
  }
  ,
  mounted() {
    this.next();
  }
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

.button-enable {
  background: #ecf5ff;
  border: 1px #cfe6ff solid;
  color: #5aaaff;
  display: inline-block;
  line-height: 1;
  min-height: 15px;
  white-space: nowrap;
  text-align: center;
  margin: 0;
  padding: 12px 20px;
  border-radius: var(--el-border-radius-base);
}

.button-forbidden {
  background: #fef0f0;
  border: 1px #f2c5c5 solid;
  color: #f57a7a;
  display: inline-block;
  line-height: 1;
  min-height: 15px;
  white-space: nowrap;
  text-align: center;
  margin: 0;
  padding: 12px 20px;
  border-radius: var(--el-border-radius-base);
}

/deep/ .el-range-editor.el-input__inner {
  height: 32px;
}

.el-form--inline .el-form-item {
  margin-right: -40px !important;
  margin-left: 12px !important;
}

/deep/ .el-range-editor.el-input__inner .el-range-separator {
  position: relative;
  top: -4px;
}

.shut {
  margin-top: -40px;
  margin-left: 84px;
}

.a {
  width: 130px;
  margin-left: -20px;
}

.b {
  width: 130px;
  margin-top: -40px;
  margin-left: 114px;
}

.el-form-item__content .menus .el-checkbox {
  margin-left: 20px;
}

/*数据权限样式*/
.role-character {
  font-weight: bold;
  size: 14px;
  margin-left: 15px;
  margin-top: -15px;
}

.role-name {
  font-weight: bold;
  size: 14px;
  margin-left: 15px;
  margin-top: -20px;
}

.from-data-cz {
  margin-bottom: -7px;
}

.from-data {
  margin-top: 15px;
}

/*添加角色*/
.announcement-cz {
  margin-bottom: -10px;
}

.remark {
  font-weight: bold;
  size: 14px;
  margin-left: 38px;
  margin-top: 7px;
  width: 400px;
}

.menuss {
  border: 1px solid #E0E0E0;
  width: 345px;

}

.el-form .form-time {
  position: relative;
  left: 67px;
  top: -4px;
}

.menus {
  width: 353px;

}

.menu {
  font-weight: bold;
  size: 14px;
  margin-left: 15px;
  margin-top: -21px;
}

.announcement-zt {
  margin-left: 15px;
  font-weight: bold;
  margin-top: -17px;
  size: 14px;
}

.name {
  font-weight: bold;
  size: 14px;
  margin-left: 15px;
}

.character {
  font-weight: bold;
  size: 14px;
  margin-left: 15px;
  margin-top: -15px;
}

.headline {
  font-size: 18px;
  font-weight: bold;
  position: absolute;
  top: 16px;
}

.announcement {
  margin-top: 15px;
}

.el-form--inline .el-form-item {
  display: inline-flex;
  vertical-align: middle;
  margin-right: 10px;
  margin-left: 8px;
}


/* 分页 */
.demo-pagination-block {
  margin: 10px 0 10px 0px;
}

.button {
  margin-top: -21px;
  margin-bottom: 14px;
  margin-left: 7px;
}

/*新增按钮样式*/
.button-new {
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
  border: none;
  width: 90px;
}

.button-new:hover {
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
  border: none;
  width: 90px;
}

/* 删除表格数据按钮 */
.button-delete {
  border: none;
  width: 90px;
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
.form-time {
  width: 270px;
  margin-left: -20px;
  margin-top: 5px;

}

/*角色状态搜索样式*/
.form-state {
  width: 270px;
  margin-left: 20px;
}

/* 权限字符搜索样式 */
.form-jurisdiction {
  width: 270px;
  margin-left: 20px;
}

/* 角色名称搜索样式 */
.form-name {
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
