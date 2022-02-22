<!--考勤记录-->
<template>
  <!--  考勤记录页面-->
  <div class="head">
    <div class="head-right">
      <!--  搜索框-->
      <el-input v-model="input3" placeholder="填写需要查询的！" style="width: 300px;margin-left: 10px;">
        <template #prepend>
          <el-select v-model="select" placeholder="查询" style="width: 80px">
            <el-option label="名称" value="名称"></el-option>
            <el-option label="编号" value="编号"></el-option>
          </el-select>
        </template>
        <template #append>
          <el-button>02
            <el-icon style="font-size: 16px">
              <i-search/>
            </el-icon>
          </el-button>
        </template>
      </el-input>

      <el-button type="primary" style="margin-left: 700px;">
        <el-icon style="font-size: 16px">
          <i-upload/>
        </el-icon>
        导出
      </el-button>

      <el-upload
          :action="this.url1"
          style="display: inline-block"
          :show-file-list="false"
          accept=".xlsx"
          :on-success="ExcelImport"
          :before-upload="beforeUpload"
      >
        <el-button size="medium">
          <el-icon style="font-size: 18px">
            <i-folder-opened/>
          </el-icon>
          导入
        </el-button>
      </el-upload>
      <el-button type="primary"> 历史归档</el-button>
    </div>
    <div class="select">
      <span style="margin-top:2px">部门：</span>
      <!-- 查询所有部门-->
      <el-checkbox v-model="checked1" label="人事部" size="medium"></el-checkbox>
      <el-checkbox v-model="checked2" label="行政部" size="medium"></el-checkbox>
      <el-checkbox v-model="checked2" label="市场部" size="medium"></el-checkbox>
      <el-checkbox v-model="checked2" label="运营部" size="medium"></el-checkbox>
      <el-checkbox v-model="checked2" label="后勤部" size="medium"></el-checkbox>
    </div>
    <div class="selects">
      <span style="margin-top:2px">考勤状态：</span>
      <el-checkbox v-model="checked1" label="正常" size="medium"></el-checkbox>
      <el-checkbox v-model="checked2" label="旷工" size="medium"></el-checkbox>
      <el-checkbox v-model="checked2" label="迟到" size="medium"></el-checkbox>
      <el-checkbox v-model="checked2" label="早退" size="medium"></el-checkbox>
      <el-checkbox v-model="checked2" label="事假" size="medium"></el-checkbox>
    </div>
  </div>
  <!--表格-->
  <div class="bottom">
    <el-table :data="tableData" stripe border style="width: 100%;" height="297">
      <el-table-column prop="staffName" fixed label="员工名称" width="100"/>
      <el-table-column prop="deptName" fixed label="员工部门" width="100"/>
      <el-table-column prop="q" label="2/1"/>
      <el-table-column prop="w" label="6/2"/>
      <el-table-column prop="w" label="6/3"/>
      <el-table-column prop="w" label="6/4"/>
      <el-table-column prop="w" label="6/5"/>
      <el-table-column prop="w" label="6/6"/>
      <el-table-column prop="w" label="6/7"/>
      <el-table-column prop="q" label="6/8"/>
      <el-table-column prop="q" label="6/9"/>
      <el-table-column prop="w" label="6/10"/>
      <el-table-column prop="q" label="6/11"/>
      <el-table-column prop="w" label="6/12"/>
      <el-table-column prop="q" label="6/13"/>
      <el-table-column prop="w" label="6/14"/>
      <el-table-column prop="q" label="6/15"/>
      <el-table-column prop="1" label="6/16"/>
      <el-table-column prop="1" label="6/17"/>
      <el-table-column prop="1" label="6/18"/>
      <el-table-column prop="1" label="6/19"/>
      <el-table-column prop="1" label="6/20"/>
      <el-table-column prop="1" label="6/21"/>
      <el-table-column prop="1" label="6/22"/>
      <el-table-column prop="1" label="6/23"/>
      <el-table-column prop="1" label="6/24"/>
      <el-table-column prop="1" label="6/25"/>
      <el-table-column prop="1" label="6/26"/>
      <el-table-column prop="1" label="6/27"/>
      <el-table-column prop="1" label="6/28"/>
      <el-table-column prop="1" label="6/29"/>
      <el-table-column prop="1" label="6/30"/>
    </el-table>
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


<script>
import {ElMessage, ElNotification} from "element-plus";

export default {
  data() {
    return {
      input3: "",
      select: "",
      tableData: [
        {
          staffName: "王鑫",
          deptName: "人事部",
          q: "迟到",
          w: "√",
        },
      ],
      pageInfo: {
        currenPage: 1,
        /* 当前的页 */
        pagesize: 3,
        total: 0,
      },
      // 导入地址
      url1: "http://localhost:80/importCardRecord/",
    };

  },
  methods: {
    // 导入判断
    beforeUpload(file) {
      const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
      const whiteList = ["xls", "xlsx"];
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$message.error('上传文件只能是xls、xlsx格式');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB');
        return false;
      }
    },
    // 导入
    ExcelImport(response) {
      if (response.data.data) {
        ElNotification.warning({
          title: '提示',
          message: "服务发生关闭",
          offset: 100,
        })
      } else if (response.data.state === 200) {
        if (response.data.info === 99) {
          ElMessage({
            type: 'success',
            message: `导入成功`,
          })
        } else {
          ElNotification.warning({
            title: '提示',
            message: response.data.info,
            offset: 100,
          })
        }
      } else {
        ElNotification.warning({
          title: '提示',
          message: "服务发生雪崩",
          offset: 100,
        })
      }
    },
  },created() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
  }
};

</script>

<style scoped>
.head {
  margin-top: 7px;
  border: 1px solid #e9e9e9;
  margin-left: 20px;
  margin-right: 5px;
  margin-bottom: 10px;
}

.head:hover {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  border-color: transparent;
}

.head-right {
  margin-top: 10px;
}

.select {
  margin-left: 15px;
  margin-top: 10px;
}

.selects {
  margin-left: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.bottom {
  margin-top: 27px;
  border: 1px solid #e9e9e9;
  margin-left: 20px;
  margin-right: 5px;
  margin-bottom: 10px;
  padding: 1%;
}

.bottom:hover {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  border-color: transparent;
}

.demo-pagination-block {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>