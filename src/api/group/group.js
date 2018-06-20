import axios from '@/utils/request'
import qs from 'qs';

//添加用户组
export function addUserGroup(data) {
    return axios.post('/api/group/create', qs.stringify(data)).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//用户组列表
export function getUserGroup(data) {
    return axios.post('/api/group/index', qs.stringify(data)).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//获取用户组信息
export function editUserGroup(data) {
    return axios.post('/api/group/edit', qs.stringify(data)).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//修改用户组
export function updateUserGroup(data) {
    return axios.post('/api/group/save', qs.stringify(data)).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}

//权限列表
export function privilege(data) {
    return axios.post('/api/group/privileges', qs.stringify(data)).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}