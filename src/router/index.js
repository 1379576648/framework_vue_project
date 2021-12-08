import {
	createRouter,
	createWebHashHistory,
	createWebHistory
} from 'vue-router'
//登录主页
import beginIndex from '../components/begin/index.vue'
//人脸识别登录
import faceLogin from "../components/begin/rest/facelogin.vue";
//密码登录
import passLogin from "../components/begin/rest/passlogin.vue";
/**
 * 全局导航栏
 */
import workbench from "../components/navigation.vue"
/**
 * 工作台
 */
import workT from "../components/workbench_management/workbench.vue"
import worktime from "../components/workbench_management/work_time.vue"
//待办事项
import workdb from "../components/workbench_management/work_db.vue"
//工作日
import workcalendar from "../components/workbench_management/work_calendar.vue"
//统计
import workstatistics from "../components/workbench_management/work_statistics.vue"
//招聘进度
import workzpprogress from "../components/workbench_management/work_zpprogress.vue"
//快捷
import workquick from "../components/workbench_management/work_quick.vue"
//公告
import worknotice from "../components/workbench_management/work_notice.vue"
/**
 * 组织管理
 */
import zuzhi from "../components/organization_management/zz_navigation.vue"
/**
 * 员工管理
 */
import empyg from "../components/employee_management/emp_navigation.vue"
/**
 * 考勤管理
 */
import shij from "../components/attendance_management/time_navigation.vue"
/**
 * 招聘导航
 */
import zpdaohang from "../components/recruitment_management/zp_navigation.vue"
//招聘计划
import zpplan from "../components/recruitment_management/zp_plan.vue";
//新增招聘计划
import addplan from "../components/recruitment_management/add_plan.vue";
//人才库
import a from "../components/recruitment_management/zp_resume.vue"
//新简历
import newresume from "../components/recruitment_management/zp_newresume.vue"
//淘汰库
import eliminate from "../components/recruitment_management/zp_eliminate.vue"
const routes = [{
	path: '/',
	redirect: '/beginIndex'
},{
	path: '/beginIndex',
	component:beginIndex,
	redirect: '/faceLogin',
	children:[{
		path:'/faceLogin',
		component:faceLogin
	},{
		path:'/passLogin',
		component:passLogin
	}]
},{
	path:"/home",
	redirect: '/workT'
},/*导航栏*/
	{
		path: '/workbench',
		component: workbench,
		children: [
			/*菜单:更多*/
			
			/* 工作台 */
		    {
				path: '/workT',
				redirect: '/worktime',
				component: workT,
				children:[
					{
						path: '/worktime',
						components: {
							"worktime":worktime,
							"workdb":workdb,
							"workcalendar":workcalendar,
							"workstatistics":workstatistics,
							"workzpprogress":workzpprogress,
							"workquick":workquick,
							"worknotice":worknotice
						}
					},
				]
			},
			/* 组织管理 */
			{
				path: '/zuzhi',
				component: zuzhi
			},
			/* 员工管理 */
			{
				path: '/empyg',
				component: empyg
			},
			/* 时间管理 */
			{
				path: '/shij',
				component: shij
			},
			/* 招聘管理 */
			{
				path: '/zpdaohang',
				redirect: '/zpplan',
				components: {
					"ym1": zpdaohang
				},
				children: [
					/*  招聘计划 */
					{
						path: '/zpplan',
						components: {
							"zpplan": zpplan
						}
					},
					/*  新增招聘计划 */
					{
						path: '/addplan',
						components: {
							"addplan": addplan
						}
					},
					//简历导航
					{
						path: '/a', 
						components: {
							"zp2": a
						},
					},
					{
						path: '/newresume',
						components: {
							"newresume": newresume
						}
					},
					{
						path: '/eliminate',
						components: {
							"eliminate": eliminate
						}
					},
					
				]
			},

		]
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})
export default router
