import axios from 'axios';
import qs from 'qs';

//登录
export function toLogin(data) {
    return axios.post('/api/login/login', qs.stringify(data)).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//注销
export function toLogout(data) {
    return axios.post('/api/login/logout', qs.stringify(data)).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}