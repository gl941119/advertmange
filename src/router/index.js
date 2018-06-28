import Vue from 'vue';
import Router from 'vue-router';

import IndexCom from '@/pages/index/index';
// index children
import HomeCom from '@/pages/index/home/home';
import UserDetailCom from '@/pages/index/user-detail';
import PublicAccountCom from '@/pages/index/public-account';

import BulletinCom from '@/pages/index/material/bulletin';
import FeedbackCom from '@/pages/index/material/feedback';
import LoginCom from '@/pages/login/login';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: {name: 'login'},
        },
        {
            path: '/index',
            name: 'index',
            meta: {requiresAuth: true},
            component: IndexCom,
            redirect: {name: 'home'},
            children: [
                {
                    path: 'home',
                    name: 'home',
                    component: HomeCom,
                },
                {
                    path: 'bulletin',
                    name: 'bulletin',
                    component: BulletinCom,
                },
                {
                    path: 'feedback',
                    name: 'feedback',
                    component: FeedbackCom,
                },
                {
                    path: 'userdetail',
                    name: 'userdetail',
                    component: UserDetailCom,
                },
            ],
        },
        {
            path: '/tikindex',
            name: 'tikindex',
            meta: {requiresAuth: true},
            component: IndexCom,
            redirect: {name: 'tikhome'},
            children: [
                {
                    path: 'tikhome',
                    name: 'tikhome',
                    component: HomeCom,
                },
                {
                    path: 'tikbulletin',
                    name: 'tikbulletin',
                    component: BulletinCom,
                },
                {
                    path: 'tikfeedback',
                    name: 'tikfeedback',
                    component: FeedbackCom,
                },
                {
                    path: 'tikuserdetail',
                    name: 'tikuserdetail',
                    component: UserDetailCom,
                },
                {
                    path: 'tikpublic',
                    name: 'tikpublic',
                    component: PublicAccountCom,
                },
            ],
        },
        {
            path: '/login',
            name: 'login',
            component: LoginCom,
        },
        {path: '*', redirect: '/'},
    ],
});
