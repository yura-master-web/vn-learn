export const state = () => ({
    error: null,
    success: null,
})

export const getters = {
    success: state => state.success,
}

export const mutations = {
    setSuccess(state, success) {
        state.success = success
    },
    clearSuccess(state) {
        state.success = null
    },
}

export const actions = {
    setSuccess({commit}, success) {
        commit('setSuccess', success)
    },
    clearSuccess({commit}) {
        commit('clearSuccess')
    },
}
