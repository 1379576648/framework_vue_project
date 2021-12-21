<!--员工编辑-->

<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <router-link :to="{path:this.book,query:{path: this.$route.query.path}}">
        <button type="button" class="ant-btn ant-btn-primary ant-btn-two-chinese-chars" style="margin-left: 1100px;margin-top: 20px;width: 80px;">
          <span>返回</span>
        </button>
        </router-link>
        <div style="text-align: center; margin-top: 60px">

          <!-- 用户照片 -->
          <div style="width: 170px;margin: auto;margin-top: -42px;padding-bottom: 37px;">
            <div class="upload-btn common mb_10" v-if="!isShow">
              <div style="margin-top: 65px;">
              <i class="iconfont">&#xe636;</i>
              </div>
              <label>
                <input type="file" @change="uploadImg"/>
              </label>
            </div>
            <div class="img-list-item common mb_10" v-if="isShow">
              <img :src="src" class="common">
              <i class="del-img" @click="forkImage">
              </i>
            </div>
          </div>






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
      src: '',
      isShow: false,
      book:'/employee/message/employee_roster/book',
      basicfile:'/employee/message/employee_roster/basicfile',
      information:'/employee/message/employee_roster/information',
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods:{
    goblack(){
      this.$router.go('-1');
    },
    uploadImg(e) {
      let _this = this;
      let files = e.target.files[0];
      if (!e || !window.FileReader) return; // 看支持不支持FileReader
      let reader = new FileReader();
      reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
      reader.onloadend = function () {
        _this.src = this.result;
        _this.isShow = true;
      }
    },

    forkImage() {
      this.src = '';
      this.isShow = false;
    },
  }
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

.common {
  width: 170px;
  height: 170px;
  border: 1px solid #d8d8d9;
}

.img-list-item {
  position: relative;
}

.img-list-item img {
  box-sizing: border-box;
  vertical-align: middle;
  border: 0;
}

.img-list-item i.del-img {
  width: 15px;
  height: 15px;
  display: inline-block;
  background: rgba(0, 0, 0, .6);
  background-size: 10px;
  background-repeat: no-repeat;
  background-position: 50%;
  position: absolute;
  top: 0;
  right: 0;
}

input[type="file"] {
  color: transparent;
  opacity: 0;
  width: 100%;
  height: 100%;
}

#wrapper:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

</style>
