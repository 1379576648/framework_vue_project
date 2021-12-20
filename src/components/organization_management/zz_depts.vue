<template>
  <input v-model="permission" style="display: none">
  <div class="w">
    <div class="head">
      <el-button type="primary" style="margin-left: 16px" @click="insert()"
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

      <el-button size="medium" @click="outExe">
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
        <el-table-column prop="date" label="ID"/>
        <el-table-column prop="name" label="部门名称"/>
        <el-table-column prop="state" label="部门负责人"/>
        <el-table-column prop="city" label="状态"/>
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
            <el-radio v-model="radio1" label="1">启用</el-radio>
            <el-radio v-model="radio1" label="2">禁用</el-radio>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">&nbsp;
          <el-button type="primary" :loading="loading"><!-- @click="$refs.drawer.closeDrawer() -->
            {{ loading ? 'Submitting ...' : '确认' }}
          </el-button>
        </div>
      </el-drawer>
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
import {ElMessageBox, ElMessage} from 'element-plus'
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
          date: '01',
          name: '行政部',
          state: '琴',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '02',
          name: '人事部',
          state: '凯亚',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '03',
          name: '财务部',
          state: '丽莎',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '04',
          name: '技术部',
          state: '阿贝多',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '05',
          name: '市场部',
          state: '优菈',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
      ],
      value1: "", //日期
      value: ref(""), //选择
      ...toRefs(state),
      handleClose,
      cancelForm,
      radio1: ref('1'),
      drawer,
      direction,
    };
  }, computed: {
    //初始化权限列表
    permission() {
      this.inquire_1();
      return this.permissionList;
    }
  }, methods: {
    //导入操作
    importfxx(obj) {
      if (this.permissionQuery("导出")) {
        console.log(obj);
        let _this = this;
        // 通过DOM取文件数据
        this.file = obj.raw;
        var rABS = false; //是否将文件读取为二进制字符串
        var f = this.file;
        var reader = new FileReader();
        FileReader.prototype.readAsBinaryString = function (f) {
          var binary = "";
          var rABS = false; //是否将文件读取为二进制字符串
          var pt = this;
          var wb; //读取完成的数据
          var outdata;
          var reader = new FileReader();
          reader.onload = function (e) {
            var bytes = new Uint8Array(reader.result);
            var length = bytes.byteLength;
            for (var i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            if (rABS) {
              wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                type: 'base64'
              });
            } else {
              wb = XLSX.read(binary, {
                type: 'binary'
              });
            }
            // outdata就是你想要的东西 excel导入的数据
            outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
            // excel 数据再处理
            let arr = []
            outdata.map(v => {
              let obj = {}
              obj.date = v.ID
              obj.name = v.部门名称
              obj.state = v.部门负责人
              obj.city = v.状态
              arr.push(obj)
              _this.tableData.push(obj)
            })
          }
          reader.readAsArrayBuffer(f);
        }

        if (rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }
      } else {
        ElMessage({
          message: '权限不足',
          type: 'warning',
        })
      }
    },
    //导出操作
    outExe() {
      //如果有这个导出按钮的权限
      if (this.permissionQuery("导出")) {
        ElMessageBox.confirm(
            '此操作将导出excel文件, 是否继续?',
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }
        ).then(() => {
          this.export2Excel();
        }).catch(() => {
          ElMessage({
            type: 'info',
            message: '取消成功',
          })
        })
      } else {
        ElMessage({
          message: '权限不足',
          type: 'warning',
        })
      }
    },
    // 导出方法
    export2Excel() {
      var that = this;
      let tHeader = ["ID", "部门名称", "部门负责人", "状态"]; // 导出的表头名

      let filterVal = ["date", "name", "state", "city"];
      ElMessageBox.prompt('请输入文件名', '提示', {
        confirmButtonText: '生成',
        cancelButtonText: '取消',
      })
          .then(({value}) => {
            let data = that.formatJson(filterVal, that.tableData);
            export_json_to_excel(tHeader, data, value);
            ElMessage({
              type: 'success',
              message: `生成成功`,
            })
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '取消成功',
            })
          })
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
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
    //修改按钮操作
    update() {
      if (this.permissionQuery("修改")) {
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

.upload-demo {
  display: inline-block;
  margin-left: 10px;
}
</style>
