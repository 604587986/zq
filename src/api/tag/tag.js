import axios from '@/utils/request'
//标签列表
export function tagList(data) {
    return axios.post('/api/tag/index', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//标签创建
export function createNewTag(data) {
    return axios.post('/api/tag/create', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}