import {
    createRouter, createWebHashHistory, createWebHistory
} from 'vue-router'
import store from '../store/index.js'
import workbench from "../components/navigation.vue"

/**
 * 全局导航栏
 */
//所有的菜单列表
var memuList1 = []
//根节点菜单列表
var memuList2 = []
//获取所有的子节点菜单列表
var oo = []
//所有的子节点菜单列表无子节点
var oop = []

const modules = import.meta.glob('../components/**/*.vue');

const routes = [
    {
        path: '/', redirect: '/beginIndex'
    }, {//登录
        path: '/beginIndex',
        name: 'admin',
        component: modules[`${'../components/begin/index.vue'}`],
        redirect: '/beginIndex/faceLogin',
        children: [{//人脸登录
            path: '/beginIndex/faceLogin', component: modules[`${'../components/begin/rest/facelogin.vue'}`]
        }, {//密码登录
            path: '/beginIndex/passLogin', component: modules[`${'../components/begin/rest/passlogin.vue'}`]
        }]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


//全局前置守卫，可用作前端权限验证的简单实现
router.beforeEach(function (to, from, next) {
    if ((to.path !== '/beginIndex/faceLogin' & to.path !== '/beginIndex/passLogin' && store.state.staffMessage.staffId == null)) {
        next({path: '/beginIndex'})
    } else {
        if (sessionStorage.getItem("refresh") == "true" && store.state.memuList[0] != null) {
            console.log(store.state.memuList)
            //通过后台返回过来的级联菜单 遍历出所有的菜单
            menu(store.state.memuList);
            let ou = {
                path: "/home",
                component: modules[`${'../components/navigation.vue'}`],
                redirect: '',
                children: []
            }
            //向跟菜单列表中添加数据
            memuList2.push(ou);
            //循环菜单列表找出根节点
            for (let i = 0; i < memuList1.length; i++) {
                //如果菜单的父类编号为0 并且菜单类型为菜单
                if (memuList1[i].menuPowerPid == 0 && memuList1[i].menuPowerType == 0) {
                    //当循环第一次的时候向父路由添加默认路由
                    if (i == 0) {
                        memuList2[0].redirect = memuList1[i].menuPowerRoute;
                    }
                    let op = {
                        path: memuList1[i].menuPowerRoute + '/:path?',
                        name: memuList1[i].menuPowerRoute,
                        id: memuList1[i].menuPowerId,
                        component: modules[`${'../components' + memuList1[i].menuPowerModule + '.vue'}`],
                        redirect: '',
                        children: [],
                        props: true,
                    }
                    //向跟节点添加数据
                    memuList2[0].children.push(op);
                }
            }
            //为根菜单设置子菜单，getClild是递归调用的
            for (let j = 0; j < memuList2[0].children.length; j++) {
                /* 获取根节点下的所有子节点 使用getChild方法*/
                getChild(memuList2[0].children[j].id, memuList1);
                //倒叙循环数据
                for (let i = oo.length - 1; i >= 0; i--) {
                    //如果查询到有无叶子的数据
                    if (oo[i].menuPowerLeaf == 1) {
                        oop.push(oo[i]);
                    }
                }

                //给根节点设置子节点
                if (oop != null) {
                    //倒叙循环数据
                    for (let i = oop.length - 1; i >= 0; i--) {
                        //如果查询到有无叶子的数据
                        if (oop[i].menuPowerLeaf == 1) {
                            //如果是第一次循环则向父路由添加默认的路由地址
                            if (i == oop.length - 1) {
                                memuList2[0].children[j].redirect = oop[i].menuPowerRoute;
                            }
                            let op = {
                                path: oop[i].menuPowerRoute + '/:path?',
                                name: oop[i].menuPowerRoute,
                                component: modules[`${'../components' + oop[i].menuPowerModule + '.vue'}`],
                                props: true,
                            }
                            //向跟节点添加数据
                            memuList2[0].children[j].children.push(op);
                        }
                    }
                    //初始化
                    oo = [];
                    oop = [];
                }
            }
            //将菜单路由添加到路由中
            router.addRoute(memuList2[0]);
            //将菜单路由添加到vuex中
            store.commit("updateMenuRouter", memuList2[0])
            sessionStorage.setItem("refresh", "false")
            console.log(memuList2[0])
            next({
                path: to.path
            })
            return
        }
        next()
    }
})

var menu = function (val) {
    //循环所有的根菜单
    for (let i = 0; i < val.length; i++) {
        //如果菜单类型为菜单 没有叶子
        if (val[i].menuPowerType == 0 && val[i].menuPowerLeaf == 1) {
            let op = {
                menuPowerId: val[i].menuPowerId,
                menuPowerLeaf: val[i].menuPowerLeaf,
                menuPowerModule: val[i].menuPowerModule,
                menuPowerName: val[i].menuPowerName,
                menuPowerOrder: val[i].menuPowerOrder,
                menuPowerPid: val[i].menuPowerPid,
                menuPowerRoute: val[i].menuPowerRoute,
                menuPowerState: val[i].menuPowerState,
                menuPowerType: val[i].menuPowerType,
                pictureAddress: val[i].pictureAddress,
                revision: val[i].revision,
                updatedTime: val[i].updatedTime,
                createdTime: val[i].createdTime,
                isDeleted: val[i].isDeleted,
                list: [],
            }
            //添加到菜单列表中
            memuList1.push(op);
            //如果菜单类型为菜单 并且有叶子
        } else if (val[i].menuPowerType == 0 && val[i].menuPowerLeaf == 0) {
            let op = {
                menuPowerId: val[i].menuPowerId,
                menuPowerLeaf: val[i].menuPowerLeaf,
                menuPowerModule: val[i].menuPowerModule,
                menuPowerName: val[i].menuPowerName,
                menuPowerOrder: val[i].menuPowerOrder,
                menuPowerPid: val[i].menuPowerPid,
                menuPowerRoute: val[i].menuPowerRoute,
                menuPowerState: val[i].menuPowerState,
                menuPowerType: val[i].menuPowerType,
                pictureAddress: val[i].pictureAddress,
                revision: val[i].revision,
                updatedTime: val[i].updatedTime,
                createdTime: val[i].createdTime,
                isDeleted: val[i].isDeleted,
                list: [],
            }
            //添加到菜单列表中
            memuList1.push(op);
            //执行递归
            menu(val[i].list);
        }
    }
}
var getChild = function (id, val) {
    let op = [];
    //子菜单
    for (let i = 0; i < val.length; i++) {
        // 遍历所有节点，将所有菜单的父id与传过来的根节点的id比较
        //相等说明：为该根节点的子节点。
        if (val[i].menuPowerPid == id && val[i].menuPowerType == 0) {
            op.push(val[i]);
        }
    }
    //递归
    for (let j = 0; j < op.length; j++) {
        oo.push(op[j]);
        op.list = getChild(op[j].menuPowerId, val);
    }
    //如果节点下没有子节点，返回一个空List（递归退出）
    if (op.length == 0) {
        return null;
    }
    return op;
}

export default router
