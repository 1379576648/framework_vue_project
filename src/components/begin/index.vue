<template>
  <particles>
  </particles>
  <dl class="admin_login" style="position: relative;z-index: 999999;text-align: center;">
    <el-menu
        class="el-menu-demo"
        mode="horizontal"
        style="background-color: #0c9c6e"
        :default-active="activate_router"
        @select="handleSelect"
    >
      <el-menu-item index="/beginIndex/faceLogin" style="color: beige;font-size: 14px">人脸验证</el-menu-item>
      <el-menu-item index="/beginIndex/passLogin" style="color: beige;font-size: 14px">密码验证</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </dl>
</template>
<script>
import Particles from '../particles/index.vue'
import {ElLoading} from "element-plus";

export default {
  data() {
    return {
      activate_router: window.location.pathname
          .substring(0, window.location.pathname.length)
    }
  },
  components: {
    "particles": Particles
  }, methods: {
    //设置默认路由
    defaultRouter() {
      //默认路由等于浏览器路径的字段
      this.activate_router = window.location.pathname
          .substring(0, window.location.pathname.length)
    },
    handleSelect(key, keyPath) {
      //通过path 跳转路由 并且传当前激活路由为参数
      this.$router.push({
        path: key
      })
    }
  }
  , created() {
    //监听点击浏览器的前级跟回退按钮
    window.addEventListener('popstate', this.defaultRouter, false);
  }
};

</script>
<style scoped>
@import "../../css/begin/index.css";

.el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  background-color: rgba(0, 0, 0, 0.1) !important;
}

.el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
  background-color: rgba(0, 0, 0, 0.1) !important;
}

/deep/ .el-menu {
  background-color: rgb(22, 160, 133) !important;
}

.el-menu--horizontal {
  border-bottom: 0px;
}

.el-menu-item {
  margin-left: 30px;
  margin-right: 50px;
}

.el-menu--horizontal > .el-menu-item.is-active {
  color: red !important;
}

.el-menu-item:hover {
  background-color: rgba(0, 0, 0, 0.1) !important;
}

.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid red;
}
</style>