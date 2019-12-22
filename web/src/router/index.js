import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Main,
        children: [
            {
                path: '/',
                name: 'home',
                component: () => import('../views/Home/Home'),
            },
            {
                path: '/articles/:id',
                name: 'article',
                component: () => import('../views/Detail/Article/ArticleDetail'),
                props: true,
            },
        ],
    },
    {
        path: '/heroes/:id',
        name: 'hero',
        component: () => import('../views/Detail/Hero/HeroDetail'),
        props: true,
    },
]

const router = new VueRouter({
    routes
})

export default router
