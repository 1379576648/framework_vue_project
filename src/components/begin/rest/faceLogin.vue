<template>
    <div class="circle">
      <video id="video" width="250" height="250"></video>
    </div>
    <br>
    <div>{{info}}</div>
    <canvas id="canvas" width="250" height="250"></canvas>
  <dd>
    <p>© 版权所有</p>
  </dd>
</template>

<script setup>
  window.onload=function() {
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
import { ElNotification } from 'element-plus'
import { ElLoading } from 'element-plus';
export default {
  data(){
    return{
      url :"http://localhost:80/",
      info:"",
    }
  },methods:{
    face(){
      let canvas = document.getElementById("canvas");
      let context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, 230, 230);
      var img = canvas.toDataURL("image/jpeg", 0.5);
      this.axios({
        method: 'post',
        url: this.url + 'register',
        data: {'base': img.substring(23)},
        responseType: 'json',
        responseEncoding: 'utf-8',
      }).then((response)=>{
        if (response.data.data.state===100){
          ElNotification.error({
          title: '通知',
          message: response.data.data.info,
          offset: 100,
        })
        }else if(response.data.data.state===200){
          this.info=response.data.data.info
          if (response.data.data.info==="成功"){
              this.$router.push({path:'/home',replace:true})
          }else{
            setTimeout( this.update,1000);
          }
        }else if(response.data.data.state===300){
          ElNotification.error({
            title: '通知',
            message: response.data.data.info,
            offset: 100,
          })
        }
      })
    },
    //修改显示的状态
    update(){
      this.info="正在识别..."
    }
  },mounted() {
    this.$nextTick(function (){
      //修改显示的状态
      setTimeout( this.update,1000);
      //调用后台接口进行识别并修改状态
     setInterval(this.face,4000);
    })
  }
}
</script>

<style scoped>
@import "../../../css/begin/rest/faceLogin.css";
</style>