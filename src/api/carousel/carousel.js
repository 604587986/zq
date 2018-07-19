import axios from '@/utils/request'

//轮播列表
export function carouselList(data) {
    return axios.post('/api/carousel/index', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//轮播创建
export function createCarousel(data) {
    return axios.post('/api/carousel/create', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//轮播编辑
export function editCarousel(data) {
    return axios.post('/api/carousel/save', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//轮播删除
export function delCarousel(data) {
    return axios.post('/api/carousel/delete', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}