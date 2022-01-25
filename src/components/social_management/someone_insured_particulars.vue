<template>
  <div class="saas-main-content">
    <div class="j-card j-card-bordered mainContent">
      <div class="j-card-body">
        <el-tabs :model-value="value" @tab-click="handleClick" :key="key">
          <el-tab-pane label="参保明细" name="1" :key="key_1">
            <someone_insured_details/>
          </el-tab-pane>
          <el-tab-pane label="参保记录" name="2" :key="key_2">
            <someone_insured_record/>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
  &nbsp;
</template>

<script>
import {ref, defineComponent} from "vue";
//参保明细
import someone_insured_details from '../social_management/someone_insured_details.vue';
//参保记录
import someone_insured_record from '../social_management/someone_insured_record.vue';

export default {
  components: {
    //参保明细
    someone_insured_details,
    //参保记录
    someone_insured_record,
  },
  data() {
    return {
      key:0,
      key_1: 0,
      key_2: 0,
      value: '1'
    }
  }, methods: {
    handleClick(tab, event) {
      if (tab.props.label == '参保明细') {
        this.key_1 = this.key_1 + 1;
      } else if (tab.props.label == '参保记录') {
        this.key_2 = this.key_2 + 1;
      }
    }
  },
};
</script>

<style scoped>
.j-card-body {
  padding: 1%  1% 0 1%;
}

/* 分页的样式 */
.demo-pagination-block {
  float: right;
  margin: 20px;
}

/* 外层阴影 */
.saas-main-content {
  padding-top: 12px;
  min-height: 500px;
}

.j-card-bordered {
  border: 1px solid #e9e9e9;
}

.j-card {
  background: #fff;
  border-radius: 4px;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  margin-top: 8px;
  min-height: 100%;
}

.j-card:hover {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-color: transparent;
}

.j-card-bordered {
  border: 1px solid #e9e9e9;
  border-top-color: rgb(233, 233, 233);
  border-right-color: rgb(233, 233, 233);
  border-bottom-color: rgb(233, 233, 233);
  border-left-color: rgb(233, 233, 233);
}

.j-card {
  background: #fff;
  border-radius: 4px;
  font-size: 14px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  margin-top: 8px;
  min-height: 100%;
}


a {
  text-decoration: none;
  color: #4779b9;
}

</style>

