import axios from '@/utils/request'

//文章列表
export function getArticleList(data) {
    return axios.post('/api/article/index', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//文章预创建
export function createArticle(data) {
    return axios.post('/api/article/create', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//文章保存
export function saveArticle(data) {
    return axios.post('/api/article/save', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//文章审核
export function verifyArticle(data) {
    return axios.post('/api/article/verify', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//文章软删除
export function deleteArticle(data) {
    return axios.post('/api/article/delete', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//文章恢复
export function restoreArticle(data) {
    return axios.post('/api/article/restore', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//文章彻底删除
export function delArticle(data) {
    return axios.post('/api/article/rm', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//文章编辑初始化
export function editArticle(data) {
    return axios.post('/api/article/edit', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
// 批量删除
export function deleteAll(data) {
    return axios.post('/api/article/deleteAll', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}