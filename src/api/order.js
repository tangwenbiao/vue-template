import request from '@/utils/request'

const ROOT_URL='/order'

export function getOrderList(query){
    return request({
        url:ROOT_URL+"/list",
        method:"post",
        data:query
    })
}

export function getOrder(id){
    return request({
        url:ROOT_URL+`/get/${id}`,
        method:"get",
    })
}