import {
    createRouter, createWebHashHistory, createWebHistory
} from 'vue-router'
import  store from '../store/index.js'
/**
 * 全局导航栏
 */
import workbench from "../components/navigation.vue"

const modules =
    import.meta.glob('../components/**/*.vue');

const routes = [
    {
        path: '/',
        redirect: '/beginIndex'
    },
    {//登录
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
    },
    {//首页
        path: "/home",
        component: modules[`${'../components/navigation.vue'}`],
        redirect: '/interface',
        children: [
            {/* 工作台 */
                path: '/interface',
                redirect: "/interface/leader",
                component: modules[`${'../components/interface_management/interface_main.vue'}`],
                children: [
                    {
                        path: "/interface/leader",
                        components: {
                            //统计公司情况
                            "interface_time": modules[`${'../components/interface_management/interface_time.vue'}`],
                            //待办事项
                            "interface_db": modules[`${'../components/interface_management/interface_db.vue'}`],
                            //工作日历
                            "interface_calendar": modules[`${'../components/interface_management/interface_calendar.vue'}`],
                            //统计分析
                            "interface_statistics": modules[`${'../components/interface_management/interface_statistics.vue'}`],
                            //招聘进度
                            "interface_zpprogress": modules[`${'../components/interface_management/interface_zpprogress.vue'}`],
                            //快捷功能入口
                            "interface_quick": modules[`${'../components/interface_management/interface_quick.vue'}`],
                            //公司系统公告
                            "interface_notice": modules[`${'../components/interface_management/interface_notice.vue'}`],
                        }
                    }
                ]
            },
            {//组织管理
                path: '/organization',
                component: modules[`${'../components/organization_management/organization_main.vue'}`],
                redirect: '/organization/message',
                children: [
                    {//组织情报
                        path: '/organization/message',
                        component: modules[`${'../components/menu_skip.vue'}`],
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
                    }
                ]
            },
            {//员工管理
                path: '/employee',
                component: modules[`${'../components/employee_management/employee_main.vue'}`],
                redirect: "/employee/message",
                children: [
                    {//员工信息
                        path: '/employee/message',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        redirect: "/employee/message/employee_roster",
                        children: [
                            {//员工花名册
                                path: '/employee/message/employee_roster',
                                redirect: "/employee/message/employee_roster/book",
                                component: modules[`${'../components/employee_management/employee_staff_one.vue'}`],
                                children: [
                                    //花名册
                                    {
                                        path: '/employee/message/employee_roster/book',
                                        component: modules[`${'../components/employee_management/employee_staff.vue'}`],
                                    },
                                    //工作经历
                                    {
                                        path: '/employee/message/employee_roster/business',
                                        component: modules[`${'../components/employee_management/employee_work.vue'}`],
                                    },
                                ]
                            },
                            //办理离职
                            {
                                path: '/employee/message/employee_roster/leave',
                                component: modules[`${'../components/employee_management/employee_dimission.vue'}`],
                            },
                            //员工编辑
                            {
                                path: '/employee/message/employee_roster/staffedit',
                                component: modules[`${'../components/employee_management/employee_compile.vue'}`],
                                redirect: "/employee/message/employee_roster/basicfile",
                                children: [
                                    //基本档案
                                    {
                                        path: '/employee/message/employee_roster/basicfile',
                                        component: modules[`${'../components/employee_management/employee_basic.vue'}`],
                                    },
                                    //个人信息
                                    {
                                        path: '/employee/message/employee_roster/information',
                                        component: modules[`${'../components/employee_management/employee_personal.vue'}`],
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
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [
                            {//入职管理
                                path: '/employee/transaction/entry',
                                component: modules[`${'../components/employee_management/employee_entry.vue'}`],
                                redirect: "/employee/transaction/entry/tobehired",
                                children: [
                                    //待入职
                                    {
                                        path: '/employee/transaction/entry/tobehired',
                                        component: modules[`${'../components/employee_management/employee_stock.vue'}`],
                                    },
                                    //放弃入职
                                    {
                                        path: '/employee/transaction/entry/hashired',
                                        component: modules[`${'../components/employee_management/employee_abandon.vue'}`],
                                    },
                                ]
                            },
                            {//转正管理
                                path: '/employee/transaction/worker',
                                component: modules[`${'../components/employee_management/employee_conversion.vue'}`],
                            },
                            {//调动管理
                                path: '/employee/transaction/transfer',
                                component: modules[`${'../components/employee_management/employee_transfer.vue'}`],
                            }
                        ]
                    }

                ]
            },
            {//考勤管理
                path: '/clockingin',
                component: modules[`${'../components/clockingin_management/clockingin_main.vue'}`],
                redirect: "/clockingin/check",
                children: [
                    {//基础设置
                        path: '/clockingin/check',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        redirect: "/clockingin/check/classes",
                        children: [
                            {//班次管理
                                path: '/clockingin/check/classes',
                                component: modules[`${'../components/clockingin_management/clockingin_check.vue'}`],
                            },
                            {//添加班次
                                path: '/clockingin/check/classes/addclass',
                                component: modules[`${'../components/clockingin_management/clockingin_classes.vue'}`],
                            }
                        ]
                    },
                    {//考勤记录
                        path: '/clockingin/checking',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [
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
                        ]
                    },
                    {// 考勤记录、考勤月报表、历史归档
                        path: '/clockingin/statistics',
                        component: modules[`${'../components/clockingin_management/clockingin_statistics.vue'}`],
                        redirect: "/clockingin/statistics/record",
                        children: [
                            {// 考勤记录
                                path: '/clockingin/statistics/record',
                                component: modules[`${'../components/clockingin_management/clockingin_record.vue'}`],
                            },
                            {// 考勤月报表
                                path: '/clockingin/statistics/report',
                                component: modules[`${'../components/clockingin_management/clockingin_month.vue'}`],
                            },
                            {// 历史归档
                                path: '/clockingin/statistics/archive',
                                component: modules[`${'../components/clockingin_management/clockingin_history.vue'}`],
                            },
                        ]
                    },
                ]
            },
            {//招聘管理
                path: '/recruit',
                component: modules[`${'../components/recruit_management/recruit_main.vue'}`],
                redirect: "/recruit/plan",
                children: [
                    {//招聘计划
                        path: '/recruit/plan',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        redirect: "/recruit/plan/plan",
                        children: [
                            {//招聘计划
                                path: '/recruit/plan/plan',
                                component: modules[`${'../components/recruit_management/recruit_zp_plan.vue'}`],
                            },
                            {//新增招聘计划
                                path: '/recruit/addplan/addplan',
                                component: modules[`${'../components/recruit_management/recruit_add_plan.vue'}`],
                            },
                            {//招聘计划详情页面
                                path: '/recruit/plan/details',
                                component: modules[`${'../components/recruit_management/recruit_plan_details.vue'}`],
                            }

                        ]
                    },
                    {//简历管理
                        path: '/recruit/zptresume',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [
                            {//人才库
                                path: '/recruit/zptresume/zptresume',
                                redirect: "/recruit/recruit/fullresume",
                                component: modules[`${'../components/recruit_management/recruit_zp_resume.vue'}`],
                                children: [
                                    {//全部简历
                                        path: '/recruit/recruit/fullresume',
                                        component: modules[`${'../components/recruit_management/recruit_zp_fullresume.vue'}`],
                                    },
                                    {//新简历
                                        path: '/recruit/recruit/newresume',
                                        component: modules[`${'../components/recruit_management/recruit_zp_newresume.vue'}`],
                                    },
                                    {//候选人
                                        path: '/recruit/recruit/candidate',
                                        component: modules[`${'../components/recruit_management/recruit_zp_candidate.vue'}`],
                                    },
                                    {//淘汰库
                                        path: '/recruit/recruit/eliminate',
                                        component: modules[`${'../components/recruit_management/recruit_zp_eliminate.vue'}`],
                                    },
                                ]
                            },
                            {//简历详情页面
                                path: '/recruit/resume/details',
                                component: modules[`${'../components/recruit_management/recruit_resume_details.vue'}`],
                            },
                            {//新增简历
                                path: '/recruit/recruit/addresume',
                                component: modules[`${'../components/recruit_management/recruit_addresume.vue'}`],
                            },
                        ]
                    },
                    {//招聘过程
                        path: '/recruit/zpprocess',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [
                            {//面试管理
                                path: '/recruit/zpprocess/recruit_zp_interview',
                                redirect: "/recruit/daiInterview",
                                component: modules[`${'../components/recruit_management/recruit_zp_interview.vue'}`],
                                children: [
                                    {//待面试
                                        path: '/recruit/daiInterview',
                                        component: modules[`${'../components/recruit_management/recruit_zp_daiInterview.vue'}`],
                                    },
                                    {//面试通过
                                        path: '/recruit/interviewPass',
                                        component: modules[`${'../components/recruit_management/recruit_zp_interviewPass.vue'}`],
                                    },
                                    {//待复试
                                        path: '/recruit/daiSecondInterview',
                                        component: modules[`${'../components/recruit_management/recruit_zp_daiSecondInterview.vue'}`],
                                    },
                                    {//复试通过
                                        path: '/recruit/daiSecondInterviewPass',
                                        component: modules[`${'../components/recruit_management/recruit_zp_daiSecondInterviewPass.vue'}`],
                                    },
                                ]
                            },
                            {//简历筛选
                                path: '/recruit/recruit_screen',
                                redirect: "/recruit/candidate",
                                component: modules[`${'../components/recruit_management/recruit_screen.vue'}`],
                                children: [
                                    {//候选人
                                        path: '/recruit/candidate',
                                        component: modules[`${'../components/recruit_management/recruit_candidate.vue'}`],
                                    },
                                    {//已邀约
                                        path: '/recruit/Invited',
                                        component: modules[`${'../components/recruit_management/recruit_Invited.vue'}`],
                                    },
                                ]
                            },
                        ]
                    },
                    {//招聘统计
                        path: '/recruit/zptresume',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [
                            {//招聘进度
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
                            },
                        ]
                    },
                ]
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
                    {//审批中心
                        path: '/approval/approval_centre',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [
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
                            }
                        ]
                    },
                    {//我的申请
                        path: '/approval/my_application',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [
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
                            },
                        ]
                    }
                ]
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
                        redirect: "/salary/flat",
                        children: [
                            //薪酬结构
                            {
                                path: '/salary/flat',
                                component: modules[`${'../components/salary_management/salary_construction.vue'}`]
                            },
                            //核算方案
                            {
                                path: '/salary/scheme',
                                component: modules[`${'../components/salary_management/salary_accountscheme.vue'}`]
                            },
                            //工资表
                            {
                                path: '/salary/paysheet',
                                component: modules[`${'../components/salary_management/salary_archive.vue'}`]
                            },
                        ]
                    },
                    //工资表导航
                    {
                        path: '/salary/wagesheet',
                        component: modules[`${'../components/salary_management/salary_checkwage.vue'}`],
                        redirect: "/salary/selectwagetable",
                        children: [
                            //查看工资表
                            {
                                path: '/salary/selectwagetable',
                                component: modules[`${'../components/salary_management/salary_wagetable.vue'}`]
                            },
                        ]
                    },
                    //固定工资方案
                    {
                        path: '/salary/regular/',
                        component: modules[`${'../components/salary_management/salary_fixedwage.vue'}`],
                        redirect: "/salary/regular/regularearn",
                        children: [
                            //固定工资
                            {
                                path: '/salary/regular/regularearn',
                                component: modules[`${'../components/salary_management/salary_regularearn.vue'}`],
                            },
                            {
                                path: '/salary/regular/raisequery',
                                component: modules[`${'../components/salary_management/salary_raisequery.vue'}`],
                            }
                        ]
                    },
                    //加班工资方案
                    {
                        path: '/salary/callbackpay',
                        component: modules[`${'../components/salary_management/salary_workovertimeplan.vue'}`]
                    },
                    //新增编辑加班工资方案
                    {
                        path: '/salary/insertcallbackpay',
                        component: modules[`${'../components/salary_management/salary_insertplan.vue'}`]
                    },
                    //考勤扣款方案
                    {
                        path: '/salary/attendanceplan',
                        component: modules[`${'../components/salary_management/salary_attendance.vue'}`]
                    },
                    //新增编辑考勤扣款方案
                    {
                        path: '/salary/insertattendanceplan',
                        component: modules[`${'../components/salary_management/salary_insertplantwo.vue'}`]
                    },
                    //出差方案
                    {
                        path: '/salary/evectionplan',
                        component: modules[`${'../components/salary_management/salary_evection.vue'}`]
                    },
                    //新增编辑出差方案
                    {
                        path: '/salary/insertevectionplan',
                        component: modules[`${'../components/salary_management/salary_insertplanthree.vue'}`]
                    },
                    //薪酬统计
                    {
                        path: '/salary/count',
                        component: modules[`${'../components/salary_management/salary_statistics.vue'}`]
                    }
                ]
            },
            {//社保管理
                path: '/social',
                redirect: "/social/basic_setup",
                component: modules[`${'../components/social_management/social_main.vue'}`],
                children: [
                    {//基本设置
                        path: '/social/basic_setup',
                        redirect: "/social/basic_setup/insured_scheme",
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [
                            {//参保方案
                                path: '/social/basic_setup/insured_scheme',
                                component: modules[`${'../components/social_management/insured_scheme.vue'}`],
                            },
                            {//新增、修改参保方案
                                path: '/social/basic_setup/new_insured_scheme',
                                component: modules[`${'../components/social_management/new_insured_scheme.vue'}`],
                            },
                        ]
                    },
                    {//社保管理
                        path: '/social/social_management',
                        redirect: "/social/social_management/insured_management",
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [
                            {//参保人员管理
                                path: '/social/social_management/insured_management',
                                component: modules[`${'../components/social_management/insured_management.vue'}`],
                            },
                        ]
                    },
                    {//社保缴费
                        path: '/social/social_payment',
                        redirect: "/social/social_payment/monthly_report",
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [
                            {//月度报表
                                path: '/social/social_payment/monthly_report',
                                component: modules[`${'../components/social_management/monthly_report.vue'}`],
                            },
                            {//社保缴费明细
                                path: '/social/social_payment/payment_detail',
                                component: modules[`${'../components/social_management/payment_detail.vue'}`],
                            },
                            {// 查看个人参保详情
                                path: '/social/social_payment/someone_insured_particulars',
                                redirect: "/social/social_payment/someone_insured_particulars/someone_insured_details",
                                component: modules[`${'../components/social_management/someone_insured_particulars.vue'}`],
                                children: [
                                    {//参保明细
                                        path: '/social/social_payment/someone_insured_particulars/someone_insured_details',
                                        component: modules[`${'../components/social_management/someone_insured_details.vue'}`],
                                    },
                                    {//参保记录
                                        path: '/social/social_payment/someone_insured_particulars/someone_insured_record',
                                        component: modules[`${'../components/social_management/someone_insured_record.vue'}`],
                                    },
                                ]
                            },
                        ]
                    },
                ]
            },
            {//统计分析
                path: '/statistics',
                component: modules[`${'../components/statistics_management/statistics_main.vue'}`],
                redirect: "/statistics/staff_analyze",
                children: [
                    {//考勤分析
                        path: '/statistics/staff_analyze',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        redirect: "/statistics/staff_analyze/statistics_personnel1",
                        children: [ {//人员数量分析
                            path: '/statistics/staff_analyze/statistics_personnel1',
                            component: modules[`${'../components/statistics_management/statistics_personnel1.vue'}`],
                        },
                            {//人工异动分析
                                path: '/statistics/staff_analyze/statistics_personnel2',
                                component: modules[`${'../components/statistics_management/statistics_personnel2.vue'}`],
                            },
                            {//员工概况
                                path: '/statistics/staff_analyze/statistics_personnel3',
                                component: modules[`${'../components/statistics_management/statistics_personnel3.vue'}`],
                            },]
                    },

                    {//考勤分析
                        path: '/statistics/clockingin_analyze',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [
                            {//出勤分析
                                path: '/statistics/clockingin_analyze/statistics_work1',
                                component: modules[`${'../components/statistics_management/statistics_work1.vue'}`],
                            },
                            {//工时分析
                                path: '/statistics/clockingin_analyze/statistics_work2',
                                component: modules[`${'../components/statistics_management/statistics_work2.vue'}`],
                            },
                            {//加班分析
                                path: '/statistics/clockingin_analyze/statistics_work3',
                                component: modules[`${'../components/statistics_management/statistics_work3.vue'}`],
                            },
                            {//请假分析
                                path: '/statistics/clockingin_analyze/statistics_work4',
                                component: modules[`${'../components/statistics_management/statistics_work4.vue'}`],
                            }

                        ]
                    },
                    {//薪酬分析
                        path: '/statistics/remuneration_analyze',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [
                            {//工资成本分析
                                path: '/statistics/remuneration_analyze/statistics_analysis1',
                                component: modules[`${'../components/statistics_management/statistics_analysis1.vue'}`],
                            },
                            {//社保成本分析
                                path: '/statistics/remuneration_analyze/statistics_analysis2',
                                component: modules[`${'../components/statistics_management/statistics_analysis2.vue'}`],
                            },
                            {//薪酬成本分析
                                path: '/statistics/remuneration_analyze/statistics_analysis3',
                                component: modules[`${'../components/statistics_management/statistics_analysis3.vue'}`],
                            },
                            {//部门成本分析
                                path: '/statistics/remuneration_analyze/statistics_analysis4',
                                component: modules[`${'../components/statistics_management/statistics_analysis4.vue'}`],
                            }

                        ]
                    }
                ],
            },
            {//系统管理
                path: '/lineage',
                redirect: "/lineage/authority_management",
                component: modules[`${'../components/lineage_management/lineage_main.vue'}`],
                children: [
                    {//权限管理
                        path: '/lineage/authority_management',
                        redirect: "/lineage/authority_management/authority_set",
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [
                            {//权限设置
                                path: '/lineage/authority_management/authority_set',
                                component: modules[`${'../components/lineage_management/lineage_permission_set.vue'}`],
                            },
                            {//角色设置
                                path: '/lineage/authority_management/role',
                                component: modules[`${'../components/lineage_management/lineage_role.vue'}`],

                            },
                            {//设置
                                path: '/lineage/authority_management/allot_user',
                                component: modules[`${'../components/lineage_management/lineage_allot_user.vue'}`],

                            }
                        ]

                    },
                    {//公告管理
                        path: '/lineage/announcement_management',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [
                            {//公告设置
                                path: '/lineage/announcement_management/announcement_set',
                                component: modules[`${'../components/lineage_management/lineage_notice.vue'}`],
                            }
                        ]
                    },
                    {//日志管理
                        path: '/lineage/log_management',
                        component: modules[`${'../components/menu_skip.vue'}`],
                        children: [
                            {//登录日志
                                path: '/lineage/log_management/register_log',
                                component: modules[`${'../components/lineage_management/lineage_login_log.vue'}`],
                            },
                            {//操作日志
                                path: '/lineage/log_management/operation_log',
                                component: modules[`${'../components/lineage_management/lineage_operate_log.vue'}`],
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
//全局前置守卫，可用作前端权限验证的简单实现
router.beforeEach(function(to, from, next) {
    if ( (to.path !== '/beginIndex/faceLogin' & to.path!=='/beginIndex/passLogin' && store.state.staffMessage.staffId==null ) )  {
         next({path: '/beginIndex'})
    }else{
        next()
    }
})
export default router
