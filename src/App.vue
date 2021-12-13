<template>
  <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="60"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
  >
    <router-view/>
  </vue-particles>
</template>
<script charset = "utf-8"
        type = "text/javascript">
export default {
  /* 加载页面 */
  created: function () {
    //全局监听，页面刷新的时候将store里state的值存到sessionStorage中，
    //然后从sessionStorage中获取，再赋值给store。然后再把session里面
    //存的删除即可，相当于中间件的作用。在页面加载时读取sessionStorage
    //里的状态信息
    if (sessionStorage.getItem("state")) {
      //替换 store 的根状态，状态合并
      //Object.assign方法用于对象的合并，将源对象（source）的所有可枚举属性
      //，复制到目标对象（target）。Object.assign(target, source1, source2);
      this.$store.replaceState(
          Object.assign(
              this.$store.state,
              JSON.parse(sessionStorage.getItem("state"))
          )
      )
    }
    /* 清空本地内存*/
    sessionStorage.clear()
  }
  ,
  mounted: function () {
    /* 卸载页面 */
    window.addEventListener('beforeunload', () => {
      //刷新前将目前登录的用户保存到sessionStorage中
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    })
  }
}
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body{
		padding: 0px;
		margin: 0px;
	}

</style>
