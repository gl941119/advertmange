import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        id: undefined,
        uid: undefined,
        username: undefined,
        token: undefined,
        type: 'amazon',
    },
    mutations: {
        setUserId(state, val) {
            state.id = val;
        },
        setUserUId(state, val) {
            state.uid = val;
        },
        setUserName(state, val) {
            state.username = val;
        },
        setToken(state, val) {
            state.token = val;
        },
        setPlatformType(state, val) {
            state.type = val;
        },
    },
});
