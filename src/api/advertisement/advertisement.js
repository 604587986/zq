import axios from '@/utils/request'

//广告列表
export function advertiseList(data) {
    return axios.post('/api/advertise/index', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//广告创建
export function createAdvertise(data) {
    return axios.post('/api/advertise/create', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//广告编辑
export function editAdvertise(data) {
    return axios.post('/api/advertise/save', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//广告删除
export function delAdvertise(data) {
    return axios.post('/api/advertise/delete', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}