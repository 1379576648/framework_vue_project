import {createStore} from 'vuex'

const store = createStore({
    state: {
        //员工信息
        staffMessage: {},
        //动态菜单
        memuList: [],
        //菜单路由
        menuRouter:[],
        //jwt
        token:'',
    },
    /* 同步修改值 */
    mutations: {
        //修改用户数据
        staffInfo(state, obj) {
            // 通过传过来的值进行修改
            state.staffMessage = obj;
        },
        //修改菜单列表
        updateMenuList(state, obj) {
            // 通过传过来的值进行修改
            state.memuList = obj;
        },
        //修改菜单路由
        updateMenuRouter(state, obj) {
            // 通过传过来的值进行修改
            state.menuRouter = obj;
        },
        //修改token值
        updateToken(state,obj){
            // 通过传过来的值进行修改
            state.token = obj;
        }
    },
    getters: {
        //获取更多之外的菜单列表
        menus_outer: (state) => {
            //定义数组
            let menus_outer = [];
            //循环菜单列表
            for (let i = 0; i < state.memuList.length; i++) {
                //只获取前四个 并且状态为启用 以及类型是目录
                if (i <= 4 && state.memuList[i].menuPowerState == 0 && state.memuList[i].menuPowerType == 0) {
                    //添加至数组
                    menus_outer.push(state.memuList[i]);
                }
            }
            //返回结果集
            return menus_outer;
        },
        //获取更多之内的菜单列表
        menus_within: (state) => {
            //定义数组
            let menus_within = [];
            //循环菜单列表
            for (let i = 0; i < state.memuList.length; i++) {
                //获取前四个后面的菜单 并且状态为启用 以及类型是目录
                if (i >= 5 && state.memuList[i].menuPowerState == 0 && state.memuList[i].menuPowerType == 0) {
                    //添加至数组
                    menus_within.push(state.memuList[i]);
                }
            }
            //返回结果集
            return menus_within;
        },
        //根据path动态获取store里面的菜单列表
        store_menuList: (state) => (path) => {
            //定义数组
            let store_menuList = [];
            //循环菜单列表
            for (let i = 0; i < state.memuList.length; i++) {
                //如果找到路由地址跟传过来的是一致则返回结果集 并且 状态需为启用
                if ((state.memuList[i].menuPowerRoute) == (path) && state.memuList[i].menuPowerState == 0) {
                    //如果叶子下面有数据
                    if (state.memuList[i].children) {
                        //添加至数组
                        store_menuList.push(state.memuList[i].children);
                    }
                }
            }
            //返回结果集
            return store_menuList;
        }

    }
})
export default store