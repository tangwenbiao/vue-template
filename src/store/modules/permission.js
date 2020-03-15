import { asyncRoutes,constantRoutes } from '@/router'

/**
 * 验证路由是否有权限
 * @param {权限} roles 
 * @param {路由} route 
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

/**
 * 根据权限筛选路由信息
 * @param {路由信息} routes 
 * @param {权限信息} roles 
 */
export function filterAsyncRoutes(routes, roles) {
    const res = []

    routes.forEach(route => {
        const tmp = { ...route }
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })

    return res
}

const state = {
    routes: [], //所有路由（公共路由+权限路由）
    addRoutes: [] //权限路由
}

const mutations = {
    //保存路由到store
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        //在通用路由后添加权限路由
        state.routes = constantRoutes.concat(routes)
    }
}

const actions = {
    //动态加载路由（前端存储所有路由，然后通过后端role进行筛选）
    generateRoutes({ commit }, roles) {
        return new Promise(resolve => {
            let accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
            commit('SET_ROUTES', accessedRoutes)
            resolve(accessedRoutes)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}