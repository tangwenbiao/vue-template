import request from '@/utils/request'

export function login(data) {
  return request({
    //url: '/vue-admin-template/user/login',
    url:'/login/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    //url: '/vue-admin-template/user/info',
    url:'/login/getUserInfo',
    method: 'post'
  })
}

export function logout() {
  return request({
    //url: '/vue-admin-template/user/logout',
    url:'login/logout',
    method: 'post'
  })
}
