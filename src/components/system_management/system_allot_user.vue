<!-- 登录日志页面 -->

<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body ">
        <div class="mt-20 ml-20 mr-20">
          <!-- 搜索导航部分-->
          <el-form :inline="true">
            <el-form-item class="user-name" label="用户名称">
              <el-input size="small" placeholder="请输入用户名称"></el-input>
            </el-form-item>

            <el-form-item class="phone" label="手机号码">
              <el-input size="small" placeholder="请输入手机号码"></el-input>
            </el-form-item>

            <el-form-item class="search">
              <el-button size="small" class="search-ss" type="primary" @click="onSubmit">
                <i class="iconfont" style="font-size: 13.5px;" >
                  &#xe61b
                </i>
                搜索
              </el-button>
              <el-button size="small" class="search-cz" type="primary">
                <i class="iconfont" style="font-size: 13.5px;">
                  &#xe6b8
                </i>
                重置
              </el-button>
            </el-form-item>
          </el-form>

          <!-- 对数据的增删改按钮 -->
          <div class="button">
            <el-button class="button-new" size="mini"  @click="outerVisible = true">+ 添加用户</el-button>
            <el-button class="button-amend" size="mini">-  批量取消授权</el-button>
            <router-link :to="{path:this.two,query:{path: this.$route.query.path}}">
              <el-button class="button-delete" size="mini">X 关闭</el-button>
            </router-link>
          </div>


          <!--添加用户对话框-->
          <el-dialog width="800px" title="选择用户" v-model="outerVisible" >
            <!-- form表单 -->
            <el-form class="announcement" :inline="true">

              <el-form-item class="username"  label="用户名称">
                <el-input size="mini" placeholder="请输入用户名称"></el-input>
              </el-form-item>

              <el-form-item class="phones"  label="手机号码">
                <el-input size="mini" placeholder="请输入手机号码"></el-input>
              </el-form-item>

              <el-form-item  style="margin-top: -32px;">
                <el-button size="mini" class="dialog-box-ss" type="primary" @click="onSubmit">
                  <i class="iconfont" style="font-size: 13px;" >
                    &#xe600
                  </i>
                  &nbsp;搜索
                </el-button>
                <el-button size="mini" class="dialog-box-cz" type="primary">
                  <i class="iconfont"  style="font-size: 13px;">
                    &#xe6b8
                  </i>
                  &nbsp;重置
                </el-button>
              </el-form-item>

              <!--添加用户表格-->
              <el-form-item>
                <!-- 表格内容部分 -->
                <div class="el-form-table">
                  <el-table :data="tableData" style="width: 100%;margin-left: 24px;margin-bottom: 20px;"
                            :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
                            :cell-style="{ textAlign: 'center' }">
                    <!-- 全选操作按钮 -->
                    <el-table-column type="selection" width="50" />
                    <el-table-column prop="name" label="用户名称" width="100" />
                    <el-table-column prop="mailbox" label="邮箱" width="180" />
                    <el-table-column prop="phone" label="手机号码" width="140" />
                    <el-table-column prop="state" label="状态" width="100" />
                    <el-table-column prop="creation_time" label="创建时间" width="185" />
                  </el-table>
                </div>
              </el-form-item>

              <!-- 分页 -->
              <div class="paging">
                <el-pagination
                    v-model:currentPage="Page4"
                    :page-sizes="[1,2]"
                    :page-size="4"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="5"
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentChange1"
                >
                </el-pagination>
              </div>

              <el-form-item >
                <div style="margin-left: 611px;margin-top: 10px;">
                  <el-button size="small" style="width: 60px;" type="primary" >
                    确定
                  </el-button>
                  <el-button size="small" style="width: 60px;" @click="outerVisible = false">
                    取消
                  </el-button>
                </div>
              </el-form-item>

            </el-form>
          </el-dialog>

          <!-- 表格内容部分 -->
          <div class="sub-Content__primary">
            <el-table :data="tableData" style="width: 100%;margin-left: 24px;margin-bottom: 20px;"
                      :header-cell-style="{textAlign: 'center',background:'#F0F0F0',color:'#6C6C6C'}"
                      :cell-style="{ textAlign: 'center' }">
              <!-- 全选操作按钮 -->
              <el-table-column type="selection" width="70" />
              <el-table-column prop="name" label="用户名称" width="200" />
              <el-table-column prop="mailbox" label="邮箱" width="202" />
              <el-table-column prop="phone" label="手机号码" width="206" />
              <el-table-column prop="state" label="状态" width="200" />
              <el-table-column prop="creation_time" label="创建时间" width="210" />
              <el-table-column align="center" label="操作" width="210">
                <template #default="scope">
                  <span class="cancel">
                    <i class="iconfont" style="position: absolute;top: 23px;left: 58px;">
                      &#xe631
                    </i>
                    取消权限
                  </span>
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
  </div>
</template>

<script>


import {defineComponent,ref} from 'vue'

export default {
  data() {
    //分页
    const handleSizeChange1 = (val) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange1 = (val) => {
      console.log(`current page: ${val}`)
    }

    //分页
    const handleSizeChange = (val) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val) => {
      console.log(`current page: ${val}`)
    }

    return {
      two:'/system/authority_management/role',

      //表格里分页
      Page1: ref(5),
      Page2: ref(5),
      Page3: ref(5),
      Page4: ref(4),
      handleSizeChange1,
      handleCurrentChange1,
      // 分页
      currentPage1: ref(5),
      currentPage2: ref(5),
      currentPage3: ref(5),
      currentPage4: ref(4),
      handleSizeChange,
      handleCurrentChange,

      //表格
      tableData: [{
        name: "牛子琪·",
        mailbox:"qq.com123456789",
        phone: "1552233445",
        state:"正常",
        creation_time:"2002-2-02 11:12:11"
      },
        {
          name: "官迷率·",
          mailbox:"qq.com145656789",
          phone: "15789233445",
          state:"正常",
          creation_time:"2002-3-03 12:13:12"
        },
        {
          name: "川井毛毛",
          mailbox:"qq.com785656789",
          phone: "157892223145",
          state:"正常",
          creation_time:"2002-4-04 10:43:42"
        },
      ],


      outerVisible:false,
    }
  },

}
</script>

<style type="text/css" scoped>
@import url("../../css/navigation.css");
@import url("../../css/zpdaohang.css");
@font-face {
  font-family: 'iconfont';  /* Project id 2994452 */
  src: url('//at.alicdn.com/t/font_2994452_zc48m96iud.woff2?t=1639381525619') format('woff2'),
  url('//at.alicdn.com/t/font_2994452_zc48m96iud.woff?t=1639381525619') format('woff'),
  url('//at.alicdn.com/t/font_2994452_zc48m96iud.ttf?t=1639381525619') format('truetype');
}
/*分页*/
.paging{
  margin-top: -10px;
  margin-left: 283px;
}

/*对话框表格*/
.el-form-table{
  margin-left: -24px;
  margin-top:20px;
}



/*添加用户权限对话框*/
.search{
  margin-top: -22px;
  margin-left: 10px;
}
/*对话框搜索按钮样式*/
.dialog-box-ss {
  background-color: #085FC3;
  color: white;
  margin: 29px 0px 0px 5px;
  width: 90px;
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;

}
.dialog-box-ss:hover {
  background-color: #085FC3;
  color: white;
  margin: 29px 0px 0px 5px;
  width: 90px;
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
}
/* 对话框重置按钮样式 */
.dialog-box-cz {
  color: black;
  margin: 29px 0px 0px 5px;
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
.dialog-box-cz:hover {
  color: black;
  margin: 29px 0px 0px 5px;
  width: 90px;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
}
.phones{
  width: 250px;
  margin-top: -10px;
  margin-left: 10px;
}
/**/
.username{
  width: 250px;
  margin-top: -10px;
  margin-left: 10px;
}


/* 分页 */
.demo-pagination-block{
  margin-left: 617px;
  margin-bottom: 20px;
}

.cancel{
  color: #5aaaff;
}
.sub-Content__primary{
  margin-left: -27px;
}

.button{
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 7px;
}
/*新增按钮样式*/
.button-new{
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
  border: none;
  width: 110px;
}
.button-new:hover{
  color: #fff;
  background-color: #1890ff;
  border-color: #1890ff;
  border: none;
  width: 110px;
}
/* 返回角色表格数据按钮 */
.button-delete{
  color: #ffba00;
  background: #fff8e6;
  border-color: #ffe399;
  border: none;
  width: 90px;
  margin-left: 10px;
}
.button-delete:hover{
  color: #fff;
  background-color: #ffba00;
  border-color: #ffba00;
  border: none;
  width: 90px;
  margin-left: 10px;
}
/* 修改表格数据按钮 */
.button-amend{
  width: 140px;
  color: #ff4949;
  background: #ffeded;
  border-color: #ffb6b6;
  border: none;
}
.button-amend:hover{
  width: 140px;
  color: #fff;
  background-color: #ff4949;
  border-color: #ff4949;
  border: none;
}

/* 搜索按钮 */
.search{

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
  margin: 29px 0px 0px 5px;
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
  margin: 29px 0px 0px 5px;
  width: 90px;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #1890ff;
  background: #e8f4ff;
  border-color: #a3d3ff;
}
/*手机号码搜索样式*/
.phone{
  width: 300px;
}
/*用户名称搜索样式*/
.user-name{
  width: 300px;
}
</style>
