import axios from 'axios';
import qs from 'qs';

//分类列表
export function getCategoryList(data) {
    return axios.post('/api/category/index', qs.stringify(data)).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//添加分类
export function toAddCategory(data) {
    return axios.post('/api/category/create', qs.stringify(data)).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//获取分类详情
export function edit(data) {
    return axios.post('/api/category/edit', qs.stringify(data)).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//修改分类信息
export function update(data) {
    return axios.post('/api/category/save', qs.stringify(data)).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}