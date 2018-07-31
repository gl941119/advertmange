import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 引入element-ui的样式
import './assets/css/reset.css';
import './assets/css/global.scss';

import store from './store';
import Cache from './utils/cache';

Vue.config.productionTip = false;
Vue.use(ElementUI);


router.beforeEach((to, from, next) => {
    let token = Cache.getSession('bier_token');
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token) {
            next({name: 'login'});
        } else {
            next();
        }
    } else {
        next();
    }
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});
