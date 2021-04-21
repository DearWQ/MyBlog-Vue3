import {createRouter, createWebHashHistory,createWebHistory} from "vue-router";
import login from "../view/WebSystem/Login/login.vue";
import QRCode from "../view/WebSystem/Login/QRCode.vue";
import setWebTitle from "../utils/setWebTitle";
const routes = [
    {
        path:"/",
        name:"Home",
        meta:{
            title:"首页"
        },
        component:()=>import('../view/WebSite/Home/index.vue')
    },
    {
        path:"/about",
        name:"About",
        meta:{
            title:"关于我"
        },
        component:()=>import('../view/WebSite/About/index.vue')
    },
    {
        path:"/blog",
        name:"Blog",
        meta:{
            title:"博客"
        },
        component:()=>import('../view/WebSite/Blog/index.vue')
    },
    {
        path:"/blog/cate/:categoryId",
        name:"CategoryBlog",
        meta:{
            title:"博客"
        },
        component:()=>import('../view/WebSite/Blog/index.vue'),
    },
    {
        path:"/blog/:id",
        name:"BlogDetail",
        meta:{
            title:"博客详情"
        },
        component:()=>import('../view/WebSite/Blog/Detail.vue'),
    },
    {
        path:"/project",
        name:"Project",
        meta:{
            title:"项目&效果"
        },
        component:()=>import('../view/WebSite/Project/index.vue')
    },
    {
        path:"/message",
        name:"Message",
        meta:{
            title:"留言板"
        },
        component:()=>import('../view/WebSite/Message/index.vue')
    },
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