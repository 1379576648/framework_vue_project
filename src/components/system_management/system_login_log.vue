<!-- 登录日志页面 -->

<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">
        <div class="mt-20 ml-20 mr-20">
          <!-- 搜索登录数据部分 -->
          <el-form :inline="true">
            <!-- 登录地址搜索 -->
            <el-form-item class="form-dizhi" label="登录地址">
              <el-input  size="small" placeholder="请输入登录地址"></el-input>
            </el-form-item>

            <!-- 用户名称搜索 -->
            <el-form-item class="form-name" label="用户名称">
              <el-input size="small" placeholder="请输入用户名称"></el-input>
            </el-form-item>

            <!-- 登录状态搜索 -->
            <el-form-item class="form-state" label="状态">
              <el-select style="width: 190px" size="small" v-model="value" placeholder="请选择登录状态">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <!-- 登录时间搜索 -->
            <el-form-item class="form-time" label="登录时间">
              <el-date-picker
                  size="small"
                  v-model="value1"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]"
              >
              </el-date-picker>
            </el-form-item>
            <!-- 操作按钮 -->
            <el-form-item style="margin-left: 1071px;margin-top: -11px;">
              <el-button size="small" class="search-ss" type="primary" @click="onSubmit"><i
                  class="iconfont">&#xe61b</i>搜索</el-button>
              <el-button size="small" class="search-cz" type="primary"><i class="iconfont">&#xe6b8</i>重置</el-button>
            </el-form-item>
          </el-form>

          <!-- 对数据的增删改按钮 -->
          <div class="button">
            <el-button class="button-delete" size="mini">删除</el-button>
            <el-button class="button-empty" size="mini">清空</el-button>
          </div>
        </div>

        <!-- 表格内容部分 -->
        <div class="sub-Content__primary">
          <el-table :data="tableData" style="width: 100% ;"

                    :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
                    :cell-style="{ textAlign: 'center' }"
                    :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <!-- 全选操作按钮 -->
            <el-table-column type="selection" width="50" />
            <el-table-column prop="id" label="访问编号" width="132" />
            <el-table-column prop="name" label="员工名称" width="132" />
            <el-table-column prop="phone" label="手机号码" width="135" />
            <el-table-column prop="IP" label="IP地址" width="150" />
            <el-table-column prop="device_type" label="设备类型" width="140" />
            <el-table-column prop="state" label="状态" width="135" />
            <el-table-column prop="browser" label="浏览器" width="132" />
            <el-table-column prop="type" label="登录类型" width="135" />
            <el-table-column prop="date" sortable label="登录日期" width="170" />
          </el-table>
        </div>
        <!-- 分页 -->
        <div class="demo-pagination-block">
          <el-pagination
              v-model:currentPage="currentPage4"
              :page-sizes="[1, 2, 3, 4]"
              :page-size="1"
              layout="total, sizes, prev, pager, next, jumper"
              :total="10"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {ref} from 'vue'

export default {

  data() {
    //时间
    const value1 = ref('')

    //分页
    const handleSizeChange = (val) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val) => {
      console.log(`current page: ${val}`)
    }
    return {
      // 分页
      currentPage1: ref(5),
      currentPage2: ref(5),
      currentPage3: ref(5),
      currentPage4: ref(4),
      handleSizeChange,
      handleCurrentChange,

      // 搜索登录状态下拉框
      options: ref([
        {
          value: '成功',
          label: '成功',
        },
        {
          value: '失败',
          label: '失败',
        },
      ]),
      value: ref(''),

      //返回时间
      value1,

      //表格
      tableData: [{
        id: "1",
        name: "2",
        phone: "3",
        IP: "4",
        device_type: "5",
        state: "6",
        browser:"7",
        type:"8",
        date:"2002-2-02 11:12:11"
      },
        {
          id: "1",
          name: "2",
          phone: "3",
          IP: "4",
          device_type: "5",
          state: "6",
          browser:"7",
          type:"8",
          date:"2002-3-03 12:13:12"
        },
        {
          id: "1",
          name: "2",
          phone: "3",
          IP: "4",
          device_type: "5",
          state: "6",
          browser:"7",
          type:"8",
          date:"2002-4-04 13:16:41"
        },
      ],
    }
  },

}
</script>

<style type="text/css" scoped>
@import url("../../css/navigation.css");
@import url("../../css/zpdaohang.css");
/* 图标 */
@font-face {
  font-family: 'iconfont';
  /* Project id 2994452 */
  src: url('//at.alicdn.com/t/font_2994452_60uvtx3m6is.woff2?t=1638864192788') format('woff2'),
  url('//at.alicdn.com/t/font_2994452_60uvtx3m6is.woff?t=1638864192788') format('woff'),
  url('//at.alicdn.com/t/font_2994452_60uvtx3m6is.ttf?t=1638864192788') format('truetype');
}
/*表格样式*/
.sub-Content__primary{
  margin-bottom: 10px;
  margin-left: 10px;
}

/* 分页 */
.demo-pagination-block{
  margin-left: 617px;
  margin-bottom: 20px;
}

.button{
  margin-bottom: 17px;
  margin-top: -36px;

}
/* 删除表格数据按钮 */
.button-delete{
  color: #ff4949;
  background: #ffeded;
  border-color: #ffb6b6;
  border: none;
  width: 90px;
}
.button-delete:hover{
  background: #ff4949;
  border-color: #ff4949;
  color: #fff;
  border: none;
  width: 90px;
}
/* 清空表格数据按钮 */
.button-empty{
  width: 90px;
  color: #13ce66;
  background: #e7faf0;
  border-color: #a1ebc2;
  border: none;
}
.button-empty:hover{
  width: 90px;
  background: #13ce66;
  border-color: #13ce66;
  color: #fff;
  border: none;
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
/* 登录时间搜索按钮 */
.form-time{
  width: 270px;
  margin-left: -20px;
}

.form-state{
  width: 270px;
  margin-left: 20px;
}
/* 登录地址搜索样式 */
.form-name{
  width: 270px;
  margin-left: 20px;
}
/* 登录地址搜索样式 */
.form-dizhi{
  width: 270px;
}

</style>
