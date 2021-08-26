import request from '@/plugin/axios'
import util from '@/libs/util.js'

const getToken = () => {
    if (sessionStorage.getItem('mock-user')) {
        return sessionStorage.getItem('mock-user').split('&')[1]
    }
    return util.cookies.get('uuid')
}

export function renderUrl (url) {
    let token = getToken()
    if (url.includes('?')) {
        url += `&operatorToken=${token}`
    } else {
        url += `?operatorToken=${token}`
    }
    return url
}

export function get (url) {
    let token = getToken()
    if (url.includes('?')) {
        url += `&operatorToken=${token}`
    } else {
        url += `?operatorToken=${token}`
    }
    return request({
        method: 'get',
        url
    })
}

export function form (url, data, config) {
    let form = new FormData()
    let token = getToken()
    form.append('operatorToken', token)
    for (let i in data) {
        form.append(i, data[i])
    }
    return request({
        method: 'post',
        url,
        data: form,
        config: {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        },
        ...config // 可能的上传进度条
    })
}

export function post (url, data, config) {
    let token = getToken()
    url += `?operatorToken=${token}`
    return request({
        method: 'post',
        url,
        data: data,
        ...config // 可能的上传进度条
    })
}
