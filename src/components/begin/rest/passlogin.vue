<template>
  <dd class="user_icon">
    <input type="text" placeholder="账号" class="login_txtbx" v-model="name"/>
  </dd>
  <dd class="pwd_icon">
    <input type="password" placeholder="密码" class="login_txtbx" v-model="pass" @keyup.enter="submit"/>
  </dd>
  <dd>
    <input type="button" value="点击登录" class="submit_btn" @click="submit"/>
  </dd>
  <dd>
    <p>© 版权所有</p>
  </dd>
</template>
<script>
import {ElNotification} from 'element-plus'
import {ElLoading} from 'element-plus';

export default {
  data() {
    return {
      //访问地址
      url: "http://localhost:80/",
      //手机号码
      name: "",
      //密码
      pass: "",
      //IP地址
      ip: "",
      //ip所在地
      ipName: "",
      //浏览器名称
      browserName: "",
      //设备类型
      deviceType: "",
      //菜单列表
      memuList1: [],
      memuList2: [],
      oo: [],
    }
  }, methods: {
    //点击登录操作
    submit() {
      //如果账号为空
      if (this.name == "" || this.name == null || this.name == undefined) {
        ElNotification.warning({
          title: '提示',
          message: "请输入账号",
          offset: 100,
        })
        //如果密码为空
      } else if (this.pass == "" || this.pass == null || this.pass == undefined) {
        ElNotification.warning({
          title: '提示',
          message: "请输入密码",
          offset: 100,
        })
        //如果账号格式有误
      } else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.name))) {
        ElNotification.warning({
          title: '提示',
          message: "请输入正确的手机号码",
          offset: 100,
        })
        //如果密码格式有误
      } else if (!(/^(\w){6,20}$/.test(this.pass))) {
        ElNotification.warning({
          title: '提示',
          message: "密码由6-20个字母、数字、下划线组成",
          offset: 100,
        })
      } else {
        //访问后台
        this.axios({
          method: 'post',
          url: this.url + 'login',
          data: {
            "phone": this.name,
            "pass": this.pass,
            "ip": this.ip,
            "ipName": this.ipName,
            "browserName": this.browserName,
            "deviceType": this.deviceType
          },
          responseType: 'json',
          responseEncoding: 'utf-8',
        }).then((response) => {
          if (response.data.code == 200) {
            if (response.data.data) {
              //如果服务是正常的
              if (response.data.data.state == 200) {
                //如果有数据
                if (response.data.data.succeed=="成功") {
                  //如果数据里面有员工信息
                  if (response.data.data.info.staffName) {
                    //获取后台传过来的数据
                    let value = response.data.data.info;
                    //读取需要的数据形成对象
                    let obj = {
                      //员工编号
                      "staffId": value.staffId,
                      //员工名称
                      "staffName": value.staffName,
                      //员工手机号
                      "staffPhone": value.staffPhone,
                      //员工性别
                      "staffSex": value.staffSex,
                      //员工照片地址
                      "staffPicture": value.staffPicture,
                      //员工学历
                      "staffEducation": value.staffEducation,
                      //员工政治面貌
                      "staffOutlook": value.staffOutlook,
                      //部门职位编号
                      "deptPostId": value.deptPostId,
                      //部门编号
                      "deptId": value.deptId,
                    }
                    //将形成的对象存放起来
                    this.$store.commit("staffInfo", obj);
                    console.log(response.data.data.menuList)
                    this.$store.commit("updateMenuList", response.data.data.menuList);
                    sessionStorage.setItem("refresh", "true")
                    this.$store.commit("updateToken", response.data.data.token);
                    //跳转可以
                    if (response.data.data.menuList == '') {
                      this.$router.push({path: '/error', replace: true})
                    } else {
                      this.$router.push({path: '/home', replace: true})
                    }
                  }
                  //如果数据里面没有员工信息
                  else {
                    ElNotification.warning({
                      title: '提示',
                      message: "请" + response.data.data.info.error + "分钟后再试",
                      offset: 100,
                    })
                  }
                }
                else {
                  ElNotification.warning({
                    title: '提示',
                    message: response.data.data.succeed,
                    offset: 100,
                  })
                }
              } else {
                ElNotification.error({
                  title: '提示',
                  message: response.data.data.info,
                  offset: 100,
                })
              }
            }
          } else {
            ElNotification.error({
              title: '提示',
              message: response.data.message,
              offset: 100,
            })
          }
        })
      }
    }
  }, mounted() {
    //ip地址
    this.ip = returnCitySN['cip'];
    //ip所在地
    this.ipName = returnCitySN['cname'];
    //浏览器名称
    let u = navigator.userAgent
    if (/sogousearch/i.test(u)) {
      this.browserName = "sogousearch";
    } else if (/MicroMessenger/i.test(u)) {
      this.browserName = "wechat";
    } else if (!!u.match(/Weibo/i)) {
      this.browserName = "Weibo";
    } else if (!!u.match(/UCBrowser/i) || u.indexOf(' UBrowser') > -1) {
      this.browserName = "UCBrowser";
    } else if (u.indexOf('MetaSr') > -1 || u.indexOf('Sogou') > -1) {
      this.browserName = "Sogou";
    } else if (u.indexOf('MiuiBrowser') > -1) {
      this.browserName = "MiuiBrowser";
    } else if (u.indexOf('Baidu') > -1 || u.indexOf('BIDUBrowser') > -1) {
      this.browserName = "Baidu";
    } else if (u.indexOf('360EE') > -1 || u.indexOf('360SE') > -1) {
      this.browserName = "360EE";
    } else if (u.indexOf('2345Explorer') > -1) {
      this.browserName = "2345Explorer";
    } else if (u.indexOf('Edge') > -1) {
      this.browserName = "Edge";
    } else if (u.indexOf('Trident') > -1 && u.indexOf('rv:11.0') > -1) {
      this.browserName = "ie11";
    } else if (u.indexOf('compatible') > -1 && u.indexOf('MSIE') > -1) {
      this.browserName = "ie";
    } else if (u.indexOf('Firefox') > -1) {
      this.browserName = "Firefox";
    } else if (u.indexOf('Safari') > -1 && u.indexOf('Chrome') === -1) {
      this.browserName = "Safari";
    } else if (u.indexOf('MQQBrowser') > -1 && u.indexOf(' QQ') === -1) {
      this.browserName = "MQQBrowser";
    } else if (u.indexOf('QQ') > -1) {
      this.browserName = "QQ";
    } else if (u.indexOf('Chrome') > -1 || u.indexOf('CriOS') > -1) {
      this.browserName = "Chrome";
    } else if (u.indexOf('Opera') > -1 || u.indexOf('OPR') > -1) {
      this.browserName = "Opera";
    }
    //设备类型
    if (!!u.match(/compatible/i) || u.match(/Windows/i)) {
      this.deviceType = 'windows';
    } else if (!!u.match(/Macintosh/i) || u.match(/MacIntel/i)) {
      this.deviceType = 'macOS';
    } else if (!!u.match(/iphone/i) || u.match(/Ipad/i)) {
      this.deviceType = 'ios';
    } else if (!!u.match(/android/i)) {
      this.deviceType = 'android';
    } else {
      this.deviceType = 'other';
    }
  }

}

</script>

<style scoped>
@import "../../../css/begin/rest/passLogin.css";
</style>