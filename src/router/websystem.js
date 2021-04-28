export default [
    {
        path:"/QRCode",
        name:"QRCode",
        meta:{
            title:"二维码"
        },
        component:()=>import('../view/WebSystem/Login/QRCode.vue')
    },
    {
        path: '/systemHome',
        name: 'systemHome',
        component: () => import('../view/WebSystem/systemHome.vue'),
        meta: {title: '主页'},
        redirect:"/blogList",
        children: [
            {
                path: '/blogList',
                name: 'BlogList',
                component: () => import('../view/WebSystem/Blogs/BlogList.vue'),
                meta: {title: '博客类别'},
            },
            {
                path: '/blogType',
                name: 'BlogType',
                component: () => import('../view/WebSystem/BlogType/blogType.vue'),
                meta: {title: '博客类型'},
            },
            {
                path: '/projectList',
                name: 'ProjectList',
                component: () => import('../view/WebSystem/Project/ProjectList.vue'),
                meta: {title: '项目列表'},
            },
            {
                path: '/reviewList',
                name: 'ReviewList',
                component: () => import('../view/WebSystem/ReviewBoard/ReviewList.vue'),
                meta: {title: '留言评论'},
            },
        ]
    },
]