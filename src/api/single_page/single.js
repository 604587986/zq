import axios from 'axios';
import qs from 'qs';
//单页列表
export function pageList(data) {
    return axios({
        method: 'post',
        url: '/api/page/index',
        data: qs.stringify(data),
        headers: {}
    }).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}