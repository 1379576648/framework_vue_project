<!--转正管理-->
<template>
  <!-- 表格内容部分 -->
  <div class="sub-Content__primary">
    <el-table :data="tableData" stripe style="width: 100%"
              :header-cell-style="{background:'#eef1f6',color:'#606266'}">
      <el-table-column prop="staffName" label="姓名" width="220"/>
      <el-table-column prop="staffIdentity" label="证件号码" width="220"/>
      <el-table-column prop="deptname" label="部门" width="210"/>
      <el-table-column prop="postName" label="职位" width="210"/>
      <el-table-column prop="staffHiredate" label="入职日期" width="210"/>
      <!--       <el-table-column prop="testtime" label="试用期限" width="180" />-->
      <el-table-column label="试用期限" width="210">
        <template #default="scope">
          <span>三个月</span>
        </template>
      </el-table-column>

    </el-table>
  </div>

  <br/>
  <!-- 分页插件 -->
  <div class="demo-pagination-block" style="margin-left: 25px;margin-bottom: 20px">
    <el-pagination
        v-model:currentPage="pageInfo.currentPage"
        :page-sizes="[4, 5, 10, 50]"
        v-model:page-size="pageInfo.pagesize"
        :default-page-size="pageInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
        :pager-count="5"
        prev-text="上一页"
        next-text="下一页"
        @size-change="selectQuick()"
        @current-change="selectQuick()"
        background
    >
    </el-pagination>
  </div>

</template>

<script>
import {defineComponent, ref} from 'vue'
import {ElMessage, ElNotification} from "element-plus";

export default defineComponent({

  data() {
    const one = (rule, value, callback) => {
      if (new Date() > value) {
        callback(new Error("转正日期不能小于当前时间"));
      } else {
        callback();
      }
    };
    return {
      url: "http://localhost:80/",
      tableData: [],
      seek: "",
      become_1: {
        name: '',
        dept: '',
        post: '',
        entrydate: '',
        tryoutdate: '',
        type: '',
        remarks: '',
        becomedate: ''
      },
      pageInfo: {
        // 分页参数
        currentPage: 1, //当前页
        pagesize: 4, // 页大小
        total: 0, // 总页数
      },
      rules: {
        type: [
          {
            required: true,
            message: '请选择转正类型',
            trigger: 'change',
          },
        ],
        becomedate: [
          {
            required: true,
            message: '请选择转正日期',
            trigger: 'change'
          },
          {
            validator: one, trigger: "change"
          },
        ],
      }
    };
  },
  setup() {
    const become = ref(false)
    return {
      become,
    }
  },
  methods: {
    RestForm() {
      this.become_1 = {
        name: '',
        dept: '',
        post: '',
        entrydate: '',
        tryoutdate: '',
        type: '',
        remarks: '',
        becomedate: ''
      }
    },
    //转正已生效
    selectStateOne() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectStateOne',
        data: {
          //当前页
          'currentPage': this.pageInfo.currentPage,
          //页大小
          "pagesize": this.pageInfo.pagesize,
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
  },
  mounted() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    //转正已生效
    this.selectStateOne();
  }
})

</script>


<style scoped>
@import url("../../css/navigation.css");

/deep/ .mainContent .sub-Content__primary {
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
}

/deep/ .cell {
  padding-left: 10px;
  text-align: center;
  color: black;
  font-size: 12px
}

/deep/ .el-form-item {
  display: flex;
  margin-bottom: 22px;
}

/deep/ .el-card__body {
  /* padding: var(--el-card-padding); */
  padding: 10px 0;
}


/deep/ .icon-p p {
  text-align: center;
}

</style>
