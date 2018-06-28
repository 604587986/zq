import axios from '@/utils/request'
//日志列表
export function logList(data) {
    return axios.post('/api/log/index', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}