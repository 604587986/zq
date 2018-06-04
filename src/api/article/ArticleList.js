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