import axios from 'axios';
import qs from 'qs';

//文章列表
export function getArticleList(data) {
    return axios.post('/api/article/index', qs.stringify(data)).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//文章预创建
export function createArticle(data) {
    return axios.post('/api/article/create', qs.stringify(data)).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//文章保存
export function saveArticle(data) {
    return axios.post('/api/article/save', qs.stringify(data)).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}