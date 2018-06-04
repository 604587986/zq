// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

//引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//引入axios
import axios from 'axios'
//axios拦截器设置
// 1.添加token请求头
axios.interceptors.request.use(
    config => {
        // if (token) {
        //     config.headers.Authorization = token;
        // }
        // config.headers.Host = 'webmaster'
        return config
    },
    error => {
        return Promise.reject(error)
    }
);
//2.判断是否登录
axios.interceptors.response.use(
    response => {
        if (response.data.code == 401) {
            ElementUI.MessageBox.alert('请先登录！', '提示', {
                confirmButtonText: '确定',
                callback: () => {
                    localStorage.removeItem('userInfo');
                    router.push('/pages/admin/Login')
                }
            })
        } else
            return response;
    },
    error => {
        // if (error.response) {
        //     switch (error.response.status) {
        //         // case 401:
        //         //     // 返回 401 清除token信息并跳转到登录页面
        //         //     store.commit(types.LOGOUT);
        //         //     router.replace({
        //         //         path: 'login',
        //         //         query: { redirect: router.currentRoute.fullPath }
        //         //     })
        //         case 404:
        //             console.log(error.response.data);
        //     }
        // }
        if(error.response.message){
            window.alert(error.response.message)
        }else{
            window.alert('发生了错误')
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });
Vue.prototype.$http = axios // 通过修改原型链，来更方便的使用




//富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

//引入外部资源
import public_css from './assets/css/public.css'
import icon_css from './assets/iconfont/iconfont.css' //阿里巴巴图标库

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})
