<template>
  <label v-for="menu in data">
  <el-sub-menu v-if="menu.MENU_ORDER==0" :index="menu.MENU_ROUTE">
    <template #title>
      <i class="iconfont">{{iconHandle(menu.MENU_MODULE)}}&nbsp;&nbsp;</i>
      <span>{{menu.MENU_NAME}}</span>
    </template>
    <menu_util  :data="menu.son"></menu_util>
  </el-sub-menu>
  <el-menu-item  v-else  :index="menu.MENU_ROUTE">
    {{menu.MENU_NAME}}
  </el-menu-item>
  </label>
</template>

<script>
export default {
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