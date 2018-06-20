import axios from '@/utils/request'

//登录
export function toLogin(data) {
    return axios.post('/api/login/login', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//注销
export function toLogout(data) {
    return axios.post('/api/login/logout', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}