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