import request from '@/utils/request'

export function userInfo() {
    return request({
        url: '/statistics/userInfo',
        method: 'get'
    })
}