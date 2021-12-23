<template>
  <div class="circle">
    <video id="video" width="250" height="250"></video>
  </div>
  <br>
  <div style="text-align: center;">{{ info }}</div>
  <canvas id="canvas" width="250" height="250"></canvas>
  <dd>
    <p>© 版权所有</p>
  </dd>
</template>

<script setup>
window.onload = function () {
  var ip = "https://rlsb.cxlwt.cn";

  //访问用户媒体设备的兼容方法
  function getUserMedia(constraints, success, error) {
    if (navigator.mediaDevices.getUserMedia) {
      //最新的标准API
      navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
    } else if (navigator.webkitGetUserMedia) {
      //webkit核心浏览器
      navigator.webkitGetUserMedia(constraints, success, error)
    } else if (navigator.mozGetUserMedia) {
      //firfox浏览器
      navigator.mozGetUserMedia(constraints, success, error);
    } else if (navigator.getUserMedia) {
      //旧版API
      navigator.getUserMedia(constraints, success, error);
    }
  }

  let video = document.getElementById('video');
  let canvas = document.getElementById("canvas");
  let context = canvas.getContext('2d');

  function success(stream) {
    //兼容webkit核心浏览器
    let CompatibleURL = window.URL || window.webkitURL;
    //将视频流设置为video元素的源
    console.log(stream);
    //video.src = CompatibleURL.createObjectURL(stream);
    video.srcObject = stream;
    video.play();
  }

  function error(error) {
    console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
  }

  var a = 0;
  if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
    //调用用户媒体设备, 访问摄像头
    getUserMedia({video: {width: 230, height: 230}}, success, error);
  } else {
    alert('不支持访问用户媒体');
  }
}
</script>
<script>
import {ElNotification} from 'element-plus'
import {ElLoading} from 'element-plus';

export default {
  data() {
    return {
      //访问地址
      url: "http://localhost:80/",
      //输出信息
      info: "",
      //IP地址
      ip: "",
      //ip所在地
      ipName: "",
      //浏览器名称
      browserName: "",
      //设备类型
      deviceType: "",
    }
  }, methods: {
    face() {
      //获取图片信息
      let canvas = document.getElementById("canvas");
      let context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, 230, 230);
      //转图片格式
      var img = canvas.toDataURL("image/jpeg", 0.5);
      //访问后台
      this.axios({
        method: 'post',
        url: this.url + 'register',
        data: {
          'base': img.substring(23),
          "ip": this.ip,
          "ipName": this.ipName,
          "browserName": this.browserName,
          "deviceType": this.deviceType
        },
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response) => {
        //如果服务发生关闭
        if (response.data.data.data) {
          //弹出异常信息
          ElNotification.error({
            title: '提示',
            message: response.data.data.data.info,
            offset: 100,
          })
        } else {
          //如果服务发生雪崩
          if (response.data.data.state === 300) {
            //弹出异常信息
            ElNotification.error({
              title: '提示',
              message: response.data.data.info,
              offset: 100,
            })
          } else {
            //如果人脸识别失败
            if (typeof response.data.data.error == "string") {
              //提示相当于的信息
              this.info = response.data.data.error;
              //显示正在识别
              setTimeout(this.update, 1000);
            } else {
              //获取后台传过来的数据
              let value = response.data.data.succeed;
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
                "staffOutlook": value.staffOutlook
              }
              //将形成的对象存放起来
              this.$store.commit("staffInfo", obj)
              //跳转到主页面 并且不能回退
              this.$router.push({path: '/home', replace: true})
            }
          }
        }
      })
    },
    //修改显示的状态
    update() {
      this.info = "正在识别..."
    }
  }, mounted() {
    this.$nextTick(function () {
      //修改显示的状态
      setTimeout(this.update, 1000);
      //调用后台接口进行识别并修改状态
      setInterval(this.face, 3000);
    })
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
@import "../../../css/begin/rest/faceLogin.css";
</style>