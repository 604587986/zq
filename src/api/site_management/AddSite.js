import axios from '@/utils/request'
//添加站点
export function toAddSite(data) {
    return axios({
        method: 'post',
        url: '/api/site/create',
        data: data,
        headers: {}
    }).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}