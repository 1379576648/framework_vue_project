<!--员工编辑-->

<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <button @click="this.$parent.$data.employee_compile=false" type="button" class="ant-btn ant-btn-primary ant-btn-two-chinese-chars" style="margin-left: 1100px;margin-top: 20px;width: 80px;">
          <span>返回</span>
        </button>
        <div style="text-align: center; margin-top: 60px">

          <!-- 用户照片 -->
<!--          <div style="width: 170px;margin: auto;margin-top: -42px;padding-bottom: 37px;">-->
<!--            <div class="upload-btn common mb_10" v-if="!isShow">-->
<!--              <div style="margin-top: 65px;">-->
<!--              <i class="iconfont">&#xe636;</i>-->
<!--              </div>-->
<!--              <label>-->
<!--                <input type="file" @change="uploadImg"/>-->
<!--              </label>-->
<!--            </div>-->
<!--            <div class="img-list-item common mb_10" v-if="isShow">-->
<!--              <img :src="src" class="common">-->
<!--              <i class="del-img" @click="forkImage">-->
<!--              </i>-->
<!--            </div>-->
<!--          </div>-->

<!--          <el-dialog v-model="dialogVisible">-->
<!--            <img width="100%" :src="dialogImageUrl" alt="" />-->
<!--          </el-dialog>-->
<!--          <h1>12345</h1>-->

<!--         <div class="j-tabs2">-->
<!--           <el-menu-->
<!--               :default-active="activeIndex"-->
<!--               class="el-menu-demo"-->
<!--               mode="horizontal"-->
<!--               @select="handleSelect">-->

<!--             <router-link :to="{path:this.basicfile,query:{path: this.$route.query.path}}" style="text-decoration: none;">-->
<!--             <el-menu-item index="1">基本档案</el-menu-item>-->
<!--             </router-link>-->

<!--             <router-link :to="{path:this.information,query:{path: this.$route.query.path}}" style="text-decoration: none;">-->
<!--             <el-menu-item index="4">个人信息</el-menu-item>-->
<!--             </router-link>-->
<!--           </el-menu>-->

<!--          </div>-->

          <div style="margin-left: 30px;">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane  name="book" label="基本档案">
              <employee_basic/>
            </el-tab-pane>

            <el-tab-pane  name="second" label="个人信息">
             <employee_personal/>
            </el-tab-pane>
          </el-tabs>
          </div>

        </div>
      </div>
    </div>
  </div>
  &nbsp;
</template>

<script>
//基本档案
import employee_basic from '../employee_management/employee_basic.vue';
//个人信息
import employee_personal from  '../employee_management/employee_personal.vue';
import { Plus } from "@element-plus/icons";
export default {
  components: {
    Plus,
    //基本档案
    employee_basic,
    //个人信息
    employee_personal,
  },
  data() {
    return {
      src: '',
      isShow: false,
      book:'/employee/message/employee_roster',
      activeName:this.$parent.$data.two,
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
  },mounted() {
    //jWT传梯
    this.axios.defaults.headers.Authorization = "Bearer " + this.$store.state.token
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
