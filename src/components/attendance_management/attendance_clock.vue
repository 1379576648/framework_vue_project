<!--打卡记录-->
<template>
  <div class="w">
    <div class="head">
      <el-button size="medium" @click="derive()">
        <el-icon style="font-size: 18px">
          <i-upload/>
        </el-icon>
        导出
      </el-button>
      <el-upload
          class="upload-demo"
          action
          :on-change="channel"
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
      <!--选择开始日期和结束日期-->
      <el-date-picker
          v-model="value1"
          type="daterange"
          unlink-panels
          range-separator="TO"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          wdaWD
          aW
          :shortcuts="shortcuts"
          style="margin-left: 340px"
      >
      </el-date-picker>
      <!--    全部部门-->
      <el-select size="small" v-model="value" clearable placeholder="全部部门" style="margin-left: 25px">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        >
        </el-option>
      </el-select>
      <!--搜索框-->
      <el-input size="small" v-model="input" placeholder="搜索" style="width:150px;margin-left: 25px">
        <template #suffix>
          <el-icon style="margin-top:9px;margin-right:10px">
            <i-search/>
          </el-icon>
        </template>
      </el-input>
    </div>
    <!--    表格-->
    <div class="y">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="staff" label="员工名称"/>
        <el-table-column prop="department" label="部门名称"/>
        <el-table-column prop="morning" label="早上打卡时间"/>
        <el-table-column prop="afternoon" label="下午打卡时间"/>
        <el-table-column prop="record" label="记录时间"/>
        <el-table-column prop="operate" label="操作">
          <template #default>
            <el-popconfirm
                confirm-button-text="确定"
                cancel-button-text="取消"
                :icon="InfoFilled"
                icon-color="red"
                title="确定删除吗?"
                @confirm="through1()"
            >
              <template #reference>
                <el-button type="text" size="small" style="color:darkorange">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
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
import {ref, defineComponent} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {export_json_to_excel} from '/src/excal/Export2Excel.js'
import XLSX from "xlsx";

export default {
  data() {
    return {
      pageInfo: {
        currenPage: 1,
        /* 当前的页 */
        pagesize: 3,
        total: 0,
      },
      //时间选择
      shortcuts: [
        {
          text: "最近一周",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            return [start, end];
          },
        },
        {
          text: "最近一个月",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            return [start, end];
          },
        },
        {
          text: "最近三个月",
          value: () => {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            return [start, end];
          },
        },
      ],
      //查询所有部门
      options: ref([
        {
          value: "Option1",
          label: "Option1",
        },
        {
          value: "Option2",
          label: "Option2",
        },
        {
          value: "Option3",
          label: "Option3",
        },
        {
          value: "Option4",
          label: "Option4",
        },
        {
          value: "Option5",
          label: "Option5",
        },
      ]),
      //打卡记录数据
      tableData: [
        {
          staff: '123',
          department: '23',
          morning: '9:00',
          afternoon: '18:00',
          record: '8',

        },
        {
          staff: '123',
          department: '23',
          morning: '9:00',
          afternoon: '18:00',
          record: '8',

        },
        {
          staff: '123',
          department: '23',
          morning: '9:00',
          afternoon: '18:00',
          record: '8',

        },
        {
          staff: '123',
          department: '23',
          morning: '9:00',
          afternoon: '18:00',
          record: '8',

        },
        {
          staff: '123',
          department: '23',
          morning: '9:00',
          afternoon: '18:00',
          record: '8',

        }
      ],
      value1: "", //日期
      value: ref(""), //选择
    };
  },
  methods: {
    // 点击删除确认按钮触发
    through1() {
      alert(1)
    },
    // 点击导出操作
    derive() {
      ElMessageBox.confirm(
          '此操作将导出excel文件, 是否继续?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
      ).then(() => {
        this.deriveExcel();
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消成功',
        })
      })
    },
    // 导出方法
    deriveExcel() {
      var _this = this;
      let tHeader = ["员工名称", "部门名称", "早上打卡时间", "下午打卡时间", "记录时间"]; // 导出的表头名
      let filterVal = ["staff", "department", "morning", "afternoon", "record"];//导出其prop属性
      ElMessageBox.prompt('请输入文件名', '提示', {
        confirmButtonText: '生成',
        cancelButtonText: '取消',
      }).then(({value}) => {
            let data = _this.formatJson(filterVal, _this.tableData);
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
    // 导入方法
    channel(obj){
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
            obj.staff = v.员工名称
            obj.department = v.部门名称
            obj.morning = v.早上打卡时间
            obj.afternoon = v.下午打卡时间
            obj.record = v.记录时间
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
    }
  }
};
</script>

<style>

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
  margin-left: 850px;
  margin-top: 20px;
  margin-bottom: 30px;
}
.upload-demo {
  display: inline-block;
  margin-left: 10px;
}
</style>

