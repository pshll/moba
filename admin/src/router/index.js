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
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
