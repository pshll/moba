import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './assets/css/base.scss'
import './assets/iconfont/iconfont.css'

import VueAwesomeSwiper from "vue-awesome-swiper/src";
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper, /* { default global options } */)

import http from './network/http'

Vue.prototype.$http = http

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
