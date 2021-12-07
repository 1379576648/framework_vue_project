import {
	createRouter,
	createWebHashHistory,
	createWebHistory
} from 'vue-router'
import beginIndex from '../components/begin/index.vue'
import faceLogin from "../components/begin/rest/faceLogin.vue";
import passLogin from "../components/begin/rest/passLogin.vue";
import  HelloWorld from '../components/HelloWorld.vue';
import graph from '../components/graph/index.vue'
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
	component: HelloWorld
},{
	path: "/graph",
	component:graph
}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})
export default router
