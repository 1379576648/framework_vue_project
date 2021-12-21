<template>
  <input v-model="permission" style="display: none">
  <div class="w">
    <div class="head">
      <el-button type="primary" style="margin-left: 16px" @click="insert"
      >新增
      </el-button>&nbsp;&nbsp;
      <el-drawer
          ref="drawer"
          v-model="dialog"
          :before-close="handleClose"
          direction="ltr"
          custom-class="demo-drawer"
      >
        <div class="demo-drawer__content">
          <el-form :model="form">
            <el-form-item label="职位名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="所属部门" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择">
                <el-option label="Area1" value="shanghai"></el-option>
                <el-option label="Area2" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态" :label-width="formLabelWidth">
              <el-radio v-model="radio1" label="1">启用</el-radio>
              <el-radio v-model="radio1" label="2">禁用</el-radio>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="cancelForm">关闭</el-button>
            <el-button type="primary" :loading="loading"><!-- @click="$refs.drawer.closeDrawer() -->
              {{ loading ? 'Submitting ...' : '确认' }}
            </el-button>
          </div>
        </div>
      </el-drawer>

      <el-button size="medium">
        <el-icon style="font-size: 18px">
          <i-upload/>
        </el-icon>
        导出
      </el-button>
      <el-button size="medium">
        <el-icon style="font-size: 18px">
          <i-folder-opened/>
        </el-icon>
        导入
      </el-button>
    </div>
    <div class="y">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="applyfor" label="职位"/>
        <el-table-column prop="department" label="所属部门"/>
        <el-table-column prop="place" label="部门负责人"/>
        <el-table-column prop="thing" label="状态"/>
        <el-table-column prop="operate" label="操作">
          <template #default>
            <el-button size="small" style="color:darkorange" @click="drop">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="demo-pagination-block">
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
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, ref} from 'vue'
import {ElMessageBox, ElMessage} from 'element-plus'

export default defineComponent({
  data() {
    const state = reactive({
      dialog: false,
      loading: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      formLabelWidth: '80px',
      timer: null,
    })

    const handleClose = (done) => {
      if (state.loading) {
        return
      }
      ElMessageBox.confirm('确认关闭?')
          .then(() => {
            state.loading = true
            state.timer = setTimeout(() => {
              done()
              // 动画关闭需要一定的时间
              setTimeout(() => {
                state.loading = false
              }, 400)
            }, 500)
          })
          .catch(() => {
            // catch error
          })
    }

    const cancelForm = () => {
      state.loading = false
      state.dialog = false
      clearTimeout(state.timer)
    }
    const open = () => {
      ElMessageBox.confirm(
          '是否提交删除申请?',
          '提示',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          }
      )
          .then(() => {
            ElMessage({
              type: 'success',
              message: '已提交',
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消',
            })
          })
    }

    return {
      //通过path获取二级菜单下面所有的菜单
      menuList: this.$store.getters.store_menuList(this.$route.query.path)[0],
      //权限列表
      permissionList: [],
      pageInfo: {
        currenPage: 1,
        /* 当前的页 */
        pagesize: 3,
        total: 0,
      },
      options: ref([
        {
          value: "Option1",
          label: "Option1",
        },
      ]),
      tableData: [
        {
          applyfor: '销售总监',
          department: '开发部',
          place: '阿贝多',
          thing: '启用'
        },
        {
          applyfor: '品牌经理',
          department: '培训部',
          place: '凯亚',
          thing: '禁用'
        },
        {
          applyfor: '商务经理',
          department: '情报部',
          place: '安伯',
          thing: '启用'
        },
        {
          applyfor: '高级软件工程师',
          department: '运营部',
          place: '丽莎',
          thing: '启用'
        },
        {
          applyfor: '高级管理',
          department: '运营部',
          place: '芭芭拉',
          thing: '启用'
        },

      ],
      value1: "", //日期
      value: ref(""), //选择
      ...toRefs(state),
      handleClose,
      cancelForm,
      radio1: ref('1'),
      open,
    };
  }, computed: {
  //初始化权限列表
  permission() {
    this.inquire_1();
    return this.permissionList;
  }

}, methods: {
    inquire_1() {
      //如果菜单列表有值
      if (this.menuList) {
        //循环菜单列表
        for (let i of this.menuList) {
          //如果菜单有叶子 并且状态为启用
          if (i.MENU_LEAF == 0 && i.MENU_STATE == 0) {
            //如果匹配到路由地址跟浏览器地址一样
            if (i.MENU_ROUTE == window.location.pathname) {
              //添加到菜单权限列表中
              this.permissionList.push(i.son);
            } else {
              //执行梯归
              this.inquire_2(i.son)
            }
          }
        }
      }
    }, inquire_2(value) {
      //如果菜单列表有值
      if (value) {
        //循环菜单列表
        for (let i of value) {
          //如果菜单有叶子 并且状态为启用
          if (i.MENU_LEAF == 0 && i.MENU_STATE == 0) {
            //如果匹配到路由地址跟浏览器地址一样
            if (i.MENU_ROUTE == window.location.pathname) {
              //添加到菜单权限列表中
              this.permissionList.push(i.son);
            } else {
              //执行梯归
              this.inquire_2(i.son)
            }
          }
        }
      }
    },
    //新增按钮操作
    insert() {
      //如果有这个新增按钮的权限
      if (this.permissionQuery("新增")) {
        this.dialog = true;
      } else {
        ElMessage({
          message: '权限不足',
          type: 'warning',
        })
      }
    },
    //删除按钮操作
    drop() {
      if (this.permissionQuery("删除")) {
        this.loading = true;
      } else {
        ElMessage({
          message: '权限不足',
          type: 'warning',
        })
      }
    },
    //查询权限工具方法
    permissionQuery(value) {
      //判断
      let pd = false;
      //如果菜单列表有数据
      if (this.permissionList[0]) {
        //循环菜单列表
        for (let i = 0; i < this.permissionList[0].length; i++) {
          //模糊匹配字符串
          //转化成正则格式的字符串
          let str = ['', ...value, ''].join('.*');
          //正则
          let reg = new RegExp(str);
          //转化成正则格式的字符串
          if (reg.test(this.permissionList[0][i].MENU_NAME)) {
            pd = true;
          }
        }
      }
      return pd;
    }
  }
})
</script>

<style scoped>
table * {

  text-align: center;

}

.w {

  margin-top: 20px;

  border: 1px solid #e9e9e9;

}

.w:hover {

  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);

  border-color: transparent;

}

.y {

  margin-top: 20px;

}

.head {

  margin-left: 2%;

  margin-top: 2%;

}


.demo-pagination-block {

  margin-left: 610px;

  margin-top: 20px;

  margin-bottom: 30px;

}
</style>
