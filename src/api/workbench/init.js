import axios from 'axios';
import qs from 'qs';

//登录
export function init(data) {
    return axios.post('/api/login/init', qs.stringify(data)).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}