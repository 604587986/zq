import axios from '@/utils/request'

//导入录取信息
export function importExcel(data) {
    return axios.post('/api/admission/import', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//录取信息列表
export function index(data) {
    return axios.post('/api/admission/index', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//删除录取信息
export function del(data) {
    return axios.post('/api/admission/delete', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
