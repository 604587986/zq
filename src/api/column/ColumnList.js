import axios from '@/utils/request'
import qs from 'qs';

//栏目列表
export function getColumnList(data) {
    return axios.post('/api/navigation/index', qs.stringify(data)).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//添加栏目
export function AddColumn(data) {
    return axios.post('/api/navigation/create', qs.stringify(data)).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//编辑栏目
export function EditColumn(data) {
    return axios.post('/api/navigation/edit', qs.stringify(data)).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//修改栏目
export function UpdateColumn(data) {
    return axios.post('/api/navigation/save', qs.stringify(data)).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}