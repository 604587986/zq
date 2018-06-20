import axios from '@/utils/request'
import qs from 'qs';
//添加站点
export function toAddSite(data) {
    return axios({
        method: 'post',
        url: '/api/site/create',
        data: qs.stringify(data),
        headers: {}
    }).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}