<template>
  <input v-model="permission" style="display: none">
  <div class="w">
    <div class="head">
      <el-button type="primary" style="margin-left: 16px"
      >新增
      </el-button>&nbsp;&nbsp;
      <el-drawer ref="drawer" v-model="dialog" :before-close="handleClose" direction="ltr" custom-class="demo-drawer">
        <div class="demo-drawer__content">
          <el-form :model="form">
            <el-form-item label="部门名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="负责人" :label-width="formLabelWidth">
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

      <el-button size="medium" >
        <el-icon style="font-size: 18px">
          <i-upload/>
        </el-icon>
        导出
      </el-button>
      <el-upload
          class="upload-demo"
          action
          :on-change="importfxx"
          accept=".xls, .xlsx"
          :auto-upload="false"
          :show-file-list="false"
      >
        <el-button size="medium">
          <el-icon style="font-size: 18px">
            <i-folder-opened/>
          </el-icon>
          导入
        </el-button>
      </el-upload>
    </div>
    <div class="y">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="deptId" label="ID"/>
        <el-table-column prop="deptName" label="部门名称"/>
        <el-table-column prop="staffName" label="部门负责人"/>
        <el-table-column prop="deptState" label="状态">
          <template #default="scope">
          <span v-if="scope.row.deptState==0" style="color: #1d95e0" >启用</span>
            <span v-else-if="scope.row.deptState==1" style="color: red">禁用</span>
          </template>
        </el-table-column>

        <el-table-column prop="operate" label="操作">
          <template #default>
            <el-button type="primary" style="margin-left: 16px" @click="drawer = true" label="rtl">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-drawer v-model="drawer" title="部门负责人修改" :direction="direction" :before-close="handleClose">
        <el-form :model="form">
          <el-form-item label="部门名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="负责人" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="Area1" value="shanghai"></el-option>
              <el-option label="Area2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-radio v-model="radio1" label="0">启用</el-radio>
            <el-radio v-model="radio1" label="1">禁用</el-radio>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">&nbsp;
          <el-button type="primary" :loading="loading"><!-- @click="$refs.drawer.closeDrawer() -->
            {{ loading ? 'Submitting ...' : '确认' }}
          </el-button>
        </div>
      </el-drawer>
    </div>

    <!-- 分页 -->
    <div class="demo-pagination-block">
      <el-pagination v-model:current-page="pageInfo.currentPage"
                     v-model:page-size="pageInfo.pagesize"
                     :default-page-size="pageInfo.pagesize"
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
</template>

<script>
import {ElMessageBox, ElMessage, ElNotification} from 'element-plus'
import {defineComponent, reactive, toRefs, ref} from 'vue'
import {export_json_to_excel} from '/src/excal/Export2Excel.js'
import XLSX from 'xlsx'

export default defineComponent({
  data: function () {
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
            })
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

    const drawer = ref(false)
    const direction = ref('rtl')

    return {
      url: "http://localhost:80/",
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
      //通过path获取二级菜单下面所有的菜单
      menuList: this.$store.getters.store_menuList(this.$route.query.path)[0],
      //权限列表
      permissionList: [],
      pageInfo: {
        currentPage: 1,
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
      tableData: [],

      value1: "", //日期
      value: ref(""), //选择
      ...toRefs(state),
      handleClose,
      cancelForm,
      radio1: ref('1'),
      drawer,
      direction,
    };
  },
  methods: {
    /*分页查询*/
    next() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectDept',
        data: {
          //当前页
          'currentPage': this.pageInfo.currentPage,
          //页大小
          "pagesize": this.pageInfo.pagesize,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code == 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              _this.tableData = response.data.data.info.records
              _this.pageInfo.total = response.data.data.info.total
              this.$store.commit("updateToken", response.data.data.token);
            } else {
              ElNotification.error({
                title: '提示',
                message: response.data.data.info,
                offset: 100,
              })
            }
          }
        } else {
          ElNotification.error({
            title: '提示',
            message: response.data.message,
            offset: 100,
          })
        }
      })
    },
  },mounted() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    this.next();
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

  margin-left: 50px;

  margin-top: 20px;

  margin-bottom: 30px;

}

.upload-demo {
  display: inline-block;
  margin-left: 10px;
}
</style>
