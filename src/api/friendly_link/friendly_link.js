import axios from '@/utils/request'

//友情链接列表
export function linkList(data) {
    return axios.post('/api/links/index', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//友情链接创建
export function createLink(data) {
    return axios.post('/api/links/create', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//友情链接编辑
export function editLink(data) {
    return axios.post('/api/links/save', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//友情链接删除
export function delLink(data) {
    return axios.post('/api/links/delete', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}