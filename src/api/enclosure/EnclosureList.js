import axios from '@/utils/request'

//附件列表
export function getEnclosureList(data) {
    return axios.post('/api/attachment/index', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}