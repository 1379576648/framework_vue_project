<template>
  <particles >
  </particles>
  <dl class="admin_login" style="position: relative;z-index: 999999;text-align: center;" >
      <router-link to="/beginIndex/faceLogin" style="margin-right: 70px;" active-class="active" replace>人脸验证</router-link>
      <router-link to="/beginIndex/passLogin" active-class="active"  replace>密码验证</router-link><br/>
      <router-view></router-view>
  </dl>
</template>
<script>
import Particles from '../particles/index.vue'
import {ElLoading} from "element-plus";
export default {
  components: {
    "particles":Particles
  },watch:{
    '$route' (to, from) {
      this.$router.go(0);
    }
  }
};

</script>
<style scoped>
@import "../../css/begin/index.css";
</style>