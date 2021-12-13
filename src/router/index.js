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
    redirect: '/workT',
    component: modules[`${'../components/navigation.vue'}`],
    children: [
        {/* 工作台 */
            path: '/workT',
            component: modules[`${'../components/workbench_management/workbench.vue'}`]
        },
        { /* 审批管理 */
            path: '/examineApprove', //访问路径
            component: modules[`${'../components/menu_routing.vue'}`],//组件
            redirect: {path: '/examineApprove/examine_1'},
            children: [
                { //  发起审批
                    path: '/examineApprove/examine_1',//访问路径
                    components: {
                        examine_1: modules[`${'../components/examine_management/examine_1.vue'}`],
                    }
                },
                { //  转正审批
                    path: '/examineApprove/examine_2',//访问路径
                    components: {
                        examine_2: modules[`${'../components/examine_management/examine_2.vue'}`],
                    }
                },
                { //异动审批
                    path: '/examineApprove/examine_4',//访问路径
                    components: {
                        examine_4: modules[`${'../components/examine_management/examine_4.vue'}`]
                    }//组件
                },
                {//调薪审批
                    path: '/examineApprove/examine_5_change',//访问路径
                    components: {
                        examine_5_change: modules[`${'../components/examine_management/examine_5_change.vue'}`]
                    }//组件
                },
                {//离职审批
                    path: '/examineApprove/examine_6_quit',//访问路径
                    components: {
                        examine_6_quit: modules[`${'../components/examine_management/examine_6_quit.vue'}`]
                    }//组件
                },
                {//加班审批
                    path: '/examineApprove/examine_7_work',//访问路径
                    components: {
                        examine_7_work: modules[`${'../components/examine_management/examine_7_work.vue'}`]
                    }//组件
                },
                {//补打卡审批审批
                    path: '/examineApprove/examine_8_punch',//访问路径
                    components: {
                        examine_8_punch: modules[`${'../components/examine_management/examine_8_punch.vue'}`]
                    }//组件
                },
                {//出差审批
                    path: '/examineApprove/examine_9_travel',//访问路径
                    components: {
                        examine_9_travel: modules[`${'../components/examine_management/examine_9_travel.vue'}`]
                    }//组件
                },
                {//请假审批
                    path: '/examineApprove/examine_10_leave',//访问路径
                    components: {
                        examine_10_leave: modules[`${'../components/examine_management/examine_10_leave.vue'}`]
                    }//组件
                },
                {//我的申请
                    path: '/examineApprove/examine_3',//访问路径
                    components: {
                        examine_3: modules[`${'../components/examine_management/examine_3.vue'}`]
                    }//组件
                }
            ]
        },
        {//组织管理
            path: '/zuzhi',
            component: modules[`${'../components/menu_routing.vue'}`],//组件
        },
        {//员工管理
            path: '/emp_navigation',
            component: modules[`${'../components/menu_routing.vue'}`],//组件
            redirect: {path: '/emp_navigation/staff'},
            children: [
                {//员工子组件
                    path: '/emp_navigation/staff_One',
                    components: {
                        staff_One: modules[`${'../components/employee_management/staff_One.vue'}`]
                    },
                },
                {//员工花名册
                    path: '/emp_navigation/staff',
                    components: {
                        staff: modules[`${'../components/employee_management/staff.vue'}`]
                    },
                },
                {//工作经历
                    path: '/emp_navigation/work',
                    components: {
                        work: modules[`${'../components/employee_management/work.vue'}`]
                    },
                },
                {//转正管理
                    path: '/emp_navigation/conversion',
                    components: {
                        conversion: modules[`${'../components/employee_management/conversion.vue'}`]
                    },
                },
                {//历史花名册
                    path: '/emp_navigation/historyEmp',
                    components: {
                        historyEmp: modules[`${'../components/employee_management/historyEmp.vue'}`]
                    },
                },
                {//放弃入职
                    path: '/emp_navigation/abandon',
                    components: {
                        abandon: modules[`${'../components/employee_management/abandon.vue'}`]
                    },
                },
                {//入职子组件
                    path: '/emp_navigation/entry',
                    components: {
                        entry: modules[`${'../components/employee_management/entry.vue'}`]
                    },
                },
                {//待入职
                    path: '/emp_navigation/stockEmp',
                    components: {
                        stockEmp: modules[`${'../components/employee_management/stockEmp.vue'}`]
                    },
                },
                {//调动管理
                    path: '/emp_navigation/transfer',
                    components: {
                        transfer: modules[`${'../components/employee_management/transfer.vue'}`]
                    },
                },
                {//办理离职
                    path: '/emp_navigation/dimission',
                    components: {
                        dimission: modules[`${'../components/employee_management/dimission.vue'}`]
                    },
                }
        ]
        },
        {//时间管理
            path: '/shij',
            component: modules[`${'../components/menu_routing.vue'}`],
        },
        {//招聘管理
            path: '/zpdaohang',
            component: modules[`${'../components/menu_routing.vue'}`],
            redirect: {path: '/zpdaohang/zp_plan'},
            children: [
                {//招聘计划
                    path: '/zpdaohang/zp_plan',
                    components: {
                        zp_plan: modules[`${'../components/recruitment_management/zp_plan.vue'}`]
                    },
                },
                {//新增招聘计划
                    path: '/zpdaohang/add_plan',
                    components: {
                        add_plan: modules[`${'../components/recruitment_management/add_plan.vue'}`]
                    },
                },
                {//人才库
                    path: '/zpdaohang/zp_resume',
                    components: {
                        zp_resume: modules[`${'../components/recruitment_management/zp_resume.vue'}`]
                    },
                },
                {//全部简历
                    path: '/zpdaohang/zp_fullresume',
                    components: {
                        zp_fullresume: modules[`${'../components/recruitment_management/zp_fullresume.vue'}`]
                    },
                },
                {//新简历
                    path: '/zpdaohang/zp_newresume',
                    components: {
                        zp_newresume: modules[`${'../components/recruitment_management/zp_newresume.vue'}`]
                    },
                },
                {//候选人
                    path: '/zpdaohang/zp_candidate',
                    components: {
                        zp_candidate: modules[`${'../components/recruitment_management/zp_candidate.vue'}`]
                    },
                },
                {//淘汰库
                    path: '/zpdaohang/zp_eliminate',
                    components: {
                        zp_eliminate: modules[`${'../components/recruitment_management/zp_eliminate.vue'}`]
                    },
                }
            ]
        },
        {//统计分析
            path: '/statistics',
            component: modules[`${'../components/menu_routing.vue'}`],
            redirect: {path: '/statistics/statistice_personnel1'},
            children: [
                {//人员数量分析
                    path: '/statistics/statistice_personnel1',
                    components: {
                        statistice_personnel1: modules[`${'../components/statistics/statistice_personnel1.vue'}`]
                    },
                },
                {//人员异动分析
                    path: '/statistics/statistice_personnel2',
                    components: {
                        statistice_personnel1: modules[`${'../components/statistics/statistice_personnel2.vue'}`]
                    },
                },
                {//人员概况
                    path: '/statistics/statistice_personnel3',
                    components: {
                        statistice_personnel1: modules[`${'../components/statistics/statistice_personnel3.vue'}`]
                    },
                },
                {//出勤分析
                    path: '/statistics/check_work1',
                    components: {
                        statistice_personnel1: modules[`${'../components/statistics/check_work1.vue'}`]
                    },
                },
                {//工时分析
                    path: '/statistics/check_work2',
                    components: {
                        statistice_personnel1: modules[`${'../components/statistics/check_work2.vue'}`]
                    },
                },
                {//加班分析
                    path: '/statistics/check_work3',
                    components: {
                        statistice_personnel1: modules[`${'../components/statistics/check_work3.vue'}`]
                    },
                },
                {//请假分析
                    path: '/statistics/check_work4',
                    components: {
                        statistice_personnel1: modules[`${'../components/statistics/check_work4.vue'}`]
                    },
                },
                {//工资成本分析
                    path: '/statistics/salary_analysis1',
                    components: {
                        statistice_personnel1: modules[`${'../components/statistics/salary_analysis1.vue'}`]
                    },
                },
                {//社保成本分析
                    path: '/statistics/salary_analysis2',
                    components: {
                        statistice_personnel1: modules[`${'../components/statistics/salary_analysis2.vue'}`]
                    },
                },
                {//薪酬结构分析
                    path: '/statistics/salary_analysis3',
                    components: {
                        statistice_personnel1: modules[`${'../components/statistics/salary_analysis3.vue'}`]
                    },
                },
                {//部门成本分析
                    path: '/statistics/salary_analysis4',
                    components: {
                        statistice_personnel1: modules[`${'../components/statistics/salary_analysis4.vue'}`]
                    },
                }

            ]
        },
        {//系统管理
            path: '/system_navigation',
            component: modules[`${'../components/menu_routing.vue'}`],
            redirect: {path: '/system_navigation/permission_set'},
            children: [
                {//角色设置
                    path: '/system_navigation/permission_set',
                    components: {
                        permission_set: modules[`${'../components/system_management/permission_set.vue'}`],
                    }
                },
                {//公告设置
                    path: '/system_navigation/notice',
                    components: {
                        permission_set: modules[`${'../components/system_management/notice.vue'}`],
                    }
                },
                {//登录日志
                    path: '/system_navigation/login_log',
                    components: {
                        permission_set: modules[`${'../components/system_management/login_log.vue'}`],
                    }
                },
                {//操作日志
                    path: '/system_navigation/operate_log',
                    components: {
                        permission_set: modules[`${'../components/system_management/operate_log.vue'}`],
                    }
                },
            ]
        }
    ]
}]

const router = createRouter({
    history: createWebHistory(), routes
})
export default router
