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
//标签保存
export function saveTag(data) {
    return axios.post('/api/tag/save', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//删除标签
export function deleteTag(data) {
    return axios.post('/api/tag/delete', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}