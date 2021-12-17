<!--员工编辑-->

<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <div style="text-align: center; margin-top: 60px">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            shape="circle"
          >
            <el-icon><plus /></el-icon>
          </el-upload>
          <el-dialog v-model="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
          <h1>12345</h1>

         <div class="j-tabs2">
           <el-menu
               :default-active="activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               @select="handleSelect">

             <router-link :to="{path:this.basicfile,query:{path: this.$route.query.path}}" style="text-decoration: none;">
             <el-menu-item index="1">基本档案</el-menu-item>
             </router-link>

             <router-link :to="{path:this.information,query:{path: this.$route.query.path}}" style="text-decoration: none;">
             <el-menu-item index="4">个人信息</el-menu-item>
             </router-link>
           </el-menu>

          </div>


            

        </div>
      <div>
        <section
          class="ant-layout ant-layout-has-sider"
          style="
            min-width: 988px;
            min-height: 90vh;
            background-color: rgba(232, 239, 246, 0);
            box-shadow: rgb(121, 159, 197) 0px 7px;
          "
          id="scrollLayout"
        >
          <main style="margin: 10px" class="ant-layout-content">
            <router-view></router-view>
          </main>
        </section>
      </div>
      </div>
    </div>
  </div>
  &nbsp;
</template>

<script>

import { Plus } from "@element-plus/icons";
export default {
  components: {
    Plus,
  },
  data() {
    return {
      basicfile:'/employee/message/employee_roster/basicfile',
      information:'/employee/message/employee_roster/information',
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    // handleRemove(file, fileList) {
    //   console.log(file, fileList);
    // },
    // handlePictureCardPreview(file) {
    //   this.dialogImageUrl = file.url;
    //   this.dialogVisible = true;
    // },
    //
    // handleClick(tab, event) {
    //   console.log(tab, event)
    // },
  },
};
</script>


<style scoped>
@import url("../../css/navigation.css");
.mainContent .sub-Content__primary {
  padding: 12px 24px;
  background: #fff;
  border-radius: 4px;
}
ul{
  border-button:none;
}

</style>
