import axios from '@/utils/request'
import qs from 'qs';
//单页列表
export function pageList(data) {
    return axios({
        method: 'post',
        url: '/api/page/index',
        data: qs.stringify(data),
        headers: {}
    }).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//添加单页
export function addPage(data) {
    return axios.post('/api/page/create', qs.stringify(data)).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//获取单页
export function editPage(data) {
    return axios.post('/api/page/edit', qs.stringify(data)).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//更新单页
export function updatePage(data) {
    return axios.post('/api/page/save', qs.stringify(data)).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}