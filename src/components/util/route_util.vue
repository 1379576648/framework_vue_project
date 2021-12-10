<!--动态添加显示路由-->
<template>
  <label v-for="menu in data">
    <label v-if="menu.MENU_LEAF==0&&menu.MENU_STATE==0">
      <route_util :data="menu.son"></route_util>
    </label>
    <label  v-else-if="menu.MENU_LEAF==1&&menu.MENU_STATE==0" >
     <router-view :name="(menu.MENU_ROUTE).replace('/','')"></router-view>
    </label>
  </label>
</template>

<script>
export default {
  props:{
    data:Array
  }
}
</script>
