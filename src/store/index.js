import {createStore} from 'vuex'

const store = createStore({
    state: {
        //动态菜单
        memuList: [
            {
                MENU_ID: 1,//菜单编号
                MENU_NAME: '工作台',//菜单名称Picture address
                MENU_ROUTE: '/workT',//路由地址,
                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                MENU_MODULE: 'workbench_management/workbench.vue',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                MENU_LEAF: 1,//是否有叶子 0有 1没有
            },
            {
                MENU_ID: 2,//菜单编号
                MENU_NAME: '组织管理',//菜单名称
                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                MENU_ROUTE: '/zuzhi',//路由地址
                MENU_MODULE: 'menu_routing.vue',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                MENU_LEAF: 0,//是否有叶子 0有 1没有
                son: [
                    {
                        MENU_ID: 1,//菜单编号
                        MENU_NAME: '组织管理',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/1',//路由地址
                        MENU_MODULE: '&#xe62c;',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                        MENU_LEAF: 0,//是否有叶子 0有 1没有
                        son: [
                            {
                                MENU_ID: 2,//菜单编号
                                MENU_NAME: '部门设置',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/1-1',//路由地址
                                MENU_MODULE: '&#xe62c;',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }
                        ]
                    }, {
                        MENU_ID: 3,//菜单编号
                        MENU_NAME: '组织管理',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/2',//路由地址
                        MENU_MODULE: '&#xe62c;',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                        MENU_LEAF: 0,//是否有叶子 0有 1没有
                        son: [
                            {
                                MENU_ID: 4,//菜单编号
                                MENU_NAME: '职类管理',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/2-1',//路由地址
                                MENU_MODULE: '&#xe62c;',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }, {
                                MENU_ID: 5,//菜单编号
                                MENU_NAME: '职位管理',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/2-2',//路由地址
                                MENU_MODULE: '&#xe62c;',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }
                        ]
                    }, {
                        MENU_ID: 6,//菜单编号
                        MENU_NAME: '编制管理',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/3',//路由地址
                        MENU_MODULE: '&#xe62c;',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                        MENU_LEAF: 0,//是否有叶子 0有 1没有
                        son: [
                            {
                                MENU_ID: 2,//菜单编号
                                MENU_NAME: '编制管理',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/3-1',//路由地址
                                MENU_MODULE: '&#xe62c;',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }
                        ]
                    }
                ]
            },
            {
                MENU_ID: 3,//菜单编号
                MENU_NAME: '员工管理',//菜单名称
                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                MENU_ROUTE: '/emp_navigation',//路由地址
                MENU_MODULE: 'menu_routing.vue',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                MENU_LEAF: 0,//是否有叶子 0有 1没有
                son: [
                    {
                        MENU_ID: 1,//菜单编号
                        MENU_NAME: '员工信息',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/1',//路由地址
                        MENU_MODULE: '&#xe60a;',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                        MENU_LEAF: 0,//是否有叶子 0有 1没有
                        son: [
                            {
                                MENU_ID: 2,//菜单编号
                                MENU_NAME: '员工花名册',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/emp_navigation/staff',//路由地址
                                MENU_MODULE: 'employee_management/staff.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            },
                            {
                                MENU_ID: 3,//菜单编号
                                MENU_NAME: '历史花名册',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址historyEmp
                                MENU_ROUTE: '/emp_navigation/historyEmp',//路由地址
                                MENU_MODULE: 'emp_navigation/historyEmp.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }
                        ]
                    }, {
                        MENU_ID: 4,//菜单编号
                        MENU_NAME: '人事异动',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/2',//路由地址
                        MENU_MODULE: '',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                        MENU_LEAF: 0,//是否有叶子 0有 1没有
                        son: [
                            {
                                MENU_ID: 5,//菜单编号
                                MENU_NAME: '入职管理',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/emp_navigation/abandon',//路由地址
                                MENU_MODULE: 'emp_navigation/abandon.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }, {
                                MENU_ID: 6,//菜单编号
                                MENU_NAME: '转正管理',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/emp_navigation/conversion',//路由地址
                                MENU_MODULE: 'emp_navigation/conversion.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            },
                            {
                                MENU_ID: 7,//菜单编号
                                MENU_NAME: '调动管理',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/emp_navigation/transfer',//路由地址
                                MENU_MODULE: 'emp_navigation/transfer.vue;',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }
                        ]
                    },
                ]
            },
            {
                MENU_ID: 4,//菜单编号
                MENU_NAME: '时间管理',//菜单名称
                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                MENU_ROUTE: '/shij',//路由地址
                MENU_MODULE: 'menu_routing.vue',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                MENU_LEAF: 0,//是否有叶子 0有 1没有
                son: [
                    {
                        MENU_ID: 1,//菜单编号
                        MENU_NAME: '基础设置',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/1',//路由地址
                        MENU_MODULE: '&#xe62c;',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                        MENU_LEAF: 0,//是否有叶子 0有 1没有
                        son: [
                            {
                                MENU_ID: 2,//菜单编号
                                MENU_NAME: '招聘计划',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/1-1',//路由地址
                                MENU_MODULE: '&#xe62c;',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }
                        ]
                    }, {
                        MENU_ID: 3,//菜单编号
                        MENU_NAME: '考勤记录',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/2',//路由地址
                        MENU_MODULE: '&#xe62c;',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                        MENU_LEAF: 0,//是否有叶子 0有 1没有
                        son: [
                            {
                                MENU_ID: 4,//菜单编号
                                MENU_NAME: '人才库',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/2-1',//路由地址
                                MENU_MODULE: '&#xe62c;',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }, {
                                MENU_ID: 5,//菜单编号
                                MENU_NAME: '新简历',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/2-2',//路由地址
                                MENU_MODULE: '&#xe62c;',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }, {
                                MENU_ID: 6,//菜单编号
                                MENU_NAME: '候选人',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/2-3',//路由地址
                                MENU_MODULE: '&#xe62c;',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }, {
                                MENU_ID: 7,//菜单编号
                                MENU_NAME: '淘汰库',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/2-4',//路由地址
                                MENU_MODULE: '&#xe62c;',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }
                        ]
                    }, {
                        MENU_ID: 8,//菜单编号
                        MENU_NAME: '考勤统计',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/3',//路由地址
                        MENU_MODULE: '&#xe62c;',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                        MENU_LEAF: 0,//是否有叶子 0有 1没有
                        son: [
                            {
                                MENU_ID: 9,//菜单编号
                                MENU_NAME: '面试管理',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/3-1',//路由地址
                                MENU_MODULE: '&#xe62c;',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }, {
                                MENU_ID: 10,//菜单编号
                                MENU_NAME: '复试管理',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/3-2',//路由地址
                                MENU_MODULE: '&#xe62c;',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }
                        ]
                    }
                ]
            },
            {
                MENU_ID: 5,//菜单编号
                MENU_NAME: '招聘管理',//菜单名称
                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                MENU_ROUTE: '/zpdaohang',//路由地址
                MENU_MODULE: 'menu_routing.vue',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                MENU_LEAF: 0,//是否有叶子 0有 1没有
                son: [
                    {
                        MENU_ID: 1,//菜单编号
                        MENU_NAME: '招聘计划',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/1',//路由地址
                        MENU_MODULE: '',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                        MENU_LEAF: 0,//是否有叶子 0有 1没有
                        son: [
                            {
                                MENU_ID: 2,//菜单编号
                                MENU_NAME: '招聘计划',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/zpdaohang/zp_plan',//路由地址
                                MENU_MODULE: 'recruitment_management/zp_plan.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }
                        ]
                    }, {
                        MENU_ID: 3,//菜单编号
                        MENU_NAME: '简历管理',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/2',//路由地址
                        MENU_MODULE: '&#xe62c;',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                        MENU_LEAF: 0,//是否有叶子 0有 1没有
                        son: [
                            {
                                MENU_ID: 4,//菜单编号
                                MENU_NAME: '人才库',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/zpdaohang/zp_resume',//路由地址
                                MENU_MODULE: 'recruitment_management/zp_resume.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }
                        ]
                    }, {
                        MENU_ID: 5,//菜单编号
                        MENU_NAME: '招聘过程',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/3',//路由地址
                        MENU_MODULE: '',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                        MENU_LEAF: 0,//是否有叶子 0有 1没有
                        son: [
                            {
                                MENU_ID: 6,//菜单编号
                                MENU_NAME: '面试管理',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: 'a',//路由地址
                                MENU_MODULE: 'recruitment_management/zp_resume.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }, {
                                MENU_ID: 7,//菜单编号
                                MENU_NAME: '复试管理',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/a',//路由地址
                                MENU_MODULE: 'recruitment_management/zp_resume.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }
                        ]
                    }
                ]
            },
            {
                MENU_ID: 6,//菜单编号
                MENU_NAME: '审批管理',//菜单名称
                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                MENU_ROUTE: '/examineApprove',//路由地址
                MENU_MODULE: 'menu_routing.vue',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                MENU_LEAF: 0,//是否有叶子 0有 1没有
                son: [
                    {
                        MENU_ID: 1,//菜单编号
                        MENU_NAME: '发起审批',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/examineApprove/examine_1',//路由地址
                        MENU_MODULE: 'examine_management/examine_1.vue',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    }, {
                        MENU_ID: 2,//菜单编号
                        MENU_NAME: '审批中心',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/1',//路由地址
                        MENU_MODULE: '',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                        MENU_LEAF: 0,//是否有叶子 0有 1没有
                        son: [
                            {
                                MENU_ID: 3,//菜单编号
                                MENU_NAME: '转正审批',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/examineApprove/examine_2',//路由地址
                                MENU_MODULE: 'examine_management/examine_2.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }, {
                                MENU_ID: 4,//菜单编号
                                MENU_NAME: '异动审批',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/examineApprove/examine_4', //路由地址
                                MENU_MODULE: 'examine_management/examine_4.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }
                            , {
                                MENU_ID: 5,//菜单编号
                                MENU_NAME: '调薪审批',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/examineApprove/examine_5_change',//路由地址
                                MENU_MODULE: 'examine_management/examine_5_change.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }
                            , {
                                MENU_ID: 6,//菜单编号
                                MENU_NAME: '离职审批',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/examineApprove/examine_6_quit',//路由地址
                                MENU_MODULE: 'examine_management/examine_6_quit.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }
                            , {
                                MENU_ID: 7,//菜单编号
                                MENU_NAME: '加班审批',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/examineApprove/examine_7_work',//路由地址
                                MENU_MODULE: 'examine_management/examine_7_work.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }, {
                                MENU_ID: 8,//菜单编号
                                MENU_NAME: '补打卡审批审批',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/examineApprove/examine_8_punch',//路由地址
                                MENU_MODULE: 'examine_management/examine_8_punch.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }, {
                                MENU_ID: 9,//菜单编号
                                MENU_NAME: '出差审批',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/examineApprove/examine_9_travel',//路由地址
                                MENU_MODULE: 'examine_management/examine_9_travel.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }, {
                                MENU_ID: 10,//菜单编号
                                MENU_NAME: '请假审批',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/examineApprove/examine_10_leave',//路由地址
                                MENU_MODULE: 'examine_management/examine_10_leave.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }
                        ]
                    }, {
                        MENU_ID: 11,//菜单编号
                        MENU_NAME: '我的申请',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/examineApprove/examine_3',//路由地址
                        MENU_MODULE: 'examine_management/examine_3.vue',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                        MENU_LEAF: 1,//是否有叶子 0有 1没有
                    }
                ]
            },
            {
                MENU_ID: 7,//菜单编号
                MENU_NAME: '薪酬管理',//菜单名称
                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                MENU_ROUTE: '/xcnavigation',//路由地址
                MENU_MODULE: 'menu_routing.vue',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                MENU_LEAF: 1,//是否有叶子 0有 1没有
            },
            {
                MENU_ID: 8,//菜单编号
                MENU_NAME: '社保管理',//菜单名称
                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                MENU_ROUTE: 'menu_routing.vue',//路由地址
                MENU_MODULE: '&#xe604;',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                MENU_LEAF: 1,//是否有叶子 0有 1没有
            },
            {
                MENU_ID: 9,//菜单编号
                MENU_NAME: '统计分析',//菜单名称
                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                MENU_ROUTE: '/statistics',//路由地址
                MENU_MODULE: 'menu_routing.vue',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                MENU_LEAF: 0,//是否有叶子 0有 1没有
                son: [
                    {
                        MENU_ID: 1,//菜单编号
                        MENU_NAME: '人员分析',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/1',//路由地址
                        MENU_MODULE: '',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                        MENU_LEAF: 0,//是否有叶子 0有 1没有
                        son: [
                            {
                                MENU_ID: 2,//菜单编号
                                MENU_NAME: '人员数量分析',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/statistics/statistice_personnel1',//路由地址
                                MENU_MODULE: 'statistics/statistice_personnel1.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            },
                            {
                                MENU_ID: 3,//菜单编号
                                MENU_NAME: '人员异动分析',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/statistics/statistice_personnel2',//路由地址
                                MENU_MODULE: 'statistics/statistice_personnel2.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            },
                            {
                                MENU_ID: 4,//菜单编号
                                MENU_NAME: '员工概况',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/statistics/statistice_personnel3',//路由地址
                                MENU_MODULE: 'statistics/statistice_personnel3.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }
                        ]
                    }, {
                        MENU_ID: 5,//菜单编号
                        MENU_NAME: '考勤分析',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/2',//路由地址
                        MENU_MODULE: '',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                        MENU_LEAF: 0,//是否有叶子 0有 1没有
                        son: [
                            {
                                MENU_ID: 6,//菜单编号
                                MENU_NAME: '出勤分析',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/statistics/check_work1',//路由地址
                                MENU_MODULE: 'statistics/check_work1.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }, {
                                MENU_ID: 7,//菜单编号
                                MENU_NAME: '工时分析',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/statistics/check_work2',//路由地址
                                MENU_MODULE: 'statistics/check_work2.vue;',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            },
                            {
                                MENU_ID: 8,//菜单编号
                                MENU_NAME: '加班分析',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/statistics/check_work3',//路由地址
                                MENU_MODULE: 'statistics/check_work3.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }, {
                                MENU_ID: 9,//菜单编号
                                MENU_NAME: '请假分析',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/statistics/check_work4',//路由地址
                                MENU_MODULE: 'statistics/check_work4.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }
                        ]
                    }, {
                        MENU_ID: 10,//菜单编号
                        MENU_NAME: '薪酬分析',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/3',//路由地址
                        MENU_MODULE: '',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                        MENU_LEAF: 0,//是否有叶子 0有 1没有
                        son: [
                            {
                                MENU_ID: 11,//菜单编号
                                MENU_NAME: '工资成本分析',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/statistics/salary_analysis1.vue',//路由地址
                                MENU_MODULE: 'statistics/salary_analysis1.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }, {
                                MENU_ID: 12,//菜单编号
                                MENU_NAME: '社保成本分析',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: 'statistics/salary_analysis2.vue',//路由地址
                                MENU_MODULE: 'statistics/salary_analysis2.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }, {
                                MENU_ID: 13,//菜单编号
                                MENU_NAME: '薪酬结构分析',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/statistics/salary_analysis3',//路由地址
                                MENU_MODULE: 'statistics/salary_analysis3.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }, {
                                MENU_ID: 14,//菜单编号
                                MENU_NAME: '部门成本分析',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/statistics/salary_analysis4',//路由地址
                                MENU_MODULE: 'statistics/salary_analysis4.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }
                        ]
                    }
                ]
            },
            {
                MENU_ID: 10,//菜单编号
                MENU_NAME: '系统管理',//菜单名称
                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                MENU_ROUTE: '/system_navigation',//路由地址
                MENU_MODULE: 'menu_routing.vue',//组件地址
                MENU_STATE: 0,//是否启用 0启用 1禁用
                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                MENU_LEAF: 0,//是否有叶子 0有 1没有
                son: [
                    {
                        MENU_ID: 1,//菜单编号
                        MENU_NAME: '权限管理',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/1',//路由地址
                        MENU_MODULE: '',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                        MENU_LEAF: 0,//是否有叶子 0有 1没有
                        son: [//子菜单
                            {
                                MENU_ID: 2,//菜单编号
                                MENU_NAME: '权限设置',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/system_navigation/permission_set',//路由地址
                                MENU_MODULE: 'system_management/permission_set.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            },
                            {
                                MENU_ID: 3,//菜单编号
                                MENU_NAME: '角色设置',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/system_navigation',//路由地址
                                MENU_MODULE: '',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有

                            }]
                    }, {
                        MENU_ID: 6,//菜单编号
                        MENU_NAME: '公告管理',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/2',//路由地址
                        MENU_MODULE: '',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                        MENU_LEAF: 0,//是否有叶子 0有 1没有
                        son: [
                            {
                                MENU_ID: 7,//菜单编号
                                MENU_NAME: '公告设置',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/system_navigation/notice',//路由地址
                                MENU_MODULE: 'system_management/notice.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }]
                    }, {
                        MENU_ID: 8,//菜单编号
                        MENU_NAME: '日志管理',//菜单名称
                        PICTURE_ADDRESS: '&#xe64c;',//图片地址
                        MENU_ROUTE: '/3',//路由地址
                        MENU_MODULE: '',//组件地址
                        MENU_STATE: 0,//是否启用 0启用 1禁用
                        MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                        MENU_LEAF: 0,//是否有叶子 0有 1没有
                        son: [
                            {
                                MENU_ID: 8,//菜单编号
                                MENU_NAME: '登录日志',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/system_navigation/login_log',//路由地址
                                MENU_MODULE: 'system_management/login_log.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            },
                            {
                                MENU_ID: 9,//菜单编号
                                MENU_NAME: '操作日志',//菜单名称
                                PICTURE_ADDRESS: '&#xe64c;',//图片地址
                                MENU_ROUTE: '/system_navigation/operate_log',//路由地址
                                MENU_MODULE: 'system_management/operate_log.vue',//组件地址
                                MENU_STATE: 0,//是否启用 0启用 1禁用
                                MENU_TYPE: 0,//菜单类型 0菜单 1:按钮
                                MENU_LEAF: 1,//是否有叶子 0有 1没有
                            }]
                    }]
            }
        ],
        //默认激活的一级菜单
        activate_router: '',
        //默认激活的二级菜单
        default_route: '',
        //二级菜单路由版本
        router_versions: ''
    }, getters: {
        //获取所有的菜单列表
        menus: (state) => {
            return state.menuList
        },
        //获取更多之外的菜单列表
        menus_outer: (state) => {
            let menus_outer = [];
            for (let i = 0; i < state.memuList.length; i++) {
                //只获取前四个 并且状态为启用 以及类型是菜单
                if (i <= 4 && state.memuList[i].MENU_STATE == 0 && state.memuList[i].MENU_TYPE == 0) {
                    menus_outer.push(state.memuList[i])
                }
            }
            return menus_outer;
        },
        //获取更多之内的菜单列表
        menus_within: (state) => {
            let menus_within = [];
            for (let i = 0; i < state.memuList.length; i++) {
                //获取前四个后面的菜单 并且状态为启用 以及类型是菜单
                if (i >= 5 && state.memuList[i].MENU_STATE == 0 && state.memuList[i].MENU_TYPE == 0) {
                    menus_within.push(state.memuList[i])
                }
            }
            return menus_within;
        },
        //根据path动态获取store里面的菜单列表
        store_menuList: (state) => (path) => {
            let store_menuList = [];
            //循环菜单列表
            for (let i = 0; i < state.memuList.length; i++) {
                //如果找到路由地址跟传过来的是一致则返回结果集 并且 状态需为启用 存在叶子
                if ((state.memuList[i].MENU_ROUTE) == (path) && state.memuList[i].MENU_STATE == 0 && state.memuList[i].MENU_LEAF == 0) {
                    store_menuList.push(state.memuList[i].son)
                }
            }
            return store_menuList;
        }

    }
})
export default store