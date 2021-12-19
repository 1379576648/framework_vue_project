<template>
  <input v-model="menuList">
	<div class="w">
		<div class="head">
			<el-button type="primary" style="margin-left: 16px" @click="dialog = true"
			  >+ 新增
			</el-button>&nbsp;&nbsp;
			<el-drawer ref="drawer" v-model="dialog" :before-close="handleClose" direction="ltr" custom-class="demo-drawer">
			  <div class="demo-drawer__content">
			    <el-form :model="form">
			      <el-form-item label="部门名称" :label-width="formLabelWidth">
			        <el-input v-model="form.name" autocomplete="off"></el-input>
			      </el-form-item>
			      <el-form-item label="负责人" :label-width="formLabelWidth">
			        <el-select v-model="form.region" placeholder="请选择">
			          <el-option label="Area1" value="shanghai"></el-option>
			          <el-option label="Area2" value="beijing"></el-option>
			        </el-select>
			      </el-form-item>
				  <el-form-item label="状态" :label-width="formLabelWidth">
				    <el-radio v-model="radio1" label="1">启用</el-radio>
				    <el-radio v-model="radio1" label="2">禁用</el-radio>
				  </el-form-item>
			    </el-form>
			    <div class="demo-drawer__footer">
			      <el-button @click="cancelForm">关闭</el-button>
			      <el-button type="primary" :loading="loading"><!-- @click="$refs.drawer.closeDrawer() -->
				  {{ loading ? 'Submitting ...' : '确认' }}
				  </el-button>
			    </div>
			  </div>
			</el-drawer>
			
			<el-button size="medium">
			  <el-icon style="font-size: 18px"><i-upload /></el-icon>导出
			</el-button>
			<el-button size="medium">
			  <el-icon style="font-size: 18px"><i-folder-opened /></el-icon>导入
			</el-button>
		</div>
		<div class="y">
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop="date" label="ID" />
				<el-table-column prop="name" label="部门名称" />
				<el-table-column prop="state" label="部门负责人" />
				<el-table-column prop="city" label="状态" />
				<el-table-column prop="operate" label="操作">
					<template #default>
						<el-button type="primary" style="margin-left: 16px" @click="drawer = true" label="rtl">修改</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-drawer v-model="drawer" title="部门负责人修改"  :direction="direction" :before-close="handleClose" >
			    <el-form :model="form">
			      <el-form-item label="部门名称" :label-width="formLabelWidth">
			        <el-input v-model="form.name" autocomplete="off"></el-input>
			      </el-form-item>
			      <el-form-item label="负责人" :label-width="formLabelWidth">
			        <el-select v-model="form.region" placeholder="请选择">
			          <el-option label="Area1" value="shanghai"></el-option>
			          <el-option label="Area2" value="beijing"></el-option>
			        </el-select>
			      </el-form-item>
			      <el-form-item label="状态" :label-width="formLabelWidth">
			        <el-radio v-model="radio1" label="1">启用</el-radio>
			        <el-radio v-model="radio1" label="2">禁用</el-radio>
			      </el-form-item>
			    </el-form>
				<div class="demo-drawer__footer">&nbsp;
				  <el-button type="primary" :loading="loading"><!-- @click="$refs.drawer.closeDrawer() -->
				  {{ loading ? 'Submitting ...' : '确认' }}
				  </el-button>
				</div>
			  </el-drawer>
		</div>
		<div class="demo-pagination-block">
		<el-pagination
		  v-model:currentPage="pageInfo.currenPage"
		  :page-sizes="[3, 5, 10, 50]"
		  v-model:page-size="pageInfo.pagesize"
		  :default-page-size="pageInfo.pagesize"
		  layout="total, sizes, prev, pager, next, jumper"
		  :total="pageInfo.total"
		  :pager-count="5"
		  background
		  @size-change="sele"
		  @current-change="sele"
		>
		</el-pagination>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
export default defineComponent({
  data: function () {
    const state = reactive({
      dialog: false,
      loading: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      formLabelWidth: '80px',
      timer: null,
    })

    const handleClose = (done) => {
      if (state.loading) {
        return
      }
      ElMessageBox.confirm('确认关闭?')
          .then(() => {
            state.loading = true
            state.timer = setTimeout(() => {
              done()
              // 动画关闭需要一定的时间
              setTimeout(() => {
                state.loading = false
              }, 400)
            })
          })
          .catch(() => {
            // catch error
          })
    }

    const cancelForm = () => {
      state.loading = false
      state.dialog = false
      clearTimeout(state.timer)
    }

    const drawer = ref(false)
    const direction = ref('rtl')

    return {
      menuList:this.$store.getters.permissionList({"path1":"11","path2":this.$route.query.path}),
      pageInfo: {
        currenPage: 1,
        /* 当前的页 */
        pagesize: 3,
        total: 0,
      },
      options: ref([
        {
          value: "Option1",
          label: "Option1",
        },
      ]),
      tableData: [
        {
          date: '01',
          name: '行政部',
          state: '琴',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '02',
          name: '人事部',
          state: '凯亚',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '03',
          name: '财务部',
          state: '丽莎',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '04',
          name: '技术部',
          state: '阿贝多',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
        {
          date: '05',
          name: '市场部',
          state: '优菈',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
        },
      ],
      value1: "", //日期
      value: ref(""), //选择
      ...toRefs(state),
      handleClose,
      cancelForm,
      radio1: ref('1'),
      drawer,
      direction,
    };
  }

})
</script>

<style scoped>
	table * {

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

	.y {

		margin-top: 20px;

	}

	.head {

		margin-left: 2%;

		margin-top: 2%;

	}



	.demo-pagination-block {

		margin-left: 610px;

		margin-top: 20px;

		margin-bottom: 30px;

	}
</style>
