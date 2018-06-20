import axios from '@/utils/request'

//登录
export function init(data) {
    return axios.post('/api/login/init', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}