import {
    createRouter, createWebHashHistory, createWebHistory
} from 'vue-router'
import store from '../store/index.js'
import { toRaw } from '@vue/reactivity'
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
}]

const router = createRouter({
    history: createWebHistory(),
    routes
})

//全局前置守卫，可用作前端权限验证的简单实现
router.beforeEach(function (to, from, next) {
    if ((to.path !== '/beginIndex/faceLogin' & to.path !== '/beginIndex/passLogin' && store.state.staffMessage.staffId == null)) {
        next({path: '/beginIndex'})
    } else {
        if (routes.length>=3){
            routes.splice(1,2);
        }
        router.addRoute(toRaw(store.state.one)[0])
        console.log(routes)
        next()
    }
})
export default router
