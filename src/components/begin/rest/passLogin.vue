<template>
  <dd class="user_icon">
    <input type="text" placeholder="账号" class="login_txtbx" id="user_name" />
  </dd>
  <dd class="pwd_icon">
    <input type="password" placeholder="密码" class="login_txtbx" id="pwd" />
  </dd>
  <dd>
    <input type="button" value="点击登录" class="submit_btn"/>
  </dd>
  <dd>
    <p>© 版权所有</p>
  </dd>
</template>

<script>
export default {
  name: "passlogin"
}
</script>

<style scoped>
@import "../../../css/begin/rest/passLogin.css";
</style>