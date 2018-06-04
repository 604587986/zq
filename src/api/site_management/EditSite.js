import axios from 'axios';
import qs from 'qs';
//获取站点详情
export function getSiteInfo(data) {
    return axios({
        method: 'post',
        url: '/api/site/info',
        data: qs.stringify(data),
        headers: {}
    }).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//修改站点信息
export function updateSiteInfo(data) {
    return axios({
        method: 'post',
        url: '/api/site/save',
        data: qs.stringify(data),
        headers: {}
    }).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}