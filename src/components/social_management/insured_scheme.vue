<template>
  <!-- 参保方案 -->
  <div class="saas-main-content" v-if="new_insured_scheme==false">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <!-- 表格按钮部分 -->
        <div class="mt-20 ml-20 mr-20">
          <!-- 新增参保方案按钮 -->
          <el-button size="small" type="primary" @click="new_insured_scheme=true,name='新增',defInsuredId=0"> +新增
          </el-button>

          <!-- 下拉选择器 -->
          <div class="resume-operation">
            <el-select
                v-model="defInsuredState"
                size="small"
                clearable
                @change="next"
                placeholder="请选择"
            >
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <!-- 表格内容部分 -->
        <div class="sub-Content__primary">
          <el-table :data="scheme_table" stripe style="width: 100%">
            <el-table-column fixed :index="indexMethod" align="center" label="序号" type="index" width="100"/>
            <el-table-column prop="defInsuredName" sortable align="center" label="方案名称"/>
            <el-table-column prop="defInsuredNumber" sortable align="center" label="参保人数"/>
            <el-table-column prop="defInsuredState" sortable align="center" label="状态">
              <template #default="scope">
                <span v-if="scope.row.defInsuredState==0">可用</span>
                <span v-if="scope.row.defInsuredState==1">禁用</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button size="small" type="text"
                           @click="new_insured_scheme=true,name='修改',defInsuredId=scope.row.defInsuredId">
                  编辑
                </el-button>
                <el-button type="text" size="small"
                           @click="updateDefInsuredState(scope.row.defInsuredId,scope.row.defInsuredState)">
                  {{ scope.row.defInsuredState == 0 ? '禁用 ' : '启用 ' }}
                </el-button>
                <!-- 删除行确认框 -->
                <el-popconfirm v-if="scope.row.defInsuredState==1"
                               @confirm="deleteDefInsured(scope.row.defInsuredId)" title="删除此方案?"
                               @cancel="revocatory">
                  <template #reference>
                    <el-button style="color:red" type="text" size="small">删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页插件 -->
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
  <!--  新增-->
  <new_insured_scheme v-if="new_insured_scheme" :name="name"/>
</template>

<script>
import {ref, defineComponent} from "vue";
import {ElMessage, ElNotification} from 'element-plus'
//新增
import new_insured_scheme from '../social_management/new_insured_scheme.vue';

export default {
  //注册组件
  components: {
    //新增
    new_insured_scheme,
  },
  data() {
    return {
      //判断是新增还是修改
      name: '',
      //访问地址
      url: 'http://localhost:80/social/',
      //显示新增或者修改
      new_insured_scheme: false,
      // 分页
      pageInfo: {
        /* 当前的页 */
        currenPage: 1,
        //页大小
        pageSize: 5,
        //总条数
        total: 0,
      },
      //下拉选择器
      options: [
        {value: "0", label: "启用"},
        {value: "1", label: "禁用"},
      ],
      // 下拉框的值
      defInsuredState: "",
      //社保方案编号
      defInsuredId: 0,
      // 参保方案表数据
      scheme_table: [],
      //token
      token: this.$store.state.token
    };
  },
  methods: {
    revocatory() {
      ElMessage({
        message: '取消成功',
        type: 'info',
      })
    },
    /*分页查询*/
    next() {
      var _this = this
      this.axios({
        method: 'post',
        url: this.url + 'selectDefInsured',
        data: {
          //当前页
          'currenPage': this.pageInfo.currenPage,
          //页大小
          "pageSize": this.pageInfo.pageSize,
          //状态
          "defInsuredState": this.defInsuredState,
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code == 200) {
         if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              _this.scheme_table = response.data.data.info.records
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
    //修改社保方案状态
    updateDefInsuredState(id, state) {
      this.axios({
        method: 'put',
        url: this.url + 'updateDefInsuredState/' + id,
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code == 200) {
          if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              if (response.data.data.info == "成功") {
                this.next();
                ElMessage({
                  type: 'success',
                  message: state == 1 ? '启用成功' : '禁用成功',
                })
                this.$store.commit("updateToken", response.data.data.token);
              } else {
                ElMessage({
                  type: 'warning',
                  message: response.data.data.info,
                })
              }
            }else {
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
    //删除社保方案
    deleteDefInsured(id) {
      this.axios({
        method: 'delete',
        url: this.url + 'deleteDefInsured/' + id,
        responseEncoding: 'utf-8',
      }).then((response) => {
        if (response.data.code == 200) {
         if (response.data.data) {
            //如果服务是正常的
            if (response.data.data.state == 200) {
              if (response.data.data.info == "成功") {
                this.next();
                ElMessage({
                  type: 'success',
                  message: '删除成功',
                })
                this.$store.commit("updateToken", response.data.data.token);
              } else {
                ElMessage({
                  type: 'warning',
                  message: response.data.data.info,
                })
              }
            }else {
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
    /*序号*/
    indexMethod(index) {
      let curpage = this.pageInfo.currenPage; //单前页码，具体看组件取值
      let limitpage = this.pageInfo.pageSize; //每页条数，具体是组件取值
      return index + 1 + (curpage - 1) * limitpage;
    },
  }, mounted() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
    this.next();
  }
};
</script>

<style scoped>
/* 分页 */
.demo-pagination-block {
  margin: 10px 0 10px 10px;
}

/**
	 * 下拉选择器样式
	 */
.resume-operation {
  float: right;
  width: 120px;
}

/* 外层阴影 */
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

.j-card-body {
  padding: 2% 2% 0 2%;
}

table * {
  text-align: center;
}

</style>

