<!--动态左侧无限多级菜单工具-->
<template>
<!--循环菜单列表-->
  <label v-for="(menu,index) in data">
      <!-- 如果菜单有叶子 并且 状态为可用 并且类型为菜单 并且 下一个菜单的类型为菜单   -->
      <el-sub-menu v-if="menu.MENU_LEAF==0&&menu.MENU_STATE==0&&menu.MENU_TYPE==0 && data[index].son[0].MENU_TYPE==0" :index="menu.MENU_ROUTE">
        <template #title>
          <!--  菜单图标        -->
          <i class="iconfont">{{ iconHandle(menu.PICTURE_ADDRESS) }}&nbsp;&nbsp;</i>
          <!-- 菜单名称         -->
          <span>{{ menu.MENU_NAME }}</span>
        </template>
        <!--梯归        -->
        <menu_util :data="menu.son"></menu_util>
      </el-sub-menu>
        <!--如果菜单没有叶子 并且状态为可用 并且菜单类型为菜单 或者下一个类型为按钮    -->
      <el-menu-item v-else-if="menu.MENU_LEAF==1&&menu.MENU_STATE==0&&menu.MENU_TYPE==0 ||  data[index].son[0].MENU_TYPE==1 " :index="menu.MENU_ROUTE">
        {{ menu.MENU_NAME }}
      </el-menu-item>
    </label>
</template>

<script>
export default {
  props: {
    data: Array
  }, methods: {
    //字符串转图标字体
    iconHandle(icon) {
      icon = icon.replace(/(&#x|;)/g, "")
      console.log(icon, "%u" + icon);
      return unescape("%u" + icon)
    }
  }
};
</script>