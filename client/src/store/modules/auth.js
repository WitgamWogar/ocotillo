// initial state
const state = {
    access_token: localStorage.getItem('token') || null,
    refresh_token: null,
    user: {},
};

// getters
const getters = {
    access_token: (state) => {
        return state.access_token;
    },
};

// actions
const actions = {
    async logout() {
        state.access_token = null;
        await localStorage.setItem('token', '');

        return true;
    },
};

// mutations
const mutations = {
    setAccessToken(state, accessToken) {
        state.access_token = accessToken;
        localStorage.setItem('token', accessToken);
    },
    setUser(state, user) {
        state.user = user;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}