import axios from 'axios'
import qs from 'qs'
import router from '@/router'

import {
    Message,
    MessageBox
} from 'element-ui'
// import store from '../store'
// import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
    baseURL: '', // api的base_url
    timeout: 15000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(
    config => {
        var mockUser = window.localStorage.getItem('mockUser');
        if (mockUser) {
            if (!config.data) {
                config.data = {};
            }
            config.data.mock_user = mockUser;
        }
        if (config.data) {
            config.data = qs.stringify(config.data)
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
);
// respone拦截器
service.interceptors.response.use(
    response => {
        if (response.data.code == 401) {
            MessageBox.alert('请先登录！', '提示', {
                confirmButtonText: '确定',
                callback: () => {
                    localStorage.clear();
                    router.push('/pages/admin/Login')
                }
            })
        } else
            return response;
    },
    error => {
        window.alert('发生了错误')
        return Promise.reject(error.response.data) // 返回接口返回的错误信息
    });

export default service
