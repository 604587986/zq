import axios from '@/utils/request'

//菜单列表
export function getColumnList(data) {
    return axios.post('/api/navigation/index', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//添加菜单
export function AddColumn(data) {
    return axios.post('/api/navigation/create', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//编辑菜单
export function EditColumn(data) {
    return axios.post('/api/navigation/edit', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//修改菜单
export function UpdateColumn(data) {
    return axios.post('/api/navigation/save', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}