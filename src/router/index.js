import {createRouter, createWebHashHistory,createWebHistory} from "vue-router";
import setWebTitle from "../utils/setWebTitle";
import websiteRoutes from "./websiteRoutes";
import webSystemRoutes from "./websystem";
const routes = [
    {
        path: '/login',
        name: 'login',
        component:()=>import('../view/WebSystem/Login/login.vue'),
        meta: {title: '登录'}
    },
    ...websiteRoutes,
    ...webSystemRoutes
];

const router=createRouter({
    history: createWebHistory(),
    routes,
})
router.afterEach((to,from)=>{
    if(to.meta.title){
        setWebTitle.setRouteTitle(to.meta.title)
    }
})
export default router