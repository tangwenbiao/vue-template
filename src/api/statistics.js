import request from '@/utils/request'

const ROOT_URL='/statistics'

export function userInfo() {
    return request({
        url: ROOT_URL+'/userInfo',
        method: 'get'
    })
}

export function orderInfo(){
    return request({
        url:ROOT_URL+"/orderInfo",
        method:'get'
    })
}

export function panel(){
    return request({
        url:ROOT_URL+'/panelInfo',
        method:'post'
    })
}