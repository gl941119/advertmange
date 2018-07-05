import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        userid: undefined,
        username: undefined,
        token: undefined,
        type: 'amazon',
    },
    mutations: {
        setUserUId(state, val) {
            state.userid = val;
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
