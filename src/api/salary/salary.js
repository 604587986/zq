import axios from '@/utils/request'

//导入工资信息
export function importExcel(data) {
    return axios.post('/api/month/import', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
// 工资信息列表
export function index(data) {
    return axios.post('/api/month/index', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}

