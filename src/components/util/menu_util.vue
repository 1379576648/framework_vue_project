<!--动态左侧无限多级菜单工具-->
<template>
  <label v-for="(menu,index,) in data">
  <el-sub-menu v-if="menu.MENU_LEAF==0&&menu.MENU_STATE==0&&menu.MENU_TYPE==0" :index="menu.MENU_ROUTE">
    <template #title>
      <i class="iconfont">{{iconHandle(menu.PICTURE_ADDRESS)}}&nbsp;&nbsp;</i>
      <span>{{menu.MENU_NAME}}</span>
    </template>
    <menu_util  :data="menu.son"></menu_util>
  </el-sub-menu>
  <el-menu-item  v-else-if="menu.MENU_LEAF==1&&menu.MENU_STATE==0|| data[index+1].MENU_STATE==0" :index="menu.MENU_ROUTE">
    {{menu.MENU_NAME}}
  </el-menu-item>
  </label>
</template>

<script>
export default {
  data(){
    return{
      first:"1111",
    }
  },
  props:{
    data:Array
  },methods:{
  //字符串转图标字体
  iconHandle(icon){
    icon= icon.replace(/(&#x|;)/g, "")
    console.log(icon,"%u"+icon);
    return unescape("%u"+icon)
  }
}
};
</script>