<template>
  <!--a
    工作日历
    -->
  <div class="home_block_card">
    <div class="j-card home_cal_t_card normal mainContent">
      <el-calendar>
        <template #dateCell="{ data }">
          <p :class="data.isSelected ? 'is-selected' : ''">
            {{ data.day.split('-').slice(1).join('-') }}
            {{ data.isSelected ? '✔️' : '' }}
          </p>
        </template>
      </el-calendar>
    </div>
  </div>
</template>

<script>

</script>

<style type="text/css" scoped>
@import url("../../css/navigation.css");

</style>
<style>
.el-calendar-table .el-calendar-day{
  height: 50px;
}
</style>
