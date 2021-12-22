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
      url: "http://localhost:80/",
      info: "",
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
        data: {'base': img.substring(23)},
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
                 "staffPicture":value.staffPicture,
                //员工学历
                "staffEducation":value.staffEducation,
                //员工政治面貌
                "staffOutlook":value.staffOutlook
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
  }
}
</script>

<style scoped>
@import "../../../css/begin/rest/faceLogin.css";
</style>