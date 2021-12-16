import {
    createRouter, createWebHashHistory, createWebHistory
} from 'vue-router'
/**
 * 全局导航栏
 */
import workbench from "../components/navigation.vue"

const modules =
    import.meta.glob('../components/**/*.vue');

const routes = [{
    path: '/',
    redirect: '/beginIndex'
}, {//登录
    path: '/beginIndex',
    component: modules[`${'../components/begin/index.vue'}`],
    redirect: '/beginIndex/faceLogin',
    children: [
        {//人脸登录
            path: '/beginIndex/faceLogin',
            component: modules[`${'../components/begin/rest/facelogin.vue'}`]
        },
        {//密码登录
            path: '/beginIndex/passLogin',
            component: modules[`${'../components/begin/rest/passlogin.vue'}`]
        }]
}, {//首页
    path: "/home",
    component: modules[`${'../components/navigation.vue'}`],
    redirect: '/workbench',
    children: [
        {/* 工作台 */
            path: '/workbench',
            redirect: "/workbench/leader",
            component: modules[`${'../components/workbench_management/workbench_main.vue'}`],
            children: [
                {
                    path: "/workbench/leader",
                    components: {
                        //统计公司情况
                        "workbench_time": modules[`${'../components/workbench_management/workbench_time.vue'}`],
                        //待办事项
                        "workbench_db": modules[`${'../components/workbench_management/workbench_db.vue'}`],
                        //工作日历
                        "workbench_calendar": modules[`${'../components/workbench_management/workbench_calendar.vue'}`],
                        //统计分析
                        "workbench_statistics": modules[`${'../components/workbench_management/workbench_statistics.vue'}`],
                        //招聘进度
                        "workbench_zpprogress": modules[`${'../components/workbench_management/workbench_zpprogress.vue'}`],
                        //快捷功能入口
                        "workbench_quick": modules[`${'../components/workbench_management/workbench_quick.vue'}`],
                        //公司系统公告
                        "workbench_notice": modules[`${'../components/workbench_management/workbench_notice.vue'}`],
                    }
                }
            ]
        },
        {//组织管理
            path: '/organization',
            component:modules[`${'../components/organization_management/organization_main.vue'}`],
        },
        {//员工管理
            path: '/employee',
            component:modules[`${'../components/employee_management/employee_main.vue'}`],
            redirect: "/employee/message",
            children:[
                {//员工信息
                    path: '/employee/message',
                    component:modules[`${'../components/menu_skip.vue'}`],
                    redirect: "/employee/message/employee_roster",
                    children:[
                        {//员工花名册
                            path: '/employee/message/employee_roster',
                            redirect:"/employee/message/employee_roster/book",
                            component:modules[`${'../components/employee_management/employee_staff_one.vue'}`],
                            children:[
                                //花名册
                                {
                                path: '/employee/message/employee_roster/book',
                                component:modules[`${'../components/employee_management/employee_staff.vue'}`],
                                },
                                //工作经历
                                {
                                    path: '/employee/message/employee_roster/business',
                                    component:modules[`${'../components/employee_management/employee_work.vue'}`],
                                },

                            ]
                        },
                        //办理离职
                        {
                            path: '/employee/message/employee_roster/leave',
                            component:modules[`${'../components/employee_management/employee_dimission.vue'}`],
                        },
                        //员工编辑
                        {
                            path:'/employee/message/employee_roster/staffedit',
                            component:modules[`${'../components/employee_management/employee_compile.vue'}`],
                            redirect: "/employee/message/employee_roster/basicfile",
                            children: [
                                //基本档案
                                {
                                    path:'/employee/message/employee_roster/basicfile',
                                    component:modules[`${'../components/employee_management/employee_basic.vue'}`],
                                },
                                //个人信息
                                {
                                    path:'/employee/message/employee_roster/information',
                                    component:modules[`${'../components/employee_management/employee_personal.vue'}`],
                                }
                            ]
                        },

                        {//历史花名册
                            path: '/employee/message/history_roster',
                            component: modules[`${'../components/employee_management/employee_history.vue'}`],
                        }
                    ]
                },
                {//人事异动
                    path: '/employee/transaction',
                    component:modules[`${'../components/menu_skip.vue'}`],
                    children:[
                        {//入职管理
                            path: '/employee/transaction/entry',
                            component:modules[`${'../components/employee_management/employee_entry.vue'}`],
                            redirect: "/employee/transaction/entry/tobehired",
                            children: [
                                //待入职
                                {
                                    path: '/employee/transaction/entry/tobehired',
                                    component:modules[`${'../components/employee_management/employee_stock.vue'}`],
                                },
                                //放弃入职
                                {
                                    path: '/employee/transaction/entry/hashired',
                                    component:modules[`${'../components/employee_management/employee_abandon.vue'}`],
                                },
                            ]
                        },
                        {//转正管理
                            path: '/employee/transaction/worker',
                            component:modules[`${'../components/employee_management/employee_conversion.vue'}`],
                        },
                        {//调动管理
                            path: '/employee/transaction/transfer',
                            component:modules[`${'../components/employee_management/employee_transfer.vue'}`],
                        }
                    ]
                }

            ]
        },
        {//考勤管理
            path: '/attendance',
            component: modules[`${'../components/attendance_management/attendance_main.vue'}`],
            redirect: "/attendance/check",
            children: [
                {//基础设置
                    path: '/attendance/check',
                    component: modules[`${'../components/menu_skip.vue'}`],
                    redirect: "/attendance/check/classes",
                    children: [
                        {//班次管理
                            path: '/attendance/check/classes',
                            component: modules[`${'../components/attendance_management/attendance_check.vue'}`],
                        },{//添加班次
                            path: '/attendance/check/classes/addclass',
                            component: modules[`${'../components/attendance_management/attendance_classes.vue'}`],
                        }
                        ]
                },
                {//考勤记录
                    path: '/attendance/checking',
                    component: modules[`${'../components/menu_skip.vue'}`],
                    children: [
                        {//打卡记录
                            path: '/attendance/checking/clock',
                            component: modules[`${'../components/attendance_management/attendance_clock.vue'}`],
                        },
                        {//加班记录
                            path: '/attendance/checking/overtime',
                            component: modules[`${'../components/attendance_management/attendance_overtime.vue'}`],
                        },
                        {//请假记录
                            path: '/attendance/checking/leave',
                            component: modules[`${'../components/attendance_management/attendance_leave.vue'}`],
                        },
                        {//出差记录
                            path: '/attendance/checking/evection',
                            component: modules[`${'../components/attendance_management/attendance_evection.vue'}`],
                        },
                        {//补打卡记录
                            path: '/attendance/checking/fillclock',
                            component: modules[`${'../components/attendance_management/attendance_reissue.vue'}`],
                        },
                    ]
                },
                {// 考勤记录、考勤月报表、历史归档
                    path: '/attendance/statistics',
                    component: modules[`${'../components/attendance_management/attendance_statistics.vue'}`],
                    redirect: "/attendance/statistics/record",
                    children: [
                        {// 考勤记录
                            path: '/attendance/statistics/record',
                            component: modules[`${'../components/attendance_management/attendance_record.vue'}`],
                        },
                        {// 考勤月报表
                            path: '/attendance/statistics/report',
                            component: modules[`${'../components/attendance_management/attendance_month.vue'}`],
                        },
                        {// 历史归档
                            path: '/attendance/statistics/archive',
                            component: modules[`${'../components/attendance_management/attendance_history.vue'}`],
                        },
                    ]
                },
            ]
        },
        {//招聘管理
            path: '/recruitment',
            component:modules[`${'../components/recruitment_management/recruitment_main.vue'}`],
            redirect: "/recruitment/plan",
            children:[
                {//招聘计划
                    path: '/recruitment/plan',
                    component:modules[`${'../components/menu_skip.vue'}`],
                    redirect: "/recruitment/plan/plan",
                    children:[
                        {//招聘计划
                            path: '/recruitment/plan/plan',
                            component:modules[`${'../components/recruitment_management/recruitment_zp_plan.vue'}`],
                        },
                        {//新增招聘计划
                            path: '/recruitment/addplan/addplan',
                            component:modules[`${'../components/recruitment_management/recruitment_add_plan.vue'}`],
                        }

                    ]
                },
                {//简历管理
                    path: '/recruitment/zptresume',
                    component:modules[`${'../components/menu_skip.vue'}`],
                    children:[
                        {//人才库
                            path: '/recruitment/zptresume/zptresume',
                            redirect: "/recruitment/recruit/fullresume",
                            component:modules[`${'../components/recruitment_management/recruitment_zp_resume.vue'}`],
                            children:[
                                {//全部简历
                                    path: '/recruitment/recruit/fullresume',
                                    component:modules[`${'../components/recruitment_management/recruitment_zp_fullresume.vue'}`],
                                },
                                {//新简历
                                    path: '/recruitment/recruit/newresume',
                                    component:modules[`${'../components/recruitment_management/recruitment_zp_newresume.vue'}`],
                                },
                                {//候选人
                                    path: '/recruitment/recruit/candidate',
                                    component:modules[`${'../components/recruitment_management/recruitment_zp_candidate.vue'}`],
                                },
                                {//淘汰库
                                    path: '/recruitment/recruit/eliminate',
                                    component:modules[`${'../components/recruitment_management/recruitment_zp_eliminate.vue'}`],
                                },
                            ]
                        },
                    ]
                },
                {//招聘过程
                    path: '/recruitment/zpprocess',
                    component:modules[`${'../components/menu_skip.vue'}`],
                    children: [
                        {//面试管理
                            path: '/recruitment/zpprocess/recruitment_zp_interview',
                            redirect: "/recruitment/daiInterview",
                            component:modules[`${'../components/recruitment_management/recruitment_zp_interview.vue'}`],
                            children: [
                                {//待面试
                                    path: '/recruitment/daiInterview',
                                    component:modules[`${'../components/recruitment_management/recruitment_zp_daiInterview.vue'}`],
                                },
                                {//面试通过
                                    path: '/recruitment/interviewPass',
                                    component:modules[`${'../components/recruitment_management/recruitment_zp_interviewPass.vue'}`],
                                },
                                {//待复试
                                    path: '/recruitment/daiSecondInterview',
                                    component:modules[`${'../components/recruitment_management/recruitment_zp_daiSecondInterview.vue'}`],
                                },
                                {//复试通过
                                    path: '/recruitment/daiSecondInterviewPass',
                                    component:modules[`${'../components/recruitment_management/recruitment_zp_daiSecondInterviewPass.vue'}`],
                                },
                            ]
                        }
                    ]
                }
            ]
        },
        {//审批管理
            path: '/examine',
            component:modules[`${'../components/examine_management/examine_main.vue'}`],
            redirect: "/examine/sponsor_examine",
            children:[
                {//发起审批
                    path: '/examine/sponsor_examine',
                    component:modules[`${'../components/examine_management/examine_1_initiate.vue'}`],
                },
                {//审批中心
                    path: '/examine/examine_centre',
                    component:modules[`${'../components/menu_skip.vue'}`],
                    children:[
                        {//转正审批
                            path: '/examine/examine_centre/sponsor_examine',
                            component:modules[`${'../components/examine_management/examine_2_positive.vue'}`],
                        },
                        {//异动审批
                            path: '/examine/examine_centre/transaction_examine',
                            component:modules[`${'../components/examine_management/examine_4_move.vue'}`],
                        },
                        {//调薪审批
                            path: '/examine/examine_centre/wage_examine',
                            component:modules[`${'../components/examine_management/examine_5_change.vue'}`],
                        },
                        {//离职审批
                            path: '/examine/examine_centre/dimission_examine',
                            component:modules[`${'../components/examine_management/examine_6_quit.vue'}`],
                        },
                        {//加班审批
                            path: '/examine/examine_centre/overtime_examine',
                            component:modules[`${'../components/examine_management/examine_7_work.vue'}`],
                        },
                        {//补打卡审批
                            path: '/examine/examine_centre/fill_clock_examine',
                            component:modules[`${'../components/examine_management/examine_8_punch.vue'}`],
                        },
                        {//出差审批
                            path: '/examine/examine_centre/evection_examine',
                            component:modules[`${'../components/examine_management/examine_9_travel.vue'}`],
                        },
                        {//请假审批
                            path: '/examine/examine_centre/leave_examine',
                            component:modules[`${'../components/examine_management/examine_10_leave.vue'}`],
                        }
                    ]
                },
                {//我的申请
                    path: '/examine/my_application',
                    component:modules[`${'../components/examine_management/examine_3_applyfor.vue'}`],
                }
            ]
        },
        {//薪资管理
            path: '/salary',
            component:modules[`${'../components/salary_management/salary_main.vue'}`],
            redirect:"/salary/paynavigation",
            children:[
                //薪酬导航
                {
                    path: '/salary/paynavigation',
                    component:modules[`${'../components/salary_management/salary_salarynavigation.vue'}`],
                    redirect:"/salary/flat",
                    children:[
                        //薪酬结构
                        {
                            path: '/salary/flat',
                            component:modules[`${'../components/salary_management/salary_construction.vue'}`]
                        },
                        //核算方案
                        {
                            path: '/salary/scheme',
                            component:modules[`${'../components/salary_management/salary_accountscheme.vue'}`]
                        },
                        //工资表
                        {
                            path: '/salary/paysheet',
                            component:modules[`${'../components/salary_management/salary_archive.vue'}`]
                        },
                    ]
                },
                //工资表导航
                {
                    path: '/salary/wagesheet',
                    component:modules[`${'../components/salary_management/salary_checkwage.vue'}`],
                    redirect: "/salary/selectwagetable",
                    children: [
                        //查看工资表
                        {
                            path: '/salary/selectwagetable',
                            component:modules[`${'../components/salary_management/salary_wagetable.vue'}`]
                        },
                    ]
                },
                //固定工资方案
                {
                    path: '/salary/regular',
                    component:modules[`${'../components/salary_management/salary_fixedsalary.vue'}`]
                },
                //加班工资方案
                {
                    path: '/salary/callbackpay',
                    component:modules[`${'../components/salary_management/salary_workovertimeplan.vue'}`]
                },
                //新增编辑加班工资方案
                {
                    path: '/salary/insertcallbackpay',
                    component:modules[`${'../components/salary_management/salary_insertplan.vue'}`]
                },
                //考勤扣款方案
                {
                    path: '/salary/attendanceplan',
                    component:modules[`${'../components/salary_management/salary_attendance.vue'}`]
                },
                //新增编辑考勤扣款方案
                {
                    path: '/salary/insertattendanceplan',
                    component:modules[`${'../components/salary_management/salary_insertplantwo.vue'}`]
                },
                //出差方案
                {
                    path: '/salary/evectionplan',
                    component:modules[`${'../components/salary_management/salary_evection.vue'}`]
                },
                //新增编辑出差方案
                {
                    path: '/salary/insertevectionplan',
                    component:modules[`${'../components/salary_management/salary_insertplanthree.vue'}`]
                },
                //薪酬统计
                {
                    path: '/salary/count',
                    component:modules[`${'../components/salary_management/salary_statistics.vue'}`]
                }
            ]
        },
        {//社保管理
            path: '/social',
            component:modules[`${'../components/social_management/social_main.vue'}`]
        },
        {//统计分析
            path: '/statistics',
            component:modules[`${'../components/statistics_management/statistics_main.vue'}`],
            redirect: "/statistics/staff_analyze",
            children:[
                {//人员分析
                    path:'/statistics/staff_analyze',
                    component:modules[`${'../components/menu_skip.vue'}`],
                    children:[
                        {
                            path: '/statistics/staff_analyze/statistics_personnel',
                            component:modules[`${'../components/statistics_management/statistics_personnel.vue'}`],
                            children:[
                                {//人员数量分析
                                    path:'/statistics/staff_analyze/statistics_personnel1',
                                    component:modules[`${'../components/statistics_management/statistics_personnel1.vue'}`],
                                },
                                {//人工异动分析
                                    path:'/statistics/staff_analyze/statistics_personnel2',
                                    component:modules[`${'../components/statistics_management/statistics_personnel2.vue'}`],
                                },
                                {//员工概况
                                    path:'/statistics/staff_analyze/statistics_personnel3',
                                    component:modules[`${'../components/statistics_management/statistics_personnel3.vue'}`],
                                }
                            ]
                        },

                    ]
                },
                {//考勤分析
                    path:'/statistics/attendance_analyze',
                    component:modules[`${'../components/menu_skip.vue'}`],
                    children:[{
                        path:'/statistics/attendance_analyze/statistics_work',
                        component:modules[`${'../components/statistics_management/statistics_work.vue'}`],
                        children: [

                            {//出勤分析
                                path:'/statistics/attendance_analyze/statistics_work1',
                                component:modules[`${'../components/statistics_management/statistics_work1.vue'}`],
                            },
                            {//工时分析
                                path:'/statistics/attendance_analyze/statistics_work2',
                                component:modules[`${'../components/statistics_management/statistics_work2.vue'}`],
                            },
                            {//加班分析
                                path:'/statistics/attendance_analyze/statistics_work3',
                                component:modules[`${'../components/statistics_management/statistics_work3.vue'}`],
                            },
                            {//请假分析
                                path:'/statistics/attendance_analyze/statistics_work4',
                                component:modules[`${'../components/statistics_management/statistics_work4.vue'}`],
                            }
                        ]
                    },
                    ]
                },
                {//薪酬分析
                    path:'/statistics/remuneration_analyze',
                    component:modules[`${'../components/menu_skip.vue'}`],
                    children:[{
                        path:'/statistics/remuneration_analyze/statistics_analysis',
                        component:modules[`${'../components/statistics_management/statistics_analysis.vue'}`],
                        children: [
                            {//工资成本分析
                                path:'/statistics/remuneration_analyze/statistics_analysis1',
                                component:modules[`${'../components/statistics_management/statistics_analysis1.vue'}`],
                            },
                            {//社保成本分析
                                path:'/statistics/remuneration_analyze/statistics_analysis2',
                                component:modules[`${'../components/statistics_management/statistics_analysis2.vue'}`],
                            },
                            {//薪酬成本分析
                                path:'/statistics/remuneration_analyze/statistics_analysis3',
                                component:modules[`${'../components/statistics_management/statistics_analysis3.vue'}`],
                            },
                            {//部门成本分析
                                path:'/statistics/remuneration_analyze/statistics_analysis4',
                                component:modules[`${'../components/statistics_management/statistics_analysis4.vue'}`],
                            }
                        ]
                    },

                    ]
                }
            ]
        },
        {//系统管理
            path: '/system',
            redirect: "/system/authority_management",
            component:modules[`${'../components/system_management/system_main.vue'}`],
            children:[
                {//权限管理
                    path: '/system/authority_management',
                    component:modules[`${'../components/menu_skip.vue'}`],
                    children:[
                        {//权限设置
                            path: '/system/authority_management/authority_set',
                            component:modules[`${'../components/system_management/system_permission_set.vue'}`],
                        },
                        {//角色设置
                            path: '/system/authority_management/role',
                            component:modules[`${'../components/system_management/system_role.vue'}`],

                        },
                        {//设置
                            path: '/system/authority_management/allot_user',
                            component:modules[`${'../components/system_management/system_allot_user.vue'}`],

                        }
                    ]

                },
                {//公告管理
                    path: '/system/announcement_management',
                    component:modules[`${'../components/menu_skip.vue'}`],
                    children:[
                        {//公告设置
                            path: '/system/announcement_management/announcement_set',
                            component:modules[`${'../components/system_management/system_notice.vue'}`],
                        }
                    ]
                },
                {//日志管理
                    path: '/system/log_management',
                    component:modules[`${'../components/menu_skip.vue'}`],
                    children:[
                        {//登录日志
                            path: '/system/log_management/register_log',
                            component:modules[`${'../components/system_management/system_login_log.vue'}`],
                        },
                        {//操作日志
                            path: '/system/log_management/operation_log',
                            component:modules[`${'../components/system_management/system_operate_log.vue'}`],
                        }
                    ]
                }
                ]
        }
    ]
}]

const router = createRouter({
    history: createWebHistory(), routes
})
export default router
