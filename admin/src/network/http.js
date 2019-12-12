import axios from 'axios'
import Vue from 'vue'
import router from '../router'

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

http.interceptors.request.use(config => {
    // 在请求头中添加token
    if (localStorage.token) {
        config.headers.Authorization = 'Bearer ' + localStorage.token
    }
    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});

//拦截请求
http.interceptors.response.use(res => {
    return res
}, err => {
    if (err.response.data.message) {
        Vue.prototype.$message({
            type: 'error',
            message: err.response.data.message
        })
        if(err.response.status === 401) {
            router.push('/login')
        }
    }
    return Promise.reject(err)
})

export default http