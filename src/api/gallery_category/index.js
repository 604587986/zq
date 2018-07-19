import axios from '@/utils/request'
export function create(data) {
    return axios.post('/api/gallery_category/create', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
export function index(data) {
    return axios.post('/api/gallery_category/index', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
export function save(data) {
    return axios.post('/api/gallery_category/save', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
export function del(data) {
    return axios.post('/api/gallery_category/delete', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}