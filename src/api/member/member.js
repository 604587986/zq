import axios from '@/utils/request'

//会员列表
export function memberList(data) {
    return axios.post('/api/member/index', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//添加会员
export function addMember(data) {
    return axios.post('/api/member/create', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//编辑会员信息
export function editMember(data) {
    return axios.post('/api/member/edit', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//保存会员信息
export function saveMember(data) {
    return axios.post('/api/member/save', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//密码重设
export function modifyPassword(data) {
    return axios.post('/api/member/passwd', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}
//导入excel
export function importExcel(data) {
    return axios.post('/api/member/importMember', data).then(res => {
        return Promise.resolve(res)
    }).catch(err => {
        console.log(err);
    })
}