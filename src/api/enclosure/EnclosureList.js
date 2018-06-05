import axios from 'axios';
import qs from 'qs';

//附件列表
export function getEnclosureList(data) {
    return axios.post('/api/attachment/index', qs.stringify(data)).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}