<template>
  <dd class="user_icon">
    <input type="text" placeholder="账号" class="login_txtbx"  v-model="name"/>
  </dd>
  <dd class="pwd_icon">
    <input type="password" placeholder="密码" class="login_txtbx"  v-model="pass" @keyup.enter="submit"/>
  </dd>
  <dd>
    <input type="button" value="点击登录" class="submit_btn"  @click="submit"/>
  </dd>
  <dd>
    <p>© 版权所有</p>
  </dd>
</template>
<script>
import { ElNotification } from 'element-plus'
import { ElLoading } from 'element-plus';
export default {
  data(){
    return{
        name:"",
        pass:"",
        count:0,
    }
  },methods:{
    //重置登录错误次数
    reset(){
      this.count=0;
    },
    //点击登录操作
    submit() {
      //如果账号为空
      if (this.name == ""||this.name==null||this.name==undefined) {
        ElNotification.warning({
          title: '提示',
          message: "请输入账号",
          offset: 100,
        })
        //如果密码为空
      }else if (this.pass == ""||this.pass==null||this.pass==undefined){
        ElNotification.warning({
          title: '提示',
          message: "请输入密码",
          offset: 100,
        })
        //如果账号格式有误
      }else if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.name))){
        ElNotification.warning({
          title: '提示',
          message: "请输入正确的手机号码",
          offset: 100,
        })
        //如果密码格式有误
      }else if(!(/^(\w){6,20}$/.test(this.pass))){
        ElNotification.warning({
          title: '提示',
          message: "密码由6-20个字母、数字、下划线组成",
          offset: 100,
        })
      }else{
        //输错三次判断
        if (this.count>=3){
          ElNotification.warning({
            title: '提示',
            message: "错误次数过多，请稍后重试",
            offset: 100,
          })
          setTimeout( this.reset,3000);
        }else{
          this.count=this.count+1;
          this.$router.push({path:'/home',replace:true})
        }
      }
    }

  }

}
</script>

<style scoped>
@import "../../../css/begin/rest/passLogin.css";
</style>