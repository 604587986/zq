import axios from '@/utils/request'
//获取站点列表
export function getSiteList(data) {
    return axios({
        method: 'post',
        url: '/api/site/index',
        data: data,
        headers: {}
    }).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//切换
//更新缓存
//数据备份
//数据恢复
//删除