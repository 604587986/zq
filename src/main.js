// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import qs from 'qs'

//引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//引入axios
import axios from 'axios'
Vue.prototype.$http = axios // 通过修改原型链，来更方便的使用
Vue.prototype.$get = function (url, data = {}) {
    return axios.get(url, {
        params: data
    });
};
Vue.prototype.$post = function (url, data = {}) {
    // 处理请求参数，由 json 转为 字符串
    data = qs.stringify(data);
    return axios.post(url, data);
};

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
