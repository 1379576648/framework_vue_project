<!-- 公告页面 -->

<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">

        <div class="mt-20 ml-20 mr-20">
          <!-- 搜索数据部分 -->
          <el-form style="margin-bottom: -18px;" :inline="true" class="demo-form-inline">
            <!-- 公告标题搜索 -->
            <el-form-item class="form-gg" label="公告标题">
              <el-input size="small" placeholder="请输入公告标题"></el-input>
            </el-form-item>
            <!-- 操作人员搜索 -->
            <el-form-item class="form-ry" label="操作人员">
              <el-input size="small" placeholder="请输入操作人员"></el-input>
            </el-form-item>
            <!-- 公告类型搜索 -->
            <el-form-item class="form-lx" label="类型">
              <el-select size="small" v-model="affiche.type" placeholder="公告类型">
                <el-option
                    v-for="item in type"
                    :key="item.value1"
                    :label="item.label"
                    :value="item.value1"
                ></el-option>

              </el-select>
            </el-form-item>

            <el-form-item class="search" style="margin-top: -22px;margin-left: 10px;">
              <el-button size="small" class="search-ss" type="primary" @click="onSubmit"><i
                  class="iconfont">&#xe61b</i>搜索</el-button>
              <el-button size="small" class="search-cz" type="primary"><i class="iconfont">&#xe6b8</i>重置</el-button>
            </el-form-item>
          </el-form>

          <br />

          <!-- 操作按钮部分 -->
          <div class="button">
            <!-- 新增按钮 -->
            <el-button size="mini"
                       class="button-new"
                       @click="outerVisible = true,judge='新增'">
              + 新增
            </el-button>


            <!-- 弹出操作窗口 -->
            <el-dialog width="650px"  v-model="outerVisible" >
              <span class="headline"> {{judge}}公告</span>
              <!-- form表单 -->
              <el-form class="announcement" v-model="affiche">
                <!-- 公告标题 -->
                <h2 class="headlines" >公告标题</h2>
                <el-form-item class="announcement-title">
                  <el-input size="small" placeholder="请输入公告标题" v-model="affiche.title"></el-input>
                </el-form-item>
                <!-- 公告类型-->
                <h2 class="types" >公告类型</h2>
                <el-form-item  class="announcement-type">
                  <el-select  size="small"  v-model="affiche.type" placeholder="公告类型">
                    <el-option

                        v-for="item in type"
                        :key="item.value1"
                        :label="item.label"
                        :value="item.value1"
                    ></el-option>

                  </el-select>
                </el-form-item>
                <!-- 公告状态 -->
                <h2 class="state">状态</h2>
                <el-form-item>
                  <div class="announcement-zt">
                    <el-radio v-model="affiche.radio1" label="正常">正常</el-radio>
                    <el-radio v-model="affiche.radio1" label="2">关闭</el-radio>
                  </div>
                </el-form-item>
                <!-- 公告内容 -->
                <span class="neirong" >内容</span>
                <el-form-item>
                  <el-input
                      v-model="affiche.content"
                      style="width: 514px;
                      font-weight: bold;
                      size: 14px;
                      margin-top: 18px;
                      margin-left: 77px;"
                      type="textarea">
                  </el-input>

                </el-form-item>

                <el-form-item >
                  <div class="announcement-cz">
                    <el-button size="mini" style="width: 55px;" @click="cancel()">
                      取消
                    </el-button>
                    <!--										&lt;!&ndash; 修改按钮 &ndash;&gt;"innerVisible = true"-->
                    <el-button size="mini" style="width: 55px;" type="primary" @click="clike()">
                      {{judge}}
                    </el-button>
                  </div>
                </el-form-item>
              </el-form>
            </el-dialog>


            <el-button size="mini" class="button-delete">
              <i class="iconfont">&#xe61c</i>
              删除
            </el-button>
          </div>
        </div>



        <!-- 表格内容部分 -->
        <div class="sub-Content__primary">

          <el-table :data="tableData" style="width: 100%;margin-left: 24px;margin-bottom: 20px;"
                    :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
                    :cell-style="{ textAlign: 'center' }">
            <!-- 全选操作按钮 -->
            <el-table-column type="selection" width="100" />
            <el-table-column prop="date" label="序号" width="150" />
            <el-table-column prop="name" label="公告标题" width="170" />
            <el-table-column prop="state" label="公告类型" width="170" />
            <el-table-column prop="city" label="公告状态" width="160" />
            <el-table-column prop="address" label="发布人" width="160" />
            <el-table-column prop="zip" label="发布时间" width="175" />
            <el-table-column align="center" label="操作" width="200">
              <template #default="scope">
                <el-button size="mini" style="color: #A3D3FF; width: 61px;"  @click="outerVisible = true,judge='修改'">
                  <i class="iconfont">&#xe606</i>
                  修改
                </el-button>
                <el-button size="mini" style="color: #A3D3FF;width: 61px;">
                  <i class="iconfont">&#xe61c</i>
                  删除
                </el-button>
              </template>
            </el-table-column>
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
import {
  defineComponent,
  ref
} from 'vue'

import { ElNotification } from 'element-plus'

export default {
  data() {
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

      tableData: [{
        date: "1",
        name: "2",
        state: "3",
        city: "4",
        address: "5",
        zip: "6"
      }],
      affiche:{
        title:"",
        type:'',
        //单选框按钮
        radio1:'',
        /*内容*/
        content:'',
      },
      type:([
        {
          value1: '通知',
          label: '通知',
        },
        {
          value1: '公告',
          label: '公告',
        }
      ]),
      //显示添加还是有修改的状态
      outerVisible: ref(false),

      // 判断添加还是编辑
      judge: "添加",


    }
  },methods:{
    clike(){
      if (this.affiche.title.length === 0){
        ElNotification({
          title: '错误消息',
          message: '公告标题不能为空！！',
          type: 'error',
        })
      }else if(this.affiche.type.length === 0){
        ElNotification({
          title: '错误消息',
          message: '请选择公告类型！！',
          type: 'error',
        })
      }else if(this.affiche.radio1.length ===0){
        ElNotification({
          title: '错误消息',
          message: '请选择公告状态！！',
          type: 'error',
        })
      }else if(this.affiche.content.length === 0){
        ElNotification({
          title: '错误消息',
          message: '请填写公告内容，不能为空！！',
          type: 'error',
        })
      }
    },
    cancel(){
      this.affiche={
        title:"",
        type:'',
        //单选框按钮
        radio1:'',
        /*内容*/
        content:'',
      }
      this.outerVisible = false
    },

  }

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

/*内容*/
  .neirong{
    font-weight: bold;
    size: 14px;
    margin-left: 37px;
    position: absolute;
    top: 178px;
  }
/* 分页 */
.demo-pagination-block{
  margin-left: 617px;
  margin-bottom: 20px;
}
.headline{
  font-size: 18px;
  font-weight:bold;
  position: absolute;
  top: 16px;
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
.tck{
  width: 600px;
  height: 200px;
  background: green;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

/* 对话公告框标题文本样式 */
.announcement .headlines{
  font-size: 14px;
  margin-left: 12px;
  margin-top: 20px;
}
/* 对话框公告类型下拉框样式 */
.announcement .types{
  font-size: 14px;
  margin-left: 360px;
  margin-top:-31px;
}
/* 对话框公告状态单选框样式 */
.announcement .state{
  font-size: 14px;
  margin-left: 37px;
  margin-top:19px;
}
/* 对话框公告内容文本框样式 */
.announcement .content{
  font-size: 14px;
  margin-left: 37px;
  margin-top:23px;
}

/* 弹出窗口按钮样式 */
.announcement .announcement-cz{
  width: 130px;
  margin-top: 19px;
  margin-left: 471px;
  margin-bottom: -1px;
}
/* 弹出窗口内容样式 */
.announcement .announcement-nr {
  width: 525px;
  margin-top: -20px;
  margin-left: 80px;
  margin-bottom: -45px;

}
/* 弹出窗口状态样式 */
.announcement .announcement-zt {
  margin-top: -30px;
  margin-left: 80px;
}
/* 弹出窗口类型样式 */
.announcement .announcement-type {
  width: 240px;
  margin-top: -30px;
  margin-left: 428px;

}
/* 弹出窗口标题样式 */
.announcement .announcement-title {
  width: 240px;
  margin-top: -30px;
  margin-left: 80px;

}
.button{
  margin-bottom: 20px;
  margin-top: 15px;
}
/* 表头新增按钮 */
.button .button-new {
  height: 30px;
  width: 90px;
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
  margin: 0px 0px 0px 10px;
  border: none;
  width: 106px;
}

.button .button-new:hover {
  height: 30px;
  width: 90px;
  color: white;
  background-color: #1890FF;
  margin: 0px 0px 0px 10px;
  border: none;
  width: 106px;
}

/* 表头批量删除按钮样式 */
.button-delete {
  height: 30px;
  width: 90px;
  color: #ff9292;
  background-color: #ffeded;
  border-color: #ffdbdb;
  margin: 0px 0px 0px 5px;
  border: none;
  width: 106px;
}
.button-delete:hover {
  height: 30px;
  width: 90px;
  background: #ff4949;
  border-color: #ff4949;
  color: #fff;
  margin: 0px 0px 0px 5px;
  border: none;
  width: 106px;
}
/* 搜索 */
.form-gg {
  margin: 0px 0px 0px 10px;
}

.form-lx {
  margin: 0px 0px 0px 10px;
}

.form-ry {
  margin: 0px 0px 0px 10px;
}


/* 搜索按钮 */
.search-ss {
  background-color: #085FC3;
  color: white;
  margin: 29px 0px 0px 5px;
  width: 100px;
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
}
.search-ss:hover {
  background-color: #085FC3;
  color: white;
  margin: 29px 0px 0px 5px;
  width: 100px;
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
}
/* 重置按钮 */
.search-cz {
  color: black;
  margin: 29px 0px 0px 5px;
  width: 100px;
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
  margin: 29px 0px 0px 5px;
  width: 100px;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
}
</style>
