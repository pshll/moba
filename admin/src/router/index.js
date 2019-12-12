import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'main',
        component: () => import("../views/Main"),
        children: [
            {
                path: 'categories/list',
                component: () => import("../views/Category/CategoryList"),
            },
            {
                path: 'categories/create',
                component: () => import("../views/Category/CategoryEdit"),
            },
            {
                path: 'categories/edit/:id',
                component: () => import("../views/Category/CategoryEdit"),
                props: true,
            },

            {
                path: 'equipments/list',
                component: () => import("../views/Equipment/EquipmentList"),
            },
            {
                path: 'equipments/create',
                component: () => import("../views/Equipment/EquipmentEdit"),
            },
            {
                path: 'equipments/edit/:id',
                component: () => import("../views/Equipment/EquipmentEdit"),
                props: true,
            },

            {
                path: 'heros/list',
                component: () => import("../views/Hero/HeroList"),
            },
            {
                path: 'heros/create',
                component: () => import("../views/Hero/HeroEdit"),
            },
            {
                path: 'heros/edit/:id',
                component: () => import("../views/Hero/HeroEdit"),
                props: true,
            },

            {
                path: 'articles/list',
                component: () => import("../views/Article/ArticleList"),
            },
            {
                path: 'articles/create',
                component: () => import("../views/Article/ArticleEdit"),
            },
            {
                path: 'articles/edit/:id',
                component: () => import("../views/Article/ArticleEdit"),
                props: true,
            },

            {
                path: 'ads/list',
                component: () => import("../views/Ad/AdList"),
            },
            {
                path: 'ads/create',
                component: () => import("../views/Ad/AdEdit"),
            },
            {
                path: 'ads/edit/:id',
                component: () => import("../views/Ad/AdEdit"),
                props: true,
            },

            {
                path: 'admin_users/list',
                component: () => import("../views/AdminUser/AdminUserList"),
            },
            {
                path: 'admin_users/create',
                component: () => import("../views/AdminUser/AdminUserEdit"),
            },
            {
                path: 'admin_users/edit/:id',
                component: () => import("../views/AdminUser/AdminUserEdit"),
                props: true,
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import("../views/Login"),
    },
]

const router = new VueRouter({
    routes
})

export default router
