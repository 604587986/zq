// 用户管理
import axios from '@/utils/request'
import qs from 'qs';
//用户列表
export function userList(data) {
    return axios({
        method: 'post',
        url: '/api/user/index',
        data: qs.stringify(data),
        headers: {}
    }).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//添加用户
export function addUser(data) {
    return axios.post('/api/user/create', qs.stringify(data)).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//获取用户信息
export function editUser(data) {
    return axios.post('/api/user/edit', qs.stringify(data)).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//修改用户
export function updateUser(data) {
    return axios.post('/api/user/save', qs.stringify(data)).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
