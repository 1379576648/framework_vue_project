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
//招聘导航
import zpdaohang from "../components/recruitment_management/zp_navigation.vue"
//招聘计划
import zpplan from "../components/recruitment_management/zp_plan.vue";
//新增招聘计划
import addplan from "../components/recruitment_management/add_plan.vue";
//人才库
import a from "../components/recruitment_management/zp_resume.vue"
//全部简历
import fullresume from "../components/recruitment_management/zp_fullresume.vue"
//新简历
import newresume from "../components/recruitment_management/zp_newresume.vue"
//候选人
import candidate from "../components/recruitment_management/zp_candidate.vue"
//淘汰库
import eliminate from "../components/recruitment_management/zp_eliminate.vue"
/**
 * 薪酬管理
 */
import xcnavigation from "../components/salary_management/xc_navigation.vue"

//角色设置
import permission_set from "../components/system_management/permission_set.vue"

/**
 * 系统管理
 */
import system_navigation from "../components/system_management/system_navigation.vue"
/*公告设置*/
import notice from "../components/system_management/notice.vue"
/* 登录日志 */
import login_log from "../components/system_management/login_log.vue"
/* 操作日志 */
import operate_log from "../components/system_management/operate_log.vue"
/*统计分析*/
import Statistics_One  from "../components/statistics/statistics.vue"
/*人员统计图*/
import StatisticePersonnel from "../components/statistics/statistice_personnel.vue"
import StatisticePersonnel1 from "../components/statistics/statistice_personnel1.vue"
import StatisticePersonnel2 from "../components/statistics/statistice_personnel2.vue"
import StatisticePersonnel3 from "../components/statistics/StatisticePersonnel3.vue"
/*考勤分析图*/
import CheckWork from "../components/statistics/check_work.vue"
import CheckWork1 from "../components/statistics/check_work1.vue"
import CheckWork2 from "../components/statistics/check_work2.vue"
import CheckWork3 from "../components/statistics/check_work3.vue"
import CheckWork4 from "../components/statistics/check_work4.vue"
/*薪酬分析图*/
import SalaryAnalysis from "../components/statistics/salary_analysis.vue"
import SalaryAnalysis1 from "../components/statistics/salary_analysis1.vue"
import SalaryAnalysis2 from "../components/statistics/salary_analysis2.vue"
import SalaryAnalysis3 from "../components/statistics/salary_analysis3.vue"
import SalaryAnalysis4 from "../components/statistics/salary_analysis4.vue"
const routes = [{
    path: '/',  //访问路径
    redirect: '/beginIndex'//默认访问
}, {
    path: '/beginIndex',//访问路径
    component: beginIndex,//组件
    redirect: '/faceLogin',//默认访问
    children: [{//子路由
        path: '/faceLogin', //访问路径
        component: faceLogin//组件
    }, {
        path: '/passLogin',//访问路径
        component: passLogin//组件
    }]
}, {
    path: "/home", //访问路径
    redirect: '/workT'//默认访问
},/*导航栏*/
    {
        path: '/workbench', //访问路径
        component: workbench,//组件
        children: [//子路由
            /*菜单:更多*/

            /* 工作台 */
            {
                path: '/workT', //访问路径
                redirect: '/worktime',//默认访问
                component: workT,//组件
                children: [//子路由
                    {
                        path: '/worktime', //访问路径
                        components: {
                            "worktime": worktime,//组件
                            "workdb": workdb,//组件
                            "workcalendar": workcalendar,//组件
                            "workstatistics": workstatistics,//组件
                            "workzpprogress": workzpprogress,//组件
                            "workquick": workquick,//组件
                            "worknotice": worknotice//组件
                        }
                    },
                ]
            },
            /* 组织管理 */
            {
                path: '/zuzhi', //访问路径
                component: zuzhi,//组件
            },
            /* 员工管理 */
            {
                path: '/empyg', //访问路径
                component: empyg//组件
            },
            /* 系统管理 */
            {
                path: '/system_navigation', //访问路径
                component: system_navigation,//组件
                redirect: '/permission_set',//默认访问
                children: [//子路由
                    {//权限设置
                        path: '/permission_set', //访问路径
                        components: {
                            "permission_set": permission_set//组件
                        }
                    },
                    {//公告设置
                        path: '/notice', //访问路径
                        components: {
                            "notice": notice//组件
                        }
                    },
                    {//登录日志
                        path: '/login_log', //访问路径
                        components: {
                            "login_log": login_log//组件
                        }
                    },
                    {//操作日志
                        path: '/operate_log', //访问路径
                        components: {
                            "operate_log": operate_log//组件
                        }
                    }
                ]

            },
            /* 时间管理 */
            {
                path: '/shij', //访问路径
                component: shij//组件
            },
			/* 招聘管理 */
			{
				path: '/zpdaohang',//访问路径
				redirect: '/zpplan',//默认访问
				components: {
					"ym1": zpdaohang//组件
				},
				children: [
					/*  招聘计划 */
					{
						path: '/zpplan',//访问路径
						components: {
							"zpplan": zpplan//组件
						}
					},
					/*  新增招聘计划 */
					{
						path: '/addplan',//访问路径
						components: {
							"addplan": addplan//组件
						}
					},
					//人才库:简历列表
					{
						path: '/a',//访问路径
						redirect: 'fullresume',//默认访问
						components: {
							"zp2": a//组件
						},
						children:[
							/*全部简历*/
							{
								path: '/fullresume',//访问路径
								components: {
									"fullresume": fullresume//组件
								}
							},
							/*新简历*/
							{
								path: '/newresume',//访问路径
								components: {
									"newresume": newresume//组件
								}
							},
							/*候选人*/
							{
								path: '/candidate',//访问路径
								components: {
									"candidate": candidate//组件
								}
							},
							/*淘汰库*/
							{
								path: '/eliminate',//访问路径
								components: {
									"eliminate": eliminate//组件
								}
							},

						]
					},


				]
			},
            /* 薪酬管理 */
            {
                path: '/xcnavigation', //访问路径
                component: xcnavigation//组件
            },
            {/*统计管理*/
                path: '/Statistics', //访问路径
                component: Statistics_One,//组件

                children: [//子路由
                    {
                        path:"/StatisticePersonnel",
                        redirect: '/StatisticePersonnel1',//默认访问
                         components: {
                             "StatisticePersonnel":StatisticePersonnel
                         },children:[
                            {
                                path:"/StatisticePersonnel1",
                                components: {
                                    "StatisticePersonnel1": StatisticePersonnel1
                                }
                            },
                            {
                                path:"/StatisticePersonnel2",
                                components: {
                                    "StatisticePersonnel2": StatisticePersonnel2
                                }
                            },
                            {
                                path:"/StatisticePersonnel3",
                                components: {
                                    "StatisticePersonnel3": StatisticePersonnel3
                            }
                            }
                        ]
                    },
                    {
                        path: "/CheckWork",
                        redirect:"/CheckWork1",
                        components: {
                            "CheckWork": CheckWork
                        },children:[
                            {
                                path:"/CheckWork1",
                                components: {
                                    "CheckWork1": CheckWork1
                                }
                            },
                            {
                                path:"/CheckWork2",
                                components: {
                                    "CheckWork2": CheckWork2
                                }
                            },
                            {
                                path:"/CheckWork3",
                                components: {
                                    "CheckWork3": CheckWork3
                                }
                            },
                            {
                                path:"/CheckWork4",
                                components: {
                                    "CheckWork4": CheckWork4
                                }
                            },
                        ]
                    },{
                        path: "/SalaryAnalysis",
                        redirect:"/SalaryAnalysis1",
                        components: {
                            "SalaryAnalysis": SalaryAnalysis
                        },children:[
                            {
                                path:"/SalaryAnalysis1",
                                components: {
                                    "SalaryAnalysis1": SalaryAnalysis1
                                }
                            },
                            {
                                path:"/SalaryAnalysis2",
                                components: {
                                    "SalaryAnalysis2": SalaryAnalysis2
                                }
                            },
                            {
                                path:"/SalaryAnalysis3",
                                components: {
                                    "SalaryAnalysis3": SalaryAnalysis3
                                }
                            },
                            {
                                path:"/SalaryAnalysis4",
                                components: {
                                    "SalaryAnalysis4": SalaryAnalysis4
                                }
                            },
                        ]

                    }
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
