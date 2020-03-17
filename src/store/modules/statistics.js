import { userInfo } from '../../api/statistics'

const actions = {
    query({ commit }, type) {
        if (type == "userInfo") {
            return getUserInfo();
        }
    }
}

async function getUserInfo() {
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


export default {
    namespaced: true,
    actions
}