<template>
  <div class="w">
    <div class="head">

      <el-input size="small" v-model="input" placeholder="搜索" style="width:150px;margin-left: 25px">
          <template #suffix>
          <el-icon style="margin-top:9px;margin-right:10px"><i-search /></el-icon>
        </template>
      </el-input>

    </div>

    <div class="y">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template #default="props">
            <p>部门负责人: {{ props.row.state }}</p>
            <p>City: {{ props.row.city }}</p>
            <p>Address: {{ props.row.address }}</p>
            <p>Zip: {{ props.row.zip }}</p>
          </template>
        </el-table-column>
        <el-table-column label="ID" prop="id" />
        <el-table-column label="部门" prop="name" />
		<el-table-column label="部门负责人" prop="state" />
		<el-table-column label="状态" prop="city" />
      </el-table>
    </div>

  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
export default {
  data() {
    return {
        tableData: [
                {
                  id: '01',
                  name: '行政部',
                  state: '琴',
                  city: 'Los Angeles',
                  address: 'No. 189, Grove St, Los Angeles',
                  zip: 'CA 90036',
                },
                {
                  id: '02',
                  name: '人事部',
                  state: '凯亚',
                  city: 'Los Angeles',
                  address: 'No. 189, Grove St, Los Angeles',
                  zip: 'CA 90036',
                },
                {
                  id: '03',
                  name: '财务部',
                  state: '丽莎',
                  city: 'Los Angeles',
                  address: 'No. 189, Grove St, Los Angeles',
                  zip: 'CA 90036',
                },
                {
                  id: '04',
                  name: '技术部',
                  state: '阿贝多',
                  city: 'Los Angeles',
                  address: 'No. 189, Grove St, Los Angeles',
                  zip: 'CA 90036',
                },
                {
                  id: '05',
                  name: '市场部',
                  state: '优菈',
                  city: 'Los Angeles',
                  address: 'No. 189, Grove St, Los Angeles',
                  zip: 'CA 90036',
                },
              ],
            };
  },
};
</script>

<style>

table *{
    text-align: center;
}
.w {
  margin-top: 20px;
  border: 1px solid #e9e9e9;
}
.w:hover {
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  border-color: transparent;
}
.y{
    margin-top: 20px;
}
.head {
  margin-left: 2%;
  margin-top: 2%;
}

.demo-pagination-block{
  margin-left:850px ;
  margin-top: 20px;
  margin-bottom: 30px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

</style>

