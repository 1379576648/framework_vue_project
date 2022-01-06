import {
    createRouter, createWebHashHistory, createWebHistory
} from 'vue-router'
import store from '../store/index.js'
/**
 * 全局导航栏
 */
import workbench from "../components/navigation.vue"

const modules = import.meta.glob('../components/**/*.vue');

const routes = [{
    path: '/', redirect: '/beginIndex'
}, {//登录
    path: '/beginIndex',
    component: modules[`${'../components/begin/index.vue'}`],
    redirect: '/beginIndex/faceLogin',
    children: [{//人脸登录
        path: '/beginIndex/faceLogin', component: modules[`${'../components/begin/rest/facelogin.vue'}`]
    }, {//密码登录
        path: '/beginIndex/passLogin', component: modules[`${'../components/begin/rest/passlogin.vue'}`]
    }]
}, {//首页
    path: "/home",
    component: modules[`${'../components/navigation.vue'}`],
    redirect: '/interface',
    children: [
        {/* 工作台 */
            path: '/interface',
            component: modules[`${'../components/interface_management/interface_main.vue'}`],
        },
        {//组织管理
            path: '/organization',
            component: modules[`${'../components/organization_management/organization_main.vue'}`],
            redirect: '/organization/message/zz_evectino',
            children: [
                {//部门详情
                    path: '/organization/message/zz_evectino',
                    component: modules[`${'../components/organization_management/zz_evection.vue'}`],
                },
                {//职位信息
                    path: '/organization/message/zz_post',
                    component: modules[`${'../components/organization_management/zz_post.vue'}`],
                },
                {//职位管理
                    path: '/organization/message/zz_edit',
                    component: modules[`${'../components/organization_management/zz_edit.vue'}`],
                },
                {//部门管理
                    path: '/organization/message/zz_depts',
                    component: modules[`${'../components/organization_management/zz_depts.vue'}`],
                }
            ]
        }, {//员工管理
            path: '/employee',
            component: modules[`${'../components/employee_management/employee_main.vue'}`],
            redirect: "/employee/message/employee_roster",
            children: [
                {//员工花名册
                    path: '/employee/message/employee_roster',
                    component: modules[`${'../components/employee_management/employee_staff_one.vue'}`],
                },
                {//历史花名册
                    path: '/employee/message/history_roster',
                    component: modules[`${'../components/employee_management/employee_history.vue'}`],
                },
                {//入职管理
                    path: '/employee/transaction/entry',
                    component: modules[`${'../components/employee_management/employee_entry.vue'}`],
                },
                {//转正管理
                    path: '/employee/transaction/worker',
                    component: modules[`${'../components/employee_management/employee_conversion.vue'}`],
                },
                {//调动管理
                    path: '/employee/transaction/transfer',
                    component: modules[`${'../components/employee_management/employee_transfer.vue'}`],
                }]
        }, {//考勤管理
            path: '/clockingin',
            component: modules[`${'../components/clockingin_management/clockingin_main.vue'}`],
            redirect: "/clockingin/check/classes",
            children: [
                {//班次管理
                    path: '/clockingin/check/classes',
                    component: modules[`${'../components/clockingin_management/clockingin_check.vue'}`],
                },
                {//打卡记录
                    path: '/clockingin/checking/clock',
                    component: modules[`${'../components/clockingin_management/clockingin_clock.vue'}`],
                },
                {//加班记录
                    path: '/clockingin/checking/overtime',
                    component: modules[`${'../components/clockingin_management/clockingin_overtime.vue'}`],
                },
                {//请假记录
                    path: '/clockingin/checking/leave',
                    component: modules[`${'../components/clockingin_management/clockingin_leave.vue'}`],
                },
                {//出差记录
                    path: '/clockingin/checking/evection',
                    component: modules[`${'../components/clockingin_management/clockingin_evection.vue'}`],
                },
                {//补打卡记录
                    path: '/clockingin/checking/fillclock',
                    component: modules[`${'../components/clockingin_management/clockingin_reissue.vue'}`],
                },
                {// 考勤记录、考勤月报表、历史归档
                    path: '/clockingin/statistics',
                    component: modules[`${'../components/clockingin_management/clockingin_statistics.vue'}`],
                },
            ]
        },
        {//招聘管理
            path: '/recruit',
            component: modules[`${'../components/recruit_management/recruit_main.vue'}`],
            redirect: "/recruit/plan/plan",
            children: [
                {//招聘计划
                    path: '/recruit/plan/plan',
                    component: modules[`${'../components/recruit_management/recruit_zp_plan.vue'}`],
                },
                {//人才库
                    path: '/recruit/zptresume/zptresume',
                    component: modules[`${'../components/recruit_management/recruit_zp_resume.vue'}`],
                },
                {//面试管理
                    path: '/recruit/zpprocess/recruit_zp_interview',
                    component: modules[`${'../components/recruit_management/recruit_zp_interview.vue'}`],
                },
                {//简历筛选
                    path: '/recruit/recruit_screen',
                    component: modules[`${'../components/recruit_management/recruit_screen.vue'}`],
                },
                {//面试管理
                    path: '/recruit/recruit/speed_progress',
                    component: modules[`${'../components/recruit_management/recruit_speed_progress.vue'}`],
                },
                {//计划统计
                    path: '/recruit/recruit/statistics',
                    component: modules[`${'../components/recruit_management/recruit_statistics.vue'}`],
                },
                {//业绩统计
                    path: '/recruit/recruit/achievement',
                    component: modules[`${'../components/recruit_management/recruit_achievement.vue'}`],
                },]
        },
        {//审批管理
            path: '/approval',
            component: modules[`${'../components/approval_management/approval_main.vue'}`],
            redirect: "/approval/sponsor_approval",
            children: [
                {//发起审批
                    path: '/approval/sponsor_approval',
                    component: modules[`${'../components/approval_management/approval_1_initiate.vue'}`],
                },
                {//转正审批
                    path: '/approval/approval_centre/sponsor_approval',
                    component: modules[`${'../components/approval_management/approval_2_positive.vue'}`],
                },
                {//异动审批
                    path: '/approval/approval_centre/transaction_approval',
                    component: modules[`${'../components/approval_management/approval_4_move.vue'}`],
                },
                {//调薪审批
                    path: '/approval/approval_centre/wage_approval',
                    component: modules[`${'../components/approval_management/approval_5_change.vue'}`],
                },
                {//离职审批
                    path: '/approval/approval_centre/dimission_approval',
                    component: modules[`${'../components/approval_management/approval_6_quit.vue'}`],
                },
                {//加班审批
                    path: '/approval/approval_centre/overtime_approval',
                    component: modules[`${'../components/approval_management/approval_7_work.vue'}`],
                },
                {//补打卡审批
                    path: '/approval/approval_centre/fill_clock_approval',
                    component: modules[`${'../components/approval_management/approval_8_punch.vue'}`],
                },
                {//出差审批
                    path: '/approval/approval_centre/evection_approval',
                    component: modules[`${'../components/approval_management/approval_9_travel.vue'}`],
                },
                {//请假审批
                    path: '/approval/approval_centre/leave_approval',
                    component: modules[`${'../components/approval_management/approval_10_leave.vue'}`],

                },
                {//我的转正申请
                    path: '/approval/my_application/mypositive',
                    component: modules[`${'../components/approval_management/approval_3_mypositive.vue'}`],
                },
                {//我的异动申请
                    path: '/approval/my_application/mymove',
                    component: modules[`${'../components/approval_management/approval_11_mymove.vue'}`],
                },
                {//我的调薪申请
                    path: '/approval/my_application/mychange',
                    component: modules[`${'../components/approval_management/approval_12_mychange.vue'}`],
                },
                {//我的离职申请
                    path: '/approval/my_application/myquit',
                    component: modules[`${'../components/approval_management/approval_13_myquit.vue'}`],
                },
                {//我的加班申请
                    path: '/approval/my_application/mywork',
                    component: modules[`${'../components/approval_management/approval_14_mywork.vue'}`],
                },
                {//我的补打卡申请
                    path: '/approval/my_application/mypunch',
                    component: modules[`${'../components/approval_management/approval_15_mypunch.vue'}`],
                },
                {//我的出差申请
                    path: '/approval/my_application/mytravul',
                    component: modules[`${'../components/approval_management/approval_16_mytravul.vue'}`],
                },
                {//我的请假申请
                    path: '/approval/my_application/myleave',
                    component: modules[`${'../components/approval_management/approval_17_myleave.vue'}`],
                },]
        },
        {//薪资管理
            path: '/salary',
            component: modules[`${'../components/salary_management/salary_main.vue'}`],
            redirect: "/salary/paynavigation",
            children: [
                //薪酬导航
                {
                    path: '/salary/paynavigation',
                    component: modules[`${'../components/salary_management/salary_salarynavigation.vue'}`],
                },
                {//薪酬统计
                    path: '/salary/count',
                    component: modules[`${'../components/salary_management/salary_statistics.vue'}`]
                }]
        }, {//社保管理
            path: '/social',
            redirect: "/social/basic_setup/insured_scheme",
            component: modules[`${'../components/social_management/social_main.vue'}`],
            children: [
                {//参保方案
                    path: '/social/basic_setup/insured_scheme',
                    component: modules[`${'../components/social_management/insured_scheme.vue'}`],
                },
                {//参保人员管理
                    path: '/social/social_management/insured_management',
                    component: modules[`${'../components/social_management/insured_management.vue'}`],
                },

                {//月度报表
                    path: '/social/social_payment/monthly_report',
                    component: modules[`${'../components/social_management/monthly_report.vue'}`],
                },
                {//社保缴费明细
                    path: '/social/social_payment/payment_detail',
                    component: modules[`${'../components/social_management/payment_detail.vue'}`],
                }]
        }, {//统计分析
            path: '/statistics',
            component: modules[`${'../components/statistics_management/statistics_main.vue'}`],
            redirect: "/statistics/staff_analyze/statistics_numberpersonnel",
            children: [
                {//人员数量分析
                    path: '/statistics/staff_analyze/statistics_numberpersonnel',
                    component: modules[`${'../components/statistics_management/statistics_numberpersonnel.vue'}`],
                },
                {//人工异动分析
                    path: '/statistics/staff_analyze/statistics_movepersonnel',
                    component: modules[`${'../components/statistics_management/statistics_movepersonnel.vue'}`],
                },
                {//员工概况
                    path: '/statistics/staff_analyze/statistics_surveypersonnel',
                    component: modules[`${'../components/statistics_management/statistics_surveypersonnel.vue'}`],
                },
                {//出勤分析
                    path: '/statistics/clockingin_analyze/statistics_attendance',
                    component: modules[`${'../components/statistics_management/statistics_attendance.vue'}`],
                },
                {//工时分析
                    path: '/statistics/clockingin_analyze/statistics_manhour',
                    component: modules[`${'../components/statistics_management/statistics_manhour.vue'}`],
                },
                {//加班分析
                    path: '/statistics/clockingin_analyze/statistics_overtime',
                    component: modules[`${'../components/statistics_management/statistics_overtime.vue'}`],
                },
                {//请假分析
                    path: '/statistics/clockingin_analyze/statistics_leave',
                    component: modules[`${'../components/statistics_management/statistics_leave.vue'}`],
                },
                {//工资成本分析
                    path: '/statistics/remuneration_analyze/statistics_payrollcosts',
                    component: modules[`${'../components/statistics_management/statistics_payrollcosts.vue'}`],
                },
                {//社保成本分析
                    path: '/statistics/remuneration_analyze/statistics_socialsecurity',
                    component: modules[`${'../components/statistics_management/statistics_socialsecurity.vue'}`],
                },
                {//薪酬成本分析
                    path: '/statistics/remuneration_analyze/statistics_analysis3',
                    component: modules[`${'../components/statistics_management/statistics_analysis3.vue'}`],
                },
                {//部门成本分析
                    path: '/statistics/remuneration_analyze/statistics_analysis4',
                    component: modules[`${'../components/statistics_management/statistics_analysis4.vue'}`],
                },
                {
                    path: '/statistics/remuneration_analyze/three',
                    component: modules[`${'../components/statistics_management/three.vue'}`]
                }],
        }, {//系统管理
            path: '/lineage',
            redirect: "/lineage/authority_management/authority_set",
            component: modules[`${'../components/lineage_management/lineage_main.vue'}`],
            children: [
                {//权限设置
                    path: '/lineage/authority_management/authority_set',
                    component: modules[`${'../components/lineage_management/lineage_permission_set.vue'}`],
                },
                {//角色设置
                    path: '/lineage/authority_management/role',
                    component: modules[`${'../components/lineage_management/lineage_role.vue'}`],
                },
                {//公告设置
                    path: '/lineage/announcement_management/announcement_set',
                    component: modules[`${'../components/lineage_management/lineage_notice.vue'}`],
                },
                {//登录日志
                    path: '/lineage/log_management/register_log',
                    component: modules[`${'../components/lineage_management/lineage_login_log.vue'}`],
                },
                {//操作日志
                    path: '/lineage/log_management/operation_log',
                    component: modules[`${'../components/lineage_management/lineage_operate_log.vue'}`],
                }
            ]
        }]
}]

const router = createRouter({
    history: createWebHistory(),
    routes
})
// //全局前置守卫，可用作前端权限验证的简单实现
// router.beforeEach(function(to, from, next) {
//     if ( (to.path !== '/beginIndex/faceLogin' & to.path!=='/beginIndex/passLogin' && store.state.staffMessage.staffId==null ) )  {
//          next({path: '/beginIndex'})
//     }else{
//         next()
//     }
// })
export default router
