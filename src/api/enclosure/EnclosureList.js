import axios from '@/utils/request'

//附件列表
export function getEnclosureList(data) {
    return axios.post('/api/attachment/index', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//附件删除
export function deleteEnclosure(data) {
    return axios.post('/api/attachment/delete', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}