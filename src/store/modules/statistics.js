import { userInfo,panel,orderInfo } from '../../api/statistics'

const actions = {
    query({ commit }, type) {
        if (type == "userInfo") {
            return getUserInfo();
        }else if (type == "orderInfo"){
            return getOrderInfo();
        }
    },
    panelTotal(){
        return getPanel();
    }
}

/**
 * 获取用户信息
 */
function getUserInfo() {
    return new Promise((resolve, reject) => {
        userInfo()
            .then(response => {
                const { data } = response
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

/**
 * 获取订单信息
 */
function getOrderInfo(){
    return new Promise((resolve,reject)=>{
        orderInfo()
        .then(res=>{
            const {data}=res
            resolve(data)
        })
        .catch(err=>{
            reject(err)
        })
    })
}

/**
 * 获取面板的统计信息
 */
function getPanel(){
    return new Promise((resolve,reject)=>{
        panel()
        .then(res=>{
            const {data} =res
            resolve(data)
        })
        .catch(err=>{
            reject(err)
        })
    })
}


export default {
    namespaced: true,
    actions
}