import axios from '@/utils/request'

//分类列表
export function getCategoryList(data) {
    return axios.post('/api/category/index', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//添加分类
export function toAddCategory(data) {
    return axios.post('/api/category/create', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//获取分类详情
export function edit(data) {
    return axios.post('/api/category/edit', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//修改分类信息
export function update(data) {
    return axios.post('/api/category/save', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}