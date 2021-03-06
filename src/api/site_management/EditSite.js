import axios from '@/utils/request'
//获取站点详情
export function getSiteInfo(data) {
    return axios({
        method: 'post',
        url: '/api/site/info',
        data: data,
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
        data: data,
        headers: {}
    }).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}